const userModel = require('../models/users.model');
const User = require('../classes/User.class');
const Joi = require('joi');
const { encrypt } = require('../utils/crypto');
const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        firstname: Joi.string().max(200).presence(presence),
        lastname: Joi.string().max(200).presence(presence),
        password: Joi.string().max(200).presence(presence),
        login: Joi.string().max(200).presence(presence),
        email: Joi.string().email().presence(presence),
        rank: Joi.number().integer().min(1).max(8).presence('optional')
    }).validate(data, { abortEarly: false }).error;
}


const getAll = async (req, res) => {
    const result = await userModel.findAll();
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(500)
    }
    else {
        res.sendStatus(404)
    }
}

const getOne = async (req, res) => {
    const id=req.params.id;
    const result =await  userModel.findOne(id);
    if (result&&result!==-1)
    res.json(result);   
    else if (result===-1){
        res.sendStatus(500)
    }
    else{
        res.sendStatus(404)
    }  
}

const addOne = async (req, res) => {
    const errors = validate(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }

    let { rank } = req.body;
    if (!rank) {
        rank = 1;
    }

    const { password, firstname, lastname, email, login } = req.body;
    let encryptedPassword = await encrypt(password);

    const payload = new User(
        firstname,
        lastname,
        login,
        encryptedPassword,
        rank,
        email
    )
    const result = await userModel.addUser(payload);
    if (result) {
        if(result===-2){
            return res.sendStatus(409);
        }
        res.json(result);
    }
    else {
        res.sendStatus(500)
    }
}

const updateUser = async (req, res) => {
    const errors = validate(req.body,false);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const { password, firstname, lastname, email, login,rank } = req.body;
    let encryptedPassword ='';
    if(password){
        encryptedPassword = await encrypt(password);
    }
    else{
        encryptedPassword=undefined;
    }
    const payload = new User(
        firstname,
        lastname,
        login,
        encryptedPassword,
        rank,
        email,
        id
    )
    const result =await userModel.updateUser(payload);
    if(result&&result!==-1){
        res.sendStatus(204);
    }
    else if(result===-1){
        res.sendStatus(500);
    }
    else {
        res.sendStatus(404)
    }
}

const deleteUser = async (req, res) => {
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const result = await userModel.deleteUser(id);
    if(result&&result!==-1){
        res.sendStatus(204);
    }
    else if(result===-1){
        res.sendStatus(500);
    }
    else {
        res.sendStatus(404)
    }
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateUser,
    deleteUser
}
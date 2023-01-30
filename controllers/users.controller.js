const userModel=require('../models/users.model');
const User=require('../classes/User.class');
const Joi=require('joi');
const {encrypt,compare}=require('../utils/crypto');

const  validate=(data, forCreation = true)=>{
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        firstname : Joi.string().max(200).presence(presence),
        lastname : Joi.string().max(200).presence(presence),
        password : Joi.string().max(200).presence(presence),
        login : Joi.string().max(200).presence(presence),
        email : Joi.string().email().presence(presence),
        rank : Joi.number().integer().min(1).max(8).presence('optional')
    }).validate(data,{abortEarly:false}).error;
}


const getAll=async(req,res)=>{
    const result=userModel;
}

const getOne=async(req,res)=>{
    const result=userModel;
}

const addOne =async(req,res)=>{
    //Check entry
    const errors=validate(req.body);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    let {rank}=req.body;
    if (!rank){
        rank=1;
    }
    const {password,firstname,lastname,email,login}=req.body;

    //BCrypt password !
    let encryptedPassword=await encrypt( password);

    const payload=new User(
        firstname,
        lastname,
        login,
        encryptedPassword,
        rank,
        email
    )
    res.sendStatus(404);
    const result=userModel;
}

const updateUser=async(req,res)=>{
     //Check entry
    const result=userModel;
}

const deleteUser=async(req,res)=>{
     //Check entry
    const result=userModel;

}

module.exports={
    getAll,
    getOne,
    addOne,
    updateUser,
    deleteUser
}
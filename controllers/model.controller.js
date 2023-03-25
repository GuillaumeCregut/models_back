const Model = require('../classes/model.class');
const modelModel = require('../models/model.model');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
        reference: Joi.string().max(200).presence(presence),
        brand: Joi.number().integer().presence(presence),
        builder: Joi.number().integer().presence(presence),
        scale: Joi.number().integer().presence(presence),
        category: Joi.number().integer().presence(presence),
        period: Joi.number().integer().presence(presence),
        scalemates: Joi.string().max(200).presence('optional'),
    }).validate(data, { abortEarly: false }).error;
}

const validateFavorite=(data)=>{
    return Joi.object({
        modelId:Joi.number().min(1).presence('required'),
        owner:Joi.number().min(1).presence('required'),
        like:Joi.boolean().presence('required'),
    }).validate(data, { abortEarly: false }).error; 
}

const validateStock=(data)=>{
    return Joi.object({
        id:Joi.number().min(1).presence('required'),
        owner:Joi.number().min(1).presence('required'),
        newState:Joi.number().min(1).presence('required'),
    }).validate(data, { abortEarly: false }).error; 
}

const getAll = async (req, res) => {
    const result = await modelModel.findAll();
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const getOne = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const id = parseInt(req.params.id);
    const result = await modelModel.findOne(id);
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const addOne = async (req, res) => {
    //See to store picture
    const picture = req?.file?.path;
    const { name, brand, builder, category, period, scale, reference, scalemates } = req.body;
    const errors = validate({ name, brand, builder, category, period, scale, reference, scalemates }, true);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //sanitizing datas
    const brandI = parseInt(brand);
    const builderI = parseInt(builder);
    const categoryI = parseInt(category);
    const periodI = parseInt(period);
    const scaleI = parseInt(scale);
    const newModel = new Model(null, name, brandI, builderI, categoryI, periodI, reference, scaleI);
    if (scalemates) {
        newModel.setLink(scalemates);
    }
    newModel.setPicture(picture);
    const result = await modelModel.addOne(newModel);
    if (result)
        return res.status(201).json(result);
    else
        return res.sendStatus(500);
}

const updateOne = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const id = parseInt(req.params.id);
    //See to store picture
    const picture = req?.file?.path;
    const { name, brand, builder, category, period, scale, reference, scalemates } = req.body;
    const errors = validate({ name, brand, builder, category, period, scale, reference, scalemates },false);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    let brandI = parseInt(brand);
    let builderI = parseInt(builder);
    let categoryI = parseInt(category);
    let periodI = parseInt(period);
    let scaleI = parseInt(scale);
    const oldModel = await modelModel.findOne(id);
    if (!brandI) {
        brandI = oldModel.brand;
    }
    if (!builderI) {
        builderI = oldModel.builder;
    }
    if (!categoryI) {
        categoryI = oldModel.category;
    }
    if (!periodI)
        periodI = oldModel.period;
    if (!scaleI)
        scaleI = oldModel.scale;

    const newModel = new Model(oldModel.id, name, brandI, builderI, categoryI, periodI, reference, scaleI);
    newModel.setLink(scalemates ? scalemates : oldModel.link);
    newModel.setPicture(picture ? picture : oldModel.picture);
    const result = await modelModel.updateOne(newModel);
    if (result && result !== -1) {
        ////Remove old picture
        if (oldModel.picture && oldModel.picture != '' && picture) {
            try {
                const filePath = path.join(__dirname, '..', result);
                fs.unlinkSync(filePath);
            }
            catch (err) {
                //Log le result
                console.error('Erreur de suppression')
            }
        }
        return res.status(200).json(result);
    }
    else if (result === -1) {
        res.sendStatus(500)
    }
    else
        res.sendStatus(404)
}

const deleteOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const result = await modelModel.deleteOne(idNum);
    if (result && result !== -1) {
        if (result) {
            try {
                const filePath = path.join(__dirname, '..', result);
                fs.unlinkSync(filePath);
                return res.sendStatus(204);
            }
            catch (err) {
                return res.status(204).send("Le fichier n'as pu être supprimer")
            }
        }
        else
            return res.sendStatus(204);
    }
    else if (result === -1) {
        res.sendStatus(500)
    }
    else
        res.sendStatus(404)
}

const setFavorite=async(req,res)=>{
    const errors=validateFavorite(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const{owner,modelId,like}=req.body;
    let result=null;
    if(like){
        result= await modelModel.setFavorite(owner,modelId);
    }
    else{
        result= await modelModel.unsetFavorite(owner,modelId);
    }
    if (result && result !== -1) {
       return res.sendStatus(204);
    }
    else if (result === -1) {
       return res.sendStatus(500)
    }
    else
      return  res.sendStatus(404)
    res.sendStatus(200)
}

const getFavorite=async(req,res)=>{
        const id=req.params.id;
        if(isNaN(id)){
            return res.sendStatus(422);
        }
        const userId=parseInt(id);
        const result=await modelModel.getFavorite(userId);
        if(result&&result!==-1)
            return res.json(result);
        else if(result==-1){
            return res.sendStatus(418)
        }
        else
            return res.sendStatus(500)
}

const getStock=async(req,res)=>{
    const id=req.params.id;
    if(isNaN(id)){
        return res.sendStatus(422);
    }
    const userId=parseInt(id);
    const result=await modelModel.getAllKitsUser(userId);
    if(result&&result!==-1)
        return res.json(result)
    else if(result===-1)
        return res.sendStatus(500);
    res.sendStatus(418);
}

const updateStock=async(req,res)=>{
    const errors=validateStock(req.body);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    const {owner,id,newState}=req.body;
    const result=await modelModel.updateStock(id,owner,newState);
    if(result&&result!==-1){
        return res.sendStatus(204);
    }
    else if(result===-1)
        return res.sendStatus(500);
    else
        return res.sendStatus(404);
}

const getAllInfoKit=async(req,res)=>{
    const id=req.params.id;
    if(isNaN(id)){
        return res.sendStatus(422);
    }
    const idKit=parseInt(id);
    const idUser=parseInt(req.params.iduser,10);
    if(idUser!==req.user.user_id){
        return res.sendStatus(401);
    }
    const result=await modelModel.getAllDetailsKit(idKit);
    if(result && result!==-1)
    {
        //Get all images and add them to responses
        return res.json(result);
    }
    else if(result===-1)
        return res.sendStatus(500)
    else return res.sendStatus(418);
}

const getTest=async(req,res)=>{
    const idModel=parseInt(req.params.id,10);
    const idUser=parseInt(req.params.iduser,10);
    console.log(idModel,idUser);
    console.log(req.user);
    if(idUser!==req.user.user_id){
        res.sendStatus(401);
    }
   else res.sendStatus(200);
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
    setFavorite,
    getFavorite,
    getStock,
    updateStock,
    getAllInfoKit,
    getTest,
}
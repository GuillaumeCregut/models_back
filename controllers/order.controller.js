const Order=require('../classes/Order.class');
const orderModel=require('../models/order.model');
const Joi = require('joi');
const { required } = require('joi');

const validate = (data, option=true) => {
    const presence = option ? 'required' : 'optional';
    return Joi.object({
        reference: Joi.string().max(200).presence(presence),
        supplier: Joi.number().integer().presence(presence),
        owner: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const validateList=(data,option=true)=>{
    const presence = option ? 'required' : 'optional';

    const schema=
        Joi.object({
            idModel:Joi.number().integer().required(),
            price : Joi.number().required(),
            qtty:Joi.number().integer().required()
        })
    return Joi.array().items(schema).validate(data).error;
    
    return false;
    // list:Joi.array().items(Joi.number().integer(),required(),Joi.number().integer().required(),Joi.number().required()).presence(presence)
}

const getAll=async(req,res)=>{

}

const getAllUser=async(req,res)=>{

}

const getOne=async(req,res)=>{

}

const addOne=async(req,res)=>{
    //check if datas OK
    const {owner,reference,supplier,list}=req.body;
    const errors=validate({owner,reference,supplier});
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    //check list 
    const errorsList=validateList(list);
    if(errorsList){
        const errorList=errorsList.details[0].message;
        return res.status(422).send(errorList);
    }
    return res.sendStatus(200);
}

const updateOne=async(req,res)=>{

}

const deleteOne=async(req,res)=>{

}

module.exports={
    getOne,
    getAll,
    addOne,
    updateOne,
    deleteOne,
    getAllUser,
}
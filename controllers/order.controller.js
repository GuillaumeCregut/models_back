const Order=require('../classes/Order.class');
const orderModel=require('../models/order.model');
const Joi = require('joi');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        reference: Joi.string().max(200).presence(presence),
        supplier: Joi.number().integer().presence(presence),
        owner: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getAll=async(req,res)=>{

}

const getAllUser=async(req,res)=>{

}

const getOne=async(req,res)=>{

}

const addOne=async(req,res)=>{
    //check if datas OK
    const errors=validate(req.body,true);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
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
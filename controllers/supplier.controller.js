const Supplier=require('../classes/Supplier.class');
const supplierModel=require('../models/supplier.model');
const Joi = require('joi');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getAll=async(req,res)=>{

}

const getOne=async(req,res)=>{
    
}

const getAllUser=async(req,res)=>{
    
}

const getOneUser=async(req,res)=>{
    
}

const addOne=async(req,res)=>{
    
}

const updateOne=async(req,res)=>{
    
}

const deleteOne=async(req,res)=>{
    
}

module.exports={
    getAll,
    getAllUser,
    getOne,
    getOneUser,
    addOne,
    updateOne,
    deleteOne,
}
const periodModel=require('../models/period.model');
const Period=require('../classes/Period.class');
const Joi = require('joi');

const  validate=(data)=>{
    return Joi.object({
        name : Joi.string().max(200).presence('required')
    }).validate(data,{abortEarly:false}).error;
}

const getAll=async(req,res)=>{

}

const getOne=async(req,res)=>{

}

const addOne=async(req,res)=>{

}

const updateOne=async(req,res)=>{

}

const deleteOne=async(req,res)=>{

}

module.exports={
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}
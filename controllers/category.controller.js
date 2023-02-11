const Category=require('../classes/Category.class');
const categoryModel=require('../models/category.model');
const Joi=require('Joi');

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
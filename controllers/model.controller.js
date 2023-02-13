const Model=require('../classes/model.class');
const modelModel=require('../models/model.model');
const Joi=require('joi');

const getAll=async(req,res)=>{
    const result=await modelModel.findAll();
    if(result&&result!==-1){
      return res.json(result)
    }
    else if(result===-1){
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const getOne=async(req,res)=>{
    if(isNaN(req.params.id) ){
        return res.sendStatus(422);
    }
    const id=parseInt(req.params.id);
    const result=await modelModel.findOne(id);
    if(result&&result!==-1){
        return res.json(result)
      }
      else if(result===-1){
          return res.sendStatus(404)
      }
      return res.sendStatus(500);
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
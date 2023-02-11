const Category=require('../classes/Category.class');
const categoryModel=require('../models/category.model');
const Joi=require('Joi');

const  validate=(data)=>{
    return Joi.object({
        name : Joi.string().max(200).presence('required')
    }).validate(data,{abortEarly:false}).error;
}

const getAll=async(req,res)=>{
    const result= await categoryModel.findAll();
    if(result&&result!==-1)
         res.json(result);
    else if (result===-1){
        res.sendStatus(500)
    }
    else{
        res.sendStatus(404)
    }
}

const getOne=async(req,res)=>{
    const id=req.params.id;
    const result= await categoryModel.findOne(id);
    if (result&&result!==-1)
    res.json(result);   
    else if (result===-1){
        res.sendStatus(500)
    }
    else{
        res.sendStatus(404)
    }  
}

const addOne=async(req,res)=>{
    const errors=validate(req.body);
    const {name}=req.body;
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const category=new Category(null,name)
    const result=await categoryModel.addOne(category);
    if(result){
        res.status(201).json(result);
    }
    else
        res.sendStatus(500)
}

const updateOne=async(req,res)=>{
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const errors=validate(req.body);
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const category=new Category(id,req.body.name);
    const result=await categoryModel.updateOne(category);
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

const deleteOne=async(req,res)=>{
    const id=parseInt(req.params.id);
    if(id===0 || isNaN(id)){
        return res.status(422).send('bad Id');
    }
    const result=await categoryModel.deleteOne(id);
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

module.exports={
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}
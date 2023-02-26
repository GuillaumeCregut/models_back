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
    const resultOrder=await orderModel.findAll();
    if(resultOrder&&resultOrder!==-1)
        return res.json(resultOrder);
    else if(resultOrder===-1){
        return res.sendStatus(500);
    }
    else
        return res.status(200).json([]);
}

const getAllUser=async(req,res)=>{
    //Get all orders from one user
    const id=req.params.id;
    if(isNaN(id)){
        return res.sendStatus(422);
    }
    const idUser=parseInt(id);
    const resultOrder=await orderModel.findAllUser(idUser);
    if(resultOrder&&resultOrder!==-1)
        return res.json(resultOrder);
    else if(resultOrder===-1){
        return res.sendStatus(500);
    }
    else
        return res.status(200).json([]);
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
    const order=new Order(supplier,owner,reference);
    list.forEach((item)=>{
        order.addModels(item);
    })
    const result=await orderModel.addOne(order);
    console.log(result)
    if(result&&result>0){
        return res.status(201).json(result);
    }
    else if(result===-1){
        res.sendStatus(409)
    }
    else if(result===-2){
        return res.sendStatus(422);
    }
    else{
        return res.sendStatus(500);
    }
}

const updateOne=async(req,res)=>{

}

const deleteOne=async(req,res)=>{
    id=req.params.id;
    const result=await orderModel.deleteOne(id);
}

module.exports={
    getOne,
    getAll,
    addOne,
    updateOne,
    deleteOne,
    getAllUser,
}
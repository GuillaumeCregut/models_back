const Joi = require('joi');
require('dotenv').config({path:'../.env'});
const jwt = require('jsonwebtoken');
const {findOneByLogin}=require('../models/users.model');
const {compare}=require('../utils/crypto');

const  validate=(data)=>{
    return Joi.object({
        login : Joi.string().max(200).presence('required'),
        password: Joi.string().max(200).presence('required'),
    }).validate(data,{abortEarly:false}).error;
}
const privateKey=process.env.PRIVATE_KEY;
const calculatetoken=(id,rank,firstname,lastname,maxAge)=>{
    return jwt.sign({user_id:id, rank: rank, firstname,lastname},privateKey,{expiresIn:maxAge})
}


const authCheck=async(req,res)=>{
    const{login, password}=req.body;
    const errors=validate({login,password});
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    const result=await  findOneByLogin(login);
    if(!result){
        res.sendStatus(500);
    }
    else if(result.length===0){
        res.sendStatus(404);
    }
    else{
        const user=result[0];
        const isOk=await compare(password,user.password);
        if(!isOk){
            res.sendStatus(401);
        }
        else{
            const maxAge = 1000 * 60 * 60 //1 hour
            const token=await calculatetoken(user.id,user.rank,user.firstname,user.lastname,maxAge);
        }
    }
  
}

module.exports=authCheck;
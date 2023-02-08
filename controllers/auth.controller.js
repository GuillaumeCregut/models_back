const Joi = require('joi');

const {findOneByLogin,setToken,findUserByToken,deleteTokenDb}=require('../models/users.model');
const {compare}=require('../utils/crypto');
const {calculatetoken,maxAgeRefresh, verifyToken}=require('../utils/auth');


const  validate=(data)=>{
    return Joi.object({
        login : Joi.string().max(200).presence('required'),
        password: Joi.string().max(200).presence('required'),
    }).validate(data,{abortEarly:false}).error;
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
            const accessToken=await calculatetoken(user.id,user.rank,user.firstname,user.lastname,'auth');
            const refreshToken=await calculatetoken(user.id,user.rank,user.firstname,user.lastname,'refresh');
            const tokenSetup=await setToken(refreshToken,user.id);
            if(tokenSetup===-1){
                return res.sendStatus(500);
            }
            if (tokenSetup){
                res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:maxAgeRefresh}); //Rajout de samSite et Secure sans test opé.
                return  res.json({accessToken}); 
            }
            else
             return res.sendStatus(404); 
        }
    } 
}

const refreshToken=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken=cookies.jwt;
    const result=await findUserByToken(refreshToken);
    if(!result){
       return res.sendStatus(500);
    }
    else if(result.length===0){
      return  res.sendStatus(403);
    }
    const user=result[0];
    const tokenOk=verifyToken(refreshToken,'refresh')
    if(!tokenOk ||(tokenOk.firstname!==user.firstname ||tokenOk.lastname!==user.lastname))
    {
        console.log('Erreur de token refresh');
        return res.sendStatus(403);
    }
    const accessToken=await calculatetoken(user.id,user.rank,user.firstname,user.lastname,'auth');
    return  res.json({accessToken}); 
}

const deleteToken=async(req,res)=>{
//On client also delete accessToken
console.log('passe')
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
    const refreshToken=cookies.jwt;
    console.log('refresh : ',refreshToken)
    result=await deleteTokenDb(refreshToken);
    if(result===-1){
        return res.sendStatus(500);
    }
    if (result){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true}); //Ajout de semSite et secure sans test opé
        res.cookie('jwt','',{ maxAge: 1, httpOnly:true,sameSite:'Strict', secure:false}); 
        return res.sendStatus(204)
    }
    else{
        return res.sendStatus(404)
    }
}

module.exports={
    authCheck,
    refreshToken,
    deleteToken
};
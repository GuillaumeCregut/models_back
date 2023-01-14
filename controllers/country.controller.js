const countryModel=require('../models/country.model');
const Country=require('../classes/Country.class');
const Joi = require('joi');

const  validate=(data)=>{
    return Joi.object({
        name : Joi.string().max(200).presence('required')
    }).validate(data,{abortEarly:false}).error;
}


const getAll= async (req,res)=>{
    const result= await countryModel.findAll();
    if(result)
         res.json(result);
    else{
        res.sendStatus(404)
    }
}

const getOne=async (req,res)=>{
    const id=req.params.id;
    const result= await countryModel.findOne(id);
    console.log(result)
    if (result)
    res.json(result);   
    else
        res.sendStatus(404);  
}

const addCountry=async(req,res)=>{
    //vérification des valeurs
    const errors=validate(req.body);
    const {name}=req.body;
    if (errors){
        const error=errors.details[0].message;
        return res.status(422).send(error);
    }
    //création de l'objet
    const country=new Country(null,name)
    //on passe l'objet au modele
    const result=await countryModel.addOne(country);
    //On envoie le nouveau élément
    if(result){
        res.json(result);
    }
    else
        res.sendStatus(500)
    
}

const updateCountry=(req,res)=>{

}

const deleteCountry=(req,res)=>{

}
module.exports={
    getAll,
    getOne,
    addCountry,
    updateCountry,
    deleteCountry
}
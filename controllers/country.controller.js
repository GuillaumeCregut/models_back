const countryModel=require('../models/country.model');
const Country=require('../classes/Country.class');
const getAll= async (req,res)=>{
    const result= await countryModel.findAll();
    res.json(result);
}

const getOne=async (req,res)=>{
    const id=req.params.id;
    const result= await countryModel.findOne(id);
    if (result)
    res.json(result);   
    else
        res.sendStatus(404);  
}

const addCountry=(req,res)=>{

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
const { dbquery } = require('../utils/dbutils');
const Order=require('../classes/Order.class');

//get all model for users where
getModelWishes=async(idUser)=>{
    const result=await dbquery('get', 'SELECT id,model FROM model_user WHERE state=4 AND owner=?',[idUser])
    if (result && result !== -1) {

    }
    else return -1;
}

module.exports={
    
}
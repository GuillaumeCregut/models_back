const { dbquery } = require('../utils/dbutils');
const User=require('../classes/User.class');

const addUser=async(user)=>{
    
    const paramsArray=Object.values(user);
    const [id,...params]=paramsArray;
    const dbResult= await dbquery('add','INSERT INTO user (firstname, lastname, login,passwd,rankUser, email) VALUES(?,?,?,?,?,?)',params)
    if (dbResult != -1) {
        user.setId(dbResult);
        return user;
    }
    else {
        return undefined;
    }
}

module.exports={
    addUser
}
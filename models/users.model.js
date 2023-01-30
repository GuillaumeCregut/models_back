const { dbquery } = require('../utils/dbutils');
const User=require('../classes/User.class');

const addUser=async(user)=>{
    
    const paramsArray=Object.values(user);
    const [id,...params]=paramsArray;
    console.log(params)
    const dbResult= await dbquery('add','INSERT INTO user (firstname, lastname, login,passwd,rankUser, email) VALUES(?,?,?,?,?,?)',params)
    if (dbResult != -1) {
        user.setId(dbResult);
        console.log(user)
        return user;
    }
    else {
        console.log('error')
        return undefined;
    }
}

module.exports={
    addUser
}
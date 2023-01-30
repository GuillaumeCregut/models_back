const { dbquery } = require('../utils/dbutils');
const User=require('../classes/User.class');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, email FROM user');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new User(element.firstname,element.lastname,element.login,null,element.rankUser,element.email,element.id);
            return item;
        });
        return resultat;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;

}

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
    addUser,
    findAll,
}
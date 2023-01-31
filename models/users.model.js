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

const findOne=async(id)=>{
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, email FROM user WHERE id=?',[id]);
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

const updateUser=async(user)=>{
    const {id}=user;
    const dbResult = await dbquery('get', 'SELECT firstname,id,lastname,rankUser,login, passwd, email FROM user WHERE id=?',[id]);
    if(dbResult.length>0){
        const {firstname,lastname,login,passwd,rankUser,email}=dbResult[0];
        user.update(firstname,lastname,login,passwd,rankUser,email,id);
        const dbUpdate = await dbquery('update', 'UPDATE user SET firstname=?,lastname=?,rankUser=?,login=?,email=?,passwd=?  WHERE id=?', [
            user.firstname,
            user.lastname,
            user.rank,
            user.login,
            user.email,
            user.password,
             id]);
        return dbUpdate;
    }
    else{
        return 0;
    }

}

const deleteUser=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM user WHERE id=?', [id]);
    return dbResult;
}

module.exports={
    addUser,
    findAll,
    findOne,
    deleteUser,
    updateUser
}
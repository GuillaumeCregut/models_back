const Supplier =require('../classes/Supplier.class');
const { dbquery } = require('../utils/dbutils');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT * FROM provider ORDER BY owner,name');
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Supplier(element.id, element.name,element.owner);
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
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE id=?',id);
    if (dbResult.length>0 && dbResult !== -1) {
        const item=dbResult[0];
        const supplier=new Supplier(item.id,item.name,item.owner)    
        return supplier;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;
}

const findAllUser=async(idUser)=>{
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE owner=? ORDER BY name',[idUser]);
    if (dbResult && dbResult !== -1) {
        const resultat = dbResult.map(element => {
            const item = new Supplier(element.id, element.name,element.owner);
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

const findOneUser=async(idUser,idSupplier)=>{
    const dbResult = await dbquery('get', 'SELECT * FROM provider WHERE id=? AND owner=?',[idSupplier, idUser]);
    if (dbResult.length>0 && dbResult !== -1) {
        const item=dbResult[0];
        const supplier=new Supplier(item.id,item.name,item.owner)    
        return supplier;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;
}

const addOne=async(supplier)=>{
    const dbResult = await dbquery('add', 'INSERT INTO provider (name,owner) VALUES(?,?)', [supplier.name,supplier.owner]);
    if (dbResult != -1) {
       supplier.setId(dbResult);
        return supplier;
    }
    else {
        return undefined;
    }
}

const updateOne=async(supplier)=>{
    const dbResult = await dbquery('update', 'UPDATE provider SET name=?, owner=? WHERE id=?', [supplier.name,supplier.owner ,supplier.id]);
    return dbResult;
}

const deleteOne=async(id)=>{
    const dbResult = await dbquery('delete', 'DELETE FROM provider WHERE id=?', [id]);
    return dbResult;
}

module.exports={
    findAll,
    findAllUser,
    findOne,
    findOneUser,
    addOne,
    updateOne,
    deleteOne,
}
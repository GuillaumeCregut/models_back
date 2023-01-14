const connection=require('../dbconfig');
const Country=require('../classes/Country.class');
const db=connection.promise();

const findAll=  async() =>{
    const dbResult= await dbquery('SELECT * FROM country');
    const resultat=dbResult.map(element => {
        console.log(element)
        const item=new Country(element.id,element.name);
        return item;
    });
    console.log(resultat);
    return resultat;
}

const findOne=async (id)=>{
    const dbResult= await dbquery('SELECT * FROM country WHERE id=?',[id]);
    if(dbResult.length>0){
        country=new Country(dbResult[0].id,dbResult[0].name)
        return dbResult[0];
    }
    else 
        return false;
}

const addOne=async()=>{

}

const updateOne=async ()=>{

}

const deleteOne=async ()=>{

}
const dbquery = (sql,params)=>{
return db.query(sql,params)
    .then(([result])=>result)
    .catch((err)=>{
        console.error(err);
        throw err;
    })
}
module.exports={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}


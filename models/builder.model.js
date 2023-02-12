const { dbquery } = require('../utils/dbutils');
const Builder=require('../classes/Builder.class');

const findAll=async()=>{
    const dbResult = await dbquery('get', 'SELECT builders.name, builders.id, builders.country, country.name as country_name FROM builders INNER JOIN country on builders.country=country.id ORDER BY builders.name');
    if (dbResult && dbResult !== -1) {
        //mise en forme du résultat
        const result=dbResult.map((item)=>{
            const builder=new Builder(item.id, item.name,item.country);
            builder.setCountryName(item.country_name);
            return builder;
        })
        return result;
    }
    else if(dbResult===-1)
    {
        return undefined;
    }
    else
        return -1;
}

const findOne=async(id)=>{

}

const addOne=async(builder)=>{

}

const updateOne=async(builder)=>{

}

const deleteOne=async(id)=>{

}

module.exports ={
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}
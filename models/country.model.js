const Country = require('../classes/Country.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM country');
    if (dbResult) {
        const resultat = dbResult.map(element => {
            const item = new Country(element.id, element.name);
            return item;
        });
        return resultat;
    }
    else {
        console.log('erreur')
        return undefined;
    }

}

const findOne = async (id) => {
    const dbResult = await dbquery('get','SELECT * FROM country WHERE id=?', [id]);
    if (dbResult.length > 0) {
        country = new Country(dbResult[0].id, dbResult[0].name)
        return dbResult[0];
    }
    else
        return false;
}

const addOne = async (country) => {
    const dbResult=await dbquery('add','INSERT INTO country (name) VALUES(?)',[country.name]);
    if(dbResult!=0){
        country.setId(dbResult);
        return country;
    }
    else{
        return undefined;
    }
}

const updateOne = async (country) => {
    const dbResult=await dbquery('update','UPDATE country SET name=? WHERE id=?',[country.name,country.id]);
    return dbResult;
}

const deleteOne = async (id) => {
    const dbResult=await dbquery('delete','DELETE FROM country WHERE id=?',[id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne
}


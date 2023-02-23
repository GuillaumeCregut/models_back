const Model = require('../classes/model.class');
const { dbquery } = require('../utils/dbutils');

const findAll = async () => {
    const dbResult = await dbquery('get', 'SELECT * FROM model_full ORDER BY name');

    if (dbResult && dbResult !== -1) {
        const models = dbResult.map((item) => {
            const newModel = new Model(item.id, item.name, item.brand, item.builder, item.category, item.period, item.reference, item.scale);
            newModel.setBrandName(item.brandname);
            newModel.setBuilderName(item.buildername);
            newModel.setCategoryName(item.categoryname);
            newModel.setPeriodName(item.periodname);
            newModel.setScaleName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
            newModel.setCountryId(item.countryid);
            newModel.setCountryName(item.countryname);
            return newModel;
        });
        return models;
    }
    else if (dbResult === -1) {
        return undefined; //500 error
    }
    else
        return -1;
}

const findOne = async (id) => {
    const dbResult = await dbquery('get', 'SELECT * FROM model_full WHERE id=? ORDER BY name', [id]);
    if (dbResult && dbResult !== -1) {
        if (dbResult.length > 0) {
            const item = dbResult[0];
            const newModel = new Model(item.id, item.name, item.brand, item.builder, item.category, item.period, item.reference, item.scale);
            newModel.setBrandName(item.brandname);
            newModel.setBuilderName(item.buildername);
            newModel.setCategoryName(item.categoryname);
            newModel.setPeriodName(item.periodname);
            newModel.setScaleName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
            newModel.setCountryId(item.countryid);
            newModel.setCountryName(item.countryname);
            return newModel;
        }
        else
            return -1;
    }
    else if (dbResult === -1) {
        return undefined; //500 error
    }
    else
        return -1;

}

const addOne = async (model) => {
    //Prévoir l'ajout d'image
    const result = await dbquery('add', 'INSERT INTO model (builder,category,brand,period,scale,name,reference,scalemates,picture) VALUES (?,?,?,?,?,?,?,?,?)', [
        model.builder, model.category, model.brand, model.period, model.scale, model.name, model.reference, model.link, model.picture
    ])
    if (result != -1) {
        model.setId(result);
        //Getting result in text
        const dbResult = await dbquery('get', 'SELECT * FROM model_full WHERE id=? ORDER BY name', [model.id]);
        const item = dbResult[0];
        model.setBrandName(item.brandname);
        model.setBuilderName(item.buildername);
        model.setCategoryName(item.categoryname);
        model.setPeriodName(item.periodname);
        model.setScaleName(item.scalename);
        model.setPicture(item.picture);
        model.setLink(item.scalemates);
        return model;
    }
    else {
        return undefined;
    }
}

const updateOne = async (model) => {
    const result = await dbquery('update', 'UPDATE model SET builder=?,category=?,brand=?,period=?,scale=?,name=?,reference=?,scalemates=?,picture=? WHERE id=?', [
        model.builder, model.category, model.brand, model.period, model.scale, model.name, model.reference, model.link, model.picture,model.id
    ])
    return result;
}

const deleteOne = async (id) => {
    const old=await findOne(id);
    const dbResult=await dbquery('delete', 'DELETE FROM model WHERE id=?', [id]);
    if (dbResult && dbResult !== -1) {
        if(old.picture)
            return old.picture;
        else
            return dbResult;
    }
    else
        return dbResult
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}
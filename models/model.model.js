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
    if (result &&result !== -1) {
        const newModel=findOne(model.id);
        return newModel;
    }
    else
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

const getFavorite=async(userId)=>{
        const dbResult=await dbquery('get','SELECT id,model as modelId,modelName,brandName,builderName,scaleName FROM model_favorite WHERE owner=?',[userId]);
        if (dbResult && dbResult !== -1) {
            return dbResult;
        }
        else if (dbResult === -1) {
            return undefined; //500 error
        }
        else
            return -1 
}

const setFavorite=async(owner,modelId)=>{
    const dbResult= await dbquery('add','INSERT INTO model_user (state,owner,model) VALUES (4,?,?)',[owner,modelId])
    return dbResult
}

const unsetFavorite=async(owner,modelId)=>{
    const dbResult= await dbquery('delete','DELETE FROM model_user WHERE state=4 AND owner=? AND model=?',[owner,modelId]);
    return dbResult;
}

const getAllKitsUser=async(idUser)=>{
    const dbResult=await dbquery('get','SELECT * FROM mymodels WHERE owner=?',[idUser]);
    return dbResult;
}

const updateStock=async(id,owner,state)=>{
     const dbResult=await dbquery('update','UPDATE model_user SET state=? WHERE id=? AND owner=?',[state,id,owner]);
     return dbResult;
}

const getAllDetailsKit=async(id)=>{
    const dbResult=await dbquery('get','SELECT * FROM all_info_model WHERE id=?',[id]);
    if(dbResult && dbResult!==-1){
        return dbResult[0];
    }
    else 
        return dbResult;
}

const updatePictures=async(filePath,id)=>{
    const dbResult=await dbquery('update', 'UPDATE model_user SET pictures=? WHERE id=?',[filePath,id]);
    return dbResult;
}

const getStateModelState=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, s.name FROM all_info_model ai  INNER JOIN state s on ai.state=s.id WHERE ai.owner=? GROUP BY ai.state;',[id]);
    return dbResult;
}

const getStatModelPeriod=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, periodName as name FROM all_info_model WHERE owner=? GROUP BY periodName;',[id]);
    return dbResult;
}

const getStatModelType=async(id)=>{
    const dbResult=await dbquery('get', 'SELECT count(*) as count, categoryName as name FROM all_info_model WHERE owner=? GROUP BY categoryName;',[id]);
    return dbResult;
}

const getStatModelProvider=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, providerName as name FROM all_info_model WHERE owner=? GROUP BY provider;',[id]);
    return dbResult;
}
const getStatModelScale=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, scaleName as name FROM all_info_model WHERE owner=? GROUP BY scaleName;',[id]);
    return dbResult;
}

const getStatModelPrice=async(id)=>{
    const dbResult=await dbquery('get','SELECT SUM(price) as sum FROM `all_info_model` WHERE owner=?;',[id]);
    return dbResult;
}

const getStatModelBrand=async(id)=>{
    const dbResult=await dbquery('get','SELECT count(*) as count, brandName as name FROM all_info_model WHERE owner=? GROUP BY brandName;',[id]);
    return dbResult;
}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
    getFavorite,
    setFavorite,
    unsetFavorite,
    getAllKitsUser,
    updateStock,
    getAllDetailsKit,
    updatePictures,
    getStateModelState,
    getStatModelPeriod,
    getStatModelType,
    getStatModelProvider,
    getStatModelScale,
    getStatModelPrice,
    getStatModelBrand
}
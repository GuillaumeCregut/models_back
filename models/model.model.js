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
            newModel.setScalName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
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
            newModel.setScalName(item.scalename);
            newModel.setPicture(item.picture);
            newModel.setLink(item.scalemates);
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

}

const updateOne = async (model) => {

}

const deleteOne = async (id) => {

}

module.exports = {
    findAll,
    findOne,
    addOne,
    updateOne,
    deleteOne,
}
const Model = require('../classes/model.class');
const modelModel = require('../models/model.model');
const Joi = require('joi');

const validate = (data, option) => {
    const presence = option ? 'required' : 'optional'
    return Joi.object({
        name: Joi.string().max(200).presence(presence),
        reference: Joi.string().max(200).presence(presence),
        brand: Joi.number().integer().presence(presence),
        builder: Joi.number().integer().presence(presence),
        scale: Joi.number().integer().presence(presence),
        category: Joi.number().integer().presence(presence),
        period: Joi.number().integer().presence(presence),
        scalemates: Joi.string().max(200).presence('optional'),
    }).validate(data, { abortEarly: false }).error;
}

const getAll = async (req, res) => {
    const result = await modelModel.findAll();
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const getOne = async (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(422);
    }
    const id = parseInt(req.params.id);
    const result = await modelModel.findOne(id);
    if (result && result !== -1) {
        return res.json(result)
    }
    else if (result === -1) {
        return res.sendStatus(404)
    }
    return res.sendStatus(500);
}

const addOne = async (req, res) => {
    //See to store picture
    const { name, brand, builder, category, period, scale, reference, scalemates } = req.body;
    const errors = validate({ name, brand, builder, category, period, scale, reference, scalemates }, true);
    if (errors) {
        const error = errors.details[0].message;
        return res.status(422).send(error);
    }
    //sanitizing datas
    const brandI = parseInt(brand);
    const builderI = parseInt(builder);
    const categoryI = parseInt(category);
    const periodI = parseInt(period);
    const scaleI = parseInt(scale);
    const newModel = new Model(null, name, brandI, builderI, categoryI, periodI, reference, scaleI);
    if (scalemates) {
        newModel.setLink(scalemates);
    }
    const result = await modelModel.addOne(newModel);
    if (result)
        return res.status(201).json(result);
    else
        return res.sendStatus(500);
}

const updateOne = async (req, res) => {

}

const deleteOne = async (req, res) => {

}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
}
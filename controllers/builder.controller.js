const Builder = require('../classes/Builder.class');
const builderModel = require('../models/builder.model');
const Joi = require('joi');

const getAll = async (req, res) => {
    const result = await builderModel.findAll();
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(404)
    }
    else {
        res.sendStatus(500)
    }
}

const getOne = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.sendStatus(422);
    }
    const idNum = parseInt(id);
    const result = await builderModel.findOne(idNum);
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(404)
    }
    else {
        res.sendStatus(500)
    }
}

const addOne = async (req, res) => {

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
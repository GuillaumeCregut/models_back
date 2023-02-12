const Builder = require('../classes/Builder.class');
const builderModel = require('../models/builder.model');
const Joi = require('joi');

const getAll = async (req, res) => {
    const result = await builderModel.findAll();
    if (result && result !== -1)
        res.json(result);
    else if (result === -1) {
        res.sendStatus(500)
    }
    else {
        res.sendStatus(404)
    }
}

const getOne = async (req, res) => {

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
const { dbquery } = require('../utils/dbutils');
const connection = require('../dbconfig');
const Order = require('../classes/Order.class');
const supplierModel=require('./supplier.model');

const connectionPromise = connection.promise();
//User defined exception
class MyError extends Error{
    constructor(value){
        super(`L'Error ${value} thrown`);
        this.errno=value;
    }
}

//get all model for users where
getModelWishes = async (idUser) => {
    const result = await dbquery('get', 'SELECT id,model FROM model_user WHERE state=4 AND owner=?', [idUser])
    if (result && result !== -1) {
        return result;
    }
    else return -1;
}

const changWishes = async (wish, model, order) => {
    const { providerId } = order;
    const { price } = model;
    let qtty = model.qtty - 1;
    //On modifie la ligne en BDD
    connectionPromise.execute('UPDATE model_user SET price=?, provider=? state=5 WEHRE id=?', [price, providerId, wish.id])
    //(providerId,price,5,wish.id)
    if (qtty > 0) {
        while (qtty > 0) {
            const addResult = await addModelToUser(model, order)
            qtty--;
        }

    }
    return [wish.id, qtty];
}

const addModelToUser = async (model, order) => {
    
}

const addOne = async (order) => {
    const wishes = await getModelWishes(order.ownerId);
    await connectionPromise.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await connectionPromise.beginTransaction();
    try {
        //Create Order in DB
        await connectionPromise.execute("INSERT INTO orders (owner,provider,reference) VALUES(?,?,?)",[order.ownerId,order.providerId,order.reference])
        //check models
        const { models } = order;
        try {
            for (let i = 0; i < models.length; i++) {
                const model=models[i];
                //Insertion de la commande
                await connectionPromise
                    .execute('INSERT INTO model_order (model_id,order_id,price,qtte) VALUES (?,?,?,?)',[model.idModel,order.reference,model.price,model.qtty])
                const index = wishes.findIndex((wish) => wish.model === model.idModel);
                if (index > -1) {
                    const wish=wishes[index];
                    await connectionPromise
                        .execute('UPDATE model_user SET price=?, provider=?, state=5 WHERE id=?', [model.price, order.providerId, wish.id])
                    if(model.qtty>1){
                        let qtty = model.qtty-1;
                        while(qtty>0){
                            await connectionPromise
                            .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                            qtty--;
                        }
                    }
                }
                else{
                    let qtty = model.qtty;
                    while(qtty>0){
                        await connectionPromise
                        .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                    qtty--;
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
            throw new MyError(err.errno)
        }
        await connectionPromise.commit();
        const supplier=await supplierModel.findOne(order.providerId);
        order.setProviderName(supplier.name)
        return order;
    }
    catch (err) {
        console.error(err);
        connectionPromise.rollback();
        if(err.errno===1062)
             return -1;
        if(err.errno===1452)
            return -2;
        else
            return undefined;
    }
}

module.exports = {
addOne,
}
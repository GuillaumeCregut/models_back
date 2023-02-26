const { dbquery } = require('../utils/dbutils');
const connection = require('../dbconfig');
const Order = require('../classes/Order.class');

const connectionPromise = connection.promise();
//get all model for users where
getModelWishes = async (idUser) => {
    const result = await dbquery('get', 'SELECT id,model FROM model_user WHERE state=4 AND owner=?', [idUser])
    if (result && result !== -1) {
        return result;
    }
    else return -1;
}

const changWishes = async (wish, model, order) => {
    console.log(order)
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
    console.log('on ajoute')
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
            console.log('Catch 1')
            throw new Error("Le modèle n'existe pas")
        }
        try{
            //Create order user
        }
        catch(err){

        }
        await connectionPromise.commit();
    }
    catch (err) {
        console.log('catch final', err);
        connectionPromise.rollback();
        return -1;
    }
}
        /*
models.forEach(async (model) => {
try {
    const index = wishes.findIndex((wish) => wish.model === model.idModel);
    if (index > -1) {
        //Wish exists
        const wish = wishes[index];
        try {
            await connectionPromise
                .execute('UPDATE model_user SET price=?, provider=?, state=5 WHERE id=?', [model.price, order.providerId, wish.id])
                .catch((err) => {
                    connectionPromise.rollback();
                    return -1;
                })
        }
        catch (err) {
            connectionPromise.rollback();
            return -1;
        }
        if (model.qtty > 1) {
            let qtty = model.qtty;
            while (qtty > 1) {
                try {
                    await connectionPromise
                        .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                        .catch((err) => {
                            connectionPromise.rollback();
                            return -1;
                        })
                    qtty--;
                }
                catch (err) {
                    connectionPromise.rollback();
                    return -1;
                }
            }
        }
    }
    else {
        let qtty = model.qtty;
        while (qtty > 0) {
            try {
                await connectionPromise
                    .execute('INSERT INTO model_user (price,model,owner,provider,state) VALUES (?,?,?,?,5)', [model.price, model.idModel, order.ownerId, order.providerId])
                qtty--;
            }
            catch (err) {
                console.log('point 1')
               break;
            }
        }
    }
    //Create line in model_order
    //const orderItem=await 
}
catch (err) {
    //throw new Error("Le modèle n'existe pas")
    console.log('catch', err);
    connectionPromise.rollback();
    return -1
}
})
}

catch (err) {
//throw new Error("Le modèle n'existe pas 2")
return -1;
}


await connectionPromise.commit();
}
catch (err) {
console.log('catch', err);
connectionPromise.rollback();
return -1;
}
}
*/
module.exports = {
addOne,
}
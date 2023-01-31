const {  logError } =require('../utils/logEvent');

const errorHandler=(err,req,res,next)=>{
    logError(err.message);
    res.status(500).send(err.message);
}

module.exports=errorHandler;
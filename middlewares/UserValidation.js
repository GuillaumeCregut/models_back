const {verifyToken}=require('../utils/auth');

const userCheck=(req,res,next)=>{
   // For later.
    // const authHeader=req.headers['authorization'];
    // to be relaced by
    const authHeader=req.headers.authorization || req.headers.Authorization;
    if(!authHeader){ 
        return res.sendStatus(401);
    }
    const token=authHeader.split(' ')[1];
    const isOK=verifyToken(token,'access');
    if(!isOK)
        return res.sendStatus(403);
    req.user=isOK;
    next();
}

const checkLevel=(req,res,next)=>{
    next();
}

const idChecker=(req,res,next)=>{
    if(isNaN(req.params.id))
        return res.sendStatus(422);
    next();
}

module.exports={
    userCheck,
    checkLevel,
    idChecker,
}
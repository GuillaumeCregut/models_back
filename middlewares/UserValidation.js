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
    console.log(req.user)
    next();
}

const checkLevel=(req,res,next)=>{
    next();
}

module.exports={
    userCheck,
    checkLevel
}
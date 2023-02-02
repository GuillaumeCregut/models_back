const {verifyToken}=require('../utils/auth');

const userCheck=(req,res,next)=>{
   // For later.
    // const authHeader=req.headers['authorization'];
    // if(!authHeader){ 
    //     return res.sendStatus(401);
    // }
    // const token=authHeader.split(' ')[1];
    // const isOK=verifyToken(token,'access');
    // console.log(isOK)
    // if(!isOK)
    //     return res.sendStatus(403);
    // req.user=isOK;
    next();
}

const checkLevel=(req,res,next)=>{
    next();
}

module.exports={
    userCheck,
    checkLevel
}
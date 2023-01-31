const { logWarning } =require('../utils/logEvent');

const logger=async(req,res,next)=>{
    const ip=req.socket.remoteAddress;
    await logWarning(`l'adresse IP ${ip} a tenter de se connecter à une mauvaise route avec la méthode ${req.method}`);
    next();
}

module.exports=logger;

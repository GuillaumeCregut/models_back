const router=require('express').Router();
const {logger}=require('../middlewares/loggerMiddleware');
const country=require('./country.routes');
const brand=require('./brand.routes');
const users=require('./users.routes');
const auth=require('./auth.routes');
const refresAuth=require('./refreshauth.routes')
const logout=require('./logout.routes');
/*Used routes */
router.use('/country',country);
router.use('/brand',brand);
router.use('/users/',users);
router.use('/auth',auth);
router.use('/refresh',refresAuth);
router.use('/logout',logout);

const defaultReply=(req,res)=>{
    res.status(404);
    res.send('Please read documentation')
}

router.get('/',logger,defaultReply);
router.get('/:id',logger,defaultReply);
router.post('/',logger,defaultReply);
router.put('/:id',logger,defaultReply);
router.delete('/:id',logger,defaultReply);

module.exports=router;
const router=require('express').Router();
const {logger}=require('../middlewares/loggerMiddleware');
const auth=require('./auth.routes');
const logout=require('./logout.routes');
const refresAuth=require('./refreshauth.routes');
const brand=require('./brand.routes');
const category=require('./category.route');
const country=require('./country.routes');
const period=require('./period.routes');
const scale=require('./scale.router');
const state=require('./state.route');
const users=require('./users.routes');

/*Specific routes*/
router.use('/auth',auth);
router.use('/logout',logout);
router.use('/refresh',refresAuth);

/* Routes*/
router.use('/brand',brand);
router.use('/country',country);
router.use('/category',category);
router.use('/period',period);
router.use('/scale',scale);
router.use('/state',state);
router.use('/users',users);


/* Default routes */
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
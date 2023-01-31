const router=require('express').Router();
const {logger}=require('../middlewares/loggerMiddleware');
const country=require('./country.routes');
const users=require('./users.routes');

/*Used routes */
router.use('/country',country);
router.use('/users/',users);

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
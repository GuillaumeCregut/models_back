const router=require('express').Router();
const country=require('./country.routes');
const users=require('./users.routes');

/*Used routes */
router.use('/country',country);
router.use('/users/',users);

const defaultReply=(req,res)=>{
    res.status(404);
    res.send('Please read documentation')
}

/*Default reply routes */
router.get('/',defaultReply);
router.get('/:id',defaultReply);
router.post('/',defaultReply);
router.put('/:id',defaultReply);
router.delete('/:id',defaultReply);

module.exports=router;
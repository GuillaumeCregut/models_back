const router=require('express').Router();
const country=require('./country.routes');

<<<<<<< HEAD
router.use('/country',country);

=======
>>>>>>> dev
const defaultReply=(req,res)=>{
    res.status(404);
    res.send('Please read documentation')
}

router.get('/',defaultReply);
router.get('/:id',defaultReply);
router.post('/',defaultReply);
router.put('/:id',defaultReply);
router.delete('/:id',defaultReply);

module.exports=router;
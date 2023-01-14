const router=require('express').Router();
const country=require('./country.routes');

router.use('/country',country);

module.exports=router;
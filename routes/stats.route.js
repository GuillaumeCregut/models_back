const router=require('express').Router();
const statsController=require('../controllers/stats.controller');
const {userCheck}=require('../middlewares/UserValidation');

//router.get('/:id',userCheck,statsController.doStats);
router.get('/:id',statsController.doStats);

module.exports=router;
const router=require('express').Router();
const {userCheck}=require('../middlewares/UserValidation');

router.get('/');
router.get('/:id');
router.post('/',userCheck);
router.put('/:id',userCheck);
router.delete('/id',userCheck)

module.exports=router;

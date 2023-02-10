const router=require('express').Router();
const {userCheck}=require('../middlewares/UserValidation');
const periodController=require('../controllers/period.controller');

router.get('/',periodController.getAll);
router.get('/:id',periodController.getOne);
router.post('/',userCheck,periodController.addOne);
router.put('/:id',userCheck,periodController.updateOne);
router.delete('/:id',userCheck,periodController.deleteOne)

module.exports=router;

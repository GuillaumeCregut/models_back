const router=require('express').Router();
const scaleController=require('../controllers/scale.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',scaleController.getAll);
router.get('/:id',scaleController.getOne);
router.post('/',userCheck,scaleController.addOne);
router.put('/:id',userCheck,scaleController.updateOne);
router.delete('/:id',userCheck,scaleController.deleteOne);

module.exports=router;
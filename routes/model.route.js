const router=require('express').Router();
const modelController=require('../controllers/model.controller');
const {userCheck}=require('../middlewares/UserValidation');
router.get('/',modelController.getAll);
router.get('/:id',modelController.getOne);
router.post('/',userCheck,modelController.addOne);
router.put('/:id',userCheck,modelController.updateOne);
router.delete('/:id',userCheck,modelController.deleteOne);

module.exports=router;
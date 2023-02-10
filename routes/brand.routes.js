const router =require('express').Router();
const brandController=require('../controllers/brand.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',brandController.getAll);
router.get('/:id',brandController.getOne);
router.post('/',userCheck,brandController.addOne);
router.put('/:id',userCheck,brandController.updateOne);
router.delete('/:id',userCheck,brandController.deleteOne);

module.exports=router;
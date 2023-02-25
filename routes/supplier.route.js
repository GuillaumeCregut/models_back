const router=require('express').Router();
const supplierController=require('../controllers/supplier.controller');
const {userCheck}=require('../middlewares/UserValidation');

//toutes les routes sont à protéger
router.get('/',supplierController.getAll);
router.get('/user/:id',supplierController.getUser)
router.get('/:id',supplierController.getOne)
router.post('/',supplierController.addOne);
router.put('/:id',supplierController.updateOne);
router.delete('/:id',supplierController.deleteOne);

module.exports=router;
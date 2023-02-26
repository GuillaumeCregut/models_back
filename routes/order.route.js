const router=require('express').Router();
const orderController=require('../controllers/order.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',orderController.getAll);
router.get('/user/:id',orderController.getAllUser)
router.get('/:id',orderController.getOne)

router.post('/',orderController.addOne);

router.put('/:id',orderController.updateOne);
router.delete('/:id',orderController.deleteOne)

module.exports=router;
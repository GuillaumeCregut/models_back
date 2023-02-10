const router =require('express').Router();
const brandController=require('../controllers/brand.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',brandController.getAll);
router.get('/:id',brandController.getOne);
router.post('/',brandController.addOne);
router.put('/:id',brandController.updateOne);
router.delete('/:id',brandController.deleteOne);

module.exports=router;
const router=require('express').Router();
const modelController=require('../controllers/model.controller');
const {userCheck}=require('../middlewares/UserValidation');
router.get('/',modelController.getAll);
router.get('/:id',modelController.getOne);
router.post('/',modelController.addOne);
router.put('/:id',modelController.updateOne);
router.delete('/:id',modelController.deleteOne);

module.exports=router;
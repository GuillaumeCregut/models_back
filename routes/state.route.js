const router=require('express').Router();
const stateController=require('../controllers/state.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',stateController.getAll);
router.get('/:id',stateController.getOne);
router.post('/',userCheck,stateController.addOne);
router.put('/:id',userCheck,stateController.updateOne);
router.delete('/:id',userCheck,stateController.deleteOne);

module.exports=router;
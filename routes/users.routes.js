const router=require('express').Router();
const {userCheck}=require('../middlewares/UserValidation');
const usersController=require('../controllers/users.controller')

router.get('/',userCheck,usersController.getAll);
router.get('/:id',userCheck,usersController.getOne);
router.post('/',usersController.addOne);
router.post('/model',usersController.addModelStock);
router.put('/:id',userCheck,usersController.updateUser);
router.delete('/:id',userCheck,usersController.deleteUser);

module.exports=router;
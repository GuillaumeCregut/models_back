const router=require('express').Router();
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const usersController=require('../controllers/users.controller');
const {createSubUpload}=require('../utils/fs');

createSubUpload('users');

router.get('/',userCheck,checkLevel,usersController.getAll);
router.get('/:id',userCheck,usersController.getOne);
router.post('/',usersController.addOne);
router.post('/model',usersController.addModelStock);
router.put('/:id',userCheck,usersController.updateUser);
router.delete('/:id',userCheck,usersController.deleteUser);

module.exports=router;
const router=require('express').Router();
const {userCheck}=require('../middlewares/UserValidation');
const UsersController=require('../controllers/users.controller')

router.get('/',userCheck,UsersController.getAll);
router.get('/:id',userCheck,UsersController.getOne);
router.post('/',UsersController.addOne);
router.post('/reload/',UsersController.reloadUser);
router.put('/:id',userCheck,UsersController.updateUser);
router.delete('/:id',userCheck,UsersController.deleteUser);

module.exports=router;
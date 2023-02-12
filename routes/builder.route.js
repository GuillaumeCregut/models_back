const router=require('express').Router();
const builderController=require('../controllers/builder.controller');
const {userCheck}=require('../middlewares/UserValidation');

router.get('/',builderController.getAll);
router.get('/:id',builderController.getOne);
router.post('/',builderController.addOne);
router.put('/:id',builderController.updateOne);
router.delete('/:id',builderController.deleteOne);

module.exports =router;
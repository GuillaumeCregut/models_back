const router=require('express').Router();
const modelController=require('../controllers/model.controller');
const {userCheck}=require('../middlewares/UserValidation');
const multer = require('multer');
const {createSubUpload}=require('../utils/fs');

createSubUpload('models');

const storagePicture = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/models/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
);

const uploadPicture=multer({storage:storagePicture});

router.get('/',modelController.getAll);
router.get('/:id',modelController.getOne);
router.post('/',uploadPicture.single('file'),modelController.addOne);
router.put('/:id',uploadPicture.single('file'),modelController.updateOne);
router.delete('/:id',modelController.deleteOne);

module.exports=router;
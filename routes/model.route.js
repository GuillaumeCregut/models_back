const router=require('express').Router();
const modelController=require('../controllers/model.controller');
const {userCheck}=require('../middlewares/UserValidation');
const multer = require('multer');
const {createSubUpload}=require('../utils/fs');
const fs = require('fs');
const path = require('path');

createSubUpload('models');

const errorHandler = (error, req, res, next) => {
    if (error) {
        console.error(error);
        const filePath = { path: null };
        req.file = filePath;
    }
    next();
}

const IdChecker=(req,res,next)=>{
    if(isNaN(req.params.id))
        return res.sendStatus(422);
    next();
}

const pre=(req,res,next)=>{
    req.user={user_id:5};
    next();
}

const storageUserPictures=multer.diskStorage(
    {
        destination: function (req, file, cb) {
            const userFolderId=req.user.user_id;
            const model=req.params.id;
            const userFolder = `assets/uploads/users/${userFolderId}/${model}`;
            const pathFolder=path.join(__dirname,'..',userFolder);
            fs.mkdirSync(pathFolder, { recursive: true })
            req.filePath=userFolder;
            cb(null, userFolder)
        },
        filename: function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                let ext = '.png';
                if (file.mimetype === 'image/jpeg')
                    ext = '.jpg';
                const filename = file.originalname.slice(0, -4).replace(/[^a-zA-Z0-9]/g, '') + ext;
                req.fileOk=true;
                cb(null, filename)
            }
            else{
                return cb(new Error('File not good'));
            }                
        }
    }
)

const storagePicture = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'assets/uploads/models/')
        },
        filename: function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                let ext = '.png';
                if (file.mimetype === 'image/jpeg')
                    ext = '.jpg';
                const filename = file.originalname.slice(0, -4).replace(/[^a-zA-Z0-9]/g, '') + ext;
                cb(null, filename)
            }
            else{
                return cb(new Error('File not good'));
            }                
        }
    }
);


const uploadPictureUser=multer({storage:storageUserPictures});

const uploadPicture=multer({storage:storagePicture});

router.get('/',modelController.getAll);
router.get('/user/:id',modelController.getStock); //Controler l'utilisateur
router.get('/favorite/:id',modelController.getFavorite); //Controler l'utilisateur
router.get('/info/:id/user/:iduser',userCheck,modelController.getAllInfoKit);
router.get('/:id',modelController.getOne);
router.post('/',uploadPicture.single('file'),errorHandler,modelController.addOne);
router.post('/favorite',modelController.setFavorite);
router.post('/user/picture/:id',userCheck,IdChecker,uploadPictureUser.array('file',6),errorHandler,modelController.addUserPictures); 
router.delete('/user/picture/:id',pre,modelController.deleteUserPicture);
router.put('/stock',modelController.updateStock); //Controler l'utilisateur
router.put('/:id',userCheck,uploadPicture.single('file'),errorHandler,modelController.updateOne); //Controler l'utilisateur
router.delete('/:id',userCheck,modelController.deleteOne);

module.exports=router;
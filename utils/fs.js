const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const createUpload = async () => {
    if (!fs.existsSync(path.join(__dirname, '..', 'uploads'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'uploads'));
    }
}

const createSubUpload= async (dir)=>{
    if (!fs.existsSync(path.join(__dirname, '..', 'uploads',dir))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'uploads',dir));
    }
}
module.exports={
    createUpload,
    createSubUpload,
}
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const createUpload = async () => {
    if (!fs.existsSync(path.join(__dirname, '..', 'uploads'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'uploads'));
    }
}

module.exports={createUpload}
const path = require('path');
const {logsType}=require('../utils/common');
const getWarnings = async (req, res) => {
    if (isNaN(req.params.id))
        res.sendStatus(422);
    const id = parseInt(req.params.id,10);
    let filename='';
    switch(id){
        case logsType.info : filename='infos.txt';
            break;
        case logsType.warnings: filename='warnings.txt';
            break;
        case logsType.error: filename='errors.txt';
            break;
        default:filename='';
    }
    if (filename!==''){
        const pathFile = path.join(__dirname, '..', 'assets', 'logs', filename);
        res.sendFile( pathFile, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:',  pathFile);
    
            }
        });
    }
    else{
        res.sendStatus(404);
    }
}



module.exports = {
    getWarnings,
}
const {format}=require('date-fns');
const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path');

const logInfo=async (message)=>{
    const newDate=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    const logItem=`${newDate}\t${message}\n`;
    try{
        if (!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs','infos.txt'),logItem)
    } catch (err) {
        console.log(err)
    }
    }

module.exports={
    logInfo,
}
const path = require('path');
const multer = require('multer');
const model = require('../schema');


const publicPath = path.join(__dirname, '..' , 'public');
const uploadFilePath = path.join(publicPath, '..' , 'public' ,'Files','Material');


let upload = multer({
    storage:multer.diskStorage({
        destination : function (req,file,cb){
            cb(null,uploadFilePath)
        },
        filename : function(req,file,cb){
            cb(null,file.originalname)
        }
    })
}).single("file");

const UploadFile = async(rep,res)=>{ 

    
    try{

        let saveFileInfo = new model[3]( { fileName : rep.file.filename , path : rep.file.path } );
        await saveFileInfo.save();

        res.send('<h1>upload successfully</h1>');

    }
    catch(err){
        res.send('<h1>Try 1 More Time ' + err + ' </h1>');
    }
}




module.exports = { upload, UploadFile };

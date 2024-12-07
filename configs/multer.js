const multer = require('multer');
const path = require('path');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const fs = require('fs')

const uploadDir = path.join(__dirname, '..', 'assets', 'images', 'blogs');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Multer Storage
const storage = multer.diskStorage({

    
    destination:function(req,file,cb){
        cb(null,uploadDir)
    },
    filename:function(req,file,cb){
        crypto.randomBytes(12,function(err,bytes){
            const fn = bytes.toString("hex") + path.extname(file.originalname);
            cb(null,fn)
        })
    }
})

const upload = multer({storage:storage})

module.exports = upload;
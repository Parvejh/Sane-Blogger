const multer = require('multer');
const path = require('path');
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
            if(err){
                return cb(error);
            }
            const fn = bytes.toString("hex") + path.extname(file.originalname).toLowerCase();
            cb(null,fn)
        })
    }
})

const fileFilter = (req, file, cb) => {
  const ok = /image\/(png|jpeg|jpg|webp|gif)/.test(file.mimetype);
  cb(ok ? null : new Error('Only image uploads are allowed'), ok);
};

const upload = multer({storage,fileFilter,limits:{fileSize:3*1024*1024}})

module.exports = upload;
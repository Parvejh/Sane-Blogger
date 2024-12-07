const mongoose = require('mongoose');
// User Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
},{
    timestamps:true
});


// blogSchema.statics.uploadedImage = multer({storage:storage}).single('image');

const User = mongoose.model("User",userSchema);

module.exports = User;
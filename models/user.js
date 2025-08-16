const mongoose = require('mongoose');
// User Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        default:false
    }
},{
    timestamps:true
});


// blogSchema.statics.uploadedImage = multer({storage:storage}).single('image');

const User = mongoose.model("User",userSchema);

module.exports = User;
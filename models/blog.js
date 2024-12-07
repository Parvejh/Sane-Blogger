const mongoose = require('mongoose');
// Blog Schema
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:"Anonymous"
    },
    image:{
        type:String,
    }
},{
    timestamps:true
});


// blogSchema.statics.uploadedImage = multer({storage:storage}).single('image');

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;
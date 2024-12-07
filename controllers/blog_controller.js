const Blog = require("../models/blog")

module.exports.blogPage = async function(req,res){
    try{
        const blog = await Blog.findById(req.params.id);
        return res.render('blogPage',{title:'Blog | Sane Blogger',blog});
    }catch(err){
        if(err){
            console.log(`Erron in blog Page : ${err}`)
            return res.redirect('back');
        }
    }
}
const Blog = require("../models/blog")
const sanitizeHtml = require('sanitize-html');

const VIEW_SANITIZE = {
    allowedTags: [
        'p','br','b','strong','i','em','u','blockquote','code','pre',
        'h1','h2','h3','h4','h5','h6','ul','ol','li','a','img'
    ],
    allowedAttributes: { 
        a: ['href','target','rel'], 
        img: ['src','alt','title'] },
    allowedSchemes: ['http','https','data'],
};

module.exports.blogPage = async function(req,res){
    try{
        const blog = await Blog.findById(req.params.id).lean();
        if(!blog) return res.redirect('/')
        const raw = blog.content || blog.content.trim();
        console.log("BLOG CONTENT: " ,raw)
        const html = sanitizeHtml(raw,VIEW_SANITIZE);
        return res.render('blogPage',{
            title: blog.title ? `${blog.title} | Sane Blogger` : 'Blog | Sane Blogger',
            blog,
            html
        });
    }catch(err){
        if(err){
            console.log(`Erron in blog Page : ${err}`)
            return res.redirect('back');
        }
    }
}
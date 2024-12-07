const Subscriber = require("../models/subscriber");
const addSubscriber = require("../models/subscriber");
const Blog = require('../models/blog');
const sanitizeHtml = require('sanitize-html');

module.exports.home = async function(req,res){
    try{
        //Get the blog list
        const blogs = await Blog.find().lean();

        // Sanitize each blog
        const cleanBlogs = blogs.map(blog => ({
            ...blog, // Keep other properties intact
            content: sanitizeHtml(blog.content, {
                allowedTags: ['b', 'i'], // Allow only <b> and <i> tags
                allowedAttributes: {}   // Disallow all attributes
            })
        }));
        console.log(cleanBlogs)
        //send the blogs as blogs
        return res.render('home.ejs',{cleanBlogs,title:"Home | Sane Blogger",message:req.flash('success')});
        // return res.render("admin_blogs",{blogs,title:"Blogs List | Sane Blogger",layout:'admin_layout'});
    }catch(err){
        if(err){
            console.log(`Error in getting the blog list : ${err}`);
            return res.redirect('back');
        }
    }
}

module.exports.addSub = async function(req,res){
    try{
        if(req.isAuthenticated()){
            console.log("Must be a reader to subscriber!!");
            return res.redirect('/');
        }
        const subscriber = await Subscriber.findOne({email:req.body.email});
        if(!subscriber){
            const newSubscriber = await Subscriber.create(req.body);
            console.log(`Subscriber added, email : ${newSubscriber.email}`);
        }
        else{
            console.log(`Subscriber already exist!`);
        }
        return res.redirect('back');        
    }catch(error){
        if(error){
            console.log(`Error in subscribing : ${error}`);
            return res.redirect('back');
        }
    }
}
const Subscriber = require("../models/subscriber");
// const addSubscriber = require("../models/subscriber");
const Blog = require('../models/blog');
const sanitizeHtml = require('sanitize-html');

const LIST_SANITIZE = {
    allowedTags: ['p','br','b','strong','i','em','ul','ol','li','code'],
    allowedAttributes: {}
};

function escapeRegExp(str = '') {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports.home = async function(req,res){
    try{
        // Read category from query string; default = 'All'
        const rawCategory = (req.query.category || req.query.c || 'All').trim();
        const currentCategory = rawCategory || 'All';

        // Build filter (case-insensitive exact match) unless 'All'
        const filter = {};
        if (currentCategory.toLowerCase() !== 'all') {
            filter.category = new RegExp(`^${escapeRegExp(currentCategory)}$`, 'i');
        }
        //Get the blog list
        const blogs = await Blog.find().sort({createdAt:-1}).lean();

        // Sanitize each blog
        const cleanBlogs = blogs.map(blog => {
            const clean = sanitizeHtml(blog.content,LIST_SANITIZE);
            // simple excerpt
            const excerpt = clean.replace(/<[^>]+>/g, '').slice(0, 220);
            return {...blog,excerpt}
        });

            // Optionally derive categories dynamically from DB (unique, sorted)
        const allCatsAgg = await Blog.aggregate([
            { $group: { _id: { $toLower: '$category' }, first: { $first: '$category' } } }
        ]);
        const categories = ['All', ...allCatsAgg.map(c => c.first)].filter(Boolean);


        //send the blogs as blogs
        return res.render('home.ejs',{cleanBlogs,
            title:"Home | Sane Blogger",currentCategory,
            categories,
        });
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
            console.log("Must be a reader to subscribe!!");
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
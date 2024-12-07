const User = require('../models/user')
const Subscriber = require('../models/subscriber')
const Blog = require('../models/blog');
const sanitizeHtml = require('sanitize-html');


module.exports.homePage = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.redirect('/user/signIn');
}
module.exports.signInPage = function(req,res){
    if(req.isAuthenticated()){
        console.log("user signed in")
        return res.redirect('/');
    }
    return res.render('user_signin.ejs',{title:"Sign In | Sane Blogger"});
}
//action to sign in the user
module.exports.createSession = async function(req,res){
    req.flash('success',"Logged In successfully!!");
    return res.redirect('/');
}
module.exports.adminPage = function(req,res){
    return res.render("admin",{title:"Admin Panel | Sane Blogger",layout:"admin_layout"})
}
module.exports.blogList = async function(req,res){
    try{
        //Get the blog list
        const blogs = await Blog.find();
        //send the blogs as blogs
        return res.render("admin_blogs",{blogs,title:"Blogs List | Sane Blogger",layout:'admin_layout'});
    }catch(err){
        if(err){
            console.log(`Error in getting the blog list : ${err}`);
            return res.redirect('back');
        }
    }
}

module.exports.createBlog = async function(req,res){
    try{
        const newBlog = await Blog.create({
            title:req.body.title,
            content:req.body.content,
            category:req.body.category,
            image:`blogs/${req.file.filename}`,
            author:req.user.name
        })
        return res.redirect('back');
    }catch(err){
        if(err){
            console.log(`Error in creating the blog : ${err}`);
            return res.redirect('back');
        }
    }
}
module.exports.deleteBlog = async function(req,res){
    try{
        await Blog.findByIdAndDelete(req.params.id)
        return res.redirect('back');
    }catch(err){
        if(err){
            console.log(`Error in deleting the blog : ${err}`);
            return res.redirect('back');
        }
    }
}


module.exports.subscriptions = async function(req,res){
    try{
        const subscribers = await Subscriber.find();
        return res.render("admin_subs",{title:"Subscriptions | Sane Blogger",subscribers:subscribers,layout:'admin_layout'});
    }catch(err){
        if(err){
            console.log(`Error in getting subscriptions : ${err}`);
            return res.redirect('back');
        }
    }
}
module.exports.deleteSubscriber = async function(req,res){
    try{
        const subscriber = await Subscriber.findByIdAndDelete(req.params.subId);
        return res.redirect('back');
    }catch(err){
        if(err){
            console.log(`Error in deleting subscriber : ${err}`);
            return res.redirect('back');
        }
    }
}
module.exports.signOut = function(req,res){
    if(req.isAuthenticated()){
        req.logout(function(err){
            if(err){
                console.log(`Error in logging out: ${err}`);
                return res.redirect('back');
            }
            return res.redirect('/')
        });
    }
}
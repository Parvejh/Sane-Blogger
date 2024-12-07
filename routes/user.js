const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller")
const passport = require('../configs/passport-local-strategy')

const upload = require('../configs/multer');

router.get('/',userController.homePage);
router.get('/signIn',userController.signInPage);
router.post('/createSession',passport.authenticate('local',{
    failureRedirect:"back"
}) ,userController.createSession);

router.get('/admin',passport.checkAuthentication,userController.adminPage);
router.get('/admin/blogList',passport.checkAuthentication,userController.blogList);
router.get('/admin/subscriptions',passport.checkAuthentication,userController.subscriptions);
router.get('/admin/deletesubscriber/:subId',passport.checkAuthentication,userController.deleteSubscriber);
router.post('/admin/createBlog',upload.single('image'),userController.createBlog);
router.get('/admin/deleteBlog/:id',passport.checkAuthentication,userController.deleteBlog);

router.get('/signOut',passport.checkAuthentication, userController.signOut);

module.exports = router;
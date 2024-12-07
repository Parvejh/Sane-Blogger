const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

router.use('/user',require('./user'));

router.get('/',homeController.home);
router.post('/addSubscriber',homeController.addSub);
router.use('/blog',require('./blog'));
module.exports = router;
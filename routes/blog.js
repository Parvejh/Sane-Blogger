const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog_controller')

router.get('/:id',blogController.blogPage);


module.exports = router;
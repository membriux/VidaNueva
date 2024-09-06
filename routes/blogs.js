var express = require('express');
var router = express.Router();

// Route to render the blog page
router.get('/', function(req, res, next) {
  res.render('blog', { title: 'Blog Page' });
});

module.exports = router;

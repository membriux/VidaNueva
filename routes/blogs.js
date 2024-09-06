var express = require('express');
var router = express.Router();
const Parse = require('parse/node');

router.get('/', async function(req, res, next) {
  const Blog = Parse.Object.extend('Blog');
  const query = new Parse.Query(Blog);

  // Fetch all blog entries
  const results = await query.find();

  // Extract the relevant fields for each blog post
  const blogs = results.map(blogPost => ({
    title: blogPost.get('Title'),
    subtitle: blogPost.get('Subtitle'),
    description: blogPost.get('Description'),
    imageUrl: blogPost.get('Title_image')
  }));

  // Log the blogs array for debugging
  console.log('Blogs:', blogs);

  // Render the blog page and pass the blogs array to the view
  res.render('blog', { title: 'Blog Page', blogs: blogs });
});


module.exports = router;

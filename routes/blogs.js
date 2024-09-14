var express = require('express');
var router = express.Router();
const Parse = require('parse/node');
const { marked } = require('marked'); // Correct import

// Fetch all blog entries and render the blog list
router.get('/', async function(req, res, next) {
  const Blog = Parse.Object.extend('Blog');
  const query = new Parse.Query(Blog);

  // Fetch all blog entries from Back4App
  const results = await query.find();

  // Map each result to a blog object
  const blogs = results.map((blogPost, index) => ({
    id: blogPost.id || index + 1, // Use Back4App id if available, otherwise generate one
    title: blogPost.get('Title'),
    subtitle: blogPost.get('Subtitle'),
    description: blogPost.get('Description'),
    imageUrl: blogPost.get('Title_image') || blogPost.get('MediaUrl'), // Use imageUrl consistently
    content: blogPost.get('Content') // Assume markdown content is stored in 'Content' field
  }));

  // Log the blogs for debugging
  console.log('Blogs:', blogs);

  // Render the blog page and pass the blogs array to the view
  res.render('blog', { title: 'Blog Page', blogs: blogs });
});

// Route for blog details page
router.get('/:blog_id', async function(req, res) {
  const blogId = req.params.blog_id;
  const Blog = Parse.Object.extend('Blog');
  const query = new Parse.Query(Blog);

  try {
    // Find the blog post by its ID
    const blogPost = await query.get(blogId);

    if (blogPost) {
      // Log raw markdown content
      console.log('Raw Markdown Content:', blogPost.get('Content'));

      // Parse markdown content into HTML
      const contentHtml = marked(blogPost.get('Content') || '');

      // Log parsed HTML content
      console.log('Parsed HTML Content:', contentHtml);

      // Render the blog details page (now using blog_details.jade)
      res.render('familia/blog_details', {
        title: blogPost.get('Title'),
        content: contentHtml,
        subtitle: blogPost.get('Subtitle'),
        description: blogPost.get('Description')
      });
    } else {
      res.status(404).send('Blog post not found');
    }
  } catch (err) {
    // Log error for debugging
    console.error('Error fetching blog post:', err.message);
    console.error('Stack trace:', err.stack); // Print full stack trace
    res.status(500).send('Error fetching blog post');
  }
});

module.exports = router;

const postService = require('../services/postService');

exports.createPost = async (req, res) => {
  try {
    const newPost = await postService.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.update(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New method to retrieve all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getThreeBlogs = async (req, res) => {
  try {
    const blogs = await postService.getThreeBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getPostById = async (req, res) => {
  try {
    const post = await postService.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await postService.delete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getTopBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const topBlogs = await postService.getTopBlogsByCategory(category);
    res.status(200).json(topBlogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.searchPosts = async (req, res) => {
  const { title } = req.query;
  
  if (!title) {
    return res.status(400).json({ message: 'Title query parameter is required' });
  }

  try {
    const posts = await postService.searchPostsByTitle(title);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const posts = await postService.getPostsByCategory(category);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const Post = require('../models/postModel'); 

exports.create = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

exports.update = async (id, updateData) => {
  return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

// New method to find all posts
exports.findAll = async () => {
  return await Post.find(); 
};
exports.getThreeBlogs = async () => {
  return await Post.find()
  .limit(6)
  .select('title category date image ');
};

exports.findById = async (id) => {
  return await Post.findById(id);
};
exports.delete = async (postId) => {
  const deletedPost = await Post.findByIdAndDelete(postId);
  return deletedPost;
};
exports.getTopBlogsByCategory = async (category) => {
  try {
    return await Post.find({ category })
      .limit(10)
      .select('title _id'); // Select only title and _id
  } catch (error) {
    throw new Error('Error retrieving top blogs by category: ' + error.message);
  }
};
exports.searchPostsByTitle = async (title) => {
  try {
    // Use a case-insensitive search with regex
    const posts = await Post.find({
      title: { $regex: new RegExp(title, 'i') }
    });
    return posts;
  } catch (error) {
    throw new Error('Error fetching posts: ' + error.message);
  }
};
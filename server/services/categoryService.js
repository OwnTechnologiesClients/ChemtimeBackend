const Category = require('../models/Category');

const getAllCategories = async () => {
  return await Category.find({});
};

const createCategory = async (name) => {
  const newCategory = new Category({ name });
  return await newCategory.save();
};

module.exports = {
  getAllCategories,
  createCategory,
};

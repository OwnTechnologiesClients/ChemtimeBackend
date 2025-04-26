const Category = require('../models/Category');

const getAllCategories = async () => {
  return await Category.find({});
};

const createCategory = async (name) => {
  const newCategory = new Category({ name });
  return await newCategory.save();
};

const updateCategory = async (id, name) => {
  return await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

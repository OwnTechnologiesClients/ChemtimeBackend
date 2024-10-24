const Scholarship = require('../models/scholarship');

// Get all scholarships
const getAllScholarships = async () => {
  return await Scholarship.find();
};

// Get scholarship by ID
const getScholarshipById = async (id) => {
  return await Scholarship.findById(id);
};

// Add a new scholarship
const addScholarship = async (scholarshipData) => {
  const scholarship = new Scholarship(scholarshipData);
  return await scholarship.save();
};

// Update a scholarship by ID
const updateScholarship = async (id, updatedData) => {
  return await Scholarship.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a scholarship by ID
const deleteScholarship = async (id) => {
  return await Scholarship.findByIdAndDelete(id);
};

module.exports = {
  getAllScholarships,
  getScholarshipById,
  addScholarship,
  updateScholarship,
  deleteScholarship,
};

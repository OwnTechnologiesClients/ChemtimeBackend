const express = require('express');
const Scholarship = require('../models/scholarshipModel'); // Adjust the path as necessary
const router = express.Router();

// Create a new scholarship
router.post('/create', async (req, res) => {
  const { title, description, eligibility, category, link, deadline } = req.body;

  try {
    const newScholarship = new Scholarship({
      title,
      description,
      eligibility,
      category,
      link,
      deadline,
    });

    await newScholarship.save();
    res.status(201).json({ message: 'Scholarship created successfully!', scholarship: newScholarship });
  } catch (error) {
    console.error('Error creating scholarship:', error);
    res.status(400).json({ message: 'Failed to create scholarship', error: error.message });
  }
});

// Retrieve all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error retrieving scholarships:', error);
    res.status(500).json({ message: 'Failed to retrieve scholarships', error: error.message });
  }
});

// Retrieve a single scholarship by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const scholarship = await Scholarship.findById(id);
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.status(200).json(scholarship);
  } catch (error) {
    console.error('Error retrieving scholarship:', error);
    res.status(500).json({ message: 'Failed to retrieve scholarship', error: error.message });
  }
});

// Update a scholarship by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, eligibility, category, link, deadline } = req.body;

  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(id, {
      title,
      description,
      eligibility,
      category,
      link,
      deadline,
    }, { new: true }); // Return the updated document

    if (!updatedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.status(200).json({ message: 'Scholarship updated successfully!', scholarship: updatedScholarship });
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(400).json({ message: 'Failed to update scholarship', error: error.message });
  }
});

// Delete a scholarship by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(id);
    
    if (!deletedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    res.status(200).json({ message: 'Scholarship deleted successfully!' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ message: 'Failed to delete scholarship', error: error.message });
  }
});

module.exports = router;

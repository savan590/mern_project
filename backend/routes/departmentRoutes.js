// departmentRoutes.js
const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Create department
router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department' });
  }
});

// Update department
router.put('/departments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department' });
  }
});

// Delete department
router.delete('/departments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department' });
  }
});

module.exports = router;

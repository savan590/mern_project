const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const authenticate = require('../middleware/requireAuth');

router.get('/alldepartments',authenticate, async (req, res) => {
    try {
      const departments = await Department.find();
      res.send(departments);
    } catch (err) {
      res.status(500).send(err);
    }
});

router.post('/departments', authenticate,async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department' });
  }
});

router.put('/departments/:id',authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department' });
  }
});

router.delete('/departments/:id',authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department' });
  }
});

module.exports = router;

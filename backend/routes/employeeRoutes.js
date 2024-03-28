
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const authrequire = require('../middleware/requireAuth');

router.get('/employees/:id', async (req, res) => {
    const e_id = req.params.id;
    const employees = await Employee.find(emp => emp.id == e_id).populate('department');
    if (employees) {
        res.status(200).json(employees);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

router.post('/employees', async (req, res) => {
    try {
        const { name, location, departmentId } = req.body;
        const newEmployee = new Employee({ name, location, department: departmentId });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee' });
    }
});

router.put('/employees/:id', authrequire, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, location }, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee' });
    }
});

router.delete('/employees/:id', authrequire, async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
});

router.get('/filter/location', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ location: 1 });
        res.send(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/locations/asc', async (req, res) => {
    try {
        const locations = await Employee.distinct('location').sort({ location: 1 });
        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/filter/name/:sortOrder', async (req, res) => {
    const { sortOrder } = req.params;
    try {
        let employees;
        if (sortOrder === 'asc') {
            employees = await Employee.find().sort({ name: 1 });
        } else if (sortOrder === 'desc') {
            employees = await Employee.find().sort({ name: -1 });
        } else {
            return res.status(400).json({ error: 'Invalid sortOrder' });
        }
        res.json(employees);
    } catch (error) {
        console.error('Error sorting employees by name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

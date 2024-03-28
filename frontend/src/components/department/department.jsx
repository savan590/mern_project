import React, { useState } from 'react';
import api from '../../services/api';
import './department.css'

const DepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/departments', { name: departmentName });
    } catch (error) {
      console.error('Error creating department:', error);
      
    }
  };

  return (
    <div className='department-form'>
      <h2>Create Department</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={departmentName} onChange={handleInputChange} placeholder="Department Name" />
        <br></br>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default DepartmentForm;

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './list.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await api.get('/employee/employeeslist');
        setEmployees(res.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
    fetchEmployees();
  }, []);

  return (
    <div className='employee-list'>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

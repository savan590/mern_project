import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; 
import './details.css'

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await api.get(`/employee/employees/${id}`);
        setEmployee(res.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className='employee-details'>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Location: {employee.location}</p>
    </div>
  );
};

export default EmployeeDetails;

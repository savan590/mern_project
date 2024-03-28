import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import './signup.css'

function Signup()  {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', formData);
      console.log('Signup success:', res.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='signup'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className='signup_form'>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
        <select name="role" onChange={handleInputChange}>
          <option value="">Select Role</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select><br></br>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

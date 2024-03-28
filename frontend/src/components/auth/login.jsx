import React, { useState } from 'react';
import api from '../../services/api';
import './login.css'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      console.log('Login success:', res.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} /><br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

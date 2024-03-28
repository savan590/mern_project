import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import './App.css'
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import DepartmentForm from './components/department/department';
import EmployeeList from './components/employee/employeelist';
import EmployeeDetails from './components/employee/employee_details';
import FilterForm from './components/filters/filter';

function App() {
  return (
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Signup/>} />
          <Route path="/departments" element={<DepartmentForm/>} />
          <Route path="/employees" exact element={<EmployeeList/>} />
          <Route path="/employees/:id" element={<EmployeeDetails/>} />
          <Route path="/filter" element={<FilterForm/>} />
    </Routes>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './filter.css';

const FilterForm = () => {
    const [locations, setLocations] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchLocationsAsc();
    }, []);

    const fetchLocationsAsc = async () => {
        try {
            const res = await api.get('/locations/asc');
            setLocations(res.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };
    const handleLocationClick = () => {
        fetchLocationsAsc();
    }

    const handleSortOrderChange = async (order) => {
        setSortOrder(order);
        try {
            const res = await api.get(`/filter/name/${order}`);
            setSortedEmployees(res.data);
        } catch (error) {
            console.error('Error sorting employees:', error);
        }
    };

    return (
        <div className="filter-form">
            <h2>Filter Employees</h2>
            <div>
                <h3>Sort by location</h3>
                <button onClick={handleLocationClick}>Location</button>
                <ul>
                    {locations.map((employee) => (
                        <li key={employee._id}>{employee.location}</li>
                    ))}
                </ul>
                <h3>Sort by Name:</h3>
                <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul>
                {sortedEmployees.map((employee) => (
                    <li key={employee._id}>{employee.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FilterForm;

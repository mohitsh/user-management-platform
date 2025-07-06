import React from 'react';
import React, { useState } from 'react';
import './App.css';

const App = () => {

  const mockUsers = [
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "company": "BlackRock",
      "jobTitle": "Financial Analyst"
    },
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174001",
      "name": "Jane",
      "surname": "Smith",
      "email": "jane.smith@example.com",
      "company": "Vanguard",
      "jobTitle": "Portfolio Manager"
    },
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174002",
      "name": "Alice",
      "surname": "Johnson",
      "email": "alice.johnson@example.com",
      "company": "Morgan Stanley",
      "jobTitle": "Investment Strategist"
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    company: '',
    jobTitle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted: ', formData);
    // clear form
    setFormData({
      name: '',
      surname: '',
      email: '',
      company: '',
      jobTitle: ''
    });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

return (
    <div className="App">
      <h1>User Management - Now with a form!</h1>
      
      <div style={{display: 'flex', gap: '20px'}}>
        {/* Left side - Table */}
        <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
          <h2>Users</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{border: '1px solid #ddd', padding: '8px'}}>Name</th>
                <th style={{border: '1px solid #ddd', padding: '8px'}}>Email</th>
                <th style={{border: '1px solid #ddd', padding: '8px'}}>Company</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.uuid}>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>{user.name} {user.surname}</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>{user.email}</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>{user.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right side - Form */}
        <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleChange}
                style={{width: '100%', padding: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                name="surname" 
                placeholder="Surname" 
                value={formData.surname}
                onChange={handleChange}
                style={{width: '100%', padding: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                style={{width: '100%', padding: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                name="company" 
                placeholder="Company" 
                value={formData.company}
                onChange={handleChange}
                style={{width: '100%', padding: '5px'}}
              />
            </div>
            <div style={{marginBottom: '10px'}}>
              <input 
                type="text" 
                name="jobTitle" 
                placeholder="Job Title" 
                value={formData.jobTitle}
                onChange={handleChange}
                style={{width: '100%', padding: '5px'}}
              />
            </div>
            <button type="submit" style={{padding: '10px 20px'}}>Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

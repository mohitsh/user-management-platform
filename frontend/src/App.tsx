import React from 'react';
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

  return (
    <div className="content">
      <h1>User Management</h1>
      <p>View, Add, Update user list.</p>

      <div style={{ display: 'flex', gap: '20px' }}>

        {/* left side simple table */}

        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
              </tr>
            </thead>

            <tbody>
              {mockUsers.map(user => (
                <tr key= {user.uuid}>
                  <td>{user.name} {user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* right side : form */}
        <div style={{flex: 1, border: '1px solid #ccc', padding: '10px'}}>
          <h2>Add User</h2>
          <p>Form coming next...</p>
        </div>
      </div>
    </div>
  );
};

export default App;

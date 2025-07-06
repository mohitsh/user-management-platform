import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    company: '',
    jobTitle: ''
  });

  // fetch() to get data;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Trying to fetch users...');
        const response = await fetch('http://127.0.0.1:8000/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Got users:', data);
        setUsers(data.users);
        setError('');
      } catch (err) {
        console.log('Fetch failed: ', err);
        setError('Backend connection failed.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted: ', formData);

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.status}`);
      }

      const newUser = await response.json();
      console.log('Created user: ', newUser);

      // add to user list immediately
      setUsers(prev => [...prev, newUser.user]);

      // clear form
      setFormData({ name: '', surname: '', email: '', company: '', jobTitle: '' });
    } catch (err) {
      console.error('Failed to create user: ', err);
      alert('Failed to create user!');
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>User Management - testing backend conn</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left side - Table */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
          <h2>Users from backend</h2>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && users.length == 0 && <p>No users found</p>}

          {!loading && !error && users.length > 0 &&
            (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.uuid}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name} {user.surname}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>

        {/* Right side - Form */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                style={{ width: '100%', padding: '5px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px' }}>Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

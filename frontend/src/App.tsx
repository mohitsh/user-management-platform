import React, { useEffect, useState } from 'react';
import './App.css';
import { userService } from './services/userService';
import { validateUserForm } from './utils/formValidation';

const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<any>({});

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
        setLoading(true);
        setError('');
        const usersData = await userService.getUsers();
        setUsers(usersData);
      } catch (err: any) {
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
    console.log('editing mode: ', editingUser ? 'update' : 'create'); // see post or put 

    // validate first 
    const validation = validateUserForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      console.log('Form validation failed');
      return;
    }

    try {
      if (editingUser) {
        // PUT request
        const updatedUser = await userService.updateUser(editingUser.uuid, formData);
        console.log('Updated user:', updatedUser);

        // update the user in the list
        setUsers(prev => prev.map(u =>
          u.uuid === editingUser.uuid ? updatedUser : u
        ));

        // clear editing state
        setEditingUser(null);

        // clear form data
        setFormData({ name: '', surname: '', email: '', company: '', jobTitle: '' });
      }
      else {
        const newUser = await userService.createUser(formData);
        console.log('Created user: ', newUser);

        // add to user list immediately  
        setUsers(prev => [...prev, newUser]);

        // clear form
        setFormData({ name: '', surname: '', email: '', company: '', jobTitle: '' });
      }


    } catch (err) {
      console.error('Failed to create user: ', err);
      alert('Failed to create user!');
    }
  };


  const handleEdit = (user: any) => {
    console.log('Editing user: ', user);
    setEditingUser(user);

    // populate form with user data
    setFormData({
      name: user.name,
      surname: user.surname,
      email: user.email,
      company: user.company,
      jobTitle: user.jobTitle
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };


  return (
    <div className="App">
      <h1>User Management - testing backend conn</h1>

      <div className="app-container">
        {/* left side: table */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', overflowX: 'auto', width: '100%' }}>
          <h2>Users from backend</h2>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && users.length == 0 && <p>No users found</p>}

          {!loading && !error && users.length > 0 &&
            (
              <div className="table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}
                  role='table'
                  aria-label='Users data table'
                >
                  <thead>
                    <tr role='row'>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }} role='columnheader'>Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }} role='columnheader'>Email</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }} role='columnheader'>Company</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px' }} role='columnheader'>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.uuid} role='row'>
                        <td role='cell' style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name} {user.surname}</td>
                        <td role='cell' style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                        <td role='cell' style={{ border: '1px solid #ddd', padding: '8px' }}>{user.company}</td>
                        <td role='cell' style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <button
                            onClick={() => handleEdit(user)}
                            aria-label={`Edit user ${user.name} ${user.surname}`}
                            style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>

        {/* Right side - Form */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
          <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={handleSubmit} role='form' aria-label='User information form' >
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='name' className='visually-hidden'>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                aria-required='true'
                aria-describedby={formErrors.name ? 'name-error' : undefined}
                style={{ width: '100%', padding: '5px', border: formErrors.name ? '2px solid red' : '1px solid #ccc' }}
              />
              {formErrors.name && <div style={{ color: 'red', fontSize: '12px' }}>{formErrors.name}</div>}

            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='surname' className='visually-hidden'>Surname</label>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                aria-required='true'
                style={{ width: '100%', padding: '5px', border: formErrors.surname ? '2px solid red' : '1px solid #ccc' }}
              />
              {formErrors.surname && <div style={{ color: 'red', fontSize: '12px' }}>{formErrors.surname}</div>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='email' className='visually-hidden'>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                aria-required='true'
                style={{ width: '100%', padding: '5px', border: formErrors.email ? '2px solid red' : '1px solid #ccc' }}
              />
              {formErrors.email && <div style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</div>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='company' className='visually-hidden'>Company</label>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                aria-required='true'
                style={{ width: '100%', padding: '5px', border: formErrors.company ? '2px solid red' : '1px solid #ccc' }}
              />
              {formErrors.company && <div style={{ color: 'red', fontSize: '12px' }}>{formErrors.company}</div>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='jobTitle' className='visually-hidden'>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                aria-required='true'
                style={{ width: '100%', padding: '5px', border: formErrors.jobTitle ? '2px solid red' : '1px solid #ccc' }}
              />
              {formErrors.jobTitle && <div style={{ color: 'red', fontSize: '12px' }}>{formErrors.jobTitle}</div>}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit"
                aria-label={editingUser ? `Update user ${editingUser.name}` : 'Add new user'}
                style={{ padding: '10px 20px' }}>
                {editingUser ? 'Update User' : 'Add User'}
              </button>

              {editingUser && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingUser(null);
                    setFormData({ name: '', surname: '', email: '', company: '', jobTitle: '' });
                    setFormErrors({});
                  }}
                  aria-label="Cancel editing"
                  style={{ padding: '10px 20px', backgroundColor: '#ccc' }}
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default App;

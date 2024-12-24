import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PasswordInput from '../components/PasswordInput';
import "./UserDashboard.css"
import { ADD_USER_BY_ADMIN, DELETE_USER, GET_ALL_USERS, UPDATE_USER } from '../constants/apiEndpoints';
import { BASE_URL } from '../constants/config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const options = [
    { value:'verified', label: 'Verified' },
    { value:'unverified', label: 'Unverified' },
    {value:'rejected', label:'Rejected'}
  ]

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GET_ALL_USERS);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users,"users")

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_USER(id));
      alert('User deleted successfully.');
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  // Handle save user (update)
  const handleSave = async (id) => {
    try {
      const updatedUser = users.find(user => user.id === id);
      await axios.put(UPDATE_USER(id), updatedUser);
      alert('User updated successfully.');
      setEditingUser(null);
    } catch (err) {
      alert('Failed to update user.');
    }
  };

  // Handle input change for editing
  const handleInputChange = (id, field, value) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  // Handle new user addition
  const handleAddUser = async (newUser) => {
    console.log(newUser,"newUser")
    try {
      const response = await axios.post(ADD_USER_BY_ADMIN, newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
      setShowForm(false);
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user.');
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 h-full bg-white overflow-y-auto no-scrollbar">
      <div className="block right-0 top-20 fixed">
                    <button
                       onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700"
                    >
                       {showForm ? 'Cancel' : 'Add New User'}
                    </button>
                </div>
     
      <h2 className="text-3xl font-bold top-25 text-center mb-6">User Management</h2>

      
      

      {/* New User Form */}
      {showForm && (
        <div className=" flex justify-center mb-10">
          <form
            className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
            onSubmit={async (e) => {
              e.preventDefault();
              const newUser = {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                dob: e.target.dob.value,
                phone: e.target.phone.value,
              };
              await handleAddUser(newUser);
            }}
          >
            <h2 className="text-2xl font-semibold text-center mb-6">Add New User</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="username"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="email"
              required
            />
            <input
              type="text"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="password"
              required
            />
            <input
              type="date"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Date of Birth"
              name="dob"
              required
            />
            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Phone Number"
              name="phone"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
            >
              Add User
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            
            <th className="px-2 py-2 text-left text-sm">Name</th>
            <th className="px-2 py-2 text-left text-sm">Email</th>
            <th className="px-2 py-2 text-left text-sm">Aadhar</th>
            <th className="px-2 py-2 text-left text-sm">PAN</th>
            <th className="px-2 py-2 text-left text-sm">KYC Status</th>
            <th className="px-2 py-2 text-left texts-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="text-black text-sm">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              
              <td className="px-2 py-2">
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => handleInputChange(user.id, 'username', e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="px-2 py-2">
                {editingUser === user.id ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-2 py-2">
                
                  <img src={`${BASE_URL}/uploads/${user.aadhar}`} alt="Aadhar" className="w-8 h-8 rounded-full" />
              
              </td>
              <td className="px-2 py-2">
                
                  <img src={`${BASE_URL}/uploads/${user.pan}`} alt="PAN" className="w-8 h-8 rounded-full" />
              
              </td>
              <td className="px-2 py-2">
                {editingUser === user.id ? (
                  //while editting it should show a dropdown of kyc status
                  <select
                    value={user.kycstatus}
                    onChange={(e) => handleInputChange(user.id, 'kycstatus', parseInt(e.target.value))}
                  >
                    <option value="0">Not Verified</option>
                    <option value="1">Verified</option>
                    <option value="2">Rejected</option>
                  </select>
                ) : (
                  user.kycstatus === 1 ? "Verified" : "Not Verified"
                )}
              </td>
                    

              <td className="px-2 py-2 flex gap-2">
                {editingUser === user.id ? (
                  <button
                    className="px-1 py-1 bg-green-500 text-white rounded"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="px-1 py-1 bg-blue-500 text-white rounded"
                    onClick={() => setEditingUser(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="px-1 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ):(
        <div>
          No User Available
        </div>
      )}
      
    </div>
  );
};

export default Users;

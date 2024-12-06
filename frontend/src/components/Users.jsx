import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/allusers');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6  h-full" style={{ backgroundColor: `rgba(21, 49, 32, 255)` }}>
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody className='text-black'>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">User</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

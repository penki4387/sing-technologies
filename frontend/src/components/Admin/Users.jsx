import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADD_USER_BY_ADMIN, DELETE_USER, GET_ALL_USERS, UPDATE_USER } from "../../constants/apiEndpoints";
import { BASE_URL } from "../../constants/config";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(GET_ALL_USERS);
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_USER(id));
      alert("User deleted successfully.");
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  // Handle save user (update)
  const handleSave = async (id) => {
    try {
      const updatedUser = users.find((user) => user.id === id);
      await axios.put(UPDATE_USER(id), updatedUser);
      alert("User updated successfully.");
      setEditingUser(null);
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  // Handle input change for editing
  const handleInputChange = (id, field, value) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, [field]: value } : user)));
  };

  // Handle new user addition
  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post(ADD_USER_BY_ADMIN, newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
      setShowForm(false);
      alert("User created successfully!");
    } catch (err) {
      alert("Failed to create user.");
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">User Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {/* New User Form */}
      {showForm && (
        <div className="flex justify-center mb-6">
          <form
            className="w-full max-w-md bg-white p-4 sm:p-6 rounded-lg shadow-md"
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
            <h3 className="text-lg font-semibold mb-4 text-center">Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              name="username"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              name="email"
              required
            />
            <input
              type="text"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              name="password"
              required
            />
            <input
              type="date"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              name="dob"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
              name="phone"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add User
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Name</th>
                <th className="px-4 py-2 text-left text-sm">Email</th>
                <th className="px-4 py-2 text-left text-sm">Aadhar</th>
                <th className="px-4 py-2 text-left text-sm">PAN</th>
                <th className="px-4 py-2 text-left text-sm">KYC Status</th>
                <th className="px-4 py-2 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } text-sm`}
                >
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`${BASE_URL}/uploads/${user.aadhar}`}
                      alt="Aadhar"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={`${BASE_URL}/uploads/${user.pan}`}
                      alt="PAN"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {user.kycstatus === 1 ? "Verified" : "Not Verified"}
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-6">No Users Available</div>
      )}
    </div>
  );
};

export default Users;

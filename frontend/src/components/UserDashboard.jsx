import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  //Get the details of the user logged in from the local storage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    alert('You have been logged out.');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
     

      {/* Content */}
      <main className="flex-1 container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Hello, {user}!</h2>
        <p className="text-gray-700 mb-6">
          Welcome to your dashboard. Here, you can explore the features and manage your account.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">
              View and update your personal information and settings.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Go to Profile
            </button>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-gray-600">Check your latest messages and notifications.</p>
            <button
              onClick={() => navigate('/messages')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              View Messages
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">Update your preferences and configure your account.</p>
            <button
              onClick={() => navigate('/settings')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Go to Settings
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
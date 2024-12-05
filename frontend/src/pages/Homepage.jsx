import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from "../components/UserDashboard";

const Homepage = () => {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [selectedGame, setSelectedGame] = useState(null); // Tracks the selected game type
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate;

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <div><UserDashboard /></div>;
      case 'games':
        if (selectedGame === 'gameTypeA') {
          return <div>Game Type A Content</div>;
        } else if (selectedGame === 'gameTypeB') {
          return <div>Game Type B Content</div>;
        } else {
          return <div><UserDashboard /></div>;
        }
      case 'bankAccounts':
        return <div>Bank Accounts Page</div>;
      case 'settings':
        return <div>Settings Page</div>;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64  text-white flex flex-col" style={{backgroundColor:"rgba(21,49,32,255)"}}>
        <h2 className="text-xl font-bold py-4 px-6 bg-black ">User Dashboard</h2>
        <nav className="flex-1">
          <ul>
            <li>
              <button
                onClick={() => setActiveComponent('dashboard')}
                className="w-full text-left py-3 px-6 hover:bg-gray-700"
              >
                Dashboard
              </button>
            </li>
            <li
              className="relative group"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <button
                onClick={() => setActiveComponent('games')}
                className="w-full text-left py-3 px-6 hover:bg-gray-700"
              >
                Games
              </button>
              {/* Dropdown Menu */}
              {hovered && (
                <ul
                  className="absolute top-1/3 left-1/3 bg-gray-600 text-white shadow-md rounded w-1/2 z-10"
                  style={{
                    marginLeft: '10px', // Adds spacing to the right of the "Games" button
                    whiteSpace: 'nowrap', // Prevents wrapping of dropdown content
                  }}
                >
                  <li>
                    <button
                      onClick={() => {
                        setSelectedGame('gameTypeA');
                        setHovered(false); // Hide the menu after selection
                      }}
                      className="block w-full text-center py-1 px-4 "
                    >
                      Color Games
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSelectedGame('gameTypeB');
                        setHovered(false); // Hide the menu after selection
                      }}
                      className="block w-full text-center py-1 px-4 "
                    >
                      Normal Games
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('settings')}
                className="w-full text-left py-3 px-6 hover:bg-gray-700"
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveComponent('bankAccounts')}
                className="w-full text-left py-3 px-6 hover:bg-gray-700"
              >
                Bank Accounts
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {renderComponent()}
      </main>
    </div>
  );
};

export default Homepage;

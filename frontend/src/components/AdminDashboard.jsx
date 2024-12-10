import React, { useState } from 'react';
import Users from './Users';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import Games from './Games';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [hoverSidebarElement, setHoverSidebarElement] = useState(null);
    const navigate = useNavigate
  const renderComponent = () => {
    switch (activeComponent) {
      case 'users':
        return <Users />;
      case 'settings':
        return <div>Settings Page</div>;
      case 'reports':
        return <div>Reports Page</div>;
      case 'games':
        return <Games/>;
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64  text-white flex flex-col mt-20 " style={{ backgroundColor: `rgba(41, 69, 52, 255)` }}>
      <h2 className="text-xl font-bold py-4 px-6 my-2 mx-4" style={{ backgroundColor: `rgba(51, 79, 62, 255)` }}>User Dashboard </h2>
    <nav className="flex-1">
      <ul
      className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0"
      style={{ backgroundColor: `rgba(51, 79, 62, 255)` }}
      >
        <li>
          <button
            onClick={() => setActiveComponent('users')}
            className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "users"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("users")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Users
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('settings')}
            className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "settings"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("settings")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('reports')}
            className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "reports"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("reports")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Reports
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('games')}
            className="w-full text-center py-3 px-6"
            style={{
              backgroundColor:
                hoverSidebarElement === "games"
                  ? `rgba(61, 89, 72, 255)`
                  : `rgba(51, 79, 62, 255)`,
            }}
            onMouseEnter={() => setHoverSidebarElement("games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Games
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('dashboard')}
            className="w-full text-center py-3 px-6"
                style={{
                  backgroundColor:
                    hoverSidebarElement === "Dashboard"
                      ? `rgba(61, 89, 72, 255)`
                      : `rgba(51, 79, 62, 255)`,
                }}
                onMouseEnter={() => setHoverSidebarElement("Dashboard")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Dashboard
          </button>
        </li>
        
      </ul>
    </nav>
  </aside>

      {/* Main Content */}
      <main className="flex-1 text-white p-6 mt-20" style={{backgroundColor: "rgba(21,49,32,255)"}}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

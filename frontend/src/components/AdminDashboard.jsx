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
      <aside className="w-64  text-white flex flex-col mt-20 bg-gray-900  " >{/*style={{ backgroundColor: `rgba(41, 69, 52, 255)` }}*/}
      <h2 className="text-xl font-bold py-4 px-6 my-2 mx-4 bg-gray-700 " >Admin Dashboard </h2>{/*style={{ backgroundColor: `rgba(51, 79, 62, 255)` }}*/}
    <nav className="flex-1">
      <ul
      className="flex flex-col rounded-lg shadow-md p-2 mx-4 my-0 bg-gray-700"
      
      > {/*style={{ backgroundColor: `rgba(51, 79, 62, 255)` }} */}
        <li>
          <button
            onClick={() => setActiveComponent('users')}
            className= {hoverSidebarElement === "Dashboard" ? "w-full text-center py-3 px-6 bg-gray-600" : "w-full text-center py-3 px-6 bg-gray-700"}
                
                onMouseEnter={() => setHoverSidebarElement("users")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Users
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('settings')}
            className= {hoverSidebarElement === "Dashboard" ? "w-full text-center py-3 px-6 bg-gray-600" : "w-full text-center py-3 px-6 bg-gray-700"}
               
                onMouseEnter={() => setHoverSidebarElement("settings")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('reports')}
            className= {hoverSidebarElement === "Dashboard" ? "w-full text-center py-3 px-6 bg-gray-600" : "w-full text-center py-3 px-6 bg-gray-700"}
                
                onMouseEnter={() => setHoverSidebarElement("reports")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Reports
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('games')}
            className= {hoverSidebarElement === "Dashboard" ? "w-full text-center py-3 px-6 bg-gray-600" : "w-full text-center py-3 px-6 bg-gray-700"}
           
            onMouseEnter={() => setHoverSidebarElement("games")}
                onMouseLeave={() => setHoverSidebarElement(null)}
          >
            Games
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('dashboard')}
            className= {hoverSidebarElement === "Dashboard" ? "w-full text-center py-3 px-6 bg-gray-600" : "w-full text-center py-3 px-6 bg-gray-700"}
               
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
      <main className="flex-1 text-black p-6 mt-20 bg-white overflow-y-auto" >
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

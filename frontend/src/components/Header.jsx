import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userToken = localStorage.getItem('usertoken');
  const adminToken = localStorage.getItem('admintoken');
  console.log(adminToken, "adminToken");
  console.log(userToken, "userToken");
  const user = localStorage.getItem('user');
  const fundingWallet = localStorage.getItem('fundingWallet');
  const supportWallet = localStorage.getItem('supportWallet');

  if (userToken) {
    console.log(fundingWallet, "fundingWallet");
    console.log(supportWallet, "supportWallet");
  }

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [hovered, setHovered] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const UserLoginPage = location.pathname === '/login' || location.pathname === '/register' ;
  const UserDashboardPage = location.pathname === '/';
  const AdminPage = location.pathname.startsWith('/admin');
  const AdminLoginPage = location.pathname === '/admin-login';

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    navigate('/login');
  };

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear previous timeout if any
    setHovered(true); // Show the dropdown immediately
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(false); // Hide the dropdown after 2 seconds
    }, 2000); // 2-second delay
    setHoverTimeout(timeout); // Save the timeout reference to clear it later if needed
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 shadow-md" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
      <h1 className="text-white text-xl font-bold">
        <Link to="/">My App</Link>
      </h1>

      <span className="relative">
        {/* Login/Logout Buttons */}
        {UserLoginPage ? (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() =>{
            console.log(adminToken);
            adminToken !== null ? navigate('/admin') : navigate('/admin-login');
          }}
          >
            {adminToken !== null ? 'Admin Dashboard' : 'Login as Admin'}
          </button>
        ) : (
          userToken && UserDashboardPage ?(
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => {
                adminToken ? navigate('/admin') : navigate('/admin-login');
              }}
            >
              {adminToken ? 'Admin Dashboard' : 'Login as Admin'}
            </button>

          ):(
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => navigate('/')}  // Redirect to homepage if already logged in
            >
              Go to User Admin
            </button>
          )
        )
        }
      

       

        {/* My Account Dropdown */}
        {!UserLoginPage && userToken && !AdminPage ? (
          <div className="inline-block">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )
        :null }

        {/* Separate My Wallet Button with Hover Dropdown */}
        {userToken && !AdminPage && (
          <div className="inline-block relative">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
              onMouseEnter={handleMouseEnter} // Trigger dropdown on hover
              onMouseLeave={handleMouseLeave} // Hide dropdown after 2 seconds
            >
              My Wallet
            </button>

            {hovered && (
              <ul
                className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-40 z-10"
                style={{
                  marginLeft: '10px', // Adds spacing to the right of the "My Wallet" button
                  whiteSpace: 'nowrap', // Prevents wrapping of dropdown content
                }}
              >
                <li>
                  <button
                    onClick={() => {
                      setSelectedWallet('supportWallet');
                      setHovered(false); // Hide dropdown after selection
                    }}
                    className="block w-full text-center py-1 px-4 "
                  >
                    Support Wallet [${supportWallet}]
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedWallet('fundingWallet');
                      setHovered(false); // Hide dropdown after selection
                    }}
                    className="block w-full text-center py-1 px-4 "
                  >
                    Funding Wallet [${fundingWallet}]
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Admin Logout Button */}
        {adminToken && AdminPage && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => {
              localStorage.removeItem('admintoken');
              navigate('/admin-login');
            }}
          >
            Logout as Admin
          </button>
        )}
      </span>
    </div>
  );
};

export default Header;

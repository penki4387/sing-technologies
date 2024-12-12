import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {FaCog } from 'react-icons/fa';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userToken = localStorage.getItem('usertoken');
  const adminToken = localStorage.getItem('admintoken');
  
  const user = localStorage.getItem('user');
  const fundingWallet = localStorage.getItem('fundingWallet');
  const supportWallet = localStorage.getItem('supportWallet');
  console.log(fundingWallet, "fundingWallet");
  const visibleFundingWallet = fundingWallet ? (parseFloat(fundingWallet)).toFixed(6) : '0.00';


  const getCryptoIcon = (symbol) => {
    
    try {
      return require(`cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`);
    } catch {
      if (symbol.toLowerCase() === 'busd') {
        return "./busd.png"; // Your custom BUSD icon path
      }else if (symbol.toLowerCase() === 'cro') {
        return "./cro.png";
      }else if (symbol.toLowerCase() === 'shib') {
        return "./shib.png";
      }else if(symbol.toLowerCase() === 'inr'){
        return "./inr.png";
      }else if(symbol.toLowerCase() === 'cp'){
        return "./inr.png";
      }
      return require('cryptocurrency-icons/svg/color/generic.svg'); // Fallback for unknown currencies
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [hovered, setHovered] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [wallet, setWallet] = useState([]);

useEffect(() => {
  const walletData = JSON.parse(localStorage.getItem('wallet')) || [];
  console.log("Wallet Data:", walletData);
  setWallet(walletData);
}, []);

  const UserLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const UserDashboardPage = location.pathname === '/';
  const AdminPage = location.pathname.startsWith('/admin');
  const AdminLoginPage = location.pathname === '/admin-login';
  const currency = <div className='bg-red-500 text-white'>$</div>

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    navigate('/login');
  };

  const handleMouseEnter = () => {
    // Clear previous timeout if any
    setHovered(!hovered); // Show the dropdown immediately
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHovered(false); // Hide the dropdown after 2 seconds
    }, 2000); // 2-second delay
    setHoverTimeout(timeout); // Save the timeout reference to clear it later if needed
  };

  return (
    <div className= {!AdminPage ?"flex flex-row justify-between items-center p-4 shadow-md w-full fixed h-20 fixed z-50":"flex flex-row justify-between items-center p-4 shadow-md w-full fixed h-20 fixed bg-gray-900 z-50"} style={ !AdminPage ? { backgroundColor: `rgba(41, 69, 52, 255)` } :null}>
      <h1 className="text-white text-xl font-bold">
        <Link to="/">My App</Link>
      </h1>




      {userToken && !AdminPage && (
        <div className="inline relative ">

          <button
            onClick={handleMouseEnter}

            className="bg-gray-800 text-white py-2 px-8  hover:border-transparent rounded"
          >
            {fundingWallet ? `${visibleFundingWallet || 0.000000} ▾` : '0.00'}
          </button>
          {hovered && (
            <div className="flex flex-col absolute right-0 bg-white text-black w-full mt-5 rounded shadow-lg z-50 max-h-85">
            <ul className="max-h-70 overflow-y-auto">
              <span className="absolute right-0 bg-white text-black w-full mt-14 rounded shadow-lg z-[1050] max-h-85">
              {wallet.map((entry, index) => (
                <li
                key={index}
                className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                
                <span>{parseFloat(entry.balance).toFixed(6)}</span>
                <div className='flex flex-row'>
                <img
                  src={getCryptoIcon(entry.cryptoname)}
                  alt={entry.cryptoname}
                  className="w-6 h-6 mr-2"
                />
                <span>{entry.cryptoname}</span>
                </div>
               
              </li>
              ))}
              </span>
            </ul>
            <button
                  className='flex flex-row justify-center items-center p-2 hover:bg-gray-100 cursor-pointer mx-auto my-2 border rounded'
                >
                  <FaCog className="text-gray-500 mr-2" />Wallet Setting
                </button>
              
          </div>
                




            
          )}
          <button
            onClick={toggleModal}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded ml-2"

          >
            My Wallet
          </button>


        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
          <div className="bg-white rounded-lg shadow-lg  w-11/20 flex flex-col h-[600px] text-white" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
            <h2 className="text-xl font-bold mb-4 text-white p-2 px-4 rounded shadow" style={{ backgroundColor: "rgba(41,69,52,255)" }} >Stack</h2>
            <p className="text-sm mb-6 text-white p-2 rounded shadow" style={{ backgroundColor: "rgba(21,49,32,255)" }}>Stack is a decentralized
              Please check your email & click the verification link to activate your account.
            </p>
            <div className="flex flex-col space-y-4 p-6">
              <div className="flex justify-between items-center border p-2 rounded">
                <span className="font-medium">Funding Wallet</span>
                <span>{visibleFundingWallet} BTC</span>
              </div>
              <div className="flex justify-between items-center border p-2 rounded">
                <span className="font-medium">Ethereum</span>
                <span>{visibleFundingWallet} ETH</span>
              </div>
              <div className="flex justify-between items-center border p-2 rounded">
                <span className="font-medium">Dogecoin</span>
                <span>{visibleFundingWallet} DOGE</span>
              </div>
            </div>
            <button
              className="mt-auto w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}



      <span className="relative">
        {/* Login/Logout Buttons */}
        {UserLoginPage ? (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => {
              adminToken !== null ? navigate('/admin') : navigate('/admin-login');
            }}
          >
            {adminToken !== null ? 'Admin Dashboard' : 'Login as Admin'}
          </button>
        ) : (
          userToken && UserDashboardPage ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => {
                adminToken ? navigate('/admin') : navigate('/admin-login');
              }}
            >
              {adminToken ? 'Admin Dashboard' : 'Login as Admin'}
            </button>

          ) : (
            <button
              className={!AdminPage ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" : "bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"}
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
          : null}

        {/* Separate My Wallet Button with Hover Dropdown */}


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

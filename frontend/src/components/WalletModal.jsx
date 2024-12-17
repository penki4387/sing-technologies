import React, { useState } from 'react';

const WalletModal = ({ visibleFundingWallet, toggleModal }) => {
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' or 'withdrawal'
  const [inputValue, setInputValue] = useState(''); // Input field state
  const [loading, setLoading] = useState(false);

  // Dummy API Call
  const handleApiCall = async (action) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyapi.io/wallet/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: inputValue }),
      });
      const result = await response.json();
      console.log(`${action} success:`, result);
      alert(`${action.charAt(0).toUpperCase() + action.slice(1)} Successful!`);
    } catch (error) {
      console.error(`${action} error:`, error);
      alert(`Failed to ${action}.`);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 flex flex-col h-[400px] text-black"
      >
        {/* Buttons for Deposit and Withdrawal */}
        <div className="flex">
          <button
            className={`w-1/2 py-3 text-center font-bold ${
              activeTab === 'deposit' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('deposit');
              setInputValue('');
            }}
          >
            Deposit
          </button>
          <button
            className={`w-1/2 py-3 text-center font-bold ${
              activeTab === 'withdrawal' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('withdrawal');
              setInputValue('');
            }}
          >
            Withdrawal
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow justify-center">
          <h2 className="text-xl font-bold mb-4 text-center">
            {activeTab === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
          </h2>

          {/* Input Field */}
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter amount to ${activeTab}`}
            className="border p-2 rounded w-full mb-4"
          />

          {/* Submit Button */}
          <button
            onClick={() => handleApiCall(activeTab)}
            disabled={!inputValue || loading}
            className={`py-2 px-4 rounded w-full font-bold text-white ${
              activeTab === 'deposit' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : `Confirm ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>
        </div>

        {/* Close Button */}
        <button
          className="mt-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-b hover:bg-gray-400"
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletModal;

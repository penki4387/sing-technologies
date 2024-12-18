import React, { useEffect, useState } from "react";
import axios from "axios";

const WithdrawalApproval = () => {
  const [withdrawals, setWithdrawals] = useState([]); // Withdrawal requests
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Status messages

  // Fetch withdrawal requests
  const fetchWithdrawals = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get("http://localhost:5000/api/wallet/withdrawl"); // Replace with your API endpoint
      console.log(response.data);
      setWithdrawals(response.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setMessage("Failed to fetch withdrawals.");
    }
    setLoading(false);
  };

  // Handle approval or rejection
  const handleStatusUpdate = async (id, newStatus, balance, cryptoname) => {
    try {
      await axios.put(`http://localhost:5000/api/wallet/withdrawl/${id}`, {
        status: newStatus,
        balance: balance,
        cryptoname: cryptoname
      });

      setMessage(`Withdrawal ${newStatus === 1 ? "Approved" : "Rejected"} successfully!`);
      fetchWithdrawals(); // Refresh the list
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
      setMessage("Failed to update withdrawal status.");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-6">Withdrawal Approval Panel</h1>
      {/* I want to put a filter to filter the list on the basis of status, like pending, approved, rejected and cryptoname */}
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          onChange={(e) => {
            const status = e.target.value;
            if (status === "all") {
              fetchWithdrawals();
            } else {
              const filteredWithdrawals = withdrawals.filter((withdrawal) => withdrawal.status === status);
              setWithdrawals(filteredWithdrawals);
            }
          }}
        >
          <option value="all">All</option>
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : withdrawals.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Cryptoname</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <tr key={withdrawal.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2 text-center">{withdrawal.userId}</td>
                <td className="border p-2 text-center">{withdrawal.balance}</td>
                <td className="border p-2 text-center">{withdrawal.cryptoname}</td>
                <td className="border p-2 text-center">
                  {withdrawal.status === "0"
                    ? "Pending"
                    : withdrawal.status === "1"
                    ? "Approved"
                    : "Rejected"}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  {withdrawal.status === "0" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(withdrawal.id, 1, withdrawal.balance, withdrawal.cryptoname)} // Approve
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(withdrawal.id, 2,withdrawal.balance, withdrawal.cryptoname)} // Reject
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {withdrawal.status !== "0" && (
                    <span className="text-gray-500 italic">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No pending withdrawal requests.</p>
      )}

      {message && (
        <div className="mt-4 text-center font-semibold text-green-500">{message}</div>
      )}
    </div>
  );
};

export default WithdrawalApproval;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BankAccountList = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Accounts after filtering
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Success/error message

  // Fetch all bank accounts
  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bankaccount/getall"); // Replace with your backend URL
      setBankAccounts(response.data);
      setFilteredAccounts(response.data); // Set filteredAccounts initially to all accounts
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bank accounts:", err);
      setError("Failed to fetch bank accounts.");
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter accounts based on the query
    const filtered = bankAccounts.filter((account) => {
      return (
        account.accountname.toLowerCase().includes(query) ||
        account.accountnumber.toLowerCase().includes(query) ||
        account.ifsccode.toLowerCase().includes(query) ||
        account.branch.toLowerCase().includes(query)
      );
    });

    setFilteredAccounts(filtered);
  };

  // Update account status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bankaccount/update/${id}`, {
        status: newStatus,
      });
      setMessage(`Status updated to ${newStatus === 1 ? "Verified" : "Rejected"}.`);
      fetchBankAccounts(); // Refresh the accounts list
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Bank Accounts</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by account name, number, IFSC code, or branch"
          className="w-full p-2 border rounded"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredAccounts.length > 0 ? (
        <>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">#</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Account Name</th>
                <th className="border p-2">Account Number</th>
                <th className="border p-2">IFSC Code</th>
                <th className="border p-2">Branch</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{account.userId}</td>
                  <td className="border p-2">{account.accountname}</td>
                  <td className="border p-2">{account.accountnumber}</td>
                  <td className="border p-2">{account.ifsccode}</td>
                  <td className="border p-2">{account.branch}</td>
                  <td className="border p-2 text-center">
                    {account.status === 0
                      ? "Pending Approval"
                      : account.status === 1
                      ? "Verified"
                      : "Rejected"}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center">
                    {account.status === 0 && (
                      <>
                        <button
                          onClick={() => updateStatus(account.id, 1)} // Verified
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => updateStatus(account.id, 2)} // Rejected
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-4 text-center font-semibold text-green-500">{message}</div>
          )}
        </>
      ) : (
        <p className="text-center">No matching bank accounts found.</p>
      )}
    </div>
  );
};

export default BankAccountList;

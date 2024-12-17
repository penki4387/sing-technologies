import React, { useState, useEffect } from "react";
import axios from "axios";

const BankAccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountname: "",
    accountnumber: "",
    confirmAccountNumber: "",
    ifsccode: "",
    branch: "",
  });
  const [editId, setEditId] = useState(null);
  const userId = localStorage.getItem("userId");
  console.log(userId);

  // Fetch all bank accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bankaccount/getone/user/${userId}`); 
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.accountnumber !== formData.confirmAccountNumber) {
      alert("Account number and confirm account number do not match!");
      return;
    }

    try {
      if (editId) {
        // Update existing account
        const response = await axios.put(`http://localhost:5000/api/bankaccount/update/${editId}`, {
          accountname: formData.accountname,
          accountnumber: formData.accountnumber,
          ifsccode: formData.ifsccode,
          branch: formData.branch,
        });
        response.status === 200 ? alert("Account updated successfully") : alert("Error updating account,");
        
      } else {
        // Create new account
        const response = await axios.post("http://localhost:5000/api/bankaccount/addnew", {
          userId: userId, // Replace with actual user ID
          accountname: formData.accountname,
          accountnumber: formData.accountnumber,
          ifsccode: formData.ifsccode,
          branch: formData.branch,
          status: 0, 
        });
        response.status === 200 ? alert("Account created successfully") : alert("Error creating account");
      }

      fetchAccounts();
      setFormData({
        accountname: "",
        accountnumber: "",
        confirmAccountNumber: "",
        ifsccode: "",
        branch: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error submitting account:", error);
    }
  };

  const handleEdit = (account) => {
    setFormData({
      accountname: account.accountname,
      accountnumber: account.accountnumber,
      confirmAccountNumber: account.accountnumber,
      ifsccode: account.ifsccode,
      branch: account.branch,
    });
    setEditId(account.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bankaccount/update/${id}`);
        fetchAccounts();
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="mx-auto p-6 h-screen" style={{ backgroundColor: "rgba(21,49,32,255)" }}>
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Bank Account Manager</h1>
      <div className="flex font-bold mb-4 justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-100 p-4 rounded w-1/2">
          <div>
            <label className="block mb-1 font-medium">Account Holder's Name</label>
            <input
              type="text"
              name="accountname"
              value={formData.accountname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Account Number</label>
            <input
              type="text"
              name="accountnumber"
              value={formData.accountnumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Account Number</label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={formData.confirmAccountNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">IFSC Code</label>
            <input
              type="text"
              name="ifsccode"
              value={formData.ifsccode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Branch Name</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editId ? "Update Account" : "Add Account"}
          </button>
        </form>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4 text-white text-center">Accounts List</h2>
        {accounts.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Account Holder's Name</th>
                <th className="border border-gray-300 p-2">Account Number</th>
                <th className="border border-gray-300 p-2">IFSC Code</th>
                <th className="border border-gray-300 p-2">Branch Name</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{account.accountname}</td>
                  <td className="border border-gray-300 p-2">{account.accountnumber}</td>
                  <td className="border border-gray-300 p-2">{account.ifsccode}</td>
                  <td className="border border-gray-300 p-2">{account.branch}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(account)}
                      className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white text-center">No accounts available. Add a new account to get started.</p>
        )}
      </div>
    </div>
  );
};

export default BankAccountManager;

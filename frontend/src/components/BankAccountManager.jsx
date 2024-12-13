import React, { useState } from "react";

const BankAccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    branchName: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      alert("Account number and confirm account number do not match!");
      return;
    }

    if (editIndex !== null) {
      // Update existing account
      const updatedAccounts = [...accounts];
      updatedAccounts[editIndex] = { ...formData };
      setAccounts(updatedAccounts);
      setEditIndex(null);
    } else {
      // Add new account
      setAccounts([...accounts, { ...formData }]);
    }

    setFormData({
      accountHolderName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      branchName: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(accounts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      const updatedAccounts = accounts.filter((_, i) => i !== index);
      setAccounts(updatedAccounts);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bank Account Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
        <div>
          <label className="block mb-1 font-medium">Account Holder's Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
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
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editIndex !== null ? "Update Account" : "Add Account"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Accounts List</h2>
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
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{account.accountHolderName}</td>
                  <td className="border border-gray-300 p-2">{account.accountNumber}</td>
                  <td className="border border-gray-300 p-2">{account.ifscCode}</td>
                  <td className="border border-gray-300 p-2">{account.branchName}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
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
          <p>No accounts available. Add a new account to get started.</p>
        )}
      </div>
    </div>
  );
};

export default BankAccountManager;

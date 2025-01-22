import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { Button } from "@/components/ui/button";
import GlobalApi from '../../service/GlobalApi';

const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  const [rows, setRows] = useState([
    {
      id: 1,
      date: "2025-01-01",
      name: "John Doe",
      service: "Consultation",
      amount: 100,
      customer: { value: 1, label: "Boomi" }, // Updated to store the full object
      location: "New York",
      paymentStatus: "Paid",
    },
  ]);
  

  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");

  // Add a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      date: today,
      name: "",
      service: "",
      amount: 0,
      customer: { value: 1, label: "Alice Johnson" }, // Updated to store the full object
      location: "",
      paymentStatus: "2",
      comments: "",
    };
    setRows([...rows, newRow]);
  };

  // Handle cell updates
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };


 

  const fetchCustomers = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await GlobalApi.SearchCustomers(inputValue, 1);
      
      // Ensure response is a valid Response object
      if (!response.ok) {
        console.error("Failed to fetch customers:", response.statusText);
        return [];
      }
  
      const data = await response.json(); // Explicitly parse JSON
      return data.map((customer) => ({
        value: customer.id,
        label: `${customer.first_name} ${customer.last_name || ""}`,
      }));
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  };
  
  

  // Handle adding a new customer
  const handleAddCustomer = () => {
    if (newCustomer.trim()) {
      setShowModal(false);
      setNewCustomer("");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">Dashboard</h1>

      {/* Table */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Service Details
          </h3>
          <button
            onClick={addRow}
            className="px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add More
          </button>
        </div>
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">SNO</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
              <th className="px-4 py-2 border border-gray-300">Customer</th>
              <th className="px-4 py-2 border border-gray-300">Location</th>
              <th className="px-4 py-2 border border-gray-300">Payment</th>
              <th className="px-4 py-2 border border-gray-300">Comments</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className="px-4 py-2 border border-gray-300">{row.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.service}
                    onChange={(e) =>
                      handleInputChange(index, "service", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) =>
                      handleInputChange(index, "amount", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
  <AsyncSelect
    cacheOptions
    loadOptions={fetchCustomers}
    defaultOptions
    onChange={(selected) =>
      handleInputChange(index, "customer", selected)
    }
    value={row.customer || null}
    placeholder="Search or add a customer..."
    isClearable
  />
</td>

                <td className="px-4 py-2 border border-gray-300">
                  <input
                    type="text"
                    value={row.location}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <select
                    value={row.paymentStatus}
                    onChange={(e) =>
                      handleInputChange(index, "paymentStatus", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="2">Pending</option>
                    <option value="1">Paid</option>
                    <option value="3">Partially Paid</option>
                    <option value="4">Not Paid</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.comments}
                    onChange={(e) =>
                      handleInputChange(index, "comments", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    variant="outline"
                    className="text-white bg-red-500"
                    onClick={() =>
                      setRows(rows.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-lg font-bold">Add New Customer</h2>
            <input
              type="text"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

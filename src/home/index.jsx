import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Dashboard = () => {
  // Sample data for counters and charts
  const stats = [
    { title: "Users", count: 1250, color: "bg-green-500" },
    { title: "Orders", count: 310, color: "bg-yellow-500" },
    { title: "Revenue", count: "$45,000", color: "bg-blue-500" },
    { title: "Ratings", count: 4.8, color: "bg-pink-500" },
  ];
  const today = new Date().toISOString().split("T")[0];
  // Table State
  const [rows, setRows] = useState([
    {
      id: 1,
      date: "2025-01-01",
      name: "John Doe",
      service: "Consultation",
      amount: 100,
      customerName: "Alice Johnson",
      location: "New York",
      paymentStatus: "Paid", // Default status
    },
  ]);

  // Function to add a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      date: today,
      name: "",
      service: "",
      amount: 0,
      customerName: "",
      location: "",
      paymentStatus: 2, // Default status for new rows
      comments: "", // Default status for new rows
    };
    setRows([...rows, newRow]);
  };

  // Function to handle cell updates
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Function to return background color based on payment status
  const getBgColor = (status) => {
    switch (status) {
      case "1":
        return "bg-green-500"; // Green for Paid
      case "2":
        return "bg-yellow-500"; // Yellow for Pending
      case "3":
        return "bg-orange-500"; // Orange for Partially Paid
      case "4":
        return "bg-red-500"; // Red for Not Paid
      default:
        return "bg-gray-200"; // Default background color
    }
  };

   // Function to handle row deletion with confirmation
   const handleDeleteRow = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (confirmDelete) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">Dashboard</h1>

      {/* Counter Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md text-white ${stat.color}`}
          >
            <h2 className="text-lg">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

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
                    value={row.service} // use `value` instead of `children`
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
                  <input
                    type="text"
                    value={row.customerName}
                    onChange={(e) =>
                      handleInputChange(index, "customerName", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
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
                    className={`w-full px-2 py-1 border rounded ${getBgColor(
                      row.paymentStatus
                    )}`}
                  >
                    <option value="2">Pending</option>
                    <option value="1">Paid</option>
                    <option value="3">Partially Paid</option>
                    <option value="4">Not Paid</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.comments} // use `value` instead of `children`
                    onChange={(e) =>
                      handleInputChange(index, "service", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td>
                  <Button variant="outline" className="text-white bg-red-500" onClick={() => handleDeleteRow(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import GlobalApi from "../../service/GlobalApi";

const Dashboard = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      date: "2025-01-01",
      service: "Consultation",
      amount: 100,
      first_name: "Alice Johnson",
      street: "New York",
      paymentStatus: "Paid",
      comments: "",
    },
  ]);

  const [suggestions, setSuggestions] = useState({});
  const [showSuggestions, setShowSuggestions] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      date: today,
      service: "",
      amount: 0,
      first_name: "",
      street: "",
      paymentStatus: "Pending",
      comments: "",
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const fetchSuggestions = (index, field, query) => {
    if (query.length > 2) {
      GlobalApi.fetchSuggestions(field, query)
        .then((response) => {
          setSuggestions((prev) => ({
            ...prev,
            [`${index}-${field}`]: response.data,
          }));
          setShowSuggestions((prev) => ({
            ...prev,
            [`${index}-${field}`]: true,
          }));
        })
        .catch(() => {
          setSuggestions((prev) => ({ ...prev, [`${index}-${field}`]: [] }));
          setShowSuggestions((prev) => ({
            ...prev,
            [`${index}-${field}`]: false,
          }));
        });
    } else {
      setSuggestions((prev) => ({ ...prev, [`${index}-${field}`]: [] }));
      setShowSuggestions((prev) => ({ ...prev, [`${index}-${field}`]: false }));
    }
  };

  const handleSuggestionClick = (index, field, suggestion) => {
    handleInputChange(index, field, suggestion);
    setShowSuggestions((prev) => ({ ...prev, [`${index}-${field}`]: false }));
  };

  const renderAutocompleteInput = (index, field, value) => {
    const key = `${index}-${field}`;
    return (
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            handleInputChange(index, field, e.target.value);
            fetchSuggestions(index, field, e.target.value);
          }}
          onFocus={() => {
            setShowSuggestions((prev) => ({
              ...prev,
              [key]: suggestions[key]?.length > 0,
            }));
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions((prev) => ({ ...prev, [key]: false }));
            }, 300);
          }}
        />
 
        {showSuggestions[key] && (
          <div className="absolute z-10 w-full overflow-y-auto bg-white border rounded shadow max-h-40">
            {suggestions[key]?.length ? (
              suggestions[key].map((suggestion, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(index, field, suggestion)}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No suggestions found</div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);

    // Cleanup suggestions and showSuggestions states for the deleted row
    const newSuggestions = { ...suggestions };
    const newShowSuggestions = { ...showSuggestions };
    Object.keys(suggestions).forEach((key) => {
      if (key.startsWith(`${index}-`)) {
        delete newSuggestions[key];
        delete newShowSuggestions[key];
      }
    });
    setSuggestions(newSuggestions);
    setShowSuggestions(newShowSuggestions);
  };

  const getBgColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Partially Paid":
        return "bg-orange-500";
      case "Not Paid":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">Dashboard</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Service Details</h3>
          <Button onClick={addRow} className="bg-blue-500 hover:bg-blue-600">
            Add More
          </Button>
        </div>
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">SNO</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Customer</th>
              <th className="px-4 py-2 border border-gray-300">Location</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
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
                    onChange={(e) => handleInputChange(index, "date", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.service}
                    onChange={(e) => handleInputChange(index, "service", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {renderAutocompleteInput(index, "first_name", row.first_name)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {renderAutocompleteInput(index, "street", row.street)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <select
                    value={row.paymentStatus}
                    onChange={(e) => handleInputChange(index, "paymentStatus", e.target.value)}
                    className={`w-full px-2 py-1 border rounded ${getBgColor(row.paymentStatus)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.comments}
                    onChange={(e) => handleInputChange(index, "comments", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => handleDeleteRow(index)}
                    className="text-white bg-red-500"
                  >
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

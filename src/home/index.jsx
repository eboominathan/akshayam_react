import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Select from "react-select"; // Import react-select
import GlobalApi from "../../service/GlobalApi";

const Dashboard = () => {
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const [rows, setRows] = useState([
    {
      id: 1,
      date: "2025-01-01",
      category: null,
      description: "test",
      amount: 100,
      first_name: "Alice Johnson",
      street: "New York",
      paymentStatus: "Paid",
      comments: "",
    },
  ]);

  const [categories, setCategories] = useState([]);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newService, setNewService] = useState("");
  const [currentRowIndex, setCurrentRowIndex] = useState(null); // Track the row index
  const [errorMessage, setErrorMessage] = useState(null);


  const today = new Date().toISOString().split("T")[0];

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      date: today,
      category: null,
      description: "",
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

  const fetchAllCategories = () => {
    GlobalApi.GetAllCategories()
      .then((response) => {
        const options = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(options);
      })
      .catch(() => {
        setCategories([]);
      });
  };



  const handleAddNewService = () => {
    if (newService.trim() !== "") {
      const data = {
        name: newService,
      };
  
      GlobalApi.CreateNewCategory(data).then(
        (resp) => {
          if (resp) {
            const newOption = { value: resp.data.id, label: resp.data.name };
            setCategories([...categories, newOption]);
  
            // Update the selected category in the row where "Add New Service" was triggered
            if (currentRowIndex !== null) {
              const updatedRows = rows.map((row, index) =>
                index === currentRowIndex
                  ? { ...row, category: resp.data.id }
                  : row
              );
              setRows(updatedRows);
            }
  
            setNewService("");
            setShowAddServiceModal(false);
            setErrorMessage(null); // Clear any existing error messages
          }
        },
        (error) => {
          // Handle validation errors
          if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            setErrorMessage(
              validationErrors.name ? validationErrors.name[0] : "An error occurred"
            );
          } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
          }
        }
      );
    }
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
          <h3 className="text-lg font-semibold text-gray-700">
            Service Details
          </h3>
          <Button onClick={addRow} className="bg-blue-500 hover:bg-blue-600">
            Add More
          </Button>
        </div>
        <table className="w-full text-left border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">SNO</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Service</th>
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
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                <Select
  value={categories.find((c) => c.value === row.category) || null}
  onChange={(selectedOption) => {
    if (!selectedOption) {
      handleInputChange(index, "category", null); // Clear the selection
    } else if (selectedOption.value === "add-new-service") {
      setCurrentRowIndex(index); // Track which row triggered "Add New Service"
      setShowAddServiceModal(true);
    } else {
      handleInputChange(index, "category", selectedOption.value);
    }
  }}
  options={[
    ...categories,
    { value: "add-new-service", label: "Add New Service" },
  ]}
  isClearable
  placeholder="Select a service"
/>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Input
                    value={row.first_name}
                    onChange={(e) =>
                      handleInputChange(index, "first_name", e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Input
                    value={row.street}
                    onChange={(e) =>
                      handleInputChange(index, "street", e.target.value)
                    }
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
                  <select
                    value={row.paymentStatus}
                    onChange={(e) =>
                      handleInputChange(index, "paymentStatus", e.target.value)
                    }
                    className={`w-full px-2 py-1 border rounded ${getBgColor(
                      row.paymentStatus
                    )}`}
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
                    onChange={(e) =>
                      handleInputChange(index, "comments", e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Button
                    onClick={() => setRows(rows.filter((_, i) => i !== index))}
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
      {/* Add Service Modal */}
      {showAddServiceModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Add New Service</h2>
      {errorMessage && (
        <div className="mb-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <Input
        value={newService}
        onChange={(e) => setNewService(e.target.value)}
        placeholder="Enter service name"
        className="w-full mb-4"
      />
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowAddServiceModal(false);
            setErrorMessage(null); // Clear error message on cancel
          }}
          className="mr-2 bg-gray-500 hover:bg-gray-600"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddNewService}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add Service
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;

import AddCustomer from '@/components/AddCustomer';
import { useUser } from '@clerk/clerk-react';
import React, { useCallback, useEffect, useState } from 'react';
import GlobalApi from '../../service/GlobalApi';
import CustomerCardItem from '@/components/CustomerCardItem';

function Customers() {
  const { user } = useUser();
  const [customerList, setCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loggedUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
  };

  const RegisterUser = useCallback(() => {
    if (!localStorage.getItem("token") && user) {
      GlobalApi.RegisterUser(loggedUser).then((resp) => {
        localStorage.setItem("token", resp.data.api_token);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      RegisterUser();
      GetCustomersList(currentPage);
    }
  }, [user, RegisterUser, currentPage]);

  /**
   * Fetch customer list with pagination
   */
  const GetCustomersList = (page = 1) => {
    setIsLoading(true);
    GlobalApi.GetUserCustomers({ page })
      .then((resp) => {
        if (resp.data && resp.data.data) {
          setCustomerList(resp.data.data);
          setTotalPages(resp.data.last_page || 1);
        }
      })
      .catch(() => setCustomerList([]))
      .finally(() => setIsLoading(false));
  };

  /**
   * Search Customers via API
   */
  const searchCustomers = (query, page = 1) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      GetCustomersList(page);
      return;
    }

    setIsLoading(true);
    GlobalApi.SearchCustomers({ search: query, page })
      .then((resp) => {
        if (resp.data && Array.isArray(resp.data.data)) {
          setCustomerList(resp.data.data);
          setTotalPages(resp.data.last_page || 1);
        } else {
          setCustomerList([]);
        }
      })
      .catch(() => setCustomerList([]))
      .finally(() => setIsLoading(false));
  };

  /**
   * Handle pagination changes
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (searchQuery.trim()) {
      searchCustomers(searchQuery, page);
    } else {
      GetCustomersList(page);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">Akshayam Common Service Center</h2>
      <div>Peedampalli</div>

      {/* Search Input */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => searchCustomers(e.target.value, 1)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-2 gap-5 mt-6 md:grid-cols-3 lg:grid-cols-5">
        <AddCustomer />
        {isLoading ? (
          [1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
            ></div>
          ))
        ) : customerList?.length > 0 ? (
          customerList.map((customer) => (
            <CustomerCardItem
              customer={customer}
              key={customer.id}
              refreshData={() => GetCustomersList(currentPage)}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No customers found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 border rounded-lg ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Customers;

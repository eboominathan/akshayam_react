import AddCustomer from '@/components/AddCustomer';
import { useUser } from '@clerk/clerk-react';
import React, { useCallback, useEffect, useState } from 'react';
import GlobalApi from '../../service/GlobalApi';
import CustomerCardItem from '@/components/CustomerCardItem';

function Dashboard() {
  const { user } = useUser();
  const [customerList, setCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      GetCustomersList();
    }
  }, [user, RegisterUser]);

  /*
   * Get Customer List
   */
  const GetCustomersList = () => {
    GlobalApi.GetUserCustomers().then((resp) => {
      setCustomerList(resp.data);
    });
  };

  /*
   * Search Customers via AJAX call
   */
  const searchCustomers = (query) => {
 
    setSearchQuery(query);
    if (query.trim() === '') {
      GetCustomersList(); // Reset to full list if query is empty
      return;
    }

    setIsLoading(true);
    GlobalApi.SearchCustomers(query).then((resp) => {
      setCustomerList(resp.data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
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
          onChange={(e) => searchCustomers(e.target.value)}
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
              refreshData={GetCustomersList}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

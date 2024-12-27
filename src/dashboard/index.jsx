import AddCustomer from '@/components/AddCustomer'
import { useUser } from '@clerk/clerk-react';
import React, { useCallback, useEffect, useState } from 'react'
import GlobalApi from '../../service/GlobalApi';
import CustomerCardItem from '@/components/CustomerCardItem';

function Dashboard() {
  const { user } = useUser();
  const [customerList, setCustomerList] = useState([]);

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
  
  return (
    <div className="p-10 md:px-20 lg:px-32">
    <h2 className="text-3xl font-bold">Akshayam Common Service Center</h2>
    <div>Peedampalli</div>
    <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-5">
      <AddCustomer />
      {customerList?.length > 0
          ? customerList.map((customer, index) => (
              <CustomerCardItem
                customer={customer}
                key={customer.id}
                refreshData={GetCustomersList}
              />
            ))
          : [1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
    </div>
  </div>
  )
}

export default Dashboard
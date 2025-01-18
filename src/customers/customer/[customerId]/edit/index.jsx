import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./components/FormSection";
import CustomerPreview from "./components/CustomerPreview";
import { CustomerInfoContext } from "@/context/CustomerInfoContext";
import GlobalApi from  '../../../../../service/GlobalApi'

// import dummy from "@/data/dummy";

function EditCustomer() {
  const params = useParams();  
  const [customerInfo,setCustomerInfo] = useState(); 
  useEffect(()=>{       
    GetCustomerInfo();
},[])


const GetCustomerInfo=()=>{
    GlobalApi.GetCustomerById(params?.customerId).then(resp=>{    
      setCustomerInfo(resp.data);
    })
}
  
  return (
    <CustomerInfoContext.Provider value={{ customerInfo, setCustomerInfo }}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        <FormSection />
        <CustomerPreview />
      </div>
    </CustomerInfoContext.Provider>
  );
}

export default EditCustomer;

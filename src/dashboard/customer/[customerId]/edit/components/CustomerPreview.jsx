import React, { useContext } from "react";
import { CustomerInfoContext } from '@/context/CustomerInfoContext';
import PersonalDetailPreview from "./preview/PersonalDetailPreview";

function CustomerPreview() {

  const { customerInfo, setCustomerInfo } = useContext(CustomerInfoContext);
  return (
    <div
    className="shadow-lg h-full p-14 border-t-[20px]"
    style={{
      borderColor: customerInfo?.theme_color,
    }}
  >  
      {/* Personal Detail  */}
      <PersonalDetailPreview customerInfo={customerInfo} />
      
    </div>
  )
}

export default CustomerPreview
import React from "react";

function PersonalDetailPreview({ customerInfo }) {
  return (
    <div>
       <h2 className='text-xl font-bold text-center'
        style={{
            color:customerInfo?.theme_color
        }}
        >
            {customerInfo?.first_name} {customerInfo?.last_name}</h2>
     
       <h2 className='text-xs font-normal text-center'
        style={{
            color:customerInfo?.theme_color
        }}>{customerInfo?.door_no},{customerInfo?.street} {customerInfo?.area}, {customerInfo?.village}  
         ,{customerInfo?.district} - {customerInfo?.pincode}
        </h2>

        <div className='flex justify-between'>
            <h2 className='text-xs font-normal'
             style={{
                color:customerInfo?.theme_color
            }}>{customerInfo?.phone}</h2>
            <h2 className='text-xs font-normal'
             style={{
                color:customerInfo?.theme_color
            }}>{customerInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:customerInfo?.theme_color
        }}
        />
    </div>
  );
}

export default PersonalDetailPreview;

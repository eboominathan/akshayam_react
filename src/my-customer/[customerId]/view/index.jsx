import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { CustomerInfoContext } from '@/context/CustomerInfoContext'
 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import CustomerPreview from '@/customers/customer/[customerId]/edit/components/CustomerPreview'

function ViewCustomer() {

    const [customerInfo,setCustomerInfo]=useState();
    const {customerId}=useParams();

    useEffect(()=>{
        GetCustomerInfo();
    },[])
    const GetCustomerInfo=()=>{
        GlobalApi.GetCustomerById(customerId).then(resp=>{        
            setCustomerInfo(resp.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <CustomerInfoContext.Provider value={{customerInfo,setCustomerInfo}} >
        <div id="no-print">
        <Header/>

        <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
            <h2 className='text-2xl font-medium text-center'>
                Congrats! Your Ultimate AI generates Customer is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your customer and you can share unique 
                    customer url with your friends and family </p>
            <div className='flex justify-between my-10 px-44'>
                <Button onClick={HandleDownload}>Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my customer please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-customer/"+customerId+"/view",
          title: customerInfo?.first_name+" "+customerInfo?.last_name+" customer",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button>Share</Button>
      </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <CustomerPreview/>
            </div>
            </div>
    </CustomerInfoContext.Provider>
  )
}

export default ViewCustomer
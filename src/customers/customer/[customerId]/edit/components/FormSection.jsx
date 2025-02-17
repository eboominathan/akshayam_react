import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import FamilyDetail from './forms/FamilyDetail';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {customerId}=useParams();
  
  return (
    <div>
    <div className='flex items-center justify-between'>
      <div className='flex gap-5'>
        <Link to={"/"}>
      <Button><Home /></Button>
      </Link>
      <ThemeColor/>
     
      </div>
      <div className='flex gap-2'>
          {activeFormIndex> 1 && 
          <Button size="sm"
          disabled={!enableNext}
           className
            onClick={() => setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft /> </Button>}
          <Button 
          disabled={!enableNext}
          className="flex gap-2" size="sm"
           onClick={() => setActiveFormIndex(activeFormIndex+1)}
           >Next <ArrowRight /></Button>
        </div>
      </div>
      {activeFormIndex==1?  
        <PersonalDetail enableNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?      
        <FamilyDetail enableNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?      
          <Navigate to={'/my-customer/'+customerId+"/view"}/>
              
        :null
          }
    
    </div>
  )
}

export default FormSection
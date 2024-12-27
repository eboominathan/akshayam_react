import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
// import Summary from './forms/Summary';
// import Experience from './forms/Experience';
// import Education from './forms/Education';
// import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {customerId}=useParams();
  
  return (
    <div>
    <div className='flex items-center justify-between'>
      <div className='flex gap-5'>
        <Link to={"/dashboard"}>
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
 
    
    </div>
  )
}

export default FormSection
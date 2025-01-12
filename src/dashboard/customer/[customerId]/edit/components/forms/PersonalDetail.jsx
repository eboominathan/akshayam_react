import { CustomerInfoContext } from '@/context/CustomerInfoContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { LoaderCircle } from "lucide-react";
import React, { useContext,  useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Textarea } from '@/components/ui/textarea';

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { customerInfo, setCustomerInfo } = useContext(CustomerInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = formData;
    GlobalApi.UpdateCustomerDetail(params?.customerId, data).then(
      (res) => {
        toast("Details updated ");
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  
  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
       <h2 className="text-lg font-bold">Personal Detail</h2>
       <p>Get Started with the Basic information</p>
       <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div>
            <label className="text-sm font-bold">First Name</label>
            <Input
              name="first_name"
              required
              onChange={handleInputChange}
              defaultValue={customerInfo?.first_name}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Last Name</label>
            <Input
              name="last_name"
              required
              onChange={handleInputChange}
              defaultValue={customerInfo?.last_name}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Door No</label>
            <Input
              name="door_no"
          
              onChange={handleInputChange}
              defaultValue={customerInfo?.door_no}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Street</label>
            <Input
              name="street"
     
              onChange={handleInputChange}
              defaultValue={customerInfo?.street}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Landmark</label>
            <Input
              name="landmark"
       
              onChange={handleInputChange}
              defaultValue={customerInfo?.landmark}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Area</label>
            <Input
              name="area"
         
              onChange={handleInputChange}
              defaultValue={customerInfo?.area}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Village</label>
            <Input
              name="village"
  
              onChange={handleInputChange}
              defaultValue={customerInfo?.village}
            />
          </div>
          <div>
            <label className="text-sm font-bold">District</label>
            <Input
              name="district"
        
              onChange={handleInputChange}
              defaultValue={customerInfo?.district}
            />
          </div>
         
          <div>
            <label className="text-sm font-bold">Pincode</label>
            <Input
              name="pincode"
        
              onChange={handleInputChange}
              defaultValue={customerInfo?.pincode}
            />
          </div>    
          <div>
            <label className="text-sm font-bold">State</label>
            <Input
              name="state"
       
              onChange={handleInputChange}
              defaultValue={customerInfo?.state}
            />
          </div>    
          <div>
            <label className="text-sm font-bold">Phone</label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={customerInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Email</label>
            <Input
              name="email"
              required
              onChange={handleInputChange}
              defaultValue={customerInfo?.email}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
import { CustomerInfoContext } from "@/context/CustomerInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

function FamilyDetail({ enableNext }) {
  const params = useParams();
  const { customerInfo, setCustomerInfo } = useContext(CustomerInfoContext);
  const [formData, setFormData] = useState(customerInfo || {});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSelectChange = (value) => {
    enableNext(false);
    setFormData({ ...formData, gender: value });
    setCustomerInfo({ ...customerInfo, gender: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    GlobalApi.UpdateCustomerDetail(params?.customerId, formData).then(
      (res) => {
        toast("Details updated");
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to update details");
      }
    );
  };

  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Family Details</h2>
      <p>Family information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div>
            <label className="text-sm font-bold">First Name</label>
            <Input
              name="first_name"
              required
              onChange={handleInputChange}
              defaultValue={formData?.first_name}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Last Name</label>
            <Input
              name="last_name"
              required
              onChange={handleInputChange}
              defaultValue={formData?.last_name}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Date Of Birth</label>
            <Input
              name="dob"
              type="date"
              required
              onChange={handleInputChange}
              defaultValue={formData?.dob}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Gender</label>
            <Select
              value={formData?.gender || ""}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
          </div>
        </div>
        <div className="mt-5">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FamilyDetail;

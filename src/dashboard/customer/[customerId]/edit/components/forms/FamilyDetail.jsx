import { CustomerInfoContext } from "@/context/CustomerInfoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";

function FamilyDetail({ enableNext }) {
  const params = useParams();
  const { customerInfo, setCustomerInfo } = useContext(CustomerInfoContext);
  const [familyMembers, setFamilyMembers] = useState(customerInfo?.familyMembers || []);
  const [loading, setLoading] = useState(false);

  // Add a new empty family member
  const handleAddMore = () => {
    setFamilyMembers([
      ...familyMembers,
      { first_name: "", last_name: "", dob: "", gender: "" },
    ]);
  };

  // Handle input change for a specific family member
  const handleInputChange = (index, e) => {
    enableNext(false);
    const { name, value } = e.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index][name] = value;
    setFamilyMembers(updatedMembers);
    setCustomerInfo({ ...customerInfo, familyMembers: updatedMembers });
  };

  // Remove a specific family member
  const handleRemove = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
    setCustomerInfo({ ...customerInfo, familyMembers: updatedMembers });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    GlobalApi.UpdateCustomerDetail(params?.customerId, { familyMembers }).then(
      (res) => {
        toast("Family details updated");
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to update family details");
      }
    );
  };

  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Family Details</h2>
      <p>Family information</p>
      <form onSubmit={onSave}>
        {familyMembers.map((member, index) => (
          <div key={index} className="relative grid grid-cols-2 gap-3 p-3 mt-5 border rounded-lg">
            <button
              type="button"
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
            <div>
              <label className="text-sm font-bold">First Name</label>
              <Input
                name="first_name"
                required
                onChange={(e) => handleInputChange(index, e)}
                value={member.first_name}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Last Name</label>
              <Input
                name="last_name"
                required
                onChange={(e) => handleInputChange(index, e)}
                value={member.last_name}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Date Of Birth</label>
              <Input
                name="dob"
                type="date"
                required
                onChange={(e) => handleInputChange(index, e)}
                value={member.dob}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Gender</label>
              <Input
                name="gender"
                required
                onChange={(e) => handleInputChange(index, e)}
                value={member.gender}
              />
            </div>
            <div>
              <label className="text-sm font-bold">Relationship</label>
              <Input
                name="relationship"
                required
                onChange={(e) => handleInputChange(index, e)}
                value={member.relationship}
              />
            </div>
          </div>
        ))}
        <div className="flex mt-5 space-x-3">
          <Button type="button" onClick={handleAddMore}>
            Add More
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FamilyDetail;

import { CustomerInfoContext } from '@/context/CustomerInfoContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const initialFormData = {
    first_name: "",
    last_name: "",
    door_no: "",
    street: "",
    area: "",
    village: "",
    district: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  };
  const { customerInfo = initialFormData, setCustomerInfo } = useContext(CustomerInfoContext);
  const [formData, setFormData] = useState({ ...customerInfo });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [showSuggestions, setShowSuggestions] = useState({});

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    GlobalApi.UpdateCustomerDetail(params?.customerId, formData)
      .then(() => {
        toast("Details updated");
        enableNext(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchSuggestions = (field, query) => {
    if (query.length > 2) {
      GlobalApi.fetchSuggestions(field, query)
        .then((response) => {
          setSuggestions((prev) => ({ ...prev, [field]: response.data }));
          setShowSuggestions((prev) => ({ ...prev, [field]: true }));
        })
        .catch(() => {
          setSuggestions((prev) => ({ ...prev, [field]: [] }));
        });
    } else {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
      setShowSuggestions((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSuggestionClick = (field, suggestion) => {
    setFormData({ ...formData, [field]: suggestion });
    setCustomerInfo({ ...customerInfo, [field]: suggestion });
    setShowSuggestions((prev) => ({ ...prev, [field]: false }));
  };

  const renderAutocompleteInput = (field, label) => (
    <div className="relative">
      <label className="text-sm font-bold">{label}</label>
      <Input
        name={field}
        value={customerInfo?.[field] || ""}
        onChange={(e) => {
          handleInputChange(e);
          fetchSuggestions(field, e.target.value);
        }}
        onFocus={() =>
          setShowSuggestions((prev) => ({
            ...prev,
            [field]: suggestions[field]?.length > 0,
          }))
        }
        onBlur={() =>
          setTimeout(() => {
            setShowSuggestions((prev) => ({ ...prev, [field]: false }));
          }, 200)
        }
      />
      {showSuggestions[field] && (
        <div className="absolute z-10 w-full overflow-y-auto bg-white border rounded shadow max-h-40">
          {suggestions[field]?.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(field, suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get Started with the Basic Information</p>
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
          {renderAutocompleteInput("street", "Street")}
          {renderAutocompleteInput("area", "Area")}
          {renderAutocompleteInput("village", "Village")}
          {renderAutocompleteInput("district", "District")}
          <div>
            <label className="text-sm font-bold">Pincode</label>
            <Input
              name="pincode"
              onChange={handleInputChange}
              defaultValue={customerInfo?.pincode}
            />
          </div>
          {renderAutocompleteInput("state", "State")}
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
  );
}


export default PersonalDetail;

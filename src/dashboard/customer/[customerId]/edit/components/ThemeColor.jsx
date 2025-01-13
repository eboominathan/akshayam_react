import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { CustomerInfoContext } from "@/context/CustomerInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];

  const { customerInfo, setCustomerInfo } = useContext(CustomerInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { customerId } = useParams();
  
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setCustomerInfo({
      ...customerInfo,
      theme_color: color,
    });
    const data = {    
      theme_color: color,     
    };
    GlobalApi.UpdateCustomerDetail(customerId, data).then((resp) => {   
      toast("Theme Color Updated");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index} // Adding key to ensure each element has a unique key
              onClick={() => onColorSelect(color)}
              className={`h-5 w-5 rounded-full cursor-pointer
                hover:border-black border
                ${selectedColor === color && "border border-black"}`}
              style={{ background: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;

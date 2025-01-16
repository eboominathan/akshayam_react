import { Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import GlobalApi from '../../service/GlobalApi';
import { toast } from 'sonner';

function CustomerCardItem({ customer, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    GlobalApi.DeleteCustomerById(customer.id)
      .then(() => {
        toast.success('Customer Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      })
      .catch(() => {
        toast.error('Failed to delete customer.');
        setLoading(false);
      });
  };

  return (
    <div className="customer-card">
      {/* Upper Card Section with Link */}
      <Link to={`/dashboard/customer/${customer.id}/edit`}>
        <div
          className="p-6 border-t-4 rounded-t-lg customer-card__header bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200"
          style={{ borderColor: customer?.theme_color }}
        >
          <div className="flex items-center justify-center h-40">
            <img
              src={customer.photo}
              alt={`${customer.title} Avatar`}
              className="border rounded-full"
              width={80}
              height={80}
            />
          </div>
        </div>
      </Link>

      {/* Lower Card Section */}
      <div
        className="flex items-center justify-between p-3 text-white border rounded-b-lg shadow-lg customer-card__footer"
        style={{ background: customer?.theme_color }}
      >
        <div>
          <h2 className="text-sm font-bold">{customer.title}</h2>
          <p className="text-xs">{customer.street}</p>
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/customer/${customer.id}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-customer/${customer.id}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Alert Dialog */}
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete this customer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CustomerCardItem;

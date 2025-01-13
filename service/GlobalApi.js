import axios from "axios";


const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL+"/api/",
     headers:{
         'Content-Type':'application/json'    
     }
})
if(localStorage.getItem('token')){
    axiosClient.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem('token')}`
}

const RegisterUser=(data)=>axiosClient.post('/users',data);
const CreateNewCustomer=(data)=>axiosClient.post('/customer-details',data);

const GetUserCustomers=()=>axiosClient.get('/customer-details');

const UpdateCustomerDetail=(id,data)=>axiosClient.put('/customer-details/'+id,data)

const GetCustomerById=(id)=>axiosClient.get('/customer-details/'+id+"?populate=*")

const DeleteCustomerById=(id)=>axiosClient.delete('/customer-details/'+id)

/*  Family Details  */
const UpdateFamilyDetail=(id,data)=>axiosClient.put('/family-details/'+id,data)

export default{
    RegisterUser,
    CreateNewCustomer,
    GetUserCustomers,
    UpdateCustomerDetail,
    GetCustomerById,
    DeleteCustomerById,
    UpdateFamilyDetail 
}

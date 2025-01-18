import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './home'
import { ClerkProvider } from '@clerk/clerk-react'
import EditCustomer from './customers/customer/[customerId]/edit'
import ViewCustomer from './my-customer/[customerId]/view'
import Customers from './customers'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router = createBrowserRouter([
    {      
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/customers',
          element: <Customers />,
        },
        {
          path: '/customers/:customerId/edit',
          element:<EditCustomer />
        },
      ]
    },
    {
      path: '/auth/sign-in',
      element: <SignInPage />,
    },  
    {
      path:'/my-customer/:customerId/view',
      element:<ViewCustomer/>
    }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <RouterProvider router={router} />      
    </ClerkProvider>
  </StrictMode>
)

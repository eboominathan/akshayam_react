import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './home'
import Dashboard from './dashboard'
import { ClerkProvider } from '@clerk/clerk-react'
import EditCustomer from './dashboard/customer/[customerId]/edit'
import ViewCustomer from './my-customer/[customerId]/view'

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
          element: <Dashboard />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/dashboard/customer/:customerId/edit',
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

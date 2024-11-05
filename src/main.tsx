import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Home from '@/UI/home.tsx'
import SignUpForm from '@/UI/authentication.tsx'
import LandingPage from '@/UI/landingPage.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm signingUp={true}/>} />
      <Route path="/login" element={<SignUpForm signingUp={false}/>} />
      <Route path="/home" element={<Home/>}/>
      {/* ... etc. */}
    </>
  )
);

createRoot(document.getElementById('root')!).render(
 
  <Provider>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode> 
  </Provider>

)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Home from '@/UI/home.tsx'
import SignInForm from '@/UI/login'
import SignUpForm from '@/UI/signup'
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
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="" element={<Home/>}/>
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

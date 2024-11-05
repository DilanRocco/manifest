import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Main from './UI/Manifest.tsx'
import SignUpForm from '@/UI/authentication.tsx'
import LandingPage from './UI/LandingPage.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignUpForm />} />
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

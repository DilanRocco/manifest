import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Home from '@/UI/home.tsx'
import SignInForm from '@/UI/login'
import SignUpForm from '@/UI/signup'
import Trends from '@/UI/trends'
import ProtectedProvider from '@/UI/protectedPage.tsx'
import { client}  from '@/services/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client'




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route
        path="/trends"
        element={
          <ProtectedProvider>
            <Trends />
          </ProtectedProvider>
        } />
      <Route
        path=""
        element={
          <ProtectedProvider>
            <Home />
          </ProtectedProvider>
        }
      />
    </>
  )
);
createRoot(document.getElementById('root')!).render(
<ApolloProvider client={client}>
  <Provider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
 </ApolloProvider>

)

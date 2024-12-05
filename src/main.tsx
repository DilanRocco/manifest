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
import { FestProvider } from './provider/databaseProvider'
import BenefitsPage from './UI/benefits'
import ReadView from './UI/ReadView'
import SettingsPage from './UI/settings'




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/benefits" element={<BenefitsPage />} />
      <Route
        path="/trends"
        element={
          <ProtectedProvider>
            <FestProvider>
              <Trends />
            </FestProvider> 
          </ProtectedProvider>
        } />

      <Route
        path="/settings"
        element={
          <ProtectedProvider>
            <FestProvider>
              <SettingsPage />
            </FestProvider> 
          </ProtectedProvider>
        } />

      <Route
        path="/read-view"
        element={
          <ProtectedProvider>
            <FestProvider>
              <ReadView />
            </FestProvider> 
          </ProtectedProvider>
        } />
      <Route
        path=""
        element={
          <ProtectedProvider>
            <FestProvider>
              <Home />
            </FestProvider>
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

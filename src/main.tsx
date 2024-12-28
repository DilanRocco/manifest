import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Home from '@/UI/home.tsx'
import SignInForm from '@/UI/login'
import SignUpForm from '@/UI/signup'
import Trends from '@/UI/trends'
import { ProtectedProvider }from '@/UI/protectedPage.tsx'
import { client}  from '@/services/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client'
import { FestProvider } from './provider/databaseProvider'
import BenefitsPage from './UI/benefits'
import ReadView from './UI/ReadView'
import SettingsPage from './UI/settings'
import { AuthProvider } from './provider/authProvider'
import { HowToPage } from './UI/how-to'
import { ResetPasswordPage } from './UI/resetPassword'
import GoalView from './UI/goal-view'
import VerticalScrollNav from './UI/VerticalScroll'




interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => (
  <ProtectedProvider>
    <FestProvider>{children || <Outlet />}
    </FestProvider>

  </ProtectedProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
     
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<SignInForm />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
     
      
      <Route element={<ProtectedRoute/>}>
        <Route path="" element={<VerticalScrollNav />} /> 
        <Route path="/trends" element={<Trends />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Route>
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
<ApolloProvider client={client}>
<AuthProvider>
  <Provider theme={"dark"}>
    
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    
  </Provider>
  </AuthProvider>
 </ApolloProvider>

)

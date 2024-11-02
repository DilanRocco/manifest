import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "../src/components/ui/provider"
import './index.css'
import Main from './UI/Manifest.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider>
  <StrictMode>
    <Main />
  </StrictMode>
  </Provider>,
)

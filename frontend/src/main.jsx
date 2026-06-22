import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter } from 'react-router-dom'
import UserDataProvider from './DataContex/UserData.jsx'
import WhatAIDataProvider from './DataContex/WhatAIData.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <UserDataProvider>
          <WhatAIDataProvider>
            <App />
          </WhatAIDataProvider>
        </UserDataProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ShoppingPage } from './ShoppingPage'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/User/authContext'



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <BrowserRouter>
      <ShoppingPage/>    
      </BrowserRouter>
     </AuthProvider>
    

  </StrictMode>,
)

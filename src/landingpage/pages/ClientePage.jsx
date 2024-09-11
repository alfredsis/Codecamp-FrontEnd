import React from 'react'
import Typography from '@mui/material/Typography'
import { ProductosCards } from './components/ProductosCards'
import { CheckOutPage } from '../components/CheckOutPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { OrdenCliente } from './Cliente/OrdenCliente'

export const ClientePage = () => {
  return (
  <>
    
   {/* <CheckOutPage/> */}
  

       <Routes>
            <Route path='/' element={<ProductosCards />} />   
            <Route path='/checkout' element={<CheckOutPage />} /> 
            <Route path='/orden' element={<OrdenCliente/>} />   
            <Route path='/*' element={ <Navigate to="/" />} />
                     
    
        </Routes>

    
    

  </>
  )
}

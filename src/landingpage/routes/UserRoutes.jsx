import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { CheckOutPage } from '../components/CheckOutPage'
import { ProductosCards } from '../pages/components/ProductosCards'
import { ProductProvider } from '../../context/Productos/productosContext'
import { ShoppingLayout } from '../layout/shoppingLayout'
import { OrdenProvider } from '../../context/Ordenes/ordenesContext'

export const UserRoutes = () => {
  return (
    <ProductProvider>
      <OrdenProvider>
      <ShoppingLayout>

       

        <Routes>
            <Route path='/home/*' element={ <HomePage/>} />            
            <Route path='/*' element={ <Navigate to="/home" />} />
                     
    
        </Routes>
      </ShoppingLayout>
      </OrdenProvider>
    </ProductProvider>
  )
}

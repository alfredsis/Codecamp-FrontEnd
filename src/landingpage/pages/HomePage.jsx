
import React, { useContext } from 'react'
import { ShoppingLayout } from '../layout/shoppingLayout'
import { Typography } from '@mui/material'
import { ClientePage } from './ClientePage'
import { OperadorPage } from './OperadorPage'
import { AuthContext } from '../../context/User/authContext'
import { Route } from 'react-router-dom'
import { ProductProvider } from '../../context/Productos/productosContext'

export const HomePage = () => { 
  const{ authState, logOutUser, loginUser  } = useContext(AuthContext);

  return (
    <>   
     

      {
        (authState.user.rol_idrol === 1)
        ? <ClientePage /> 
        : (authState.user.rol_idrol === 2)
          ? <OperadorPage /> 
          : null 
      }      
     
        
   
    </>
  )
}

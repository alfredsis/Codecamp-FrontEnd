import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { UserRoutes } from '../landingpage/routes/UserRoutes'
import { AuthContext } from '../context/User/authContext'
import { CheckingAuth } from '../landingpage/components/CheckingAuth'


export const AppRouter = () => {

    const{ authState, logOutUser, loginUser  } = useContext(AuthContext);
   
  
    useEffect(() => {    
      if(!authState.user){ logOutUser(); }

    }, [authState.user])    

    if(authState.isAuthenticated == 'checking'){
      return <CheckingAuth/>
    }



  return (
    <Routes>
             

          {
            (authState.isAuthenticated =='auth')
            ?  <Route path="/*" element={ <UserRoutes/>} />
            : <Route path="/auth/*" element={ <AuthRoutes/>} />
          }

          
            <Route path="/*" element={ <Navigate to='/auth/login'/>} />
            
       

    </Routes>
  )
}

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem('token') ? 'auth' : 'no-auth',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
  });

  const registerUser = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/registrar', data);
     
    

      
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/login', data);
      console.log(response.data);
      
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      localStorage.setItem('token', response.data.token);

      setAuthState({
        isAuthenticated: 'auth',
        user: response.data.usuario,
        token: response.data.token,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
   
    setAuthState({
      isAuthenticated: 'no-auth',
      user: null,
      token: null,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthState({
        isAuthenticated: 'auth',
        user: JSON.parse(user),
        token: token,
      });
    }
  }, []);

  return(
    <AuthContext.Provider value={{ authState, registerUser, loginUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

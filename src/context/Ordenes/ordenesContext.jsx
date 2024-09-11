import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "../User/authContext";

export const OrdenContext = createContext();

export const OrdenProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);

    const initialOrdenState = () => {
        const savedState = localStorage.getItem('ordenState');
        return savedState ? JSON.parse(savedState) : { ordenes: [], categorias: [] };
    };

    const [ordenState, setOrdenState] = useState(initialOrdenState);

    useEffect(() => {
        localStorage.setItem('ordenState', JSON.stringify(ordenState));
    }, [ordenState]);

    const obtenerOrdenesUsuario = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ordenes', {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            const ordenes = response.data;
            const ordenesFiltradas = ordenes.filter(orden => orden.usuarios_idusuarios === authState.user.idusuarios);
            setOrdenState(prevState => ({ ...prevState, ordenes: ordenesFiltradas }));
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    };

    const obtenerOrdenes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ordenes', {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            setOrdenState(prevState => ({ ...prevState, ordenes: response.data }));
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    };

    const crearOrden = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/ordenes', data, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            console.log('Orden creada:', response.data);
            obtenerOrdenes(); 
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    const verCategoria = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categorias', {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            setOrdenState(prevState => ({ ...prevState, categorias: response.data }));
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const crearCategoria = async (data) => {  
        try {
            const response = await axios.post('http://localhost:3000/categorias',data, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            console.log('Categoria creada:', response.data);
            
        } catch (error) {
            console.error('Error al crear la categoria:', error);
        }
    };

    return (
        <OrdenContext.Provider value={{
            ordenState,
            obtenerOrdenes,
            crearOrden,
            obtenerOrdenesUsuario,
            verCategoria,
            crearCategoria
        }}>
            {children}
        </OrdenContext.Provider>
    );
};

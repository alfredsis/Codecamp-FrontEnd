import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "../User/authContext";

export const ProductContext = createContext();

export const ProductProvider = ({children}) =>{
    const { authState } = useContext(AuthContext);

    const [prodState, setProdState] = useState({
        productos: [],
        carrito: JSON.parse(localStorage.getItem('carrito')) || [],
    });

    const verProductos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/productos', {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            setProdState(prevState => ({ ...prevState, productos: response.data }));
        } catch (error) {
            console.error('Error al traer los productos:', error);
        }
    };

    const agregarAlCarrito = (producto) => {
        setProdState(prevState => {
            const carritoActual = [...(prevState.carrito || [])];
            const productoExistente = carritoActual.find(p => p.idProductos === producto.idProductos);

            if (productoExistente) {
                productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
            } else {
                carritoActual.push({ ...producto, cantidad: 1 });
            }
            return {
                ...prevState,
                carrito: carritoActual
            };
        });
    };

    const incrementarCantidad = (idProductos) => {
        setProdState(prevState => {
            const carritoActual = [...(prevState.carrito || [])];
            const producto = carritoActual.find(p => p.idProductos === idProductos);

            if (producto) {
                producto.cantidad += 1;
            }

            return {
                ...prevState,
                carrito: carritoActual
            };
        });
    };

    const decrementarCantidad = (idProductos) => {
        setProdState(prevState => {
            const carritoActual = [...(prevState.carrito || [])];
            const producto = carritoActual.find(p => p.idProductos === idProductos);

            if (producto) {
                if (producto.cantidad > 1) {
                    producto.cantidad -= 1;
                } else {
                    return {
                        ...prevState,
                        carrito: carritoActual.filter(p => p.idProductos !== idProductos)
                    };
                }
            }

            return {
                ...prevState,
                carrito: carritoActual
            };
        });
    };

    const vaciarCarrito = () => {
        setProdState(prevState => ({
            ...prevState,
            carrito: []
        }));
    };

    
    
    const createProduct = async (data) => {  
        try {
            const response = await axios.post('http://localhost:3000/productos',data, {
                headers: {
                    'Authorization': `Bearer ${authState.token}`,
                }
            });
            console.log('Producto creado:', response.data);
            
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };
    
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(prodState.carrito));
    }, [prodState.carrito]);
    return (
        <ProductContext.Provider value={{ 
            prodState, 
            verProductos, 
            agregarAlCarrito, 
            incrementarCantidad, 
            decrementarCantidad,
            vaciarCarrito,
            createProduct   
        }}>
            {children}
        </ProductContext.Provider>
    );
}

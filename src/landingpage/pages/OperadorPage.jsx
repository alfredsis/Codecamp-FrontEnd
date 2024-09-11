
import { ProductosCreacion } from "./components/ProductosCreacion"
import { Ordenes } from "./components/Ordenes"
import { ProductosVista } from "./components/ProductosVista"
import { Navigate, Route, Routes } from 'react-router-dom'
import { Categorias } from "./Operador/Categorias"


export const OperadorPage = () => {
  return (
    <>
    {/* <Ordenes/> */}

 
    {/* <ProductosVista/> */}

        <Routes>
            <Route path='/' element={<Ordenes />} />   
            <Route path='/categorias' element={<Categorias/>} />   
            <Route path='/productos' element={<ProductosCreacion/>} />
            <Route path='/ordenes ' element={<Ordenes/>} />    
          
            <Route path='/*' element={ <Navigate to="/" />} />                   
        </Routes>


    </>

  )
}

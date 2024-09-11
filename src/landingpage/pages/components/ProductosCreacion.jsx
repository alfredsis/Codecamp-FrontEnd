
import { CloudUpload } from '@mui/icons-material';
import {  FormControl, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductContext } from '../../../context/Productos/productosContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'

const schema = yup.object().shape({
  CategoriaProductos_idCategoriaProductos: yup.number().required('La categoría es obligatoria'),
  nombre: yup.string().required('El nombre es obligatorio'),
  marca: yup.string().required('La marca es obligatoria'),
  codigo: yup.string().required('El código es obligatorio'),
  stock: yup.number().required('El stock es obligatorio'),
  precio: yup.number().required('El precio es obligatorio'),
});


export const ProductosCreacion = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      CategoriaProductos_idCategoriaProductos: '',
      nombre: '',
      marca: '',
      codigo: '',
      stock: '',
      precio: '',
      
    }
  });
  
  const { prodState, verProductos, createProduct } = useContext(ProductContext);  
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    verProductos();
  }, []); 


  const handleDesactivarProducto = (desProd) => {
    // const updatedProducto = { ...producto, estados_idestados: 2 };
    // desactivarProducto(updatedProducto);

    // console.log(desProd);
    console.log(desProd)
  };

const onSubmit = async(data) => {
  createProduct(data);
  reset();
  setShowAlert(true);
    
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];        
        console.log(file);
      };
   
  return (
   <>
     <Grid component="form" onSubmit={handleSubmit(onSubmit)} container sx={{ padding: 5 }}>
      <FormControl className="box-shadow" sx={{ padding: 5, backgroundColor: 'white' }}>
        <Controller
          name="CategoriaProductos_idCategoriaProductos"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Categoria de Productos"
              variant="standard"
              error={!!errors.CategoriaProductos_idCategoriaProductos}
              helperText={errors.CategoriaProductos_idCategoriaProductos ? errors.CategoriaProductos_idCategoriaProductos.message : ''}
            />
          )}
        />
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              variant="standard"
              error={!!errors.nombre}
              helperText={errors.nombre ? errors.nombre.message : ''}
            />
          )}
        />
        <Controller
          name="marca"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marca"
              variant="standard"
              error={!!errors.marca}
              helperText={errors.marca ? errors.marca.message : ''}
            />
          )}
        />
        <Controller
          name="codigo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Código"
              variant="standard"
              error={!!errors.codigo}
              helperText={errors.codigo ? errors.codigo.message : ''}
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Stock"
              variant="standard"
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ''}
            />
          )}
        />
        <Controller
          name="precio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Precio"
              variant="standard"
              sx={{ pb: 2 }}
              error={!!errors.precio}
              helperText={errors.precio ? errors.precio.message : ''}
            />
          )}
        />

        <label htmlFor="upload-button-file">
          <input
            style={{ display: 'none' }}
            id="upload-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <Button variant="contained" component="span" startIcon={<CloudUpload />}>
            Subir Foto
          </Button>
        </label>

        <Button sx={{ mt: 2 }} variant="contained" color="secondary" type="submit">
          Crear Producto
        </Button>
      </FormControl>
    </Grid>

    <Grid container sx={{ padding:5}} >
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Id Producto</TableCell>
                <TableCell align="right">Producto</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Foto</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {prodState.productos.map((producto) => (
                <TableRow
                key={producto.idProductos}              
                >
                <TableCell component="th" scope="row">
                    {producto.idProductos}
                </TableCell>
                <TableCell align="right">{producto.nombre}</TableCell>                
                <TableCell align="right">{producto.CategoriaProductos_idCategoriaProductos}</TableCell>
                <TableCell align="right">{producto.marca}</TableCell>
                <TableCell align="right">{producto.stock}</TableCell>
                <TableCell align="right">{producto.estados_idestados}</TableCell>
                <TableCell align="right">{producto.precio}</TableCell>
                <TableCell align="right">{producto.foto}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="primary">Actualizar</Button>
                    <Button onClick={() =>handleDesactivarProducto(producto.idProductos)} variant="outlined" color="error">Desactivar</Button>
                </TableCell>
                </TableRow>
            ))}           

            </TableBody>
        </Table>
            </TableContainer>
        </Grid>     

   
   </>
  )
}

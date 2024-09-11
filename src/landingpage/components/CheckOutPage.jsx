import React, { useContext, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { ShoppingLayout } from '../layout/shoppingLayout'
import Grid from '@mui/material/Grid2'
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline, HowToReg, Inventory2 } from '@mui/icons-material';
import { Alert, Button, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper  } from '@mui/material';
import { ProductContext } from '../../context/Productos/productosContext';
import { AuthContext } from '../../context/User/authContext';
import { OrdenContext } from '../../context/Ordenes/ordenesContext';


const schema = yup.object().shape({
  nombre_completo: yup.string().required('El nombre completo es obligatorio'),
  direccion: yup.string().required('La direccion es obligatoria'),
  telefono: yup.string().required('El telefono es obligatorio'),
  fecha_entrega: yup.date().required('La fecha de entrega es obligatoria'),
  correo_electronico: yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es obligatorio'),
  
}); 




export const CheckOutPage = () => {

  const { prodState, vaciarCarrito  } = useContext(ProductContext);
  const { carrito = [] } = prodState;
  const { authState } = useContext(AuthContext);
  const {crearOrden} = useContext(OrdenContext);
  const total = carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);

  const [showAlert, setShowAlert] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre_completo: '',
      direccion: '',
      telefono: '',
      fecha_entrega: '',
      correo_electronico: ''
    }
  });

  
  const onSubmit = async(data) => {  
    const orderData = {
      orden: {
        ...data,
        usuarios_idusuarios: authState.user.idusuarios
      },
      detalles: carrito.map(item => ({
        productos_idProductos: item.idProductos,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    };

     
      crearOrden(orderData);
      vaciarCarrito();
      reset();
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



  return (
  <>
  
   
    <Grid container direction='row' alignItems='center' sx={{ padding:10}} justifyContent='center' spacing={5} >
    {showAlert && (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="success">
          Orden creada satisfactoriamente
        </Alert>
      )}
      
      <Grid size={{ xs: 8, md: 8 }}>

     

      {carrito.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Detalles
                    </TableCell>
                    <TableCell align="right">Precio</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Descripción</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carrito.map(item => (
                    <TableRow key={item.idProductos}>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell align="right">{item.cantidad}</TableCell>
                      <TableCell align="right">${item.precio}</TableCell>
                      <TableCell align="right">${item.cantidad * item.precio}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">${total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h6" align="center">
              No hay productos en el carrito.
            </Typography>
          )}


      </Grid>



      <Grid size={{ xs: 4, md: 4 }}>
        
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Grid size={{xs:8, sm:6, md:4, lg:2}} className="box-shadow" sx={{ backgroundColor: 'white', padding: 2 }}>
          <Grid direction="column" sx={{ padding: 2 }} justifyContent="center">
            <Grid container direction="row" justifyContent='center' alignItems="center" className="animate__animated animate__fadeIn animate__fast">
              <Inventory2 sx={{ color: 'primary.dark' }} fontSize="large" />
              <Typography variant="h5" sx={{ m: 1, fontWeight: 500, color: 'primary.dark' }}>
                Generacion de orden
              </Typography>
            </Grid>

            <Grid component='form' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="nombre_completo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre completo"
                    type="text"
                    placeholder="Tu nombre"
                    fullWidth
                    sx={{ mt: 1, mb:1 }}
                    error={!!errors.nombre_completo}
                    helperText={errors.nombre_completo ? errors.nombre_completo.message : ''}
                  />
                )}
              />

                <Controller
                  name="direccion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Direccion"
                      type="text"
                      placeholder="Tu direccion"
                      fullWidth
                      sx={{ mt: 1, mb:1 }}
                      error={!!errors.direccion}
                      helperText={errors.direccion ? errors.direccion.message : ''}
                    />
                  )}
                />

              

              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    type="text"
                    placeholder="Tu teléfono"
                    fullWidth
                    sx={{ mt: 1, mb:1 }}
                    error={!!errors.telefono}
                    helperText={errors.telefono ? errors.telefono.message : ''}
                  />
                )}
              />

              <Controller
                name="fecha_entrega"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Entrega"
                    type="date"
                    fullWidth
                    sx={{ mt: 1, mb:1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.fecha_entrega}
                    helperText={errors.fecha_entrega ? errors.fecha_entrega.message : ''}
                  />
                )}
              />

              <Controller
                name="correo_electronico"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Correo"
                    type="email"
                    placeholder="email"
                    fullWidth
                    sx={{ mt: 1, mb:1, backgroundColor: 'primary.inputFont' }}
                    error={!!errors.correo_electronico}
                    helperText={errors.correo_electronico ? errors.correo_electronico.message : ''}
                  />
                )}
              />

              

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: 'primary.main', padding: 1 }}
                type="submit"
              >
                Realizar Pedido
              </Button>

             
            </Grid>
          </Grid>
         
        </Grid>
      </Grid>

      </Grid>
    </Grid>

 
  </>
  )
}

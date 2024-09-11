import React, { useContext, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Button, Card, CardActions, CardContent,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { OrdenContext } from '../../../context/Ordenes/ordenesContext';

const rows = [
    { name: 'Producto A', quantity: 10, price: 25.00 },
    { name: 'Producto B', quantity: 5, price: 40.00 },
    { name: 'Producto C', quantity: 8, price: 30.00 }
  ];

export const OrdenCliente = () => {

    const { ordenState, obtenerOrdenesUsuario  } = useContext(OrdenContext);    
   
    useEffect(() => {
      obtenerOrdenesUsuario();
    }, []); 

    const formatFecha = (fecha) => {
        return new Date(fecha).toISOString().split('T')[0];
      };



  return (
    <>
       <Grid container justifyContent='center' sx={{pt:5}}>
       <Typography  variant="h3" color="initial">Mis ordenes</Typography>
       </Grid>

        <Grid container  sx={{ padding:10}} justifyContent='center' spacing={5} >

      

        {ordenState.ordenes.map((orden, index) => (
          <Grid  key={index}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  Total Orden
                </Typography>
                <Typography variant="h5" component="div">
                  ${orden.total_orden}
                </Typography>
                <Typography sx={{ color: 'text.primary', mb: 1.5 }}>Fecha: {formatFecha(orden.fecha_creacion)}</Typography>        
                <Typography sx={{ color: 'text.primary' }}>Nombre: {orden.nombre_completo}</Typography>  
                <Typography sx={{ color: 'text.primary' }}>Dirección: {orden.direccion}</Typography>  
                <Typography sx={{ color: 'text.primary' }}>Teléfono: {orden.telefono}</Typography>         
              </CardContent>        
            </Card>
          </Grid>
        ))}
        </Grid>
    </>
  )
}

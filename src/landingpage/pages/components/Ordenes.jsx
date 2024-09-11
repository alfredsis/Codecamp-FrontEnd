import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { OrdenContext } from '../../../context/Ordenes/ordenesContext';
import { useContext, useEffect } from 'react';


  
  export const Ordenes = () => {

    const { ordenState, obtenerOrdenes  } = useContext(OrdenContext);    
   
    useEffect(() => {
        obtenerOrdenes();
        
    }, []); 

    return (
      <>

        <Grid container sx={{ padding:5}} >
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Numero de Orden</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Telefono</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Accion</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {ordenState.ordenes.map((orden) => (
                <TableRow
                key={orden.idOrden}              
                >
                <TableCell component="th" scope="row">
                    {orden.idOrden}
                </TableCell>
                <TableCell align="right">{orden.nombre_completo}</TableCell>
                <TableCell align="right">{orden.correo_electronico}</TableCell>
                <TableCell align="right">{orden.telefono}</TableCell>
                <TableCell align="right">{orden.total_orden}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="primary">Aceptar</Button>
                    <Button variant="outlined" color="error">Rechazar</Button>
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
  
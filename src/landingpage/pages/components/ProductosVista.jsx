import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'

const array = [
    { idProducto: '3', nombre: 'Leche entera ', marca: 'Lala', codigo:'456214', stock: 250, precio: '22' },
    { idProducto: '5', nombre: 'Jugo de manzana', marca: 'Kerns', codigo:'6555', stock: 200, precio: '8.50' },
    { idProducto: '6', nombre: 'Frijoles volteados', marca: 'Ducal', codigo:'99874', stock: 195, precio: '12.50' },
    { idProducto: '7', nombre: 'Cargo Jeans', marca: 'No boundaries', codigo:'63387', stock: 75, precio: '250' },
    { idProducto: '8', nombre: 'Jabon', marca: 'Protex', codigo:'77454', stock: 250, precio: '7.50' }
  ];

export const ProductosVista = () => {
  return (
    <>
    <Grid container sx={{ padding:5}} >
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Id Producto</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Codigo</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Precio</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {array.map((row) => (
                <TableRow
                key={row.idProducto}              
                >
                <TableCell component="th" scope="row">
                    {row.idProducto}
                </TableCell>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">{row.marca}</TableCell>
                <TableCell align="right">{row.codigo}</TableCell>
                <TableCell align="right">{row.precio}</TableCell>
                <TableCell align="right">
                    <Button variant="outlined" color="success">Actualizar</Button>
                    <Button variant="outlined"  sx={{ color: 'error.light' }}>Deshabilitar</Button>
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

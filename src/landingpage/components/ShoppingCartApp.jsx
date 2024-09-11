import { AddCircle, Delete, RemoveCircle, ShoppingBag } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Divider, IconButton, List, ListItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../context/Productos/productosContext';


export const ShoppingCartApp = () => {

    const { prodState, incrementarCantidad, decrementarCantidad, vaciarCarrito  } = useContext(ProductContext);
    const { carrito = [] } = prodState;
    
  return (
   <>
    <Grid container flexDirection='column'>

        <Grid>
            <Box sx={{display: 'flex', flexDirection:'row', alignItems:'center',ml:2, mt:3}}>
                <IconButton>
                    <ShoppingBag/>
                </IconButton>
                <Typography variant="h6" > {carrito.length} articulos</Typography>                
            </Box>

            <List>
            {carrito.map((producto) => (
              <ListItem key={producto.idProductos}>
                <Grid container>
                  <Grid container direction="column" alignItems='center' sx={{ pr: 1 }}>
                        <IconButton sx={{ padding: 0 }} aria-label="add" onClick={() => incrementarCantidad(producto.idProductos)}>
                        <AddCircle />
                        </IconButton>
                        <Typography variant='subtitle2'>{producto.cantidad}</Typography>
                        <IconButton sx={{ padding: 0 }} aria-label="remove" onClick={() => decrementarCantidad(producto.idProductos)}>
                        <RemoveCircle />
                        </IconButton>
                  </Grid>

                  <Grid container spacing={1} alignItems="center">
                    <Box
                      component='img'
                      sx={{ height: 75 }}
                      src={producto.foto ? `data:image/png;base64,${producto.foto}` : 'https://via.placeholder.com/75x75'}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='body1'>{producto.nombre}</Typography>
                      <Typography variant='subtitle2'>${producto.precio}</Typography>
                      <Typography variant='subtitle2'>${producto.cantidad * producto.precio}</Typography>
                    </Box>
                    <IconButton aria-label="trash">
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>

            <Divider/>
        </Grid>


        <Grid container direction="column" sx={{pl:3, pr:3, mt:2}}  spacing={2} alignContent="center">
            <Button variant="contained" color="primary" fullWidth  component={Link} to={"/home/checkout"}>
              Proceder a comprar
            </Button>
            <Button variant="outlined" color="error" fullWidth onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>

        </Grid>

    </Grid>
   </>
  )
}

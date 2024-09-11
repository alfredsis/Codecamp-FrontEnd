import { Add } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useContext } from 'react'
import { ProductContext } from '../../../context/Productos/productosContext'
import { useEffect } from 'react'


export const ProductosCards = () => {
   
 

    const { prodState, verProductos, agregarAlCarrito  } = useContext(ProductContext);    
   
      useEffect(() => {
        verProductos();
      }, []); 

  return (
    <>
        


        <Grid container alignItems='center' sx={{ padding:10}} justifyContent='center' spacing={5} >
            {
                 prodState.productos.map((producto) => (
                    <Grid key={producto.idProductos}  xs={6} md={4} lg={2}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={producto.foto ? `data:image/png;base64,${producto.foto}` : 'https://placehold.co/300x300'}
                        sx={{ width: '100%', height: '100%' }}
                      />
                      <CardContent>
                        <Typography variant="h5">${producto.precio}</Typography>
                        <Typography variant="h6">{producto.nombre}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => agregarAlCarrito(producto)} variant='contained' startIcon={<Add />}>Agregar</Button>
                      </CardActions>
                    </Card>
                  </Grid>    
                ) )
            }
        </Grid>


    </>
  )
}

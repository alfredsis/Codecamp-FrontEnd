import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { NavBar } from '../components/NavBar'
import { Drawer, Toolbar } from '@mui/material'
import { ShoppingCartApp } from '../components/ShoppingCartApp'

export const ShoppingLayout = ({children}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
        <Grid container>
           <NavBar setOpen={setOpen} />           
            <Drawer className='boxy' anchor="right" open={open} onClose={ ()=> setOpen(false)}>
              <ShoppingCartApp/>     
            </Drawer>
            
            
            <Grid component="main" sx={{ width: '100%' }} >
              <Toolbar/>
                {children}
            </Grid>

        </Grid>
    </>
  )
}

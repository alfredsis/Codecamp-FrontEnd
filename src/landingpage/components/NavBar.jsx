import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Menu, MenuItem, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { AuthContext } from '../../context/User/authContext';

const rolePages = {
  1: [
    { name: 'Home', path: '/home' },
    { name: 'Ordenes', path: '/home/orden' }
  ],
  2: [
    { name: 'Home', path: '/home' },
    { name: 'Productos', path: '/home/productos' },
    { name: 'Categorias', path: '/home/categorias' },
    { name: 'Ordenes', path: '/home/ordenes' }
  ]
};

export const NavBar = ({ setOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logOutUser, authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {  
    navigate(path); 
    handleClose(); 
  };
  const pagesToShow = rolePages[authState.user.rol_idrol] || [];
  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

      <Grid container direction='row'>
          {pagesToShow.map((page) => (
            <MenuItem key={page.name} component={Link} to={page.path} onClick={() => handleNavigation(page.path)}>
              <Typography sx={{ textAlign: 'center', color: 'white' }}>{page.name}</Typography>
            </MenuItem>
          ))}
        </Grid>



        <Grid>
          <IconButton onClick={handleMenu}>
            <AccountCircle sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}           
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={() => {
              handleClose();
             
            }}
          >
            <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              logOutUser();
            }}>Cerrar Sesión</MenuItem>
          </Menu>

          <IconButton onClick={() => setOpen(true)}>
            <ShoppingCart sx={{ color: 'white' }} />
          </IconButton >
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

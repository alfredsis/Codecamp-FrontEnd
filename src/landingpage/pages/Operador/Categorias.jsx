import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, FormControl, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { OrdenContext } from '../../../context/Ordenes/ordenesContext';


const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  estados_idestados: yup.number().required('El estado es obligatorio'),
});

export const Categorias = () => {
    const { ordenState, verCategoria, crearCategoria  } = useContext(OrdenContext);  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: '',
      estados_idestados: '',
    }
  });


  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    verCategoria();
  }, []);

  const onSubmit = async(data) => {
    console.log(data)
    crearCategoria(data);
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
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} container sx={{ padding: 5 }}>
        <FormControl className="box-shadow" sx={{ padding: 5, backgroundColor: 'white' }}>
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
            name="estados_idestados"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Estado"
                variant="standard"
                error={!!errors.estados_idestados}
                helperText={errors.estados_idestados ? errors.estados_idestados.message : ''}
              />
            )}
          />
          <Button sx={{ mt: 2 }} variant="contained" color="secondary" type="submit">
            Crear Categoría
          </Button>
        </FormControl>
      </Grid>

      <Grid container sx={{ padding: 5 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Categoria</Typography></TableCell>
                <TableCell><Typography variant="h6">Estado</Typography></TableCell>
                <TableCell><Typography variant="h6">Usuario</Typography></TableCell>
                <TableCell><Typography variant="h6">Fecha de creación</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenState.categorias.map((cat) => (
                <TableRow key={cat.idCategoriaProductos}>
                  <TableCell>{cat.nombre}</TableCell>
                  <TableCell>{cat.estados_idestados}</TableCell>
                  <TableCell>{cat.usuarios_idusuarios}</TableCell>
                  <TableCell>{cat.fecha_creacion.split('T')[0]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

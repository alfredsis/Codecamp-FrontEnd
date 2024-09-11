import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CheckCircleOutline, HowToReg } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context/User/authContext';



const schema = yup.object().shape({
  nombre_completo: yup.string().required('El nombre completo es obligatorio'),
  rol_idrol: yup.string().required('El rol es obligatorio'),
  telefono: yup.string().required('El telefono es obligatorio'),
  fecha_nacimiento: yup.date().required('La fecha de nacimiento es obligatoria'),
  correo_electronico: yup.string().email('Formato de correo electrónico no válido').required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export const RegisterPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { registerUser, authState } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors }, reset  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre_completo: '',
      rol_idrol: '',
      telefono: '',
      fecha_nacimiento: '',
      correo_electronico: '',
      password: ''
    }
  });

  const onSubmit = async(data) => {

      await registerUser(data);
      console.log('Se creó el usuario');
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
        
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Grid size={{xs:8, sm:6, md:4, lg:2}} className="box-shadow" sx={{ backgroundColor: 'white', padding: 2 }}>
          <Grid direction="column" sx={{ padding: 2 }} justifyContent="center">
            <Grid container direction="column" alignItems="center" className="animate__animated animate__fadeIn animate__fast">
              <HowToReg sx={{ color: 'primary.dark' }} fontSize="large" />
              <Typography variant="h5" sx={{ m: 1, fontWeight: 500, color: 'primary.dark' }}>
                Registro
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

              <FormControl fullWidth sx={{ mt: 1, mb:1 }}>
                <InputLabel id="rol-label">Rol</InputLabel>
                <Controller
                  name="rol_idrol"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="rol-label"
                      id="rol-select"
                      label="Rol"
                      error={!!errors.rol}
                    >
                      <MenuItem value="1">Cliente</MenuItem>
                      <MenuItem value="2">Operador</MenuItem>
                    </Select>
                  )}
                />
                {errors.rol && <Typography color="error">{errors.rol.message}</Typography>}
              </FormControl>

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
                name="fecha_nacimiento"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    sx={{ mt: 1, mb:1 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.fecha_nacimiento}
                    helperText={errors.fecha_nacimiento ? errors.fecha_nacimiento.message : ''}
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

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    fullWidth
                    sx={{ mt: 1, mb:1 }}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                )}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: 'primary.main', padding: 1 }}
                type="submit"
              >
                Crear cuenta
              </Button>

              <Grid container direction="row" justifyContent="end" alignItems="center" sx={{ mt: 1 }}>
                <Typography sx={{ mr: 1, fontSize: 13 }}>¿Ya tienes cuenta?</Typography>
                <Button variant="text" component={Link} color="secondary" to="/auth/login">
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {showAlert && (
        <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="success">
          Usuario registrado exitosamente
        </Alert>
      )}
        </Grid>
      </Grid>
    </>
  );
};

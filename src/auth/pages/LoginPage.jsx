import React, { useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { VpnKeyOffOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/User/authContext';





const schema = yup.object().shape({
  correo_electronico: yup
    .string()
    .email('Formato de correo electrónico no válido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria'),
});

export const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      correo_electronico: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <>
      <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Grid className='box-shadow' sx={{ backgroundColor: 'white', padding: 2 }}>
          <Grid direction="column" container sx={{ padding: 2 }} justifyContent='center' >
            <Grid container direction="column" alignItems='center' className='animate__animated animate__fadeIn animate__fast'>
              <VpnKeyOffOutlined sx={{ color: 'primary.dark' }} fontSize='large' />
              <Typography variant='h5' sx={{ m: 1, fontWeight: 500, color: 'primary.dark' }}>Login</Typography>
            </Grid>

            <Grid component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid >
                <Controller
                  name="correo_electronico"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Correo'
                      type='email'
                      placeholder='email'
                      fullWidth
                      sx={{ mt: 1, backgroundColor: 'primary.inputFont' }}
                      error={!!errors.correo_electronico}
                      helperText={errors.correo_electronico ? errors.correo_electronico.message : ''}
                    />
                  )}
                />
              </Grid>

              <Grid >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Contraseña'
                      type='password'
                      placeholder='Contraseña'
                      fullWidth
                      sx={{ mt: 1, backgroundColor: 'primary.inputFont' }}
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                    />
                  )}
                />
              </Grid>

              <Grid  sx={{ mb: 2, mt: 1 }} spacing={1}>
                <Grid >
                  <Button variant="contained" sx={{ padding: 1 }} fullWidth type="submit">
                    Login
                  </Button>

                  <Grid  sx={{ paddingTop: 1 }}>
                    <Button variant='contained' sx={{ padding: 1 }} fullWidth color='secondary' component={Link} to={"/auth/registrar"}>Crear Cuenta</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

import { Avatar, Button, TextField, CssBaseline, Box, Typography, Container, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { loginToFirebaseWithEmailAndPassword } from '../../dataBaseUtils/auth/authUtils';
import { useState } from 'react';
import Copyright from './CopyrightComponent';
import { CredentialsInputs, RoutePath } from '../../types';
import { emailRegExPattern, passwordRegExPattern } from '../../utils/regExPatterns';

type Props = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<RoutePath>>;
};

const theme = createTheme();

export default function LoginPage({ setSignedIn, setCurrentPage }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CredentialsInputs>();
  const [unsuccessfulLogin, setUnsuccessfulLogin] = useState<{
    status: boolean;
    message: string;
  }>({ status: false, message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginRequest = (credentials: CredentialsInputs) => {
    setUnsuccessfulLogin({ status: false, message: '' });
    setLoading(true);
    loginToFirebaseWithEmailAndPassword(credentials.email, credentials.password).then((loginResponse: any) => {
      loginResponse.status ? setSignedIn(true) : setUnsuccessfulLogin(loginResponse);
      reset();
      setLoading(false);
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {!unsuccessfulLogin.status && <Typography color='red'>{unsuccessfulLogin.message}</Typography>}
          <Box component='form' onSubmit={handleSubmit(handleLoginRequest)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email address'
              autoComplete='email'
              autoFocus
              {...register('email', {
                required: true,
                pattern: emailRegExPattern,
              })}
            />
            {errors.email && <Typography color='red'>Please enter a valid email address</Typography>}
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              {...register('password', {
                required: true,
                pattern: passwordRegExPattern,
              })}
            />
            {errors.password && <Typography color='red'>Password must be at least 8 caracters, have at least one lower case character, one uppercase character, and one digit</Typography>}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
              Sign In
            </Button>
            <Box>
              <Box>
                <Button onClick={() => setCurrentPage(RoutePath.SignUp)}>{"Don't have an account? Sign Up"}</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

import { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Copyright from './CopyrightComponent';
import { RoutePath } from '../../types';
import { emailRegExPattern, passwordRegExPattern } from '../../utils/regExPatterns';
import { cteateUserInFirebaseWithEmailAndPassword } from '../../dataBaseUtils/auth/authUtils';

type Inputs = {
  email: string;
  password: string;
};

const theme = createTheme();

type Props = {
  setSignedIn: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<RoutePath>>;
};
export default function SignUpPage({ setSignedIn, setCurrentPage }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const submitSignUpRequest = (data: Inputs) => {
    setLoading(true);
    cteateUserInFirebaseWithEmailAndPassword(data.email, data.password).then((res: any) => {
      if (!res.user) {
        setEmailAlreadyExists(true);
        reset();
        setTimeout(() => setEmailAlreadyExists(false), 2000);
      } else {
        setSignedIn(true);
      }
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
            Sign up
          </Typography>
          <Box component='form' onSubmit={handleSubmit((data) => submitSignUpRequest(data))} noValidate sx={{ mt: 1 }}>
            <TextField margin='normal' required fullWidth id='email' label='Email address' autoComplete='email' autoFocus {...register('email', { required: true, pattern: emailRegExPattern })} />
            {errors.email && <Typography color='red'>Please enter a valid email address</Typography>}
            <TextField margin='normal' required fullWidth label='Password' type='password' id='password' autoComplete='current-password' {...register('password', { required: true, pattern: passwordRegExPattern })} />
            {errors.password && <Typography color='red'>Password must be at least 8 caracters, has at least one lower case character, one uppercase character, and one digit</Typography>}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            {emailAlreadyExists && <Typography color='red'>This email is already in use</Typography>}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
              Sign Up
            </Button>
            <Box>
              <Button onClick={() => setCurrentPage(RoutePath.SignUp)}>Already have an account? Log in</Button>
            </Box>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

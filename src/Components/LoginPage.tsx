import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Oleg Borisov
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

type Inputs = {
	email: string,
	password: string,
};

const theme = createTheme();

export default function LoginPage() {

	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
	// const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };

	return (
		<ThemeProvider theme={theme}>

			<Container component="main" maxWidth="xs" >
				<CssBaseline />
				<Box
					sx={{
						marginTop: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',


					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit(data => console.log(data))} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email address"

							autoComplete="email"
							autoFocus
							{...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
						/>
						{errors.email && <Typography color="red">Please enter a valid email address</Typography>}

						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password', { required: true, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/ })}
						/>
						{errors.password && <Typography color="red">Password must be at least 8 caracters, has at least one lower case character, one uppercase character, and one digit</Typography>}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 2, mb: 2 }}
						>
							Sign In
						</Button>
						<Box>
							<Box>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Box>
							<Box>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Box>
						</Box>
					</Box>
				</Box>
				<Copyright sx={{ mt: 2, mb: 2 }} />
			</Container>
		</ThemeProvider>
	);
}
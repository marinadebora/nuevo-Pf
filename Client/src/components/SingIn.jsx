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
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login, setToken, usuarios } from '../actions/actions';
import { useEffect } from 'react';






function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useNavigate()
  const dispatch = useDispatch()
  /* const user = useSelector(state => state.user) */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usuario, setUsuario] = useState(null)
  
  /* console.log(email)
  console.log(password) */

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const usuarioss = await (dispatch(login({email,password})))
      if(!usuarioss){
        alert('hay errores en los campos')
      }else{
        alert('Bienvenido a nuestra pagina')
        setUsuario(usuarioss.payload.data)
        setToken(usuarioss.payload.data.token)
        localStorage.setItem(
          'loguearUsuario', JSON.stringify(usuarioss.payload.data)
        )
        setEmail('')
        setPassword('')
        history("/")
      }
      
    } catch (error) {
      console.log(error)
      alert("Correo y/o contraseña incorrecta")
    }
  }
  
  useEffect(()=>{
    const mantenerSesion = localStorage.getItem('loguearUsuario')
    if(mantenerSesion){
      const users = JSON.parse(mantenerSesion)
      setUsuario(users)
      setToken(users.token)
      console.log(users.token)
    }
  },[])

  useEffect(()=>{
    dispatch(usuarios())
  },[dispatch])


  const ya = ()=>{
    return(
      <div>
        <h1>listo ya mentego sesion falta cerrar sesion</h1>
      </div>
    )
  }

  const renderizarFormulario = ()=>{
    return(
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={({target})=> setEmail(target.value.toLocaleLowerCase())}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({target})=> setPassword(target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./singUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
  }

  return (

    
    <div>
    <NavBar/>
    {
      usuario?
      ya():
      renderizarFormulario()
    }
    
    
    
    </div>
  );
}
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
import { login, setToken, usuarios, registroGoogle } from '../actions/actions';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import swal from "sweetalert";







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
  const users = useSelector(state => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usuario, setUsuario] = useState(null)
  /* console.log(email)
  console.log(password) */
  const [u, setU] = useState(null)

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const usuarioss = await dispatch(login({ email, password }))
      const tok = (usuarioss.payload.token)
      if (!usuarioss) {
        
        swal({
          text: "hay errores en los campos",
          icon: "error",
          timer: 1250
        })
      } else {
        swal({
          text: 'Bienvenido a nuestra pagina',
          icon: "success",
          timer: 1250
        })
        setUsuario(usuarioss.payload)
        setToken(tok)
        localStorage.setItem(
          'loguearUsuario', JSON.stringify(usuarioss.payload)
        )
        setEmail('')
        setPassword('')
        if(usuarioss.payload.admin === true){
          history('/dashboard')
        }else{
          history("/accesorios")
        }
        
      }

    } catch (error) {
      console.log(error)
      
      swal({
        text: "Correo y/o contraseña incorrecta",
        icon: "error",
        timer: 1250
      })
    }
  }
  const [user , setUser]= useState({})


async function handleCallbackResponse(response){
  /* console.log("Encoded JWT ID token: " + response.credential); */
  setUser(response.credential)
  const userObject = jwt_decode(response.credential);
  setUser(userObject);
  /* console.log(userObject) */
  document.getElementById("signInDiv").hidden=true;
  if(userObject) {
    const inf = {
      email:userObject.email,
      nombre:userObject.given_name,
      apellido:userObject.family_name,
      password:userObject.email
    }
    const infGoogle = await (dispatch(registroGoogle({
      email:userObject.email,
      nombre:userObject.given_name,
      apellido:userObject.family_name,
      password:userObject.email
    })))
    console.log(infGoogle)
    /* const toke = (infGoogle.payload.token) */
    if(!infGoogle){
      swal({
        text: "hay errores en los campos",
        icon: "error",
        timer: 1250
      })
    }else{
      swal({
        text: 'Has iniciado sesion',
        icon: "success",
        timer: 1250
      })
      setToken(infGoogle.payload.token)
      localStorage.setItem('logueadoGoogle', JSON.stringify(infGoogle.payload))
      const google = JSON.parse(localStorage.getItem('logueadoGoogle'))
      setUsuario({google})
      if(google.admin === true){
        history('/dashboard')
      }else{
        history("/accesorios")
      }
    }
  }else{
    swal({
      text: "hay errores en los campos",
      icon: "error",
      timer: 1250
    })
  }
}

useEffect(()=>{
  const mantenerSesion = localStorage.getItem('logueadoGoogle')
    if(mantenerSesion){
      const users = JSON.parse(mantenerSesion)
      setUsuario(users)
      setToken(user)
      console.log(user)
    }
},[])

function handleSignOut(event){
  event.preventDefault()
  document.getElementById("signInDiv").hidden=false;
  if(usuario){
    setUser({});
    swal({
      text: 'Has cerrado sesion con exito',
      icon: "success",
      timer: 1250
    })
    setUsuario(null)
    localStorage.removeItem('logueadoGoogle')
    setToken(usuario)
  }history("/singIn")
}

  useEffect(()=>{
    global.google.accounts.id.initialize({
      client_id: "407769620948-hc19ijqbfmbgb19qe5h2b26q2icc3b5d.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    global.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    );
    global.google.accounts.id.prompt();
  },[]);
  
  useEffect(()=>{
    const mantenerSesion = localStorage.getItem('loguearUsuario')
    if (mantenerSesion) {
      const users = JSON.parse(mantenerSesion)
      setUsuario(users)
      setToken(users.token)
      console.log(users.token)
    }
  }, [])

  useEffect(() => {
    dispatch(usuarios())
  }, [dispatch])


  const ya = () => {
    return (
      <div>
        <h1>Disculpa Actualmente te encuetras bloqueado</h1>
        { Object.keys(user).length != 0 &&
              <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
            }
            {user && 
            <div>
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
            }
      </div>
    )
  }
  const renderizarFormulario = () => {
    return (
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
                onChange={({ target }) => setEmail(target.value.toLocaleLowerCase())}
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
                onChange={({ target }) => setPassword(target.value)}
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
              <div id="signInDiv"></div>
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
      <NavBar />
      {
        usuario ?
          ya() :
          renderizarFormulario()
      }
    </div>
  );
}
import {AppBar, Toolbar, IconButton, Typography, Button, Badge, Grid} from "@mui/material";
import "../styles/navBar.css";
import Logo from "../imagenes/Nautical1.png";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import '../styles/searchBar.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { setToken } from "../actions/actions";
import { useDispatch} from 'react-redux';
import { UsuariosDetail } from '../actions/actions'
import { useSelector} from 'react-redux'



export default function Navbar() {
  //constante para cambiar e numero del carrito de forma dinamica
  // si la activo se rompe el detail por un tema de estado
 /*  const carrito=useSelector(state=>state.basket)
  const suma=carrito.filter(Boolean).length
 */

  const dispatch = useDispatch()
  const history = useNavigate()
  const[usuario, setUsuario] = useState(null)
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
  const UserFromLocalgoogle = JSON.parse(localStorage.getItem("logueadoGoogle"));
  const current_userID =UserFromLocalStorage?.id || UserFromLocalgoogle?.id
  const myUserDetail = useSelector(state => state?.userDetail);

 

  useEffect(()=>{
    localStorage.getItem("item2") 
    dispatch(UsuariosDetail(current_userID))
    if(localStorage.getItem('loguearUsuario')){
    const users = JSON.parse(localStorage.getItem('loguearUsuario'))
    setUsuario(users)
  }else if(localStorage.getItem('logueadoGoogle')){
    const users = JSON.parse(localStorage.getItem('logueadoGoogle'))
    setUsuario(users)
  }
  },[dispatch,current_userID])

  const handelOut =()=>{
    if(usuario){
      alert('Has cerrado sesion con exito')
      setUsuario(null)
      localStorage.removeItem('loguearUsuario') || localStorage.removeItem('logueadoGoogle')
      setToken(usuario)
      history("/singIn")
    }
  }

  const logueado = ()=>{
    return(
      
      <div>

        {usuario && usuario.admin === true?
        <Toolbar>
        <Typography sx={{marginLeft: '10px'}} variant="h7" component="p" id='guest'>
        <Link id='adminNavbar' to='/dashboard'>
          Hello Admin
          </Link>
        </Typography>
        <Typography sx={{marginLeft: '10px'}} variant="h7" component="p" id='guest'>
          Bienvenido {usuario.nombre || usuario.firstName}
        </Typography>
        <Link to='/favs'>
                <Button sx={{marginLeft: '10px'}} variant="outlined" id="button">Favoritos</Button>
          </Link>
          <Button type="onClick" variant="outlined" sx={{marginLeft: '10px'}} onClick={handelOut}>Cerrar Sesion</Button>
        </Toolbar>:
        <Toolbar>
        <Typography sx={{marginLeft: '10px'}} variant="h7" component="p" id='guest'>
        <Link id='adminNavbar'  to='/historialC'>Historial de Compras</Link>
        </Typography>
        <Typography sx={{marginLeft: '10px'}} variant="h7" component="p" id='guest'>
        Bienvenido {usuario.nombre || usuario.firstName}
        </Typography>
          <Link to='/favs'>
                <Button sx={{marginLeft: '10px'}} variant="outlined" id="button">Favoritos</Button>
          </Link>
          <Button type="onClick" variant="outlined" sx={{marginLeft: '10px'}} onClick={handelOut}>Cerrar Sesion</Button>
          </Toolbar>
      }
          {/* <Toolbar>

        <Typography sx={{marginLeft: 'auto'}} variant="h6" component="p" id='guest'>
          Bienvenido {usuario.nombre || usuario.firstName}
        </Typography>

          <Link to='/favs'>
                <Button sx={{marginLeft: '35px'}} variant="outlined" id="button">Favoritos</Button>
          </Link>
          <Button type="onClick" variant="outlined" sx={{marginLeft: '35px'}} onClick={handelOut}>Cerrar Sesion</Button>
          </Toolbar> */}

      </div>
        
      
    )
  }

  const sinLogin = ()=>{
    return(
      <div>
        <Toolbar>
        <Link to='/singIn'>
              <Button sx={{marginLeft: '150px'}} variant="outlined" id="button">Inicia Sesion</Button>
            </Link>
            <Link to='/singUp'>
              <Button variant="outlined" id="button">Registro</Button>
            </Link>
            </Toolbar>
      </div>
    )
  }
  


  return (
    
      <AppBar position="sticky" id="appBar">
        <Grid>
          <Toolbar>
          <Link to='/accesorios'>
              <IconButton>
                <img src={Logo} alt="img" id="logoNavBar" />
              </IconButton>
            </Link>

            <Link to='/accesorios' className='paralelogramo'>
              <button src='/accesorios' id='buttonNavBarMenu'>PRODUCTOS</button>
            </Link>

            <Link to='/venta' className='paralelogramo'>
              <button src='/venta' id='buttonNavBarMenu'>VENTA YATES</button>
            </Link>

            <Link to='/alquiler' className='paralelogramo'>
              <button src='/alquiler' id='buttonNavBarMenu'>RENTA YATES</button>
            </Link>

            {/* {usuario && usuario.admin === true?
            <Typography sx={{marginLeft: 'auto'}} variant="h7" component="p" id='guest'>
            <Link id='adminNavbar' to='/dashboard'>
              Hello Admin
              </Link>
            </Typography>:
            <Typography sx={{marginLeft: 'auto'}} variant="h7" component="p" id='guest'>
              <Link id='adminNavbar'  to='/historialC'>Historial de Compras</Link>
            </Typography>
            } */}
            {/* <Typography sx={{marginLeft: 'auto'}} variant="h6" component="p" id='guest'>
            <Link id='adminNavbar'  to='/historialC'>Historial de Compras</Link>
            <Link id='adminNavbar' to='/dashboard'>
              Hello Admin
              </Link>
            </Typography>
             */}

            {
              usuario?
              logueado():
              sinLogin()
            }

            <Link to='/checkoutPage'>
              <IconButton arial-label="show cart items" id="cartButton">
                <Badge badgeContent={cartFromLocalStorage.length} color="secondary" id='badge'>
                  <ShoppingCart id="cart" />
                </Badge>
              </IconButton>
            </Link>
            
          </Toolbar>
        </Grid>
      </AppBar>
    
  );
}

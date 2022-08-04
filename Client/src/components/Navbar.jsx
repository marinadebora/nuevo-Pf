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
  console.log(cartFromLocalStorage)

  useEffect(()=>{
    localStorage.getItem("item2") 
    if(localStorage.getItem('loguearUsuario')){
    const users = JSON.parse(localStorage.getItem('loguearUsuario'))
    setUsuario(users)
  }
  },[])

  const handelOut =()=>{
    /* let local = JSON.parse(localStorage.getItem('loguearUsuario')) */
    if(usuario){
      alert('Has cerrado sesion con exito')
      setUsuario(null)
      localStorage.removeItem('loguearUsuario')
      setToken(usuario)
      history("/singIn")
    }
      
  }

  const logueado = ()=>{
    return(
      <div>
        <Typography sx={{marginLeft: 'auto'}} variant="h6" component="p" id='guest'>
          Bienvenido {usuario.nombre}
          <Button type="onClick" variant="outlined" sx={{marginLeft: '35px'}} onClick={handelOut}>Sing out</Button>
        </Typography>
        
      </div>
        
      
    )
  }

  const sinLogin = ()=>{
    return(
      <div>
        <Link to='/singIn'>
              <Button variant="outlined" id="button">Sing In</Button>
            </Link>

            <Link to='/singUp'>
              <Button variant="outlined" id="button">Sing Up</Button>
            </Link>
      </div>
    )
  }
  

  return (
    
      <AppBar position="sticky" id="appBar">
        <Grid>
          <Toolbar>
          <Link to='/'>
              <IconButton>
                <img src={Logo} alt="img" id="logoNavBar" />
              </IconButton>
            </Link>

            <Link to='/accesorios' className='paralelogramo'>
              <button src='/accesorios' id='buttonParalel'>Insumos</button>
            </Link>

            <Link to='/venta' className='paralelogramo'>
              <button src='/venta' id='buttonParalel'>Venta Yates</button>
            </Link>

            <Link to='/alquiler' className='paralelogramo'>
              <button src='/alquiler' id='buttonParalel'>Alquiler Yates</button>
            </Link>
            
            
            <Typography sx={{marginLeft: 'auto'}} variant="h6" component="p" id='guest'>
            <Link id='adminNavbar' to='/dashboard'>
              Hello Guest
              </Link>
            </Typography>
            
            {
              usuario?
              logueado():
              sinLogin()
            }
            {/* <Link to='/singIn'>
              <Button variant="outlined" id="button">Sing In</Button>
            </Link>

            <Link to='/singUp'>
              <Button variant="outlined" id="button">Sing Up</Button>
            </Link> */}

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

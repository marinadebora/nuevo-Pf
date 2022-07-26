import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accesorios } from '../actions/actions'
import { useNavigate, Link } from 'react-router-dom';
import Paginado from "./Paginado";
import { Box } from '@mui/system';
import Card from './Card'
import Navbar from './Navbar';
import Footer from './Footer';
import SearchBarProductos from './SearchBarProductos';
import { Grid } from '@mui/material'
import '../styles/searchBar.css';
import '../styles/box.css'
import {FiltrosAccesorios} from './FiltrosAccesorios';
import img from '../imagenes/sin_productos.jpg'
import {todosLosProductos,getItemsCart, resetDetail,UsuariosDetail} from '../actions/actions'
import '../styles/accesorios.css'


export function Accesorios(){ 
  const accesorio = useSelector(state => state.accesories)
  /* console.log(accesorio) */
  const dispatch = useDispatch()
  //----------paginado---------//

  const [page, setPage] = useState(1);
  const [characterPerPage, setCharacterPerPage] = useState(8);
  const index = page * characterPerPage;
  const endIndex = index - characterPerPage;
  const actualPage = accesorio?.slice(endIndex, index);
  const [ordering, setOrdering] = useState('')
  const navigate = useNavigate()
  const [venta, setVenta] = useState('')
  const [categorias, setCategorias] = useState('')
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);
  const FavFromLocalStorage = JSON.parse(localStorage.getItem("Fav") || "[]");
  const [fav /* setCart */] = useState(FavFromLocalStorage);
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"))||JSON.parse(localStorage.getItem("logueadoGoogle"))
  const current_userID =UserFromLocalStorage?.id
 
 
  const paginado = (numPage) =>
  {
    setPage(numPage)
  }

  useEffect(()=>{
    
    dispatch(UsuariosDetail(current_userID))
    dispatch(getItemsCart());
    dispatch(resetDetail());
    dispatch(accesorios())

    localStorage.getItem("item2")
   
    localStorage.getItem("Fav")
    localStorage.setItem("Fav", JSON.stringify(fav));
    
    
   
    localStorage.setItem("item2", JSON.stringify(cart))
      
},[dispatch, cart,localStorage.getItem("item2")])


  const volver = () =>
  {
    navigate("/")
  }


  return (
    <div>

      <Navbar/>
      <Box id='boxAcc'>
                <Box id='textBox1'>VENTA</Box>
                <Box id='textBox2'>Compra Online</Box>
      </Box>
      
      <SearchBarProductos/>
      <br /><br />
      <FiltrosAccesorios
    setPage={setPage}
     />

    <Paginado
      characterPerPage={characterPerPage}
      newState={accesorio.length}
      paginado={paginado}
    />
      
      <Grid container spacing={2}>
  
        {

          actualPage.length > 0 ? actualPage.map(e => 
          {
            return (
              <Fragment>


                <Grid item xs={12} sm={6} md={4} lg={3}>

                  <Card
                    tipo={e.tipo}
                    Marca={e.Marca}
                    modelo={e.modelo}
                    Motor={e.Motor}
                    precio={e.precio}
                    astillero={e.astillero}
                    fabricacion={e.fabricacion}
                    localizacion={e.localizacion}
                    imagenes={e.imagenes}
                    producto={e.producto}
                    descripcion={e.descripcion}
                    Tamaño={e.Tamaño}
                    id={e._id}
                    stock={e.stock}
                    Link={<Link  id='infobutton'to={`/home/${e._id}`} >Info</Link>}
                    comentarios={e.comentarios}
                  />

                </Grid>




              </Fragment>
            )
          }):  <img className="sin_art" src={img} alt="sin articulos" />
          
         
             
         
        }
      </Grid>
     
      
<br /><br /><br /><br /><br />
      <button id='buttonBackAA' onClick={volver}>VOLVER</button>



<Footer/>
    </div>);
};
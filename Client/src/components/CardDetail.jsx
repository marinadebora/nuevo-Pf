
import Navbar from './Navbar';
import { useEffect } from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productosDetail } from "../actions/actions";
import '../styles/cardDetail.css'
import ImagenList from  './ImagenList'
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import '../styles/cardDetail.css';
import {addToBasket, addToFavoritos } from '../actions/actions'
import {  useState } from 'react';
import swal from "sweetalert";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ImgSinStock from "../imagenes/vector-sin-stock.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GiConsoleController } from "react-icons/gi";
import gif from '../imagenes/cargando-loading.gif'
import { ErrorAdmin } from './DashBoard/ErrorDashbord';


export default function CardDetail()
{ 
  
  

  
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDetail = useSelector(state => state.detail);
  const navigate = useNavigate()
  const cartFromLocalStorage = JSON.parse(localStorage?.getItem("item2") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);
  const FavFromLocalStorage = JSON.parse(localStorage?.getItem("Fav"));
  const [fav /* setCart */] = useState(FavFromLocalStorage);
  
  const current_cart =cartFromLocalStorage;
  
const soloid =current_cart?.map(item => item._id)
const stockProduct = myDetail?.stock


   

  useEffect(() =>
  {
    
    localStorage?.setItem("item2", JSON.stringify(current_cart));
    localStorage?.getItem("Fav")
    dispatch(productosDetail(id))
    
  }, [dispatch, id,current_cart])
   

 
  
  async function addToCart(){
        dispatch(addToBasket({id}))
          return  swal({
            
            text: "El producto se ha agregado a tu carro de compras",
            icon: "success",
            timer: 1250
          })
   }
   async function addToFav () {
    
    dispatch(addToFavoritos({id}))
     return  swal({
      
      text: "El producto se ha agregado a tu lista de favoritos",
      icon: "success",
     timer: 1250
    })
     
  }

   
 const volver = () =>
  {
    navigate("/accesorios")
  }
  return (
      <div>
       
    <Navbar/>
    {
      myDetail._id !== id?

      <div>
               <img className='gif' src={gif} alt='yates.gif' />
                
            </div>
            :
        <div id='mainContainer'>
          <div>
          {/* {
            myDetail.imagenes?.map(e =>
              <img  id='mainImg' src={e} alt='img' />
            )
          } */}

        {myDetail.stock > 0||myDetail.stock===undefined ?
          <ImagenList/>
          :<div className="div"> 
          <ImagenList/>
          {/* <img className="imagen1" src={myDetail.imagenes[0]} alt=''></img> */}
          <img className="imagen" src={ImgSinStock} alt=''></img>
          </div> 
        }

          </div>
      
          <ul>
          
          {
            myDetail.marca ? <li><p id='titleDetailCard'>Marca:</p> <p>{myDetail.marca}</p></li> : ''
          }
          {
            myDetail.tipo ? <li><p id='titleDetailCard'>Tipo:</p> <p>{myDetail.tipo}</p></li> : ''
          }
          {
            myDetail.modelo ? <li><p id='titleDetailCard'>Modelo:</p> <p>{myDetail.modelo}</p></li> : ''
          }
          {
            myDetail.fabricacion ? <li><p id='titleDetailCard'>Fabricacion:</p> <p>{myDetail.fabricacion}</p></li> : ''
          }
          {
            myDetail.astillero ? <li><p id='titleDetailCard'>Astillero:</p> <p>{myDetail.astillero}</p></li> : ''
          }
          {
            myDetail.motor ? <li><p id='titleDetailCard'>Motor:</p> <p>{myDetail.motor}</p></li> : ''
          }
          {
            myDetail.localizacion ? <li><p id='titleDetailCard'>Localizacion:</p> <p>{myDetail.localizacion}</p></li> : ''
          }
          
          {
            myDetail.precio ? <li><p id='titleDetailCard'>Precio:</p> <p>{myDetail.precio}</p></li> : ''
          }
          {
            myDetail.producto ? <li><p id='titleDetailCard'>Producto:</p> <p>{myDetail.producto}</p></li> : ''
          }
          {
            myDetail.descripcion ? <li><p id='titleDetailCard'>Descripcion:</p> <p>{myDetail.descripcion}</p></li> : ''
          }
          {
            myDetail.Tamaño ? <li><p id='titleDetailCard'>Tamaño:</p> <p>{myDetail.Tamaño}</p></li> : ''
          }
          {
            myDetail.producto && 
            <div className='contenedor-total'>
            <h2>Calificaciones de los usuarios</h2>
      {
        myDetail.comentarios?.length>0 ? myDetail.comentarios.map(e=>(
          <div className="comentario">
    
        {
          e.star?.estrellas=== '1'?<li className="estrellas">★</li>:e.star?.estrellas=== 2
          ?<li className="estrellas">★★</li>:e.star?.estrellas=== '3'
          ?<li className="estrellas">★★★</li>:e.star?.estrellas=== '4'
          ?<li className="estrellas">★★★★</li>:e.star?.estrellas=== '5'
          ?<li className="estrellas">★★★★★</li>:''
        }
        <li className="nombre"> {e.nombre}</li>
        {e.reseña&&
          <li className="reseña">califico este producto como: {e.reseña}</li>}
        
        </div>
        )):<h4>Este producto aun no tiene comentarios</h4>
      }
      </div>
          }
        
          
          </ul>
         
            <button id='buttonBack' onClick={volver}>VOLVER</button>
            <IconButton aria-label="add to favorites" onClick={addToFav}> <FavoriteIcon /></IconButton>
            {
  myDetail.producto?  
  <>
      {
          (stockProduct > soloid?.length) 
          ?<>   
          <IconButton aria-label="add to cart" onClick={addToCart}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton> 
          </>  
          :<><p>Agregaste el maximo de Stock disponible</p></>
      }
  </> :
  <>
      <IconButton href="/contactForm">
          <ContactMailIcon/>
        </IconButton>
  </>
}
         
        </div>
        
    }
  </div>);
};
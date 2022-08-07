import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productosDetail } from "../actions/actions";
import '../styles/cardDetail.css'
import ImagenList from  './ImagenList'
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import '../styles/card.css';
import {addToBasket } from '../actions/actions'
import {  useState } from 'react';
import swal from "sweetalert";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ImgSinStock from "../imagenes/ImgSinStock.png"

export default function CardDetail()
{ 
  
  

  
  const dispatch = useDispatch();
  const { id } = useParams();
  const myDetail = useSelector(state => state.detail);
  const navigate = useNavigate()
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);
   
   console.log(myDetail) 
  useEffect(() =>
  {
    localStorage.getItem("item2")
    localStorage.setItem("item2", JSON.stringify(cart));
    dispatch(productosDetail(id))
  }, [dispatch, id])
   
   
 
  
  async function addToCart(){
        dispatch(addToBasket({id}))
          return  swal({
            title: "Your product was successfully added to the cart",
            text: "What do you want to do next?",
            icon: "success",
            buttons: {
              cart: {
                text: "Go to cart",
                value: "cart",
              },
             
              cancel: "Stay",
            },
          }).then((value) => {
            switch (value) {
              case "cart":
                navigate("/checkoutPage");
                swal("Welcome to your cart", "Have a nice buy!", "success");
                break;
      
              default:
                break;
            }
          });
   }

   
 const volver = () =>
  {
    navigate(-1)
  }
  return <div>
    {
      myDetail._id !== id?

      <div>
                <h1>LOADING</h1>
                
            </div>
            :
        <div id='mainContainer'>
          <div>
          {/* {
            myDetail.imagenes?.map(e =>
              <img  id='mainImg' src={e} alt='img' />
            )
          } */}

        {myDetail.stock > 0 ?
          <ImagenList/>
          :<img src={ImgSinStock} alt=''></img>
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
            myDetail.comentarios && myDetail.comentarios.map(e=>(
              <div className='contenedor-total'>
                <h2>Calificaciones de los usuarios</h2>
              <div className="comentario">
        
            <li className="nombre">El usuario {e.nombre}</li>
            <li className="reseña">califico este producto como: {e.reseña}</li>
            </div>
            </div>
            ))
          }
          
          </ul>
         
            <button id='buttonBack' onClick={volver}>VOLVER</button>
            {
  myDetail.producto?  
  <>
      {
          (myDetail.stock > 0) 
          ?<>   
          <IconButton aria-label="add to cart" onClick={addToCart}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton> 
          </> 
          
          :<>
          <IconButton disabled aria-label="add to cart" onClick={addToCart}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton> 
          </>
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
  </div>;
};

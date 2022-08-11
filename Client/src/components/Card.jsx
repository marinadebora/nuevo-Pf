import React, { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from '@mui/material/Button';
import '../styles/card.css';
import {addToBasket, addToFavoritos} from '../actions/actions'
import {useDispatch } from 'react-redux'
import swal from "sweetalert";
import {useNavigate } from "react-router-dom";
import ImgSinStock from "../imagenes/vector-sin-stock.png"
import FavoriteIcon from '@mui/icons-material/Favorite';







export default function Producto({ tipo,id, producto, marca ,precio, fabricacion, imagenes, Link, stock,comentarios}) {
   
  const navigate = useNavigate();
  const dispatch = useDispatch() 
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const current_cart =cartFromLocalStorage;





  
const soloid =current_cart?.map(item => item._id)
var cantidadfiltrada = soloid.filter(e=> e === id)


/*const sumall = current_cart.map(item => item.precio);
const neto = sumall.map(e=>e.split('$')[1])
const num = neto.map(e=> parseInt(e))
var precioTotal =num.reduce((a, b) => a + b, 0);

const sumaStock = uniqueArray.map(item => item.stock).reduce((a, b) => a + b, 0);;
console.log(sumaStock)*/


/*function cantidad (id){
  
var cantidadfiltrada = soloid.filter(e=> e === id)
return cantidadfiltrada.length
}*/
  
  
   async function addToCart () {
    
    dispatch(addToBasket({id}))
     return  swal({
      title: "El producto se ha agregado a tu carro de compras",
      text: "Que queires hacer ahora?",
      icon: "success",
      buttons: {
        cart: {
          text: "Ir al carro",
          value: "cart",
        },
       
        cancel: "Quedarse",
        
      },
    }).then((value) => {
      switch (value) {
        case "cart":
          navigate("/checkoutPage");
          swal("Bienvenido a tu carro","Que tenga una buena compra" ,"success");
          break;

        default:
          window.location.reload()
          break;
      }
    });
     
  }
  async function addToFav () {
    
    dispatch(addToFavoritos({id}))
     return  swal({
      title: "El producto se ha agregado a tu lista de favoritos",
      text: "Que queires hacer ahora?",
      icon: "success",
      buttons: {
        cart: {
          text: "Ir a mi lista",
          value: "cart",
        },
       
        cancel: "Quedarse",
      },
    }).then((value) => {
      switch (value) {
        case "cart":
          navigate("/favs");
          swal("Bienvenido a tus favoritos","Que tenga una buena compra" ,"success");
          break;

        default:
          break;
      }
    });
     
  }
  
   
  useEffect(()=>{
    localStorage.getItem("item2")
    localStorage.getItem("Fav")
   
   
},[localStorage.getItem("item2")])
   
   
 let filtroEstrella=comentarios?.map(e=>e.star?.estrellas);
 let filtro=filtroEstrella.filter(e=>  e!==null && e!==undefined )
 let parse=filtro.map(e=> parseInt(e))
 let promedio=parse?.reduce((a, b) =>a + b,0)/parse.length
 let total=Math.round(promedio)


  
  return (
    <Fragment>
      <Card sx={{ maxWidth: 330 }} id='card'>
        <CardHeader
          title={

            tipo ?
            <Typography fontSize="15px" fontFamily="arial" fontWeight='bold' underline="none">
               {tipo}
            </Typography>
            :producto?
            <Typography fontSize="15px" fontFamily="arial" fontWeight='bold' underline="none">
               {producto}
            </Typography>

            :marca&&
            <Typography fontSize="15px" fontFamily="arial" fontWeight='bold' underline="none">
              {marca}
            </Typography>

          }
        />

        { stock >0 ?
         <CardMedia
         id='imgCard'
         component="img"
         height="200"
         image={imagenes?.[0]} />
         : <div className="div-img"> 
           <CardMedia
         id='imgCard'
         component="img"
         height="200"
         image={imagenes?.[0]} />
        {/*  <img className="imagen1" src={imagenes?.[0]} alt=''></img> */}
         <img className="imagen2" src={ImgSinStock} alt=''></img>
         </div> 
        }
        <CardContent>
        {
            fabricacion? <Typography>Año: {fabricacion}</Typography>:''
          }
          <Typography>Precio: {precio}</Typography>
        </CardContent>
        <CardActions disableSpacing id='cardAction'>
          {stock > cantidadfiltrada.length
          ?<IconButton aria-label="add to cart"onClick={() => addToCart()}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          :<><p> maximo Stock disponible</p></>
          }
            <IconButton aria-label="add to favorites" onClick={() => addToFav()}> <FavoriteIcon /></IconButton>
          {  total?<div className='estrellitas'>
            { total=== 1?<li className="estrellas">★</li>:total=== 2
              ?<li className="estrellas">★★</li>:total=== 3
              ?<li className="estrellas">★★★</li>:total=== 4
              ?<li className="estrellas">★★★★</li>:total=== 5
              ?<li className="estrellas">★★★★</li>:''
              }</div>:''
              }
          <Button sx={{marginLeft: 'auto'}} size="small">{Link}</Button>
        </CardActions>
      </Card>
    </Fragment>
  );

}
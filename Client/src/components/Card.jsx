import React, { Fragment, useEffect } from "react";
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
          break;
      }
    });
     
  }
  async function addToFav () {
    
    dispatch(addToFavoritos({id}))
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
          break;
      }
    });
     
  }
  
   
  useEffect(()=>{
    localStorage.getItem("item2")
    localStorage.getItem("Fav")
   
   
},[localStorage.getItem("item2")])
   
   
 let filtroEstrella=comentarios?.map(e=>e.star?.estrellas);
 let parse=filtroEstrella.map(e=> parseInt(e))
 let filtro=parse.filter(e=>  e!==null && e!==undefined)
 let promedio=filtro?.reduce((a, b) =>a + b, 0)/filtroEstrella.length
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
          {stock >0 
          ?<IconButton aria-label="add to cart"onClick={() => addToCart()}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          :<IconButton disabled aria-label="add to cart"onClick={() => addToCart()}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          }
          {  total?<div>
            { total=== 1?<li className="estrellas">★</li>:total=== 2
              ?<li className="estrellas">★★</li>:total=== 3
              ?<li className="estrellas">★★★</li>:total=== 4
              ?<li className="estrellas">★★★★</li>:total=== 5
              ?<li className="estrellas">★★★★</li>:''
              }</div>:''
              }
               <IconButton aria-label="add to favorites" onClick={() => addToFav()}> <FavoriteIcon /></IconButton>
          <Button sx={{marginLeft: 'auto'}} size="small">{Link}</Button>
        </CardActions>
      </Card>
    </Fragment>
  );

}
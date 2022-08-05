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
import {addToBasket} from '../actions/actions'
import {useDispatch } from 'react-redux'
/* import {  useState } from 'react';
 */import swal from "sweetalert";
import {useNavigate } from "react-router-dom";








export default function Producto({ tipo,id, producto, marca ,precio, fabricacion, imagenes, Link}) {
   
  const navigate = useNavigate();
   const dispatch = useDispatch() 
  
  
   async function addToCart () {
    
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
  
   
  useEffect(()=>{
    localStorage.getItem("item2")
   
},[localStorage.getItem("item2")])
   
   
   

 
  
  
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

        { imagenes?
         <CardMedia
         id='imgCard'
         component="img"
         height="200"
         image={imagenes?.[0]} />
         :''
            
        }
        <CardContent>
        {
            fabricacion? <Typography>Año: {fabricacion}</Typography>:''
          }
          <Typography>Precio: {precio}</Typography>
        </CardContent>
        <CardActions disableSpacing id='cardAction'>
          
          <IconButton aria-label="add to cart"onClick={() => addToCart()}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button sx={{marginLeft: 'auto'}} size="small">{Link}</Button>
        </CardActions>
      </Card>
    </Fragment>
  );

}
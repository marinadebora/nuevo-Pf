import React from 'react';
import { useStateValue } from "../../stateProvider";
import { Typography, Button, Divider, CircularProgress } from "@mui/material";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'; //trae stripe
import axios from "axios";
import { useState } from "react";
import '../../styles/checkout.css';
import SET_PAYMENT_MESSAGE from "../../reducer/reducer";
import EMPTY_BASKET from "../../reducer/reducer";
import {postHistoria } from '../../actions/actions';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";



const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "#333",
        fontSize: "18px",
        "::placeholder": {
          color: "#ccc",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };
  


const CheckoutForm = ({ backStep, nextStep }) => {

    const [{ basket, paymentMessage }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
    const [cart /* setCart */] = useStateValue(cartFromLocalStorage);
    const current_cart =cartFromLocalStorage;

    const sumall = current_cart.map(item => item.precio);
    const neto = sumall.map(e=>e.split('$')[1])
    const num = neto.map(e=> parseInt(e))
    var precioTotal =num.reduce((a, b) => a + b, 0);
    const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
    const UserFromLocalgoogle = JSON.parse(localStorage.getItem("logueadoGoogle"));
    const current_userID =UserFromLocalStorage?.id || UserFromLocalgoogle?.id

    const [input, setInput] = useState({
      usuario:current_userID,
      productos:current_cart,
      precioTotal: precioTotal, 
    
    })

    //const InfoTotal = [precioTotal,cartFromLocalStorage,shipp]

    /*async function handleOnClick(e) {    
      e.preventDefault();
      try {
            dispatch(postHistoria(input))
            setInput({
              usuario:current_userID,
              productos:current_cart,
              precioTotal: 0,           
            })
            localStorage.setItem("item2"," []");
            return (
                alert(`La historia fue creada con exito.`)//, navigate(`/checkoutfinal`)
                ) 
          
        } catch (error) {
          console.log(error);
          return alert(
            "Algo falló al crear la historia."
          );
        }
    };*/
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //el hook useStripe nos devuelve la conexión a stripe.
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement), //CardElement es el formulario de la tarjeta. Así capturamos los números tecleados.
      }); //puedo enviar el método de pago, pero todavía no sé que es lo que estoy pagando.
      setLoading(true);
      if (!error) {
        console.log(paymentMethod);
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post(
            "https://nautical25.herokuapp.com/checkout",
            {
              id,
              amount: precioTotal * 100,

            }
          );
          /* enviamos al backend, y la información que vamos a enviar al backend */
           console.log(data); //lo que va a ir al backend
          dispatch({
            type: SET_PAYMENT_MESSAGE,
            paymentMessage: data.message,
          });
          if (data.message === 'Pago recibido exitosamente') {
           navigate("/checkoutfinal")
           
          return  swal({
            title: "Su Compra fue aprobada!!",
            text: "solo falta un paso mas para terminar su orden",
            icon: "success",
            timer:1250
          
          }).then((value) => {
            switch (value) {
              case "cart":
                
                swal("Bienvenido a nuestra Pagina","Que tenga una buena compra" ,"success");
                break;
          
              default:
                break;
            }
          });
          }
  
          
          nextStep();
        } catch (error) {
          console.log(error);
          nextStep();
        }
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        {/* input ya preparado para ser validado que trae la biblioteca de Stripe */}
        {/*  googlear stripe card test para acceder a las distintas tarjetas */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <Button onClick={backStep} id='buttonBackPaymentForm'>
            Back
          </Button>
          <Button
            
            type='submit'
            disabled={!stripe}
            id='buttonBackPaymentForm'
          > A Pagar 
            ${precioTotal}
          </Button>
        </div>
      </form>
    );
  };
  

  export default CheckoutForm;
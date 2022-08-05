import { Typography, Button, Divider, CircularProgress } from "@mui/material";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'; //trae stripe
// import { getBasketTotal } from "../../reducer/reducer.js";
import Review from "./Review";
import { useStateValue } from "../../stateProvider";
import accounting from "accounting";
import axios from "axios";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

//Cargamos la conexión hacia la plataforma. Conectamos nuestro stripe
const stripePromise = loadStripe(
  "pk_test_51LSmj7J1G02QCFvGIp6Q0A7s2iF2hodQSpEJTlyOo4vlbVA09cB2oxGnR8ODzTVvOxvTXdKVQ8cYiDepTD75FpY600Z8kIW44N"
);



const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>
        Pago
      </Typography>
      <Elements stripe={stripePromise}>
        {/* permite acceder al objeto Stripe desde sus hijos */}
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
        {/* Formulario de pago */}
      </Elements>
    </>
  );
};

export default PaymentForm;

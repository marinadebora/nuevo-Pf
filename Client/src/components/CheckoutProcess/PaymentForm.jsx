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
  "pk_test_51LTzChGPkJkLR4xlRyDUWk3Pj6SiGC8bq0An5pdnhBWsCwE0Y9eIT2uUj7baWSnQlXXXmqSlZitwQKJrd7o1LwC500k5khRIeF"
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

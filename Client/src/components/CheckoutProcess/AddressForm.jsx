import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateValue } from "../../stateProvider";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../../actions/actions";
import Typography from '@mui/material/Typography';
import AddressInput from './AddressInput';
import '../../styles/checkout.css';



const AddressForm = ({nextStep}) => {
  const methods = useForm();
  const [{ shippingData }, dispatch] = useStateValue();
  const ShippingLocalStorage = JSON.parse(localStorage.getItem("ShippingData") || "[]");

  console.log(shippingData)

  async function validate(){
    let errors = {}

    if (!shippingData.firsName) {
      return alert ("Falta ingresar nombre")
    } else if (shippingData.firsName.search(/^[a-zA-Zñáéíóúü]*$/)) {
      //Valido el input con expresion regular.
      return alert ("El nombre no puede contener caracteres especiales ni numeros ") 
    }
    if (shippingData.firsName.length > 15) {
      return alert ("El nombre no puede exceder los 15 caracteres") ;
    }


    
    
}

  useEffect(() => {
    localStorage.setItem("ShippingData", JSON.stringify(ShippingLocalStorage))
 
   
    
  }, [ShippingLocalStorage]);

  return (
      <>
        <Typography component='h6' variant='h4' gunterBotton>
             Datos de envio
        </Typography>
        <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            const cart_add = data
            const actual_card = localStorage.getItem("ShippingData") 
            
             if(ShippingLocalStorage.length) {
             localStorage.setItem(
               "ShippingData",
               JSON.stringify([cart_add])
             );
           } else {
             localStorage.setItem(
               "ShippingData",
               JSON.stringify([cart_add])
             )
           }
           nextStep();
          })}
          >
              <Grid container spacing={3}>
                <AddressInput required name='firsName' label='Nombre' />
                <AddressInput required name='lastName' label='Apellido' />
                <AddressInput required name='direccion' label='Direccion' />
                <AddressInput required name='email' label='Correo Electronico' />
                <AddressInput required name='ciudad' label='Ciudad' />
                <AddressInput required name='cp' label='CP' /> 
              </Grid>
              
              <div>
                <Button component={Link} to='/checkoutPage' id='buttonBackAddresFrom'>Atras</Button>
                <Button onClick={() => validate()} type='submit' id='buttonBackAddresFrom'>Siguiente</Button>
              </div>
          </form>
        </FormProvider>

      </>
    
  )
}

export default AddressForm


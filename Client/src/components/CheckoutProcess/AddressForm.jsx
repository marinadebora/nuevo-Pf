import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateValue } from "../../stateProvider";
import { useState } from "react";
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

  return (
      <>
        <Typography component='h6' variant='h4' gunterBotton>
             Datos de envio
        </Typography>
        <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            dispatch({
              type: 'SET_SHIPPING_DATA',
              shippingData: data,
            });
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
                <Button type='submit' id='buttonBackAddresFrom'>Siguiente</Button>
              </div>
          </form>
        </FormProvider>

      </>
    
  )
}

export default AddressForm


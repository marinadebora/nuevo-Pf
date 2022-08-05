import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmacion'
import Review from './Review';
import { useStateValue } from "../../stateProvider";
import '../../styles/checkout.css';

const steps = ["Datos de envio", "Informacion de pago"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);  
  const [{ paymentMessage }, dispatch] = useStateValue();  
  

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );

  const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep}/> : <PaymentForm/>;


  return (
    <>
      <main className="layout"> 
        <Paper className="paper">
          <Typography component='h1' variant='h4' aling='center' fontWeight='bold'>
              Checkout
          </Typography>
          <Stepper activeStep={activeStep} className='stepper'>
          {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation message={paymentMessage} />
          ) : (
            <Form step={activeStep} />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
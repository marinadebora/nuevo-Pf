import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements }from "@stripe/react-stripe-js"
import "./Checkout.css"
import axios from "axios"


    

let publishableKey ="pk_test_51LTzChGPkJkLR4xlRyDUWk3Pj6SiGC8bq0An5pdnhBWsCwE0Y9eIT2uUj7baWSnQlXXXmqSlZitwQKJrd7o1LwC500k5khRIeF" 
const stripePromise = loadStripe(publishableKey);



export default function Checkout(){
 
    const stripe = useStripe()
    const elements = useElements()


 const handleSubmit = async(e)=> {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    });
    console.log("console log de cardElement ",paymentMethod)

    if (!error){
        const {id} = paymentMethod;
  
        try{     
             const {data} = await axios.post("http://localhost:4000/checkout",
             {
                id, 
                amount:10000,
                //precio en centavos de dolar multiplicar precio total por 100
            });
            console.log(data);
           }
        catch(error){ console.log(error) }
           
    }
 }

    return(
       // <Elements stripe={stripePromise}>
            <div className="formContainer">
            <div className="holeForm">
            <img src="https://th.bing.com/th/id/R.7b321bcc32bc306ee2aca049c45c4289?rik=ETXCdUFDHYwWFA&riu=http%3a%2f%2fatlas-content-cdn.pixelsquid.com%2fstock-images%2fshopping-cart-PxANoOE-600.jpg&ehk=J0QWu9zCjYjXAZRmatzc4tYtgeodVSPwKXKaDGPgGNM%3d&risl=&pid=ImgRaw&r=0" alt="carrito"/>
            <form onSubmit={handleSubmit}>
                {/* precio total del carrito */}
            <h3>Price: $100.00</h3>
            <CardElement/>
            <button disabled={!stripe}>$$$- Buy -$$$</button>
            </form>
            </div>
            </div>
        // </Elements>
        
    )
}

import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {postAccesorio, Categorias } from '../../actions/admin-action';
import { accesorios, /*getAllTypes */} from '../../actions/actions';
import '../../styles/form.css';
import { Link } from 'react-router-dom';
//import * as MdIcons from 'react-icons/md'
import axios from "axios"
import {postHistoria } from '../../actions/actions';




export function CheckoutFinal(){

    const dispatch = useDispatch()
    const navigate = useNavigate();

   
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
    const [cart /* setCart */] = useState(cartFromLocalStorage);
    const current_cart =cartFromLocalStorage;
    const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
    const current_userID =UserFromLocalStorage?.id
    console.log(current_cart)

    const sumall = current_cart.map(item => item.precio);
    const neto = sumall.map(e=>e.split('$')[1])
    const num = neto.map(e=> parseInt(e))
    var precioTotal =num.reduce((a, b) => a + b, 0);
    const [input, setInput] = useState({
    usuario:current_userID,
    productos:current_cart,
    precioTotal: precioTotal, 
  
  })



    
  async function handleOnClick(e) {    
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
  };

  

    /*useEffect( () => {
        dispatch(Categorias())
        dispatch(accesorios())
    }, [dispatch])*/
    
    

    

   

    return (
        <div classproducto="cont-form">
            
            
           <h1>Su pago ha sido aprobado, presione "Ok" para terminar su compra</h1>
            
           <button
          onClick={handleOnClick}
            type='submit'
          
            id='buttonBackPaymentForm'
          > OK
           
          </button>
          <h2>Total compra: ${precioTotal}</h2>
        </div>
    )
}

export default CheckoutFinal;

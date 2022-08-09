import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useParams} from "react-router-dom";
import '../../styles/historialCompras.css'
import {usuarioId, usuarios,historialCompra} from '../../actions/actions'


export default function OrdenesDeCompras()  { 
  const dispatch=useDispatch()
  
  const Historial = useSelector(state => state.historial)
  const products = Historial.map(e=> e.productos)
  //const precioProduct = products.map(e=>e.precio)



console.log(products)

  useEffect(()=>{
  dispatch(historialCompra())
  },[dispatch])


    return (
      
      <div className="contenedor-total">


{  
Historial?.map(e=>(
 
 <div   className="contenedor-orden">
 <h3>Compra n° : {e._id}</h3>,
 {
  e.pendiente? <h2>PENDIENTE</h2>: e.procesado? <h2>PROCESADO</h2>: e.recibido?<h2>RECIBIDO</h2>: e.cancelado? <h2>CANCELADO</h2>:" "
 }
 

    { e.productos.map(e=>(
         <div >
            
         <div className='contenedor-art'>
       <img src={e.imagenes?.[0]} alt="imagen" className='imagen-art'/>
       <div className='contenedor-texto-art'>
     <p className='nombre-art'>{e.producto}</p>
     <p className='texto-art'>Precio: {e.precio}</p>
     <p>{e.cantidad} unidad</p>
     
     </div>
 
     
     </div></div>
     ))},
    
   
     </div>))
}
 
</div>) 
}
  
  





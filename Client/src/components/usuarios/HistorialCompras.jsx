import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useParams} from "react-router-dom";
import '../../styles/historialCompras.css'
import {usuarioId, usuarios,historialCompra} from '../../actions/actions'
import { user } from "./Compras";

export function HistorialCompras()  { 
  const dispatch=useDispatch()
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
  const current_userID =UserFromLocalStorage?.id
  const myUserDetail = useSelector(state => state?.userDetail);



console.log(current_userID)

  useEffect(()=>{
  dispatch(usuarioId(myUserDetail._id))
  },[dispatch,current_userID])


    return (
      
       <div className="contenedor-total">
{/* 
{    //cambiar user por myUserDetail
  //usar este en caso que la compra no tenga un array de productos
  
      user?.historialDeCompra?.map(e=>(
        <div   className="contenedor-orden">
    <h3>Compra n° : {e.compra}</h3>,
   
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
       <h3>Total: {e.total_de_la_compra} </h3>
      
        </div>))
}

*/}


{   //cambiar user por myUserDetail
//usar este en caso de que la compra tenga un array de productos
user?.historialDeCompra?.map(e=>(
  e.estado_de_la_compra.enviada? 
  <div   className="contenedor-orden">
  <h3>Compra n° : {e.compra}</h3>,
 
     { e.productos.map(e=>(
          <div >
             
          <div className='contenedor-art'>
        <img src={e.imagenes?.[0]} alt="imagen" className='imagen-art'/>
        <div className='contenedor-texto-art'>
      <p className='nombre-art'>{e.producto}</p>
      <p className='texto-art'>Precio: {e.precio}</p>
      <p>{e.cantidad} unidad</p>
      <Link to={`/review/${e._id}`}><h3>Califica tu producto</h3></Link>
      </div>
  
      
      </div></div>
      ))},
     <h3>Total: {e.total_de_la_compra} </h3>
    
      </div>:
      <div   className="contenedor-orden">
      <h3>Compra n° : {e.compra}</h3>,
     
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
         <h3>Total: {e.total_de_la_compra} </h3>
        
          </div>))
}
  
  

{/*  {
  "usuario":"62ed9a114c7c3d7663b3864d",
  "productos":[
      {
        "producto":"62d8a6b52029a4c825e23ed5",
        "cantidad":1,
        "precio":25
      },
{
        "producto":"62d8a6b52029a4c825e23ed3",
        "cantidad":1,
        "precio":25
      }
      
    ],
  "precioTotal":25
} */}






















</div>) 
    

   
  
 
}

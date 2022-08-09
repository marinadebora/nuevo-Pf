import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useParams} from "react-router-dom";
import '../../styles/historialCompras.css'
import {UsuariosDetail, usuarios,historialCompra} from '../../actions/actions'
import { user } from "./Compras";
import { Button } from "@mui/material";
export function HistorialCompras()  { 
  const dispatch=useDispatch()
  const UserFromLocalStorage = /* JSON.parse(localStorage.getItem("loguearUsuario"))|| */JSON.parse(localStorage.getItem("logueadoGoogle"))
  const current_userID =UserFromLocalStorage?.id
  const myUserDetail = useSelector(state => state?.userDetail);
const detail=useSelector(state=>state.detail)
const userReview=detail.comentarios?.filter(e=>e.email===myUserDetail.email)


console.log(myUserDetail)


  useEffect(()=>{
  dispatch(UsuariosDetail(current_userID))
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
myUserDetail.historialDeCompra?.map(e=>(
  
  e.recibido === true? 
  <div   className="contenedor-orden">
     <Link to='/accesorios'>
        <Button variant="outlined" id="button">Volver</Button>
        </Link>
        <h2>Estado de la compra RECIBIDO</h2>    
  <h3 className="text">Compra n° : {e._id}</h3>,
  <h3 className="text">Fecha : {e.fechaDeCompra}</h3>
     { e.productos.map(e=>(
          <div >
             
          <div className='contenedor-art'>
        <img src={e.imagenes?.[0]} alt="imagen" className='imagen-art'/>
        <div className='contenedor-texto-art'>
      <p className='nombre-art'>{e.producto.producto}</p>
      <p className='texto-art'>Precio: {e.precio}</p>
      <p>{e.cantidad} unidad</p>
    {/*   {
        userReview? <h4>ya Calificaste este producto</h4>:
        <Link to={`/review/${e.producto._id}`}><h3>Califica tu producto</h3></Link>
      } */}
      <Link to={`/review/${e._id}`}><h3>Califica tu producto</h3></Link>
      </div>
  
      
      </div></div>
      ))},
     <h3 className="text">Total: US$ {e.precioTotal} </h3>
    
      </div>:
      <div   className="contenedor-orden">
        {e.pendiente&& <h2 classname='orange'>Estado de la compra PENDIENTE</h2>}
       { e.procesado&& <h2 classname='blue'>Estado de la compra PROCESADO</h2>}
      { e.cancelado&&<h2 classname='red'>Estado de la compra CANCELADO</h2>}
     {/* <h3 className="text">Compra n° : {e._id}</h3>,
       <h3 className="text">Fecha : {e?.fechaDeCompra}</h3> */}
     
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
          
          
          
         <h3 className="text">Total: US$ {e.precioTotal} </h3>
        
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

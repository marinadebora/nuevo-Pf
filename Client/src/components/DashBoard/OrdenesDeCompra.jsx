import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useParams} from "react-router-dom";
import '../../styles/historialCompras.css'
import {usuarioId, usuarios,historialCompra,updateHistorial,filtroHistorial} from '../../actions/actions'
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import NabVarD from './NabVarD'
import '../../styles/NabVarD.css'

export default function OrdenesDeCompras()  { 
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const Historial = useSelector(state => state.historial)
  const products = Historial.map(e=> e.productos)
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
  const [user/* setUser */] = useState(UserFromLocalStorage);
  const UserFromLocalgoogle = JSON.parse(localStorage.getItem("logueadoGoogle"));
  const current_userEmail =UserFromLocalStorage?.email || UserFromLocalgoogle?.email
  

async function handleCancelado(id){
  const order= {
    email: current_userEmail,
    pendiente:false,
    procesado:false,
    recibido:false,
    cancelado:true
  }
  
  dispatch(updateHistorial(id, order))
 
  return  swal({
    title: "El producto ha cambiado su estado a cancelado",
    
    icon: "success",
    buttons: { 
     
      OK: "OK"
    },
  }).then((value) => {
    switch (value) {
      case "OK":
        window.location.reload()
       
        break;
    
      default:
        break;
    }
  });
  
        
};
async function handlePendiente(id){
  const order= {
    email: current_userEmail,
    pendiente:true,
    procesado:false,
    recibido:false,
    cancelado:false
  } 
  dispatch(updateHistorial(id, order))
 return  swal({
    title: "El producto ha cambiado su estado a pendiente",
    
    icon: "success",
    buttons: { 
     
      OK: "OK"
    },
  }).then((value) => {
    switch (value) {
      case "OK":
        window.location.reload()
       
        break;
    
      default:
        break;
    }
  });
  
        
};
async function handleProcesado(id){
  const order= {
    email: current_userEmail,
    pendiente:false,
    procesado:true,
    recibido:false,
    cancelado:false
  } 
  dispatch(updateHistorial(id, order))
 return  swal({
    title: "El producto ha cambiado su estado a procesado",
    
    icon: "success",
    buttons: { 
     
      OK: "OK"
    },
  }).then((value) => {
    switch (value) {
      case "OK":
        window.location.reload()
       
        break;
    
      default:
        break;
    }
  });
  
        
};

async function handleRecibido(id){
  const order= {
    email: current_userEmail,
    pendiente:false,
    procesado:false,
    recibido:true,
    cancelado:false
  } 
  dispatch(updateHistorial(id, order))
 return  swal({
    title: "El producto ha cambiado su estado a procesado",
    
    icon: "success",
    buttons: { 
     
      OK: "OK"
    },
  }).then((value) => {
    switch (value) {
      case "OK":
        window.location.reload()
       
        break;
    
      default:
        break;
    }
  });
  
        
};





  useEffect(()=>{
  dispatch(historialCompra())
  },[dispatch])

  console.log(Historial)




  const filtroPorEstado = (event) =>
  {
    event.preventDefault()
    if (event.target.value === 'sinFiltro') {
      dispatch(historialCompra())
      } else {
      dispatch(filtroHistorial(event.target.value))
   
  }}


    return (
      <div>
    <NabVarD />

   
      <div className="contenedor-total">
  <div id='filtro'>
  <label id='text' key='Precio'>Filtrar por Precio: </label>
  <select name="filtroestado" id="filtroestado" onChange={(e) => filtroPorEstado(e)}>
    <option key={'sinFiltro'} value={'sinFiltro'}>Buscar por estados</option>
    <option key={'pendiente'} value={'pendiente'}>Pendiente</option>
    <option key={'procesado'} value={'procesado'}>Procesado</option>
    <option key={'recibido'} value={'recibido'}>Recibido</option>
    <option key={'cancelado'} value={'cancelado'}>Cancelado</option>
  </select>
  </div>
{  
Historial?.map(e=>(
 
 <div   className="contenedor-orden">
 <h3>Compra n° : {e._id}</h3>,
 <p> usuario {e.usuario?.nombre} {e.usuario?.apellido} </p>
 <h2>Estado de la compra:{e.pendiente? <p>PENDIENTE</p>: e.procesado? <p>PROCESADO</p>: e.recibido?<p>RECIBIDO</p>: e.cancelado? <p>CANCELADO</p>:" "}
 </h2>
 Cambiar estado a:
  {!e.cancelado?<button onClick={() => handleCancelado(e._id)}class="bt-cancel" id="bt-cancel">Cancelado</button>:""}
  {!e.pendiente?<button onClick={() => handlePendiente(e._id)}class="bt-cancel" id="bt-cancel">Pendiente</button>:""}
  {!e.procesado?<button onClick={() => handleProcesado(e._id)}class="bt-cancel" id="bt-cancel">Procesado</button>:""}
  {!e.recibido?<button onClick={() => handleRecibido(e._id)}class="bt-cancel" id="bt-cancel">Recibido</button>:""}

    { e.productos.map(e=>(
         <div >
            
         <div className='contenedor-art'>
       
       <div className='contenedor-texto-art'>
     <p className='nombre-art'>{e.producto}</p>
     <p className='texto-art'>Precio: {e.precio}</p>
     <p>{e.cantidad} unidad</p>
     
     </div>
 
     
     </div></div>
     ))},
    
    <p>Precio Total: $ {e.precioTotal}</p>
   
     </div>))
}
 
</div></div>
) 
}
  
  





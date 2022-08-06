import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { usuarioId,editarAccComentarios ,productosDetail} from "../../actions/actions";
import '../../styles/review.css' 
import PuntuacionEstrella from "./PuntuacionEstrella";

export function Review () {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()

//const usuario= useSelector(state=>state.user)
const usuario=/* { "_id": "62e7f9455d0436c6a2dcfe9c",
"nombre": "diego",
"apellido": "martinotti",
"email": "diego.elprado22@gmail.com",} */
{"_id": "62eb102b7d5ad512f6fdfcda",
"email": "augustoloza.11@gmail.com",
"password": "$2b$10$UNs9GAYfvU5L3/4t8s5eX.AdBn4zHNk0ISSwXAltJW.BvYD3Vy5vu",
"nombre": "augusto",
"apellido": "loza",}
const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
const current_userID =UserFromLocalStorage.id
const myDetail = useSelector(state => state.detail);

const comentProduct = myDetail.comentarios



const [acces, setAcces] = useState({  
  
  comentarios:{...comentProduct}
  
  })/* "{"comentarios":{"reseña":" 020584","nombre":"marina carabajal","email":"m_deby_c@hotmail.com"}}" */


 useEffect(()=>{
  dispatch(usuarioId(current_userID))
  dispatch(productosDetail(id))
  },[dispatch,current_userID])



const [error,setError]=useState({
 
})
function validate(acces){
  let errors = {}

  if(!acces.comentarios){
      errors.comentarios = 'el campo no puede estar vacio'
  }

  return errors
}



 function handleChange(e){

  setAcces({
    ...acces,
    
    comentarios:{
    [e.target.name]:e.target.value,
    nombre: UserFromLocalStorage.nombre,
    email: UserFromLocalStorage.email}
    
  })

 /* const cart_add = state.allAccesories.find(e => e._id === action.payload.id)
  const actual_card = localStorage.getItem("item2") 
   //JSON.stringify([...cartFromLocalStorage, cart_add._id, cart_add.producto])
  
  if(cartFromLocalStorage.length) {
   localStorage.setItem(
     "item2",
     JSON.stringify([...cartFromLocalStorage, cart_add])
   );
 } else {
   localStorage.setItem(
     "item2",
     JSON.stringify([cart_add])
   )
 }*/
  
/*   setError(validate({
    ...acces.comentarios,
    
   
})) */
}


 function handleSubmit(e){
  e.preventDefault()
  dispatch(editarAccComentarios(id, acces))
/*   setAcces({
    
    comentarios:{
      [e.target.name]:e.target.value,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email}
    
   
  }) */
      return (
          alert(`Tu comentario fue enviado con éxito.`), navigate(`/historialC`)
          ) 
      
  }
  

  

 function cancel(e){
  e.preventDefault()
  navigate(`/historialC`)
}
 


  return (
  <div>
    <form  onSubmit={handleSubmit}>
 
        <div className="contenedor">
                                <label>Califica tu producto </label>
                                <textarea 
                                    type='text' 
                                    name='reseña'
                                    placeholder= ''
                                    value={acces.reseña}
                                    onChange={handleChange}
                                    className='textArea'
                                > </textarea>

                              {/*      <input type="hidden"
                                name='comentarios'
                                value={acces.email}
                                onChange={handleChange}
                                 />
                                <input type="hidden"
                                name='comentarios'
                                value={acces.nombre}
                                onChange={handleChange}
                                 /> 
                                 <input type="hidden"
                                name='comentarios'
                                value={acces.apellido}
                                onChange={handleChange}
                                 />  */}
                                
                                                
                            </div>
                        <input type="submit" value="Enviar" />
                        
    </form><button onClick={cancel}>Cancelar</button>
    <PuntuacionEstrella />
  </div>
  );
};







/* {comentarios: [
    {
      reseña: "",
      nombre: '',
      apellido: '',
      email: '',
    }
  ]} */
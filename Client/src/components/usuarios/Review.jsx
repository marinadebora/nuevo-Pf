import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { productosDetail,editarAccComentarios } from "../../actions/actions";


export function Review () {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario") );

const accesorios= useSelector(state=>state.acces_put)
const detail = useSelector(state => state.detail)
const [acces, setAcces] = useState({
 
    texto:'',
    email:'',
    nombre:''
  
 
  
 

})

console.log(acces) 
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
    [e.target.name]:e.target.value,
   
  })
  
  setError(validate({
    ...acces.comentarios,
    
   
}))
}


 function handleSubmit(e){
  e.preventDefault()
  dispatch(editarAccComentarios(id, acces))
 setAcces({
  [e.target.name]:e.target.value,
  email:cartFromLocalStorage.email,
  nombre:cartFromLocalStorage.nombre,
 })
  
  
      return (
          alert(`Tu comentario fue enviado con éxito.`), navigate(`/historialC`)
          ) 
      
  }
  

  

 function cancel(e){
  e.preventDefault()
  navigate(`/historialC`)
}
 
/*  {
    "_id": "62e7f9455d0436c6a2dcfe9c",
    "nombre": "diego",
    "apellido": "martinotti",
    "email": "diego.elprado22@gmail.com"
  }, */
 const totalStars = 5;
 const activeStars = 5;
/*   const dispatch = useDispatch();
  const { id } = useParams();
  const myDetail = useSelector(state => state.detail);
const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") );
  const [cart  setCart ] = useState(cartFromLocalStorage);
   
    
  useEffect(() =>
  {
    localStorage.getItem("item2")
    localStorage.setItem("item2", JSON.stringify(cart));
    dispatch(productosDetail(id))
  }, [dispatch, id]) */

  return (
  <div>
    <form  onSubmit={handleSubmit}>
 
        <div>
                                <label>Califica tu producto </label>
                                <textarea 
                                    type='text' 
                                    name='texto'
                                    placeholder= ''
                                    value={acces.texto}
                                    onChange={handleChange}
                                > 
                                </textarea>
                             {/*    <input type="hidden"
                                name='comentarios'
                                value={acces.comentarios.email=cartFromLocalStorage.email}
                                onChange={handleChange}
                                 />
                                <input type="hidden"
                                name='comentarios'
                                value={acces.comentarios.nombre=cartFromLocalStorage.nombre}
                                onChange={handleChange}
                                 /> */}
                                 
                            </div>
                        <input type="submit" value="Enviar" />
    </form>
  </div>
  );
};





/* import React from "react";

    <Box>
      {[...new Array(totalStars)].map((arr, index) => {
        return index < activeStars ? <StarIcon /> : <StarBorderIcon />;
      })}
    </Box>


  return (
  
  );
};

export default BasicFn; */
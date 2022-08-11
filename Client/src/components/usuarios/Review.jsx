import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {  editarAccComentarios, productosDetail, UsuariosDetail } from "../../actions/actions";
import '../../styles/review.css'
import '../../styles/PuntuacionEstrella.css'

export function Review()
{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()


  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario")) || JSON.parse(localStorage.getItem("logueadoGoogle"));
  const current_userID = UserFromLocalStorage.id
  const myDetail = useSelector(state => state.detail);

  const comentProduct = myDetail.comentarios
  console.log(id)

const [starOk,setStarOk]= useState(false)
const [text,setText]=useState(true)
  const [star, setStar] = useState({
    estrellas: ''
  })
  const [acces, setAcces] = useState({

    comentarios: {
      ...comentProduct,
    }
    
  })
  function puntuacion(e)
  {

    setStar({
      ...star,
      [e.target.name]: e.target.value
    })
    setStarOk(true)
  }

  useEffect(() =>
  {
    dispatch(UsuariosDetail(current_userID))
    dispatch(productosDetail(id))
  }, [dispatch, current_userID])


  function handleChange(e)
  {

    setAcces({
      ...acces,

      comentarios: {
        star,
        [e.target.name]: e.target.value,
        nombre: UserFromLocalStorage.nombre,
        email: UserFromLocalStorage.email
      }

    })
    if(!acces.comentarios.reseña.length){
      setText(true)
    }else{
      setText(false)
    }

  }



  function handleSubmit(e)
  {
    e.preventDefault()
    dispatch(editarAccComentarios(id, acces))

    return (
      alert(`Tu comentario fue enviado con éxito.`), navigate(`/historialC`)
    )

  }




  function cancel(e)
  {
    e.preventDefault()
    navigate(`/historialC`)
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>


        <div className="contenedor">
          <label>Califica tu producto </label>
          <p class="clasificacion">

            <input className='input' onChange={puntuacion} id="radio1" type="radio" name="estrellas" value="5" /><label className='label' for="radio1">★</label>
            <input className='input' onChange={puntuacion} id="radio2" type="radio" name="estrellas" value="4" /><label className='label' for="radio2">★</label>
            <input className='input' onChange={puntuacion} id="radio3" type="radio" name="estrellas" value="3" /><label className='label' for="radio3">★</label>
            <input className='input' onChange={puntuacion} id="radio4" type="radio" name="estrellas" value="2" /><label className='label' for="radio4">★</label>
            <input className='input' onChange={puntuacion} id="radio5" type="radio" name="estrellas" value="1" /><label className='label' for="radio5">★</label>
          </p>
          {
            starOk&&<textarea
            type='text'
            name='reseña'
            placeholder=''
            value={acces.reseña}
            onChange={handleChange}
            className='textArea'
          > </textarea>
          }

        </div>
        
          <input type="submit" value="Enviar"disabled={text} />
        
        
      </form><button onClick={cancel}>Cancelar</button>


    </div>
  );
};








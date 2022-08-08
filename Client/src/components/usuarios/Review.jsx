import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { usuarioId, editarAccComentarios, productosDetail } from "../../actions/actions";
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
  }

  useEffect(() =>
  {
    dispatch(usuarioId(current_userID))
    dispatch(productosDetail(id))
  }, [dispatch, current_userID])



  const [error, setError] = useState({})

  function validate(acces)
  {
    let errors = {}

    if (!acces.comentarios) {
      errors.comentarios = 'el campo no puede estar vacio'
    }

    return errors
  }





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


    setError(validate({
      ...acces,
      [e.target.name]: e.target.value
    }))

  }
  console.log(acces.comentarios)
  console.log(star)
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

            <input onChange={puntuacion} id="radio1" type="radio" name="estrellas" value="5" /><label for="radio1">★</label>
            <input onChange={puntuacion} id="radio2" type="radio" name="estrellas" value="4" /><label for="radio2">★</label>
            <input onChange={puntuacion} id="radio3" type="radio" name="estrellas" value="3" /><label for="radio3">★</label>
            <input onChange={puntuacion} id="radio4" type="radio" name="estrellas" value="2" /><label for="radio4">★</label>
            <input onChange={puntuacion} id="radio5" type="radio" name="estrellas" value="1" /><label for="radio5">★</label>
          </p>

          <textarea
            type='text'
            name='reseña'
            placeholder=''
            value={acces.reseña}
            onChange={handleChange}
            className='textArea'
          > </textarea>

          {error.comentarios && <p classproducto="danger">{error.comentarios}</p>}

        </div>
        <input type="submit" value="Enviar" />
      </form><button onClick={cancel}>Cancelar</button>


    </div>
  );
};








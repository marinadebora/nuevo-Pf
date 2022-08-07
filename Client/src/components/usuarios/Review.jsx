import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { usuarioId, editarAccComentarios, productosDetail } from "../../actions/actions";
import '../../styles/review.css'
import PuntuacionEstrella from "./PuntuacionEstrella";

export function Review()
{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()


  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario")) || JSON.parse(localStorage.getItem("logueadoGoogle"));
  const current_userID = UserFromLocalStorage.id || UserFromLocalStorage.password
  const myDetail = useSelector(state => state.detail);

  const comentProduct = myDetail.comentarios



  const [acces, setAcces] = useState({

    comentarios: { ...comentProduct }

  })


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
      <PuntuacionEstrella />
    </div>
  );
};








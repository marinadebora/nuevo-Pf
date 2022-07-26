
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {postCategorias, Categorias } from '../../actions/admin-action';
import '../../styles/form.css';
import { Link } from 'react-router-dom';
import NabVarD from './NabVarD';
import swal from "sweetalert";



export function CatCreate2(){

    const dispatch = useDispatch()
    const navigate = useNavigate();

    function validate(input){
        let errors = {}

        /*{
            "_id": "62d8a6b52029a4c825e23ed4",
            "name": "Bote inflable",
            "categorias": [
              "seguridad"
            ],
            "imagenes": [
              "https://http2.mlstatic.com/D_NQ_NP_821055-MLA41327582058_042020-O.webp"
            ],
            "descripcion": "Inflables de remolque OBRIEN deluxe nylon-wrapped con asas y neopreno nudillos. Cubierta de nylon de doble costura y alta resistencia PVC virgen vejiga. Velocidad Válvula De Seguridad",
            "dimensiones": "Rider, 54 de diámetro, (desinflado)",
            "precio": "US$96.61",
            "stock": "5",
            "createdAt": "2022-07-21T01:07:01.988Z",
            "updatedAt": "2022-07-21T01:07:01.988Z"
          }*/

        if(!input.nombre){
            errors.nombre = 'Falta ingresar el nombre'
        }

        return errors
    }

    
    const allCat = useSelector(state => state.categorias)
    console.log(allCat[0])
    
    //const allCategories = useSelector(state => state.types) FIJARSE EN EL STORE LAS CATEGORIAS

    useEffect( () => {
        dispatch(Categorias())
        
    }, [dispatch])

    const [input, setInput] = useState({
        nombre: '',
       
        
        
    })

    
    const [errors, setErrors] = useState({});
    

   

  

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }
   /* const handleChangeArray=(e)=>{
        setInput({
          ...input,
          [e.target.name] : [e.target.value]
      })
      setErrors(validate({
         ...input,
        [e.target.name] : [e.target.value]
      }))
      console.log(input)}*/

   
    
    function handleSubmit(e) {    
        e.preventDefault();
        try {
            let findproducto = allCat.find((e) => e.toLowerCase() === input.nombre.toLowerCase()
            )
            if (findproducto) {
                return  swal({
                    title: "Ya existe un producto con este nombre. ¡Cambialo!",
                    icon: "warning",
                    timer:1250
                 })
            }
            
            dispatch(postCategorias(input))
            setInput({
                nombre: '',
               
            })
            return  swal({
                title: "La categoria fue creada con exito.",
                icon: "success",
                timer:1250
             })
        
          
        } catch (error) {
          console.log(error);
          return  swal({
            title: "Algo fallo en crear el producto",
            icon: "warning",
            timer:1250
         })
        }
      };
    
    return (
        <div>
        <NabVarD />
        <div classname="cont-form">
            
            
            {
                !allCat ? 
                <>
                    <div>
                        <h1>Cargando...</h1>
                    </div>
                </>:
                <>
                    <div className='filter_contenedor'>
                     <ul>
                      {allCat &&
                        allCat
                         .map((t) => (
                     <li class="options" value={t} key={t}>
                       <a className='text'>{t}</a>
                    </li>
                    ))}
                   </ul>
                  </div>              
                    <div classname="create_recipe">
                        <form classname="form" onSubmit={handleSubmit}>
                            <h1>Crea la Categoria</h1>
                            
                            <div >
                                <label>Nombre de la Categoria: </label>
                                <input 
                                    type='text' 
                                    name='nombre' 
                                    placeholder='nombre de la categoria..' 
                                    value={input.nombre}
                                    onChange={handleChange}
                                    className={errors.nombre && 'danger'}
                                >
                                </input>
                                {errors.nombre && <p classname="danger">{errors.nombre}</p>}
                            </div>

                            <button classproducto="button-submit" type="submit" >Enviar Categoria</button>
                            <Link to='/admin'>
                                <button id='buttonBackForm'>Volver</button>
                            </Link>
                            
                          
                        </form>
                       

                        
                    </div>
                </>
            }
        </div>
        
        </div>
    )
}

export default CatCreate2;
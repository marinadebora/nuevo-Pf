import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { useParams } from "react-router-dom";
import { updateAccesorio, Categorias} from '../../actions/admin-action';
import { productosDetail, /*getAllTypes */} from '../../actions/actions'
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

export function EditarStock(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { id } = useParams()

    const allCat = useSelector(state => state.categorias)
    const detail = useSelector(state => state.detail)

    function validate(input){
        let errors = {}

        if(!input.stock){
            errors.stock = 'no ingresaste stock'
        }

        return errors
    }
    
    useEffect ( () => {
        dispatch(productosDetail(id))
    },[])
    useEffect( () => {
        dispatch(Categorias())
    }, [])


   

    const [input, setInput] = useState({
      
        stock: "",
        
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

  
   /* function handleSubmit(e){
        e.preventDefault()
        
        if(Object.keys(errors).length === 0){
            if(input.precio){parseInt(input.precio)}
            dispatch(updateAccesorio(id, input))
            return  swal({
                title: "El accesorio fue actualizado con exito",
                icon: "success",
                timer:1250
             })
            
        }
        

        
    }*/
    function handleSubmit(e) {    
        e.preventDefault();
        try {
           
            if(Object.keys(errors).length === 0 && (input.stock!=='')){
              dispatch(updateAccesorio(id, input))
              navigate("/admin")
            
           return  swal({
                    title: "El Accesorio fue Actualizado con exito.",
                    icon: "success",
                    timer:1250
                 })
               
         } } catch (error) {
            console.log(error);
            return  swal({
              title: "Algo fallo en actualizar el stock",
              icon: "warning",
              timer:1250
           })
          }
      };

    

    function cancel(e){
        e.preventDefault()
        navigate(`/admin`)
    }
    

    return (
        <div className="cont-form">
            { !allCat ? 
                <>
                    <div>
                        <h1>LOADING</h1>
                    </div>
                </>:
                <>
            <div className="create_detail">
                        <form className="form" onSubmit={handleSubmit}>
                            <h1>Actualiza tu Accesorio</h1>
                            
                            <div >
                                <h2>Nombre del accesorio: {detail.producto} </h2>
                               

                            </div>
                            
                            <div >
                                <h3>Stock Actual: {detail.stock} </h3>
                               

                            </div>
                            

                           

                            <div>
                                <label>Stock:</label>
                                <input 
                                    type='number' 
                                    name='stock' 
                                   
                                    value={input.stock} 
                                    onChange={handleChange}
                                    className={errors.stock && 'danger'}
                                    >
                                </input>
                                {errors.stock && <p className="danger">{errors.stock}</p>}
                            </div>

                          
                           
                            
                         

                                <button className="button-submit" onClick={cancel}>Cancelar</button>
                                <button className="button-submit" type="submit">Enviar Accesorio</button>
                            
                        </form>
                       

                       
                    </div>
                    </>
                 }
        </div>
    )
}

export default EditarStock;
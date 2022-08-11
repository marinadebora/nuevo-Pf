import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actualizarAdmin, usuarios, actualizarBaneado} from '../../actions/actions';
import est from './ListaUsuario.module.css';


const ListaUsuario = () => {
    /* const { id } = useParams() */
    const history = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    /* const [data, setData] = useState({
        id:''
    }) */
    

    const handleAdmin = (e)=>{
        console.log(e)
        dispatch(actualizarAdmin())
        dispatch(usuarios())
        
    }

    const handleBloqueado = ()=>{
        dispatch(actualizarBaneado({id:e.target.value}))
        dispatch(usuarios())
        history("/todousuario")
    }

    useEffect(()=>{
        dispatch(usuarios())
    },[dispatch])

    return (
        <div>
            <h1>lista</h1>
            <div>
                {
                    user.length ?
                    user.map(e =>{
                        return(
                            <div className={est.ordern} key={e._id}>
                                <div>
                                    <h4>Nombre:</h4>
                                    <h5>{e.nombre}</h5>
                                </div>
                                <div>
                                    <h4>Apellido:</h4>
                                    <h5>{e.apellido}</h5>
                                </div>
                                <div>
                                    <h4>Email:</h4>
                                    <h5>{e.email}</h5>
                                </div>
                                <div>
                                    <button name='id' value={e._id} onClick={handleAdmin(e._id)}>Admin</button>
                                    <h5>{e.admin === true? 'si': 'no'}</h5>
                                </div>
                                <div>
                                    <button value={e._id} onClick={handleBloqueado}>Bloqueado</button>
                                    <h6></h6>
                                </div>
                            </div>
                        )
                    }):<>Cargando</>
                }
            </div>
        </div>
    );
}

export default ListaUsuario;
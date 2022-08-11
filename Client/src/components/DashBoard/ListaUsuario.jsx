import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {Button, Typography} from "@mui/material";
import { useParams,useNavigate,Link } from 'react-router-dom'
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
        dispatch(actualizarAdmin({id:e.target.value}))
        dispatch(usuarios())
        window.location.reload()
    }

    const handleBloqueado = (e)=>{
        dispatch(actualizarBaneado({id:e.target.value}))
        dispatch(usuarios())
        window.location.reload()
    }

    useEffect(()=>{
        dispatch(usuarios())
    },[dispatch])

    return (
        <div>
            <h1>lista de Usuarios</h1>
            <div>
            <Link to="/dashboard"><button  className={est.boton}>Volver</button></Link>
            </div>
            <div>
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
                                    <Button sx={{marginLeft: '150px'}} variant="outlined" id="button" name='id' value={e._id} onClick={handleAdmin}>Admin</Button>
                                    <h5>{e.admin === true? 'si': 'no'}</h5>
                                </div>
                                <div>
                                    <Button sx={{marginLeft: '150px'}} variant="outlined" id="button" value={e._id} onClick={handleBloqueado}>Bloqueado</Button>
                                    {console.log(e?.baneado)}
                                    <h5>{e.baneado? 'si': 'no'}</h5>
                                </div>
                            </div>
                        )
                    }):<>Cargando</>
                }
            </div>
            </div>
        </div>
    );
}

export default ListaUsuario;
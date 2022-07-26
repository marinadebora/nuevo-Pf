import React, { Fragment } from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { todosLosProductos } from '../../actions/actions'
import Paginado from '../Paginado';
import Card from '../DashBoard/CardDahs';
import Navbar from '../Navbar'
import { Button, Typography } from "@mui/material";
import '../../styles/admin.css';
import { Grid } from '@mui/material'
//import '../styles/card.css';
import { useNavigate } from 'react-router-dom';
import NabVarD from '../DashBoard/NabVarD';


export default function Admin()
{

	const dispatch = useDispatch();
	const newState = useSelector(state => state.products)

	const [page, setPage] = useState(1);
	const [characterPerPage, setCharacterPerPage] = useState(8);
	const index = page * characterPerPage;
	const endIndex = index - characterPerPage;
	const actualPage = newState?.slice(endIndex, index);
	const navigate = useNavigate()
	const paginado = (numPage) =>
	{
		setPage(numPage)
	}

	useEffect(() =>
	{

		dispatch(todosLosProductos())

	}, [dispatch])


	function volver()
	{
		navigate("/dashboard")
	}


	return (
		<div>
			<NabVarD />
			<Typography sx={{ marginLeft: 'auto' }} variant="h6" component="p" id='guest1'>
				Edita tus productos
			</Typography>
			
			<br />

			<button id='buttonBackAdmin' onClick={volver}>VOLVER</button>


			<Paginado
				characterPerPage={characterPerPage}
				newState={newState.length}
				paginado={paginado}
			/>

			<Grid container spacing={2}>
				{

					actualPage?.map(e => 
					{
						return (
							<Fragment>


								<Grid item xs={12} sm={6} md={4} lg={3}>

									<Card
										tipo={e.tipo}
										Marca={e.Marca}
										modelo={e.modelo}
										Motor={e.Motor}
										precio={e.precio}
										astillero={e.astillero}
										fabricacion={e.fabricacion}
										localizacion={e.localizacion}
										imagenes={e.imagenes[0]}
										producto={e.producto}
										descripcion={e.descripcion}
										Tamaño={e.Tamaño}
										Link={<Link to={`/dashboard/${e._id}`} >Info</Link>}
										
										Link2={<Link to={`/dashboard/stock/${e._id}`} >Editar Stock</Link>}
									/>
									

								</Grid>
								



							</Fragment>
						)
					})
				}
			</Grid>

		</div>
	)

}   
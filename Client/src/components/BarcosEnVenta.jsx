<<<<<<< HEAD
import React, { useState } from "react";
import { useSelector } from "react-redux";
=======
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { barcosEnVenta, filtroPrecio, filtrosCategoriaEmbarcacion, precioOrden } from '../actions/actions'
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
>>>>>>> f4ce25ed315d5d7cdb681ca61547947209a15099
import Paginado from "./Paginado";
import Card from './Card'
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid } from '@mui/material'
import '../styles/searchBar.css';
<<<<<<< HEAD
import { FiltroEmbVenta } from "./FiltroEmbVenta";
import { Link } from "react-router-dom";
=======
import '../styles/box.css'
>>>>>>> f4ce25ed315d5d7cdb681ca61547947209a15099

export function BarcosEnVenta()
{
  const productVenta = useSelector(state => state.saleVessels)

  //----------paginado---------//

  const [, setOrdering] = useState('')
  const [page, setPage] = useState(1);
  const [characterPerPage,] = useState(5);
  const index = page * characterPerPage;
  const endIndex = index - characterPerPage;
  const actualPage = productVenta?.slice(endIndex, index);


  const paginado = (numPage) =>
  {
    setPage(numPage)
  }
<<<<<<< HEAD

  return (
    <div>
      <Link to='/home'>
        <button id='buttonBack'>VOLVER</button>
      </Link>
      <Paginado
        characterPerPage={characterPerPage}
        newState={productVenta.length}
        paginado={paginado}
      />
      <FiltroEmbVenta
        setPage={setPage}
        setOrdering={setOrdering}
      />
=======
  console.log(productVenta)
  useEffect(() =>
  {
    dispatch(barcosEnVenta())
  }, [dispatch])


  return (
    <div>
>>>>>>> f4ce25ed315d5d7cdb681ca61547947209a15099

        <Navbar/>
        <Box id='boxVta'>
                <Box id='textBox1'>VENTA</Box>
                
        </Box>
      
      <Grid container spacing={2}>
        {

          actualPage?.map(e => 
          {
            return (
<<<<<<< HEAD
              <>
=======
              <Fragment>
>>>>>>> f4ce25ed315d5d7cdb681ca61547947209a15099
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
                    Link={<Link to={`/home/${e._id}`} >Info</Link>}
                  />

                </Grid>
<<<<<<< HEAD
              </>
=======

              </Fragment>
>>>>>>> f4ce25ed315d5d7cdb681ca61547947209a15099
            )
          })
        }
      </Grid>
      <Link to='/home'>
        <button id='buttonBack'>VOLVER</button>
      </Link>
      <Paginado
        characterPerPage={characterPerPage}
        newState={productVenta.length}
        paginado={paginado}
      />

      <Footer/>


    </div>);
};

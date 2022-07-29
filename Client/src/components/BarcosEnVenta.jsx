import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paginado from "./Paginado";
import Card from './Card'
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid } from '@mui/material'
import '../styles/searchBar.css';
import { FiltroEmbVenta } from "./FiltroEmbVenta";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

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



  return (
    <div>

        <Navbar/>
        <Box id='boxVta'>
                <Box id='textBox1'>VENTA</Box>
                
        </Box>
      <FiltroEmbVenta />
      <Grid container spacing={2}>
        {

          actualPage?.map(e => 
          {
            return (
              <>
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
              </>
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

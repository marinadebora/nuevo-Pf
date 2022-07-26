import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { barcosEnVenta, filtroPrecio, filtrosCategoriaEmbarcacion, precioOrden } from '../actions/actions'
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Paginado from "./Paginado";
import CardRentaVenta from './CardRentaVenta'
import Navbar from './Navbar';
import Footer from './Footer';
import { Grid } from '@mui/material'
import '../styles/searchBar.css';
import '../styles/box.css'
import { useNavigate } from "react-router-dom";

export function BarcosEnVenta()
{
  const productVenta = useSelector(state => state.saleVessels)
  const dispatch = useDispatch()

  //----------paginado---------//

  const [ordering, setOrdering] = useState('')
  const [page, setPage] = useState(1);
  const [characterPerPage, setCharacterPerPage] = useState(8);
  const index = page * characterPerPage;
  const endIndex = index - characterPerPage;
  const actualPage = productVenta?.slice(endIndex, index);
  const [venta, setVenta] = useState('')
  const [categoriasR, setCategoriasR] = useState('')
  const navigate=useNavigate()


  const paginado = (numPage) =>
  {
    setPage(numPage)
  }
  console.log(productVenta)
  useEffect(() =>
  {
    dispatch(barcosEnVenta())
  }, [dispatch])
  const volver = () =>
  {
    navigate(-1)
  }

  return (
    <div>

        <Navbar/>
        <Box id='boxVta'>
                <Box id='textBox1'>VENTA</Box>
                <Box id='textBox2'>(Nuevos y Usados)</Box>
                
        </Box>

        <Paginado
        characterPerPage={characterPerPage}
        newState={productVenta.length}
        paginado={paginado}
      />
      
      <Grid container spacing={2}>
        {

          actualPage?.map(e => 
          {
            return (
              <Fragment>
                <Grid item xs={12} sm={6} md={4} lg={3}>

                  <CardRentaVenta
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
                    Link={<Link id="infobutton" to={`/home/${e._id}`} >Info</Link>}
                  />

                </Grid>

              </Fragment>
            )
          })
        }
      </Grid>
      
      <button id='buttonBackAA' onClick={volver}>VOLVER</button>
      
      
      

      <Footer/>


    </div>);
};

import React from "react";
import { Link } from "react-router-dom";
import '../../styles/historialCompras.css'
// import {useSelector} from 'react-redux' 
//deberia recibir el usuario y con una key de hc que sea [{}{}] en este caso representado por articulo
export function HistorialCompras()  { 
const articulo= [{
    "valoraciones": [],
    "comentarios": [],
    "_id": "62d8a6b52029a4c825e23ed5",
    "producto": "Ecosondas Garmin",
    "categorias": [
      "electronica"
    ],
    "imagenes": [
      "https://nautycar.com.ar/wp-content/uploads/2020/04/eco.jpg",
      "https://m.media-amazon.com/images/I/417XcLkydmL._AC_.jpg",
      "https://m.media-amazon.com/images/I/41JX5NZyxuL._AC_.jpg"
    ],
    "descripcion": "Garmin Striker 4 con transductor, Sensor de peces GPS con transductor tradicional CHIRP, te muestra más de lo que hay en el agua alrededor de tu barco; este sonar de alta frecuencia ofrece imágenes fotográficas cerca con representaciones detalladas de objetos, estructura y peces",
    "dimensiones": "3.5 Pulgadas",
    "precio": "US$129.29",
    "stock": 5,
    "estado": true
   
  },
  {
    "valoraciones": [],
    "comentarios": [],
    "_id": "62d8a6b52029a4c825e23ed3",
    "producto": "Chaleco Salvavidas",
    "categorias": [
      "seguridad"
    ],
    "imagenes": [
      "https://www.eduardono.com/nautico/1/chaleco-salvavidas-eduardono-1.jpg",
      "https://jetcenterlevante.com/wp-content/uploads/2018/10/D20-AJ114-E1-0L-20-male-front-entry-jacket-BALATON-Studio-003_Tablet.jpg",
      "https://i.ebayimg.com/thumbs/images/g/~D0AAOSwd05h5gXl/s-l300.jpg"
    ],
    "descripcion": "Chaleco salvavidas de neopreno con 2 hebillas para hombre Yamaha Construcción de neopreno de alta calidad. Paneles de espuma totalmente segmentados Dos correas ajustables con hebillas de liberación lateral para mayor apoyo y seguridad Cremallera frontal duradera",
    "dimensiones": "XL pecho de 114 a 48.8 in",
    "precio": "US$124.96",
    "stock": 5,
    "estado": true
   
  }
]
    return (
      <div>
        {
          articulo.map(e=>(
            <div className='contenedor-art'>
              <img src={e.imagenes[0]} alt="imagen" className='imagen-art'/>
              <div className='contenedor-texto-art'>
            <p className='nombre-art'>{e.producto}</p>
            <p className='texto-art'>Precio: {e.precio}</p>
            <p className='texto-art'>Disponible {e.stock} unidades</p>
            </div>
            {
              e.estado=== true && <Link to={`/review/${e._id}`}>
              <p className='Link'>Opina sobre tu producto</p>
              </Link>
            }
            
            </div>
        
          )
          )
        }
    
  
      </div>
  
    );
};

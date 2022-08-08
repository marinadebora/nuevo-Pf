import NavBar from './Navbar'
import { addToBasket, getItemsCart,UsuariosDetail,} from '../actions/actions'
import { useSelector, useDispatch ,} from 'react-redux'
import { useEffect ,useState,Fragment} from 'react'
import { useNavigate } from 'react-router-dom';

import '../styles/card.css';

import IconButton from "@mui/material/IconButton";
import { accesorios } from '../actions/actions'
import { Grid } from '@mui/material'
import Card from './CardShop'
import {  Link } from 'react-router-dom';
import swal from "sweetalert";
import * as GiIcons from "react-icons/gi"
import Badge from "@mui/material/Badge"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";




export default function Favs()
{

    

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const FavFromLocalStorage = JSON.parse(localStorage.getItem("Fav") || "[]");
  const [cart /* setCart */] = useState(FavFromLocalStorage);
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
  const [user/* setUser */] = useState(UserFromLocalStorage);
  const current_userID =UserFromLocalStorage?.id
  const myUserDetail = useSelector(state => state?.userDetail);
  const current_cart =FavFromLocalStorage;
  const CartUser= myUserDetail[0]?.carritoDeCompra
 

  

  const [input, setInput] = useState({
    carritoDeCompra: FavFromLocalStorage
    
})





 
async function handleClearCart (e){
 localStorage.setItem("Fav", []);
 navigate("/accesorios");
 return  swal({
  title: "Se han borrado todos los Favoritos de su lista de deseos",
  text: "Puede agregar mas desde nuestro inicio!!",
  icon: "success",

}).then((value) => {
  switch (value) {
    case "cart":
      
      swal("Bienvenido a nuestra Pagina","Que tenga una buena compra" ,"success");
      break;

    default:
      break;
  }
});
};

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}




var uniqueArray = removeDuplicates(current_cart, "_id");

  const volver = () =>
  {
      navigate(-1)
  }

  const handleDelete = (id) => {
      localStorage.setItem(
        "Fav",
        JSON.stringify(FavFromLocalStorage.filter((e) => e._id !== id))
      );
      return  swal({
          title: "El producto se ha eliminado de tus favoritos",
          icon: "success",
          buttons: {
              OK: {
                  text: "OK",
                  value: "check",
                },      
          },
        }).then((value) => {
          switch (value) {
            case "check":
              navigate("/checkoutPage");
              break;
    
            default:
              break;
          }
        }); 
    };
    async function addToCart (id) {
    
      dispatch(addToBasket({id}))
       return  swal({
        title: "El producto se ha agregado a tu carro de compras",
        text: "Que queires hacer ahora?",
        icon: "success",
        buttons: {
          cart: {
            text: "Ir al carro",
            value: "cart",
          },
         
          cancel: "Quedarse",
        },
      }).then((value) => {
        switch (value) {
          case "cart":
            navigate("/checkoutPage");
            swal("Bienvenido a tu carro","Que tenga una buena compra" ,"success");
            break;
  
          default:
            break;
        }
      });
       
    }
   
   

  
    
  useEffect(() => {
  
  localStorage.setItem("Fav", JSON.stringify(cart));
  dispatch(getItemsCart());
  dispatch(accesorios())
  dispatch(UsuariosDetail(current_userID))
  /*if(typeof current_userID === "string"){
    dispatch(UpdateToCart(current_userID,input ));
  }*/
 
  
}, [cart ,dispatch,current_userID ]);
 
 

    return (
        !uniqueArray ? 
        <>
            <div>
                <h1>LOADING</h1>
                <button id='buttonBackCheckout' onClick={volver}>Volver</button>
            </div>
        </>:
        <div>
        <NavBar />
        <button 
                className="buttonCleanCart" 
                onClick={() => handleClearCart()}>
                  Limpiar carrito <GiIcons.GiBroom /> </button>
            <h1 id='titleCheckoutPage'>Mis Favoritos</h1>
            {
              uniqueArray?.map(e => (
                    e !== undefined &&
                <div id='checkoutCard'>

                   
                         <Grid container spacing={2}>
      {
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
                    id={e._id}
                    stock={e.stock}
                      
                  />
                
                <form id="layout">
                <Link to={`/home/${e._id}`} >Info</Link>
                
                {e.stock >0 
          ?<IconButton aria-label="add to cart"onClick={() => addToCart(e._id)}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          :<IconButton disabled aria-label="add to cart"onClick={() => addToCart(e._id)}>
          <Badge  color="secondary" id='badge'>
            <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          }
               
                <button id="delete" onClick={() => handleDelete(e._id)} className="delete-button">Delete</button>
                <div class="clearfix"></div>
                
                </form>
                
                </Grid>
              
              </Fragment>
              
             }
               
      </Grid>
      
      
            </div>
                ))
                }
        
            <button id='buttonBackCheckout' onClick={volver}>Volver</button>
        </div>
        
    )
}
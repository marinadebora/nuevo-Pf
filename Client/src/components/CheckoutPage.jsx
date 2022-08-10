import NavBar from './Navbar'
import { addToBasket, removeToBasket,getItemsCart,UsuariosDetail,UpdateToCart, } from '../actions/actions'
import { useSelector, useDispatch ,} from 'react-redux'
import { useEffect ,useState,Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from "@mui/material";
import '../styles/card.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import { accesorios } from '../actions/actions'
import { Grid } from '@mui/material'
import Card from './CardShop'
import {  Link } from 'react-router-dom';
import swal from "sweetalert";
import * as GiIcons from "react-icons/gi"




export default function CheckoutPage()
{

    

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateBasket = useSelector((state) => state.basket)
  const accesorio = useSelector(state => state.allAccesories._id)
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);
  const [cant, SetCant]= useState(1)
  const UserFromLocalStorage = JSON.parse(localStorage.getItem("loguearUsuario"));
  const [user/* setUser */] = useState(UserFromLocalStorage);
  const UserFromLocalgoogle = JSON.parse(localStorage.getItem("logueadoGoogle"));
  const current_userID =UserFromLocalStorage?.id || UserFromLocalgoogle?.id
  const myUserDetail = useSelector(state => state?.userDetail);
  const current_cart =cartFromLocalStorage;
  const CartUser= myUserDetail[0]?.carritoDeCompra
  const paramFromLocalStorage = JSON.parse(localStorage.getItem("parametros") || "[]");
  const [param /* setCart */] = useState(paramFromLocalStorage);

  

  const [input, setInput] = useState({
    carritoDeCompra: cartFromLocalStorage
    
})


async function handleClearCart (e){
  localStorage.setItem("item2", []);
  navigate("/accesorios");
  return  swal({
   title: "Se han borrado todos los productos de su carro de compras",
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
const [soloid] =useState(current_cart.map(item => item._id))
const sumall = current_cart.map(item => item.precio);
const neto = sumall.map(e=>e.split('$')[1])
const num = neto.map(e=> parseInt(e))
var precioTotal =num.reduce((a, b) => a + b, 0);

const sumaStock = uniqueArray.map(item => item.stock).reduce((a, b) => a + b, 0);;



function cantidad (id){
  
var cantidadfiltrada = soloid.filter(e=> e === id)
return cantidadfiltrada.length
}


  async function next(id){
  
  dispatch(addToBasket({id}))

        
};


  const volver = () =>
  {
      navigate(-1)
  }

  const handleDelete = (id) => {
      localStorage.setItem(
        "item2",
        JSON.stringify(cartFromLocalStorage.filter((e) => e._id !== id))
      );
      return  swal({
          title: "El producto se ha eliminado de tu carro",
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
   
   

    
    const handleSplice = (id) => {
     
      var myIndex2 = current_cart.findIndex((e)=> e._id === id)
      if (myIndex2 !== -1) {
        current_cart.splice(myIndex2, 1);
           }
           console.log(current_cart)
      localStorage.setItem(
        "item2",
        JSON.stringify(current_cart)
      );
      
    };
    
  useEffect(() => {
  localStorage.setItem("parametros", JSON.stringify(param))
  localStorage.setItem("item2", JSON.stringify(cart));
  dispatch(getItemsCart());
  dispatch(accesorios())
  dispatch(UsuariosDetail(current_userID))
  if(typeof current_userID === "string"){
    dispatch(UpdateToCart(current_userID,input ));
  }
 
  
}, [cart ,dispatch,current_userID ]);
 
 

    return (


        !uniqueArray ? 
        <>
            <div>
                <h1>LOADING</h1>
                <button id='buttonBackCheckout' onClick={volver}>Back</button>
            </div>
        </>:

        
        <div>
        <NavBar />
        {current_cart.length === 0 ? 
        <>
         <h1 id='titleCheckoutPage'>Shopping Cart</h1>
         <h2>El Carrito esta vacio</h2>
        </>
       : <>
        <button 
                className="buttonCleanCart" 
                onClick={() => handleClearCart()}>
                  Limpiar carrito <GiIcons.GiBroom /> </button>
            <h1 id='titleCheckoutPage'>Shopping Cart</h1>
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
                <p id="cantidad">Cantidad:{cantidad(e._id)}</p>
                <p id="cantidad">Stock Disponible:{e.stock}</p>
                <div id="buttonsCart">
                {e.stock <= cantidad(e._id) ? " ":<button onClick={() => next(e._id)}class="pagination-button p" id="buttonMasMenos">+</button>}
                <button onClick={() => handleSplice(e._id)} class="pagination-button a" id="buttonMasMenos">-</button>
                </div>
                <p id="precioTotal">Precio Total:US$ {e.precio.split('$')[1] * cantidad(e._id)}</p>
                <button id="delete" onClick={() => handleDelete(e._id)} className="delete-button">Borrar</button>
                <div class="clearfix"></div>
                </form>
                
                </Grid>
              
              </Fragment>
              
             }
               
      </Grid>
      
      
            </div>
                ))
                }
                <div>
        <div id='pagoTotal'>  
        <h2> TOTAL</h2>
        <h2>US$ {precioTotal}</h2>
        </div>   
       
        {uniqueArray.length !== 0 
        ?<Button href="/checkout" variant="contained" size="large" id='pagarButton'>Pagar</Button>
        :" " 
      }

      </div>
            <button id='buttonBackCheckout' onClick={volver}>Volver</button>
            </>}
        </div>
        
    )
}
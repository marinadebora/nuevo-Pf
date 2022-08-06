import NavBar from './Navbar'
import { addToBasket, removeToBasket,getItemsCart,UsuariosDetail,UpdateToCart, } from '../actions/actions'
import { useSelector, useDispatch ,} from 'react-redux'
import { useEffect ,useState,Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import { accesorios } from '../actions/actions'
import { Grid } from '@mui/material'
import Card from './CardShop'
import {  Link } from 'react-router-dom';
import swal from "sweetalert";




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
  const current_userID =UserFromLocalStorage?.id
  const myUserDetail = useSelector(state => state?.userDetail);
  const current_cart =cartFromLocalStorage;
  const CartUser= myUserDetail[0]?.carritoDeCompra
  const paramFromLocalStorage = JSON.parse(localStorage.getItem("parametros") || "[]");
  const [param /* setCart */] = useState(paramFromLocalStorage);

  

  const [input, setInput] = useState({
    carritoDeCompra: cartFromLocalStorage
    
})




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
//console.log(precioTotal)
console.log(current_cart)

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

 async function handleDelete (id) {
      localStorage.setItem(
        "item2",
        JSON.stringify(cartFromLocalStorage.filter((e) => e._id !== id))
      );
      return  swal({
          title: "Your product was successfully deleted to the cart",
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
      //indexOf(id);
      
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
            <p id='titleCheckoutPage'>Shopping Cart</p>
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
                  <form>
                    {
                    cantidad(e._id) >= e.stock 
                    ?<> <button  onClick={() => handleSplice(e._id)} class="pagination-button a">-</button><p>Cantidad:{cantidad(e._id)}</p><button disabled onClick={() => next(e._id)}class="pagination-button p">+</button></>
                    : <><button onClick={() => handleSplice(e._id)} class="pagination-button a">-</button><p>Cantidad:{cantidad(e._id)}</p><button onClick={() => next(e._id)}class="pagination-button p">+</button></>
                    }
                </form>
                <a>Stock Disponible{e.stock}</a>
                <button>Precio x unidad:{e.precio}</button>
                <button>Precio Total:${e.precio.split('$')[1] * cantidad(e._id)}</button>
                <button onClick={() => handleDelete(e._id)} className="delete-button">Delete</button>
                </Grid>
              
              </Fragment>
              
             }
               
      </Grid>
      
      
            </div>
                ))
                }
                <div>
        <h1>PRECIO COMPRA TOTAL:{precioTotal}</h1>
      </div>
            <button id='buttonBackCheckout' onClick={volver}>Back</button>
        </div>
        
    )
}
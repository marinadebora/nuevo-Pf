 export const initialState = {
    products: [],
    allProducts:[],
    saleVessels: [],
    AllSaleVessels:[],
    rentVessels: [],
    accesories: [],
    allAccesories:[],
    ordenAcc:[],
    catAcc:[],
    detail: {},
    categorias: [],
    basket: [],
    userDetail: [],
    shippingData:[],
  
  };
  
  function rootReducer(state = initialState, action)
  {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
    const paramFromLocalStorage = JSON.parse(localStorage.getItem("parametros") || "[]"); 

  
    switch (action.type) {
  
      case 'TODOS_LOS_PRODUCTOS':
        return {
          ...state,
          products: action.payload,
          allProducts:action.payload,
          detail:{}
        }
      case 'PRODUCTOS_DETAIL':
  
        return {
          ...state,
          detail: action.payload,
          basket:action.payload
        }
        case 'USUARIO_DETAIL':
  
        return {
          ...state,
          userDetail: action.payload,
          
        }
  
      case 'BARCOS_EN_VENTA':
        return {
          ...state,
          saleVessels: action.payload,
          AllSaleVessels:action.payload,
        }
  
      case 'BARCOS_EN_ALQUILER':
        return {
          ...state,
          rentVessels: action.payload,
        }
  
      case 'ACCESORIOS':
        return {
          ...state,
          accesories: action.payload,
          allAccesories: action.payload,
        }
  
      case 'PRODUCT_NAME':
        return {
          ...state,
          products: action.payload
        }
  
      case 'TODAS_CATEGORIAS':
        return {
          ...state,
          categories: action.payload
        }

        case 'ADD_TO_BASKET':
          const cart_add = state.allAccesories.find(e => e._id === action.payload.id)
         const actual_card = localStorage.getItem("item2") 
          //JSON.stringify([...cartFromLocalStorage, cart_add._id, cart_add.producto])
         
         if(cartFromLocalStorage.length) {
          localStorage.setItem(
            "item2",
            JSON.stringify([...cartFromLocalStorage, cart_add])
          );
        } else {
          localStorage.setItem(
            "item2",
            JSON.stringify([cart_add])
          )
        }
        return{
          ...state
        }
        case 'ADD_TO_PARAM':
          
         const actual_card2 = localStorage.getItem("parametros") 
          //JSON.stringify([...cartFromLocalStorage, cart_add._id, cart_add.producto])
         
         if(paramFromLocalStorage.length) {
          localStorage.setItem(
            "parametros",
            JSON.stringify([...paramFromLocalStorage, cart_add])
          );
        } else {
          localStorage.setItem(
            "item2",
            JSON.stringify([cart_add])
          )
        }
        return{
          ...state
        }
  
        case 'REMOVE_TO_BASKET':
          //const cart_remove = state.basket.filter(e => e!==undefined&& e._id !== action.payload)
          const spliceCart = cartFromLocalStorage
          var myIndex = spliceCart.indexOf(action.payload);
          console.log(action.payload)
         /* if (myIndex !== -1) {
            spliceCart.splice(myIndex, 1);
             }
           console.log(spliceCart)
           if(cartFromLocalStorage.length) {
            localStorage.setItem(
              "item2",
              JSON.stringify([spliceCart])
            );
          } else {
            localStorage.setItem(
              "item2",
              JSON.stringify([spliceCart])
            )
          }*/
           return{
            ...state
          }
  
          
          case "GET_ALL_CART":
            const actual = localStorage.getItem("item2")
            return {
              ...state,
              basket: actual
            }

            case 'SET_SHIPPING_DATA':
              return {
                ...state,
                shippingData: action.payload
              }
    
        //----------filtros----------//
  
      case 'FITRO_PRECIO':
        const estado = state.AllSaleVessels
        const precios = estado.filter(e => e.precio.split(' '))
        const filterPrecio = action.payload === 'medio' ?
          precios.filter(e => parseInt(e.precio) > 150000 && parseInt(e.precio) < 300000) :
          precios.filter(e => parseInt(e.precio) < 150000)
  
        return {
          ...state,
          saleVessels: action.payload === 'mayor' ? precios.filter(e => parseInt(e.precio) > 300000) : filterPrecio
        }
  //----------filtros de accesorios----------//
      case 'FITRO_PRECIO_ACCESORIO':
        const estadoAcc = state.allAccesories
        const precioAcc = estadoAcc.filter(e => e.precio.split('$')[1])
        const filterPrecioAcc = action.payload === 'medio' ?
          precioAcc.filter(e => parseInt(e.precio.split('$')[1]) > 45 && parseInt(e.precio.split('$')[1]) < 120) :
          action.payload === 'menor' ? precioAcc.filter(e => parseInt(e.precio.split('$')[1]) < 45): action.payload === 'mayor' && precioAcc.filter(e => parseInt(e.precio.split('$')[1]) > 120)
  
        return {
          ...state,
          accesories:  filterPrecioAcc,
          catAcc:  filterPrecioAcc,
        }
  
      case 'FITRO_CATEGORIA_ACCESORIO':
        const allAcc = state.catAcc
        const categoria = action.payload === 'seguridad' ? allAcc.filter(e => e.categorias.find(e => e === action.payload)) :
        action.payload === 'esparcimiento' ? allAcc.filter(e => e.categorias.find(e => e === action.payload)):action.payload === 'electronica' && allAcc.filter(e => e.categorias.find(e => e === action.payload))
      
        return {
          ...state,
          accesories: action.payload === 'sinFiltro' ? allAcc : categoria,
          pecioAcc:categoria,
        }
        case 'PRECIO_ORDEN_ACCESORIOS':

          const stateOrden=state.pecioAcc.map(e=>({
            producto: e.producto,
            imagenes:e.imagenes,
            precio: e.precio.split('$')[1],
            comentarios:e.comentarios,
            stock: e.stock,
            descripcion: e.descripcion,
            dimensiones: e.dimensiones,
            categorias: e.categorias,
            _id:e._id,
            valoraciones:e.valoraciones

          }))

          const orden = action.payload === 'max' ?
            stateOrden.sort(function (a, b)
            {
              return parseInt(b.precio) - parseInt(a.precio)
            })
            :action.payload === 'min' && stateOrden.sort(function (a, b)
            {
              return parseInt(a.precio) - parseInt(b.precio)
            })
            console.log(orden)
          return{
            ...state,
            accesories:orden
          }
  
      case 'FITRO_CATEGORIA_EMBARCACION':
        const allrent = state.rentVessels
        const allvent = state.saleVessels
  
        const categoriaR = action.payload === 'Alta' ? allrent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload)) :
        action.payload === 'Media' && allrent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload))
  
        const categoriaV = action.payload === 'Alta' ? allvent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload)) :
        action.payload === 'media' && allvent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload))
  
        return {
          ...state,
          saleVessels: action.payload === 'baja' ? allvent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload)) : categoriaV,
          rentVessels: action.payload === 'Economica' ? allrent.filter(e => e.categorias.find(e => (e.split(' ')[1]) === action.payload)) : categoriaR
        }
      
  
      case 'FILTRO_CATEGORIAS':
        const productos = state.allProducts
        const filtroCateg = productos.filter(e => e.categorias.find(e => e.toLowerCase() === action.payload.toLowerCase()))
  
        return {
          ...state,
          products: filtroCateg
        }
  
      case 'PRECIO_ORDEN':
          const stateOrder = state.saleVessels
          const order = action.payload === 'max' ?
            stateOrder.sort(function (a, b)
            {
              return parseInt(b.precio) - parseInt(a.precio)
            })
            : stateOrder.sort(function (a, b)
            {
              return parseInt(a.precio) - parseInt(b.precio)
            })
    
        return {
            ...state,
            saleVessels: order
          }
        
        
          case 'CATEGORIAS':
            return {
              ...state,
              categorias: action.payload,
            }
          case "POST_CATEGORIAS":   
            return { ...state, categorias: state.categorias.concat(action.payload) };
            
            case "RESET_DETAIL":
              return {
                ...state,
                detail: {},
              };
              case 'REGISTRO':
            return{
              ...state
            }
            case "USUARIOS":
            return{
              ...state,
              user: action.payload
            }
            case 'LOGIN':
            return{
              ...state
            }
            case 'BUSCAR_ACCESORIOS':
        return{
          ...state,
          accesories: action.payload
        }
  
      default: {
        return state
      }
    }
  }
  
  export default rootReducer;

import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useStateValue } from "../../stateProvider";


const Review = () => {
  const [{ basket }, dispatch] = useStateValue();
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("item2") || "[]");
  const [cart /* setCart */] = useStateValue(cartFromLocalStorage);
  const current_cart =cartFromLocalStorage;

  
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

const sumall = current_cart.map(item => item.precio);
const neto = sumall.map(e=>e.split('$')[1])
const num = neto.map(e=> parseInt(e))
var precioTotal =num.reduce((a, b) => a + b, 0);

  


  return (
    <>
      <Typography variant='h6' gutterBottom>
        Resumen de compra
      </Typography>
      <List disablePadding>

       
        
        {current_cart?.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.producto}>
            <ListItemText primary={product.producto} secondary={`Qty : ${1}`} />
            <Typography variant='body2'>
              {product.precio}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
           ${precioTotal}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;


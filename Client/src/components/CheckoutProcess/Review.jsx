import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useStateValue } from "../../stateProvider";


const Review = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Resumen de compra
      </Typography>
      <List disablePadding>

        INCLUIR CONTENIDO DEL CARRO DE COMPRA
        
        {basket?.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Qty : ${1}`} />
            <Typography variant='body2'>
              {/* PRECIO DE CADA PRODUCTO */}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
            {/* PRECIOTOTAL */}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;


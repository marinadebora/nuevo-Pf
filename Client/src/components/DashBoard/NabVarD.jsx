import {AppBar, Toolbar, IconButton,  Grid} from "@mui/material";
import '../../styles/NabVarD.css'
import Logo from "../../imagenes/Nautical.png";

import { Link } from 'react-router-dom';





export default function Navbar() {

  
  return (
    
      <AppBar position="sticky" id="appBar3">
        <Grid>
          <Toolbar>
          <Link to='/accesorios'>
              <IconButton>
                <img src={Logo} alt="img" id="logoNavBar2" />
              </IconButton>
            </Link>

            </Toolbar>
             </Grid>
            </AppBar>
    
  );
}

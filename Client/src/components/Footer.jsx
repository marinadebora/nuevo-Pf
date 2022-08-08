import {AppBar, Toolbar, IconButton, Typography, Button, Box, Grid} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ContactInstagram from "@mui/icons-material/Instagram";
import "../styles/navBar.css";
import Logo from "../imagenes/logo_PF_Yatch.png";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import Iframes from "./Iframes";
 



export default function Footer() {
 

  return (
    
      <AppBar position="sticky" id="footer">
        <Grid>
          <Toolbar>
            <Iframes/>
        <Box id="LinksFooterAll" sx={{marginLeft: 'auto'}}>
          <Box id="LinksFooter">
              <IconButton id="contactFooter" href="/contactForm">
                <a>Contacto</a>
                <ContactMailIcon/> 
              </IconButton>
            </Box>
            <Box id="LinksFooter">
              <IconButton id="contactFooter" href="https://www.instagram.com">
                <a>Instagram</a>
                <ContactInstagram/>
              </IconButton>
          </Box>
        </Box>  
          </Toolbar>
        </Grid>
      </AppBar>
    
  );
}

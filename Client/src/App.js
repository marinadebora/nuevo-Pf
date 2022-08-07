import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import CardDetail from './components/CardDetail';
import { BarcosEnVenta } from './components/BarcosEnVenta';
import { BarcosEnAlquiler } from './components/BarcosEnAlquiler';
import { Accesorios } from './components/Accesorios';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Admin from "./components/Admin/Admin"
import Dashboard from "./components/DashBoard/Dashboard.jsx"
import {AccesoriosCreate2} from "./components/DashBoard/CreateAccesorios2.js"
import {EmbarcacionCreateEnV2} from "./components/DashBoard/CreateEmbarcacionEnv2"
import {EmbarcacionCreateRT2} from "./components/DashBoard/CreateEmbarcionERT2"
import CardDetailAdmin2 from "./components/DashBoard/CardDetailAdmin2"
import {UpdateAccesorio2} from "./components/DashBoard/EditAccesorios2"
import {UpdateEmbarcacionRenta2} from "./components/DashBoard/EditEmbarcacionRT2"
import {UpdateEmbarcacionVenta2}  from "./components/DashBoard/EditEmbarcacionEnv2"
import CheckoutPage from './components/CheckoutPage'
import LandingPage from './components/LandingPage'
import SingIn from './components/SingIn'
import SingUp from './components/SingUp'
import {CatCreate2} from "./components/DashBoard/CreateCat2"
import ContactForm from "./components/ContactForm";
import { HistorialCompras } from './components/usuarios/HistorialCompras';
import { Review } from './components/usuarios/Review';

import Checkout from "./components/CheckoutProcess/Checkout"

export default function contactForm() {
  return (
   
    <div className="App">
      <Routes>
        <Route exact path= '/' element={<LandingPage/>}/>
        <Route exact path= '/' element={<Navbar/>}/>
        <Route exact path='/singIn' element={<SingIn />} />
        <Route exact path='singUp' element={<SingUp />} />
        {/* <Route exact path='/home' element={<Home />} /> */}
        <Route exact path='/home/:id' element={<CardDetail />} />
        <Route exact path='/checkoutPage' element={<CheckoutPage />}/>
        <Route exact path='/formContact' element={<ContactForm />}/>
        <Route exact path='/admin' element={<Admin/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/dashboard/:id' element={<CardDetailAdmin2 />} />
        <Route exact path='/dashboard/createAcc' element={<AccesoriosCreate2 />} />
        <Route exact path='/dashboard/createEmbarcacionVenta' element={<EmbarcacionCreateEnV2 />} />
        <Route exact path='/dashboard/createEmbarcacionRenta' element={<EmbarcacionCreateRT2/>} />
        <Route exact path='/dashboard/createCat' element={<CatCreate2/>} />
        <Route exact path='/dashboard/updateacc/:id' element={<UpdateAccesorio2/>} />
        <Route exact path='/dashboard/updateembrt/:id' element={<UpdateEmbarcacionRenta2/>} />
        <Route exact path='/dashboard/updateembventa/:id' element={<UpdateEmbarcacionVenta2/>} />
        <Route exact path='/venta' element={<BarcosEnVenta  />} />
        <Route exact path='/alquiler' element={<BarcosEnAlquiler  />} />
        <Route exact path='/accesorios' element={<Accesorios />} />
        <Route exact path='/accesorios/:id' element={<CardDetail />} />

        <Route exact path='/checkout' element={<Checkout/>}/>
        <Route exact path='/contactForm' element={<ContactForm />}/>

        <Route exact path='/historialC' element={<HistorialCompras/>} />
        <Route exact path='/review/:id' element={<Review />} />
      </Routes>
    </div>
   
  );
}

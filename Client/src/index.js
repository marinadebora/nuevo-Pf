import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/index'
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from "./stateProvider";
import reducer, { initialState } from "./reducer/reducer.js";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:4000'
ReactDOM.render( 
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
<<<<<<< HEAD
            <App />  
=======
      <StateProvider initialState={initialState} reducer={reducer}>
          <App />  
      </StateProvider>
>>>>>>> 97fc4e2357085773f149fa0e50590b5db41667f3
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

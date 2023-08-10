import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//let root : HTMLElement | null =  createRoot.document.getElementById('root') 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
 document.getElementById('root') 
);


reportWebVitals();
import React from 'react';
import './index.css';
import App from './app/App';
import { createRoot } from 'react-dom/client';
import './socket/connectToServer';

const root : HTMLElement | null = document.getElementById('root');
if (root)
{
  const appRoot = createRoot(root);
  appRoot.render
  (
      <App />
  );

}


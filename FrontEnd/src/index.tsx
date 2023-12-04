import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ParentComponent from './app/ParentComponent';
import {  playerOne, playerTwo} from './app/ParentComponent'
 


const root : HTMLElement | null = document.getElementById('root');

if (root)
{
  const appRoot = createRoot(root);

  appRoot.render
  (
    <>
      < ParentComponent playerOne={playerOne}  playerTwo={ playerTwo}/>
    </>
  );

}
// export {  userInfo1 , userInfo2 };
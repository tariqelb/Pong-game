import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './socket/connectToServer';
import ParentComponent, { gameCapsule } from './app/ParentComponent';
import UserInfo from './app/UserInfo';
import { tabId } from './app/App';
import {  playerOne, playerTwo} from './app/ParentComponent'
 
let userInfo1 : UserInfo = new UserInfo(tabId, "", 100, 1, "hunter x111", "kilua.jpg", "kilua.jpg", 20, 1520, 22, 152, 14, 3);
let userInfo2 : UserInfo = new UserInfo("", "", 100, 1, "machi +", "mahi.jpg", "machi.jpg", 20, 1520, 22, 152, 14, 3);


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
export {  userInfo1 , userInfo2 };
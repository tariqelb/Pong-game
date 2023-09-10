import MySketch from '../components/mySketch';
import './App.css';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState, useEffect } from 'react';
import GameContainer from '../components/gamecontainer';
import { gameCapsule } from '../components/mySketch';

function App() 
{ 
  return (
    <ReactP5Wrapper sketch={MySketch} />
  );
}

export default App;
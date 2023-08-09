//import React from 'react';
import * as React from "react";
import './App.css';
import MySketch from './mySketch'
//import P5Wrapper from 'react-p5';
//import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function App() {
  return (
      <ReactP5Wrapper  sketch={MySketch} /> 
  );
}
//<P5Wrapper sketch={MySketch} /> 

export default App;
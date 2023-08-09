import p5Types from 'p5';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';

/* Set global variable */ 
let canvasWidth : number ; //this var hold the width of the canvas
let canvasHeight : number ;//this var hold the height of the canvas


/* draw the right rectangle 'racette' */
let rRectangle = (p5 : p5Types )  =>
{
  let recX : number = (canvasWidth / 2) - (canvasWidth / 80); 
  let recY : number = (0 - ((canvasHeight / 10) / 2)); 
  let recW : number = (canvasWidth / 80); 
  let recH : number = (canvasHeight / 7); 
  p5.rect(recX, recY , recW,  recH);
}

/* drwa the left rectangle 'racette' */
let lRectangle = (p5 : p5Types )  =>
{
  let recX : number = 0 - (canvasWidth / 2); 
  let recY : number = (0 - ((canvasHeight / 10) /2)); 
  let recW : number = (canvasWidth / 80); 
  let recH : number = (canvasHeight / 7); 
  p5.rect(recX, recY , recW,  recH);
}

/* Draw the middle line */
let line = (p5 : p5Types) => 
{
  p5.stroke(100);
  p5.strokeWeight(5);
  p5.line(0, (0 - (canvasHeight / 2 ) + 10), 0, (canvasHeight / 2 - 10)); 
  p5.strokeWeight(0); /* set strockweight to zero to neo effect the next draw element  */
}

/* resize the canvas window to be responsive */
let resizeCanvas = (p5 : p5Types) => 
{
  const container : p5Types.Element | null = p5.select('#root');
  if (container)
  {
    console.log(container);
    canvasWidth = container.elt.clientWidth - 15; //the 15 for border pixel
    canvasHeight = container.elt.clientHeight - 15;
    p5.resizeCanvas(canvasWidth, canvasHeight);
  }
}

/* draw functon , run continously and draw on the canvas  */
function draw(p5 : p5Types) 
{
  resizeCanvas(p5);
  return () => 
  {
    p5.background(25, 25, 25);
    //console.log("Canvas height : ", (0 - (  canvasHeight / 2) + 10 ) , (canvasHeight / 2 - 10), canvasHeight);
    line(p5); /* Draw the middle line */
    rRectangle(p5); /* draw the right rectangle 'racette' */
    lRectangle(p5); /* drwa the left rectangle 'racette' */
  };
}

/* setup startup function that create the canvas */
function setup(p5 : p5Types) 
{
  return () => {
    const container : p5Types.Element | null = p5.select('#root');
    if (container)
    {
      console.log(container);
      canvasWidth  = container.elt.clientWidth - 15;//the 15 for border pixel
      canvasHeight = container.elt.clientHeight - 15;
      let cnv : p5Types.Renderer = p5.createCanvas( canvasWidth ,  canvasHeight, p5.WEBGL);
      cnv.parent('root');
    }
    else
    {
      p5.createCanvas( 300 ,  300 , p5.WEBGL);
      console.log("Error: in sketch file, failed to select the canvas element.")
    }
  };
}

function MySketch(p5 : p5Types) 
{
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}


export default MySketch;
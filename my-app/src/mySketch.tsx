import p5Types from 'p5';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';
/* The canvas variable */
let cnv  : p5Types.Renderer; 
let p5Cpy : p5Types;
//let mouseXy : p5Types.Element;
let X0 : number;
let Y0 : number;

/* Set global variable */ 
let canvasWidth : number ; //this var hold the width of the canvas
let canvasHeight : number ;//this var hold the height of the canvas
let gameBorederPixel : number = 15;
//last coordinates of the mouse.
let previewsMouseX : number;
let previewsMouseY : number;
//left and right rectungle y coordinate
let lrecY : number = 0;
//let RrecY : number = 0;
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
  let recX : number ;
  let recY : number ;
  let recW : number ;
  let recH : number ;
  let move : number = 0; 
  console.log("The previewsMouseY : ", previewsMouseY);
  if (previewsMouseY === undefined)
  {
    recX = 0 - (canvasWidth / 2); 
    recY = (0 - ((canvasHeight / 10) /2)); 
    recW = (canvasWidth / 80); 
    recH = (canvasHeight / 7);
  }
  else
  {
    recH = (canvasHeight / 7);
    recW = (canvasWidth / 80); 
    recX = 0 - (canvasWidth / 2); 
    recY = (previewsMouseY - Y0) - (recH / 2); //(Y0 :x = 0 y = 0 occure in the middle of the canvas not the top left)//(0 - ((canvasHeight / 10) /2));//lrecY + move; 
  }
  console.log("The recY: ", recY);
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
  let container : p5Types.Element | null = p5.select('#root');
  if (container)
  {
    //console.log("w : " , container.elt.clientWidth - 15, " h : ", container.elt.clientHeight - 15);
    canvasWidth = container.elt.clientWidth - gameBorederPixel; //the game..xel is the number of pixel give to canvas borders 
    canvasHeight = container.elt.clientHeight - gameBorederPixel;
    p5.resizeCanvas(canvasWidth, canvasHeight);
  }
  else
  {
      console.log("The game div selector return null.");
  }
}

let hello = () : void =>
{
    previewsMouseX = p5Cpy.mouseX;
    previewsMouseY = p5Cpy.mouseY;
    console.log('hi', previewsMouseX, previewsMouseY);
}

/* draw functon , run continously and draw on the canvas */
function draw(p5 : p5Types) 
{
  return () => 
  {
    resizeCanvas(p5);
    p5.background(25, 25, 25);
    line(p5); /* Draw the middle line */
    p5Cpy = p5;
    cnv.mouseMoved(hello);
    rRectangle(p5Cpy); /* draw the right rectangle 'racette' */
    lRectangle(p5Cpy); /* drwa the left rectangle 'racette' */
  };
}

/* setup startup function that create the canvas */
function setup(p5 : p5Types) 
{
  return () => {
    const container : p5Types.Element | null = p5.select('#root');
    if (container)
    {
      //console.log(container);
      canvasWidth  = container.elt.clientWidth - 15;//the 15 for border pixel
      canvasHeight = container.elt.clientHeight - 15;
      cnv = p5.createCanvas( canvasWidth ,  canvasHeight, p5.WEBGL);
      cnv.parent('root');
      X0 = (canvasWidth / 2);
      Y0 = (canvasHeight / 2);
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
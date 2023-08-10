import p5Types from 'p5';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';

/* The canvas variable */
let cnv  : p5Types.Renderer; 
let p5Cpy : p5Types;
let PlayWithMouse : boolean = false;//1; /* play with mouse or keyboard */
let keyIspress : boolean = false;
//let for the canvas the x0 and y0 is the center of it so x0 = canvas width / 2 and y0= canvasHeight / 2
let X0 : number;
let Y0 : number;

/* Set global variable */ 
let canvasWidth : number ; //this var hold the width of the canvas
let canvasHeight : number ;//this var hold the height of the canvas
let gameBorederPixel : number = 15;

//last coordinates of the mouse.
let previewsMouseX : number;
let previewsMouseY : number;
let currentMouseX : number;
let currentMouseY : number;
let lastPossitionOfRectY : number; //used for keyboard move


/* draw the right rectangle 'racette' */
let MoveRRacetteWithKeyBoard = (p5 : p5Types)  =>
{
  let recX : number = (canvasWidth / 2) - (canvasWidth / 80); 
  let recW : number = (canvasWidth / 80); 
  let recH : number = (canvasHeight / 7); 
  let recY : number | undefined = undefined;
 
  if (p5.keyIsPressed)
  {
    if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY === undefined) // first time press arrow key
    {
      if (p5.keyCode === 40)
        recY= (0 - ((canvasHeight / 10) / 2)) + 5; 
      else
        recY= (0 - ((canvasHeight / 10) / 2)) - 5;
    }
    else if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY !== undefined)
    {
      if (p5.keyCode === 40)
        recY = lastPossitionOfRectY + 5;
      else
        recY = lastPossitionOfRectY - 5;
    }
  }
  else if (lastPossitionOfRectY === undefined) // press other key in the first time
    recY  = (0 - ((canvasHeight / 10) / 2));
  else
    recY = lastPossitionOfRectY;
  if (recY === undefined)
    p5.rect(recX, lastPossitionOfRectY , recW,  recH);
  else
  {
    if (recY <= (0 - canvasHeight / 2))
    {
      p5.rect(recX, (0 - canvasHeight / 2) , recW,  recH);
      recY = (0 - canvasHeight / 2);
    }
    else if (recY >= ((canvasHeight / 2) - recH))
    {
      p5.rect(recX, (canvasHeight / 2 - recH) , recW,  recH);
      recY = (canvasHeight / 2 - recH);
    }
    else
      p5.rect(recX, recY , recW,  recH);
  }
  if (recY !== undefined)
    lastPossitionOfRectY = recY;
}
/*Draw the racette in the midlle when no key is pressed yet */
let drawInitRacette = (p5 : p5Types )  =>
{
  let recX : number = (canvasWidth / 2) - (canvasWidth / 80); 
  let recY : number = (0 - ((canvasHeight / 10) / 2)); 
  let recW : number = (canvasWidth / 80); 
  let recH : number = (canvasHeight / 7); 

  p5.rect(recX, recY , recW,  recH);
  keyIspress = true;
}

/* drwa the left rectangle 'racette' */
let drawAndMoveLRacetteWithMouse = (p5 : p5Types )  =>
{
  let recX : number ;
  let recY : number ;
  let recW : number ;
  let recH : number ;

  if (currentMouseY === undefined)
  {
    recX = 0 - (canvasWidth / 2); 
    recY = (0 - ((canvasHeight / 10) /2)); 
    recW = (canvasWidth / 80); 
    recH = (canvasHeight / 7);
    p5.rect(recX, recY , recW,  recH);
  }
  else
  {
    recH = (canvasHeight / 7); //the height of the racette
    recW = (canvasWidth / 80); //the width of the racette
    recX = 0 - (canvasWidth / 2); 
    recY = (currentMouseY - Y0) - (recH / 2); //(Y0 :x = 0 y = 0 occure in the middle of the canvas not the top left)//(0 - ((canvasHeight / 10) /2));//lrecY + move; 
    if ((currentMouseY > (recH / 2)) && (currentMouseY < (canvasHeight - (recH / 2))))
      p5.rect(recX, recY , recW,  recH);
    else if ((currentMouseY < (recH / 2)))
      p5.rect(recX, (0 - canvasHeight / 2), recW,  recH); // reach the top border
    else if ((currentMouseY > (canvasHeight - (recH / 2))))
      p5.rect(recX, (canvasHeight / 2 - recH) , recW,  recH); // reach the bottom border
    //previewsMouseY = currentMouseY;
  }
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
    canvasWidth = container.elt.clientWidth - gameBorederPixel; //the game..xel is the number of pixel give to canvas borders 
    canvasHeight = container.elt.clientHeight - gameBorederPixel;
    p5.resizeCanvas(canvasWidth, canvasHeight);
  }
  else
  {
      console.log("The game div selector return null.");
  }
}

let getCurrentMoussecoordinate = () : void =>
{
    currentMouseX = p5Cpy.mouseX;
    currentMouseY = p5Cpy.mouseY;
    console.log('hi', currentMouseX, currentMouseY);
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
    if (PlayWithMouse) 
    {
      cnv.mouseMoved(getCurrentMoussecoordinate);
      drawAndMoveLRacetteWithMouse(p5Cpy); /* draw and move the left rectangle 'racette' */
    }
    else 
    {
      if (keyIspress === false)
          drawInitRacette(p5Cpy);//draw the racette
      else
          MoveRRacetteWithKeyBoard(p5Cpy); // move the right rectangle 'racette' 
    }
      //
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
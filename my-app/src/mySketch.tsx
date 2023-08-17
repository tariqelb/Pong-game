import p5Types from 'p5';
import drawAndMoveTheBall from './ballMove';
import automaticRacket from './automaticRacket';

//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';
//import  *  as globalVar from './globalVariables';
import {restart} from './ballMove'
import {restartTwo} from './automaticRacket'
// The canvas variable 
let cnv  : p5Types.Renderer; 
let PlayWithMouse : boolean = true; // play with mouse or keyboard 
//let PlayWithMouse : boolean = false; // play with mouse or keyboard 
let keyIspress : boolean = false;

// Set global variable 
let racketSpeed : number = 10;// speed the number of pixel i add to racket to move it
let gameBorederPixel : number = 15; //Borders size of the div in which the canvas is rendred 

//last coordinates of the mouse.
let fistMouseMove : boolean = false;
let lastPossitionOfLeftRectY : number; //used for keyboard move
let lastPossitionOfRightRectY : number; //used for keyboard move

// right rectangle width height x and y data;
let rrecX : number ; 
let rrecW : number ; 
let rrecH : number ; 
let rrecY : number | undefined ;

// left rectangle width height x and y data;
let lrecX : number ; 
let lrecW : number ; 
let lrecH : number ; 
let lrecY : number | undefined ;

//automatic racket flag;
let automaticRacketFlag : boolean = true;



/* draw the right rectangle 'racket' */
let MoveRightRacketWithKeyBoard = (p5 : p5Types) : void =>
{
  rrecH = (p5.height / 4);
  rrecX = (p5.width) - (p5.width / 80);
  rrecW = (p5.width / 80); 
  rrecY = undefined;
 
  if (p5.keyIsPressed)
  {
    if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRightRectY === undefined) // first time press arrow key
    {
      if (p5.keyCode === 40)
        rrecY = ((p5.height / 2) - (rrecH / 2)) + racketSpeed; 
      else
        rrecY = ((p5.height / 2) - (rrecH / 2)) - racketSpeed;
    }
    else if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRightRectY !== undefined)
    {
      if (p5.keyCode === 40)
        rrecY = lastPossitionOfRightRectY + racketSpeed;
      else
        rrecY = lastPossitionOfRightRectY - racketSpeed;
    }
  }
  else if (lastPossitionOfRightRectY === undefined) // press other key in the first time
    rrecY  = (p5.height / 2) - (rrecH / 2);
  else
    rrecY = lastPossitionOfRightRectY;
  if (rrecY === undefined)
    p5.rect(rrecX, lastPossitionOfRightRectY , rrecW,  rrecH);
  else
  {
    if (rrecY < 0)
    {
      p5.rect(rrecX, 0 , rrecW,  rrecH);
      rrecY = 0;
    }
    else if (rrecY >= (p5.height - rrecH))
    {
      p5.rect(rrecX, (p5.height - rrecH) , rrecW,  rrecH);
      rrecY = (p5.height - rrecH);
    }
    else
      p5.rect(rrecX, rrecY , rrecW,  rrecH);
  }
  if (rrecY !== undefined)
    lastPossitionOfRightRectY = rrecY;
}

/* draw the left rectangle 'racket' */
let MoveLeftRacketWithKeyBoard = (p5 : p5Types) : void =>
{
  lrecX = 0; 
  lrecW = (p5.width / 80); 
  lrecH = (p5.height / 4); 
  lrecY = undefined;
 
  if (p5.keyIsPressed)
  {
    if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfLeftRectY === undefined) // first time press arrow key
    {
      if (p5.keyCode === 40)
        lrecY = ((p5.height / 2) - (rrecH / 2)) + racketSpeed; 
      else
        lrecY = ((p5.height / 2) - (rrecH / 2)) - racketSpeed;
    }
    else if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfLeftRectY !== undefined)
    {
      if (p5.keyCode === 40)
        lrecY = lastPossitionOfLeftRectY + racketSpeed;
      else
        lrecY = lastPossitionOfLeftRectY - racketSpeed;
    }
  }
  else if (lastPossitionOfLeftRectY === undefined) // press other key in the first time
    lrecY  = (p5.height / 2) - (rrecH / 2);
  else
    lrecY = lastPossitionOfLeftRectY;
  if (lrecY === undefined)
    p5.rect(lrecX, lastPossitionOfLeftRectY , lrecW,  lrecH);
  else
  {
    if (lrecY < 0)
    {
      p5.rect(lrecX, 0 , lrecW,  lrecH);
      lrecY = 0;
    }
    else if (lrecY >= (p5.height - rrecH))
    {
      p5.rect(lrecX, (p5.height - lrecH) , lrecW,  lrecH);
      lrecY = (p5.height - rrecH);
    }
    else
      p5.rect(lrecX, lrecY , lrecW,  lrecH);
  }
  if (lrecY !== undefined)
    lastPossitionOfLeftRectY = lrecY;
}

/*Draw the racket in the midlle when no key is pressed yet */
let drawInitRightRacket = (p5 : p5Types ) : void =>
{
  rrecH = (p5.height / 4);
  rrecW = (p5.width / 80); 
  rrecX = (p5.width) - (p5.width / 80); 
  rrecY = (p5.height / 2) - (rrecH / 2); 
  p5.rect(rrecX, rrecY , rrecW,  rrecH);
  keyIspress = true;
  lastPossitionOfRightRectY = rrecY;
}

let drawInitLeftRacket = (p5 : p5Types ) : void =>
{
  lrecH = (p5.height / 4);
  lrecX = 0; 
  lrecY = (p5.height / 2) - (rrecH / 2); 
  lrecW = (p5.width / 80); 

  p5.rect(lrecX, lrecY , lrecW,  lrecH);
  keyIspress = true;
  lastPossitionOfLeftRectY = lrecY;
}

let setFirstMouseMove = () : void =>
{
    fistMouseMove = true;
}

/* drwa the left rectangle 'racket' */
let drawAndMoveLeftRacketWithMouse = (p5 : p5Types ) : void  =>
{
  if (fistMouseMove === false)
  {
    lrecH = (p5.height / 4);
    lrecX = 0; 
    lrecY = (p5.height / 2) - rrecH / 2; 
    lrecW = (p5.width / 80); 
    p5.rect(lrecX, lrecY , lrecW,  lrecH);
    cnv.mouseMoved(setFirstMouseMove)
  }
  else
  {
    lrecH = (p5.height / 4); //the height of the racket
    lrecW = (p5.width / 80); //the width of the racket
    lrecX = 0; 
    if (lrecY === undefined)
    {
      lrecY = (p5.height / 2) - rrecH / 2; 
      p5.rect(lrecX, lrecY , lrecW,  lrecH);
    }  
    else
    {
      let mY = p5.constrain(p5.mouseY, 0, p5.height - lrecH);
      if ((p5.mouseX > 0 && p5.mouseX < p5.width))// && cnv.mouseMoved(hiThere))
      {
        if (lastPossitionOfLeftRectY === p5.height - lrecH && mY === 0)
          lrecY = lastPossitionOfLeftRectY;
        else if (lastPossitionOfLeftRectY === 0 && mY === p5.height - lrecH)
          lrecY = lastPossitionOfLeftRectY;
        else
          lrecY = mY;
        p5.rect(lrecX, lrecY , lrecW,  lrecH);
      }
      else
      {
        p5.rect(lrecX, lastPossitionOfLeftRectY , lrecW,  lrecH);
      }
    }
  }
  if (lrecY !== undefined)
    lastPossitionOfLeftRectY = lrecY;
}

/* draw the left rectangle 'racket' */
let drawAndMoveRightRacketWithMouse = (p5 : p5Types ) : void  =>
{
  if (fistMouseMove === false)
  {
    rrecH = (p5.height / 4);
    rrecX = (p5.width) - (p5.width / 80); 
    rrecY = (p5.height / 2) - rrecH / 2; 
    rrecW = (p5.width / 80); 
    p5.rect(rrecX, rrecY , rrecW,  rrecH);
    cnv.mouseMoved(setFirstMouseMove)
  }
  else
  {
    rrecH = (p5.height / 4); //the height of the racket
    rrecW = (p5.width / 80); //the width of the racket
    rrecX = (p5.width) - (p5.width / 80); 
    if (rrecY === undefined)
    { 
      rrecY = (p5.height / 2) - rrecH / 2;
      p5.rect(rrecX, rrecY , rrecW,  rrecH);
    }
    else
    {
      let mY = p5.constrain(p5.mouseY, 0, p5.height - rrecH);//mY is mouse Y coordinate after constrain
      if (p5.mouseX > 0 && p5.mouseX < p5.width)
      {
        if (lastPossitionOfRightRectY === p5.height - rrecH && mY === 0)
          rrecY = lastPossitionOfRightRectY;
        else if (lastPossitionOfRightRectY === 0 && mY === p5.height - rrecH)
          rrecY = lastPossitionOfRightRectY;
        else
          rrecY = mY; 
        p5.rect(rrecX, rrecY , rrecW,  rrecH);
      }
      else
      {
        p5.rect(rrecX, lastPossitionOfRightRectY , rrecW,  rrecH);
      }
    }
  }
  //console.log("right : racket : " , rrecX, rrecY, rrecW, rrecH);
  if (rrecY !== undefined)
    lastPossitionOfRightRectY = rrecY;
}

/* Draw the middle line */
let line = (p5 : p5Types) : void => 
{
  p5.noStroke();
  p5.fill('gray');
  p5.rect(p5.width / 2 - 3, 0 , 6 , p5.height); 
  p5.rect(0, p5.height / 2 - 3 , p5.width, 6); 
  p5.fill('white');
}

/* resize the canvas window to be responsive */
let resizeCanvas = (p5 : p5Types) : void => 
{
  let container : p5Types.Element | null = p5.select('#root');
  
  if (container)
  {
    let canvasWidth : number = container.elt.clientWidth - gameBorederPixel; //the game..xel is the number of pixel give to canvas borders 
    let canvasHeight : number = container.elt.clientHeight - gameBorederPixel;
    p5.resizeCanvas(canvasWidth, canvasHeight);
  }
  else
  {
      console.log("The game div selector return null.");
  }
}

/* draw functon , run continously and draw on the canvas */
function draw(p5 : p5Types) 
{
  return () => 
  {
    resizeCanvas(p5);
    p5.background(218, 97, 232);
    line(p5); /* Draw the middle line */
    //Draw the ball
    drawAndMoveTheBall(p5);
    if (PlayWithMouse) 
    {
      //console.log(p5.mouseX, p5.mouseY);
      drawAndMoveRightRacketWithMouse(p5); /* draw and move the left rectangle 'racket' */
      //drawAndMoveLeftRacketWithMouse(p5); /* draw and move the left rectangle 'racket' */
      automaticRacket(p5);
    }
    else 
    {
      if (keyIspress === false)
      {
        drawInitRightRacket(p5);//draw the racket
        drawInitLeftRacket(p5);//draw the racket
      }
      else
      {
        MoveRightRacketWithKeyBoard(p5); // move the right rectangle 'racket' 
        MoveLeftRacketWithKeyBoard(p5); // move the right rectangle 'racket' 
      }
    }
    //Draw the ball
    //drawAndMoveTheBall(p5);
    if (restart === true || restartTwo === true)
    {
      fistMouseMove = false;
      keyIspress = false;
    }
    //ballMove(p5);
  };
}

/* setup startup function that create the canvas */
function setup(p5 : p5Types) 
{
  return () => {
    let container : p5Types.Element | null = p5.select('#root');
    
    if (container)
    {
      //console.log(container);
      let canvasWidth : number  = container.elt.clientWidth - gameBorederPixel;//the 15 for border pixel
      let canvasHeight : number = container.elt.clientHeight - gameBorederPixel;
      cnv = p5.createCanvas( canvasWidth ,  canvasHeight/*p5.WEBGL*/);
      cnv.parent('root');
      //cnv.mouseMoved(getCurrentMoussecoordinate);
    }
    else
    {
      p5.createCanvas( 700 ,  500 );
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

export {rrecX};
export {rrecW};
export {rrecH};
export {rrecY};
export {lrecX};
export {lrecW};
export {lrecH};
export {lrecY};
export {lastPossitionOfRightRectY}; 
export {lastPossitionOfLeftRectY}; 
export {drawInitLeftRacket};
export {automaticRacketFlag};
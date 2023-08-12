import p5Types from 'p5';
import ballMove from './ballMove';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';
//import  *  as globalVar from './globalVariables';

// The canvas variable 
let cnv  : p5Types.Renderer; 
let PlayWithMouse : boolean = true; // play with mouse or keyboard 
//let PlayWithMouse : boolean = false; // play with mouse or keyboard 
let keyIspress : boolean = false;

// Set global variable 
let speed : number = 10;// speed the number of pixel i add to racette to move it
let gameBorederPixel : number = 15; //Borders size of the div in which the canvas is rendred 

//last coordinates of the mouse.
let fistMouseMove : boolean = false;
let lastPossitionOfRectY : number; //used for keyboard move

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

//set the ball  variable ballX ballY ballWH  (ellipse) 
let ballX : number ;
let ballY : number ;
let ballWH : number ; // ball width and height 


// Draw the ball 
let drawBall = (p5 : p5Types) : void =>
{
  let ballWH = p5.height / 25;
  p5.beginShape();
  p5.stroke(1)
  p5.ellipse(0,0, ballWH, ballWH);
  
  p5.endShape();
}


/* draw the right rectangle 'racette' */
let MoveRightRacetteWithKeyBoard = (p5 : p5Types) : void =>
{
  rrecX = (p5.width / 2) - (p5.width / 80); 
  rrecW = (p5.width / 80); 
  rrecH = (p5.height / 7); 
  rrecY = undefined;
 
  if (p5.keyIsPressed)
  {
    if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY === undefined) // first time press arrow key
    {
      if (p5.keyCode === 40)
        rrecY= (0 - ((p5.height / 10) / 2)) + speed; 
      else
        rrecY= (0 - ((p5.height / 10) / 2)) - speed;
    }
    else if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY !== undefined)
    {
      if (p5.keyCode === 40)
        rrecY = lastPossitionOfRectY + speed;
      else
        rrecY = lastPossitionOfRectY - speed;
    }
  }
  else if (lastPossitionOfRectY === undefined) // press other key in the first time
    rrecY  = (0 - ((p5.height / 10) / 2));
  else
    rrecY = lastPossitionOfRectY;
  if (rrecY === undefined)
    p5.rect(rrecX, lastPossitionOfRectY , rrecW,  rrecH);
  else
  {
    if (rrecY <= (0 - p5.height / 2))
    {
      p5.rect(rrecX, (0 - p5.height / 2) , rrecW,  rrecH);
      rrecY = (0 - p5.height / 2);
    }
    else if (rrecY >= ((p5.height / 2) - rrecH))
    {
      p5.rect(rrecX, (p5.height / 2 - rrecH) , rrecW,  rrecH);
      rrecY = (p5.height / 2 - rrecH);
    }
    else
      p5.rect(rrecX, rrecY , rrecW,  rrecH);
  }
  if (rrecY !== undefined)
    lastPossitionOfRectY = rrecY;
}

/* draw the left rectangle 'racette' */
let MoveLeftRacetteWithKeyBoard = (p5 : p5Types) : void =>
{
  lrecX = 0 - (p5.width / 2);; 
  lrecW = (p5.width / 80); 
  lrecH = (p5.height / 7); 
  lrecY = undefined;
 
  if (p5.keyIsPressed)
  {
    if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY === undefined) // first time press arrow key
    {
      if (p5.keyCode === 40)
        lrecY= (0 - ((p5.height / 10) / 2)) + speed; 
      else
        lrecY= (0 - ((p5.height / 10) / 2)) - speed;
    }
    else if ((p5.keyCode === 40 || p5.keyCode === 38) && lastPossitionOfRectY !== undefined)
    {
      if (p5.keyCode === 40)
        lrecY = lastPossitionOfRectY + speed;
      else
        lrecY = lastPossitionOfRectY - speed;
    }
  }
  else if (lastPossitionOfRectY === undefined) // press other key in the first time
    lrecY  = (0 - ((p5.height / 10) / 2));
  else
    lrecY = lastPossitionOfRectY;
  if (lrecY === undefined)
    p5.rect(lrecX, lastPossitionOfRectY , lrecW,  lrecH);
  else
  {
    if (lrecY <= (0 - p5.height / 2))
    {
      p5.rect(lrecX, (0 - p5.height / 2) , lrecW,  lrecH);
      lrecY = (0 - p5.height / 2);
    }
    else if (lrecY >= ((p5.height / 2) - rrecH))
    {
      p5.rect(lrecX, (p5.height / 2 - lrecH) , lrecW,  lrecH);
      lrecY = (p5.height / 2 - rrecH);
    }
    else
      p5.rect(lrecX, lrecY , lrecW,  lrecH);
  }
  if (lrecY !== undefined)
    lastPossitionOfRectY = lrecY;
}

/*Draw the racette in the midlle when no key is pressed yet */
let drawInitRightRacette = (p5 : p5Types ) : void =>
{
  rrecX  = (p5.width / 2) - (p5.width / 80); 
  rrecY  = (0 - ((p5.height / 10) / 2)); 
  rrecW  = (p5.width / 80); 
  rrecH  = (p5.height / 7); 

  p5.rect(rrecX, rrecY , rrecW,  rrecH);
    keyIspress = true;
}

let drawInitLeftRacette = (p5 : p5Types ) : void =>
{
  lrecX = 0 - (p5.width / 2); 
  lrecY  = (0 - ((p5.height / 10) / 2)); 
  lrecW  = (p5.width / 80); 
  lrecH  = (p5.height / 7); 

  p5.rect(lrecX, lrecY , lrecW,  lrecH);
    keyIspress = true;
}

/* drwa the left rectangle 'racette' */
let drawAndMoveLeftRacetteWithMouse = (p5 : p5Types ) : void  =>
{
  if (fistMouseMove === false)
  {
    console.log("First");
    lrecX = 0 - (p5.width / 2); 
    lrecY = (0 - ((p5.height / 10) /2)); 
    lrecW = (p5.width / 80); 
    lrecH = (p5.height / 7);
    p5.rect(lrecX, lrecY , lrecW,  lrecH);
      fistMouseMove = true;
  }
  else
  {
    lrecH = (p5.height / 7); //the height of the racette
    lrecW = (p5.width / 80); //the width of the racette
    lrecX = 0 - (p5.width / 2); 
    if (lrecY === undefined)
      lrecY = (0 - ((p5.height / 10) /2)); 
    else
    {
      let yc = p5.constrain(p5.mouseY, 0, p5.height - lrecH);
      if (yc < p5.height / 2)
        lrecY = 0 - p5.height / 2 + yc;
      else
        lrecY =  yc - p5.height / 2;
    }
    p5.rect(lrecX, lrecY , lrecW,  lrecH);
   
  }
}
/* drwa the left rectangle 'racette' */
let drawAndMoveRightRacetteWithMouse = (p5 : p5Types ) : void  =>
{
  if (fistMouseMove === false)
  {
    console.log("First");
    rrecX = (p5.width / 2) - (p5.width / 80); 
    rrecY = (0 - ((p5.height / 10) /2)); 
    rrecW = (p5.width / 80); 
    rrecH = (p5.height / 7);
    p5.rect(rrecX, rrecY , rrecW,  rrecH);
      fistMouseMove = true;
  }
  else
  {
    rrecH = (p5.height / 7); //the height of the racette
    rrecW = (p5.width / 80); //the width of the racette
    rrecX = (p5.width / 2) - (p5.width / 80); 
    if (rrecY === undefined)
      rrecY = (0 - ((p5.height / 10) /2)); 
    else
    {
      let yc = p5.constrain(p5.mouseY, 0, p5.height - rrecH);
      if (yc < p5.height / 2)
        rrecY = 0 - p5.height / 2 + yc;
      else
        rrecY =  yc - p5.height / 2;
    }
    p5.rect(rrecX, rrecY , rrecW,  rrecH);
   
  }
}

/* Draw the middle line */
let line = (p5 : p5Types) : void => 
{
  p5.noStroke();
  p5.fill('gray');
  p5.rect(-3, (0 - (p5.height / 2 ) + 5), 6 , p5.height - 10); 
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
    p5.background(25, 25, 25);
    line(p5); /* Draw the middle line */
    if (PlayWithMouse) 
    {
      //console.log(p5.mouseX, p5.mouseY);
      drawAndMoveRightRacetteWithMouse(p5); /* draw and move the left rectangle 'racette' */
      drawAndMoveLeftRacetteWithMouse(p5); /* draw and move the left rectangle 'racette' */
    }
    else 
    {
      if (keyIspress === false)
      {
        drawInitRightRacette(p5);//draw the racette
        drawInitLeftRacette(p5);//draw the racette
      }
      else
      {
        MoveRightRacetteWithKeyBoard(p5); // move the right rectangle 'racette' 
        MoveLeftRacetteWithKeyBoard(p5); // move the right rectangle 'racette' 
      }
    }
    //Draw the ball
    drawBall(p5);
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
      cnv = p5.createCanvas( canvasWidth ,  canvasHeight, p5.WEBGL);
      cnv.parent('root');
      //cnv.mouseMoved(getCurrentMoussecoordinate);
    }
    else
    {
      p5.createCanvas( 700 ,  500 , p5.WEBGL);
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

export {cnv}; 
export {PlayWithMouse};
export {keyIspress};

export {speed};

export {gameBorederPixel};

export {fistMouseMove};
export {lastPossitionOfRectY}; 

export {ballX};
export {ballY};
export {ballWH}; 

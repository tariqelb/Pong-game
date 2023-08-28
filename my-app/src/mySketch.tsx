import p5Types from 'p5';
//import drawAndMoveTheBall from './ballMove';
//import automaticRacket from './automaticRacket';
//import animationOne from './animationOne';
//import animationTwo from './animationTwo';
//import { animationData } from './animationOne';
//import animation  from './animation';
import Game from './gameInstance';


let PlayWithMouse : boolean = true; // play with mouse or keyboard 
//let PlayWithMouse : boolean = false; // play with mouse or keyboard 

//last coordinates of the mouse.
let lastPossitionOfLeftRectY : number; //used for keyboard move
let lastPossitionOfRightRectY : number; //used for keyboard move


//automatic racket flag;
let automaticRacketFlag : boolean = true;
//let automaticRacketFlag : boolean = false;
let canvasResizedHeight : number; // this variable is used when the cancas is resized so we need to change rackets size
let canvasResizedWidth : number;



/* Draw the middle line */
let line = (game : Game) : void => 
{
  game.p5.noStroke();
  game.p5.fill('gray');
  game.p5.rect(game.p5.width / 2 - 3, 0 , 6 , game.p5.height); 
  game.p5.rect(0, game.p5.height / 2 - 3 , game.p5.width, 6);


  /*
  if (ballX > 0 && ballX < p5.width / 2 && ballY > 0 && ballY < p5.height / 2)
  {
    p5.fill('red');
    p5.rect(0, 0 , p5.width / 2 , p5.height / 2); 
  }
  if (ballX > p5.width / 2 && ballX < p5.width && ballY > 0 && ballY < p5.height / 2)
  {
    p5.fill('blue');
    p5.rect(p5.width / 2, 0 , p5.width / 2 , p5.height / 2); 
  }
  
  if (ballX > 0 && ballX < p5.width / 2 && ballY > p5.height / 2 && ballY < p5.height)
  {
    p5.fill('purple');
    p5.rect(0, p5.height / 2 , p5.width / 2 , p5.height / 2); 

  }
  if (ballX > p5.width / 2 && ballX < p5.width && ballY > p5.height / 2 && ballY < p5.height)
  {
    p5.fill('green');
    p5.rect(p5.width / 2 , p5.height / 2 , p5.width / 2 , p5.height / 2); 
  }
  */
  //animationOne(p5);
  game.p5.fill('white');
}

/* resize the canvas window to be responsive */
let resizeCanvas = (game : Game) : void => 
{
  let canvasWidth : number;
  let canvasHeight : number; 
 
  game.canvasPranetDiv = game.p5.select('#root'); 
  if (game.canvasPranetDiv)
  {
    canvasWidth = game.canvasPranetDiv.elt.clientWidth - game.gameBordersPixel; //the game..xel is the number of pixel give to canvas borders 
    canvasHeight = (game.canvasPranetDiv.elt.clientWidth / 2) - game.gameBordersPixel;
    game.p5.resizeCanvas(canvasWidth, canvasHeight);
  }
  else
  {
    console.log("The game div selector return null.");
  }
}


function draw(game : Game) 
{
  return () => 
  {
    //canvasResizedHeight = game.p5.width / 2 ;
    //canvasResizedWidth = game.p5.width;
    resizeCanvas(game);
    game.p5.background(0);
    line(game); 
    //drawAndMoveTheBall(p5);
    /*if (game.leftRacket)
    {
      if (game.leftRacket.keyIsPress === false)
        game.leftRacket.drawKeyBoardInitRacket();
      else
        game.leftRacket.MoveRacketWithKeyBoard();
    }
    if (game.rightRacket)
    {
      if (game.rightRacket.keyIsPress === false)
        game.rightRacket.drawKeyBoardInitRacket();
      else
      game.rightRacket.MoveRacketWithKeyBoard();
    }*/
    if (PlayWithMouse) 
    {
      //console.log(p5.mouseX, p5.mouseY);
      //drawAndMoveRightRacketWithMouse(game); // draw and move the left rectangle 'racket' 
      //drawAndMoveLeftRacketWithMouse(game); // draw and move the left rectangle 'racket' 
      //automaticRacket(p5);
      //game.rightRacket?.drawAndMoveRacketWithMouse();
      //game.leftRacket?.drawAndMoveRacketWithMouse();
      //game.rightRacket.MoveRacketWithKeyBoard();
      //game.leftRacket.MoveRacketWithKeyBoard();
      game.leftRacket.automaticRacket();
      game.rightRacket.automaticRacket();
    }
    /*else 
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
    //}
    //animationOne(p5);
    //animationTwo(p5, animTwo);*/
    //ballMove(p5);*/
    game.ball.drawAndMove();
  };
}

function setup(game : Game) 
{
  let canvasWidth : number;
  let canvasHeight : number;
  
  return () => 
  {
    game.canvasPranetDiv = game.p5.select('#root');
    
    if (game.canvasPranetDiv)
    {
      canvasWidth = game.canvasPranetDiv.elt.clientWidth - game.gameBordersPixel;//the 15 for border pixel
      canvasHeight = (game.canvasPranetDiv.elt.clientWidth / 2) - game.gameBordersPixel;
      game.cnv = game.p5.createCanvas( canvasWidth ,  canvasHeight);
      game.cnv.parent('root');
      //game.ball = new Ball(game);
    }
    else
      console.log("Error: in sketch file, failed to select the parent of canvas element.")
  };
}

function MySketch(p5 : p5Types) 
{
  let game : Game = new Game(p5);

  game.p5.setup = setup(game);
  //p5.setup = setup(p5);

  //p5.draw = draw(p5);
  game.p5.draw = draw(game);

}

export default MySketch;

export {lastPossitionOfRightRectY}; 
export {lastPossitionOfLeftRectY}; 
//export {drawInitLeftRacket};
export {automaticRacketFlag};
export {canvasResizedHeight};
export {canvasResizedWidth};

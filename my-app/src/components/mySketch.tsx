import p5Types from 'p5';

//import animationOne from './animationOne';
//import animationTwo from './animationTwo';
//import { animationData } from './animationOne';
//import animation  from './animation';
import Game from './gameInstance';
//import animation from './animation';
import GameContainer from './gamecontainer';

let PlayWithMouse : boolean = true; // play with mouse or keyboard 
//let PlayWithMouse : boolean = false; // play with mouse or keyboard 
//automatic racket flag;
let automaticRacketFlag : boolean = true;
//let automaticRacketFlag : boolean = false;
let canvasResizedHeight : number; // this variable is used when the cancas is resized so we need to change rackets size
let canvasResizedWidth : number;

let gameCapsule: GameContainer = new GameContainer();

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
    gameCapsule.height = canvasHeight;
    gameCapsule.width = canvasWidth;
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
    gameCapsule.racketSide = 1;
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    gameCapsule.racketKind = 0;
    gameCapsule.init = true;
    if (game.p5.keyIsPressed)
    {
      gameCapsule.keyIsPressed = game.p5.keyIsPressed;
      gameCapsule.keyCode = game.p5.keyCode;
    } 

    //console.log("data : ", gameCapsule.init, game.p5.width);
    game.p5.background(0);
    line(game);

    /*if (game.loading)
    {

    
      //if (game.anim.animPos === false)
      //  game.anim.getRandomPosition();
      // else
      //   game.anim.drawAnimation();
      if (PlayWithMouse) 
      {
        //game.rightRacket.drawAndMoveRacketWithMouse();
        //game.leftRacket?.drawAndMoveRacketWithMouse();
        //game.rightRacket.MoveRacketWithKeyBoard();
        //game.leftRacket.MoveRacketWithKeyBoard();
        //game.leftRacket.automaticRacket();
        //game.rightRacket.automaticRacket();
      }
      //animationOne(p5);
      //animationTwo(p5, animTwo);
      //game.ball.drawAndMove();
    }
    else
    {
      let lessage : string = "I'm loading ..."; 
      game.p5.textSize(22);
      game.p5.text(lessage, 130, 100, 500);
    }*/
    //gameCapsule.dataIsReady = false;
    console.log("data before ", gameCapsule.ballX, gameCapsule.ballY) 
    game.p5.circle(gameCapsule.ballX, gameCapsule.ballY, gameCapsule.ballWH);
    console.log("data after ", gameCapsule.ballX, gameCapsule.ballY) 
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
  
  game.p5.preload = () => {
    game.anim.animImage = game.p5.loadImage('./Chain.jpg');
  }
  game.p5.setup = setup(game);
  //p5.setup = setup(p5);

  //p5.draw = draw(p5);
  game.p5.draw = draw(game);
  //console.log("data outside : ", gameCapsule.init, game.p5.width);

}

export default MySketch;
export { gameCapsule};


export {automaticRacketFlag};
export {canvasResizedHeight};
export {canvasResizedWidth};

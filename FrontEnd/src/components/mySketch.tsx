import p5Types from 'p5';
import Game from './gameInstance';
import GameContainer from './gamecontainer';
//let PlayWithMouse : boolean = true; // play with mouse or keyboard 
let PlayWithMouse : boolean = false; // play with mouse or keyboard 

let canvasResizedHeight : number; // this variable is used when the cancas is resized so we need to change rackets size
let canvasResizedWidth : number;

/* Draw the middle line */
let line = (game : Game) : void => 
{
  game.p5.noStroke();
  game.p5.fill('gray');
  game.p5.rect(game.p5.width / 2 - 3, 0 , 6 , game.p5.height); 
  game.p5.rect(0, game.p5.height / 2 - 3 , game.p5.width, 6);
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


function draw(game : Game, gameCapsule : GameContainer) 
{
  let ballX; 
  let ballY;
  let ballWH;
  let ballSpeed;

  return () => 
  {
    game.playerNumber = gameCapsule.playerNumber;
    resizeCanvas(game);
    game.p5.background(0);
    line(game);
    
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    game.goalRestart = gameCapsule.ball.goalRestart;
    
    if (game.goalRestart)
    {
      game.rightRacket.racketY = -100;
      game.rightRacket.keyIsPress = false;
      game.rightRacket.coordinateAlreadyGot = false;
      game.rightRacket.startOfSimulation = true;
      gameCapsule.init = false;
      game.rightRacket.mouseIsMoved = false;
    } 
    game.cnv?.mouseMoved(() => game.rightRacket.mouseIsMoved = true)

   

    if (game.rightRacket.coordinateAlreadyGot === false)
    {
      if (game.ball.ballX > 50 && game.ball.ballX < game.p5.width - 50)
      {
        game.rightRacket.virtualBallX = gameCapsule.ball.ballX;
        game.rightRacket.virtualBallY = gameCapsule.ball.ballY;
        game.rightRacket.virtualBallWH = gameCapsule.ball.ballWH;
        game.rightRacket.virtualBallS = gameCapsule.ball.ballSpeed;
        game.rightRacket.virtualBallA = gameCapsule.ball.ballAngle;
        game.rightRacket.validCoordinate = true;
      }
      else
        game.rightRacket.validCoordinate = false;
    }
    
   

    ballX     = (gameCapsule.ball.ballX * game.p5.width / 400);
    ballY     = (gameCapsule.ball.ballY * game.p5.height / 200);
    ballWH    = (gameCapsule.ball.ballWH * game.p5.height / 200);
    ballSpeed = (gameCapsule.ball.ballSpeed * game.p5.width / 400);

    game.ball.ballX = ballX;
    game.ball.ballY = ballY;
    game.ball.ballWH = ballWH;
    game.ball.ballSpeed = ballSpeed;
    game.ball.ballAngle = gameCapsule.ball.ballAngle;
    game.ball.ballDirection = gameCapsule.ball.ballDirection;
   
    //if (game.playerNumber === 1)
    if (game.playerNumber === 1)
      game.rightRacket.automaticRacket();
    else if (game.playerNumber === 2)
      game.rightRacket.drawAndMoveRacketWithMouse();
    //game.rightRacket.MoveRacketWithKeyBoard();
   
    if (game.playerNumber === 2)
    {
      gameCapsule.ball.ballX = 400 - gameCapsule.ball.ballX;
      ballX                  = (gameCapsule.ball.ballX * game.p5.width / 400);
      game.ball.ballX        = ballX;
    }

    gameCapsule.sentRacket.lastPosY= game.rightRacket.lastPositionOfRacketY;
    gameCapsule.sentRacket.height = game.p5.height;
    gameCapsule.sentRacket.width = game.p5.width;

    gameCapsule.init = true;
      
    if (gameCapsule.ball.ballX && gameCapsule.ball.ballY)
    {
      game.p5.circle(ballX, ballY, ballWH);
      game.p5.rect(0, gameCapsule.recvRacket.lastPosY / gameCapsule.recvRacket.height * game.p5.height, game.p5.width / 80, game.p5.height / 4);
    }
    else
      game.p5.text("loading", 20, 20); 
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
      game.canvasResizedHeight = canvasHeight;
      game.canvasResizedWidth = canvasWidth;
    }
    else
      console.log("Error: in sketch file, failed to select the parent of canvas element.")
  };
}

function MySketch(gameCapsule : GameContainer,  p5: p5Types)
{
  let game: Game | null = null;

  const setupGame = () => 
  {
    game = new Game(p5);
    game.p5.setup = setup(game);
    game.p5.draw = draw(game, gameCapsule);
  };

  // Call setupGame once when the component mounts
  if (!game)
  {
    setupGame();
  }

 

}

export default MySketch;

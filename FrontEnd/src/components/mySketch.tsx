import p5Types from 'p5';
import Game from './gameInstance';
import GameContainer from './gamecontainer';
//import { gameCapsule } from '../app/App';

//let PlayWithMouse : boolean = true; // play with mouse or keyboard 
let PlayWithMouse : boolean = false; // play with mouse or keyboard 

let canvasResizedHeight : number; // this variable is used when the cancas is resized so we need to change rackets size
let canvasResizedWidth : number;

//let gameCapsule: GameContainer = new GameContainer();

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
  return () => 
  {
    //canvasResizedHeight = game.p5.width / 2 ;
    //canvasResizedWidth = game.p5.width;
    resizeCanvas(game);
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    
    gameCapsule.init = true;
    game.p5.background(0);
    if (gameCapsule.loading == false)
    {
      line(game);
      
      
      gameCapsule.rRacketX = game.rightRacket.racketX;
      gameCapsule.rRacketY = game.rightRacket.racketY;
      gameCapsule.rRacketW = game.rightRacket.racketW;
      gameCapsule.rRacketH = game.rightRacket.racketH;
      gameCapsule.rLastPosY= game.rightRacket.lastPositionOfRacketY;
      gameCapsule.lRacketX = game.leftRacket.racketX;
      gameCapsule.lRacketY = game.leftRacket.racketY;
      gameCapsule.lRacketW = game.leftRacket.racketW;
      gameCapsule.lRacketH = game.leftRacket.racketH;
      gameCapsule.lLastPosY= game.leftRacket.lastPositionOfRacketY;
      
      game.ball.ballX = gameCapsule.ballX;
      game.ball.ballY = gameCapsule.ballY;
      game.ball.ballWH  = gameCapsule.ballWH
      game.ball.ballAngle = gameCapsule.ballAngle
      game.ball.ballDirection  = gameCapsule.ballDirection
      game.ball.ballFirstMove  = gameCapsule.ballFirstMove;
      game.ball.ballFirst50Time  = gameCapsule.ballFirst50Time
      game.ball.ballSpeed  = gameCapsule.ballSpeed
      game.p5.circle(gameCapsule.ballX, gameCapsule.ballY, gameCapsule.ballWH);
      if (gameCapsule.clientOne)
        game.leftRacket.automaticRacket();
      if (gameCapsule.clientTwo)
        game.rightRacket.automaticRacket();
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

  // Call setupGame once when the component mounts
  if (!game) {
    setupGame();
  }

}

export default MySketch;
//export { gameCapsule };

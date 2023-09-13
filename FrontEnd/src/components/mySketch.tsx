import p5Types from 'p5';
import Game from './gameInstance';
import GameContainer from './gamecontainer';

//let PlayWithMouse : boolean = true; // play with mouse or keyboard 
let PlayWithMouse : boolean = false; // play with mouse or keyboard 

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
    gameCapsule.racketSide = 1;
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    gameCapsule.racketKind = 0;
    if (gameCapsule.init === false)
    { 
      gameCapsule.rRacketY = -100;
      gameCapsule.lRacketY = -100;
    }
    gameCapsule.init = true;
    gameCapsule.mouseX = game.p5.mouseX;
    gameCapsule.mouseY = game.p5.mouseY;
    game.p5.background(0);
    console.log("ga me cap " , game.p5.mouseX, gameCapsule.mouseX);
    line(game);
    if (game.p5.keyIsPressed)
    {
      gameCapsule.keyIsPress = true;
      gameCapsule.keyIsPressed = true;
    }
    else
      gameCapsule.keyIsPressed = false;

    if (game.p5.keyCode)
      gameCapsule.keyCode = game.p5.keyCode;
    game.p5.circle(gameCapsule.ballX, gameCapsule.ballY, gameCapsule.ballWH);
    //console.log("key ", gameCapsule.lRacketX, gameCapsule.lRacketY);
    game.p5.rect(gameCapsule.rRacketX, gameCapsule.rLastPosY, gameCapsule.rRacketW, gameCapsule.rRacketH)
    game.p5.rect(gameCapsule.lRacketX, gameCapsule.lLastPosY, gameCapsule.lRacketW, gameCapsule.lRacketH)
    //game.ball.drawAndMove();
    //if (!game.loading)
    /*{
      
      game.rightRacket.MoveRacketWithKeyBoard();
      game.leftRacket.MoveRacketWithKeyBoard();
    
      if (PlayWithMouse) 
      {
        game.rightRacket.drawAndMoveRacketWithMouse();
        //game.leftRacket.automaticRacket();
       // game.rightRacket.automaticRacket();
      game.leftRacket?.drawAndMoveRacketWithMouse();
      }
    }
   // else
    {
      let lessage : string = "I'm loading ..."; 
      game.p5.textSize(22);
      game.p5.text(lessage, 130, 100, 500);
    }*/
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

function MySketch(p5: p5Types)
{
  let game: Game | null = null;

  const setupGame = () => 
  {
    game = new Game(p5);
    game.p5.setup = setup(game);
    game.p5.draw = draw(game);
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
export { gameCapsule };

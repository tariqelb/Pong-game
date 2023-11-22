import p5Types, { Image } from 'p5';
import Game from './gameInstance';
import GameContainer from './gamecontainer';
import UserInfo from '../app/UserInfo';

//sound library
import { Howl, Howler } from 'howler';
import { relative } from 'path';
import { hostname } from 'os';

Howler.volume(1.0);

class SoundsClass
{
  //racket sound and its adjusment variables
  racketSound : any;
  isTap : number = 0;

  //goal sound and its variables
  goalSound : any;
  
  //opponent goal sound
  opponentGoalSound : any;
  isOppGoal : boolean = false;

  // top buttom rebound
  topButtomReboundSound : any;
  isHitTopOrButtom : number = 0;

  // win the game
  winSound : any;

  // lose the game
  loseSound : any;

  mode1Music : any;

  mode2Music : any;
  
  mode3Music : any;

  isMusicPlayed : boolean = false;
  //bounus sounds
}

let img1 : p5Types.Element | p5Types.Image ;
let img2 : p5Types.Element | p5Types.Image ;
let img3 : p5Types.Element | p5Types.Image;
let Sounds : SoundsClass = new SoundsClass();
let muteSound : boolean = true;
let soundButton : p5Types.Element;

//mute / unmute sound
let changeSoundOpetion = (playerOne : UserInfo , Sounds : SoundsClass) =>
{
  muteSound = !muteSound;
  if (muteSound)
  {
    // Howler.volume(1.0)
    Howler.mute(false);
    soundButton.html("mute")
  }
  else
  {
    // Howler.volume(0.0)
    // Howler.stop();
    Howler.mute(true);
    soundButton.html("unmute")
  }

}

//let canvasResizedHeight : number; // this variable is used when the cancas is resized so we need to change rackets size
//let canvasResizedWidth : number;

/* Draw the middle line */
let line = (game : Game) : void => 
{
  game.p5.noStroke();
  game.p5.fill('gray');
  game.p5.rect(game.p5.width / 2 - 2, 0 , 4 , game.p5.height); 
  // game.p5.rect(0, game.p5.height / 2 - 3 , game.p5.width, 6);
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
    canvasWidth = (game.canvasPranetDiv.elt.clientWidth ) -  (game.canvasPranetDiv.elt.clientWidth / 4)// game.gameBordersPixel; //the game..xel is the number of pixel give to canvas borders 
    canvasHeight = ((game.canvasPranetDiv.elt.clientWidth ) / 2.5 ) - 15 //- game.gameBordersPixel;
    game.p5.resizeCanvas(canvasWidth, canvasHeight);
    soundButton.size(game.canvasPranetDiv.elt.clientWidth / 10)
    soundButton.style("font-size", "2vmin")
    soundButton.position(game.canvasPranetDiv.elt.clientWidth / 2 - (game.canvasPranetDiv.elt.clientWidth / 10 / 2), 0, 'relative')
  }
  else
  {
    console.log("The game div selector return null.");
  }
}


function draw(game : Game, gameCapsule : GameContainer, playerOne : UserInfo, playerTwo : UserInfo) 
{
  let ballX; 
  let ballY;
  let ballWH;
  let ballSpeed;

  return () => 
  {


    // get player number from the sirver
    game.playerNumber = gameCapsule.playerNumber;
    //end

    //resive the canvas if the player change the browser window size
    resizeCanvas(game);
    //end

    //assign background image
    if (img1)
      game.p5.image(img1, 0, 0, game.p5.width, game.p5.height)
    if (img2)
      game.p5.image(img2, 0, 0, game.p5.width, game.p5.height)
    if (img3)
      game.p5.image(img3, 0, 0, game.p5.width, game.p5.height)
    //end

    // draw middle line
    if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5)
      line(game);
    //end
    // sound botton

    
    soundButton.mousePressed((playerOne) => changeSoundOpetion(playerOne, Sounds))
    //display mode music
    if (playerOne.modePlaying === 1 && muteSound && Sounds.isMusicPlayed === false)
    {
       Sounds.isMusicPlayed = true;
       Sounds.mode1Music.play();
    }
    if (playerOne.modePlaying === 2 && muteSound && Sounds.isMusicPlayed === false)
    {
       Sounds.isMusicPlayed = true;
       Sounds.mode2Music.play();
    }
    if (playerOne.modePlaying === 3 && muteSound && Sounds.isMusicPlayed === false)
    {
       Sounds.isMusicPlayed = true;
       Sounds.mode3Music.play();
    }
    //end

    // get current player canvas width and height
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    game.goalRestart = gameCapsule.ball.goalRestart;
    // end;

    
    // assign initial data to variables after a goal
    if (game.goalRestart)
    {
      game.rightRacket.racketY = -100;
      game.leftRacket.racketY = -100;
      game.rightRacket.keyIsPress = false;
      game.rightRacket.coordinateAlreadyGot = false;
      game.leftRacket.coordinateAlreadyGot = false;
      game.rightRacket.startOfSimulation = true;
      game.leftRacket.startOfSimulation = true;
      setTimeout(() => {}, 500);
      gameCapsule.init = false;
      game.rightRacket.mouseIsMoved = false;
      // play goal sounds
      // if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5)
      if (muteSound)
      {
        if ((gameCapsule.playerNumber === 1 || gameCapsule.playerNumber === 3) && gameCapsule.ball.ballX < 0 + gameCapsule.ball.ballWH)
          Sounds.goalSound.play();
        else if ((gameCapsule.playerNumber === 1 || gameCapsule.playerNumber === 3) && gameCapsule.ball.ballX > 400 - gameCapsule.ball.ballWH)
          Sounds.opponentGoalSound.play()
        if (gameCapsule.playerNumber === 2 && gameCapsule.ball.ballX > 400 - gameCapsule.ball.ballWH)
          Sounds.goalSound.play();
        else if (gameCapsule.playerNumber === 2 && gameCapsule.ball.ballX < 0 + gameCapsule.ball.ballWH)
          Sounds.opponentGoalSound.play() 
      }
      //end
    } 
    //end

    // get first mouse event
    game.cnv?.mouseMoved(() => game.rightRacket.mouseIsMoved = true)
    //end
   
    // left and right racket get the coordinate of the ball so they can calculate the virtual rebound of the ball
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

    //get ball coordinate  0| 50_______350 |400
    if (game.leftRacket.coordinateAlreadyGot === false)
    {
      if (game.ball.ballX > 50 && game.ball.ballX < game.p5.width - 50)
      {
        game.leftRacket.virtualBallX = gameCapsule.ball.ballX;
        game.leftRacket.virtualBallY = gameCapsule.ball.ballY;
        game.leftRacket.virtualBallWH = gameCapsule.ball.ballWH;
        game.leftRacket.virtualBallS = gameCapsule.ball.ballSpeed;
        game.leftRacket.virtualBallA = gameCapsule.ball.ballAngle;
        game.leftRacket.validCoordinate = true;
      }
      else
        game.leftRacket.validCoordinate = false;
    }
    // end


    

    // get ball coordinate , convert it to player canvas size and assign it to a loacal variables
    ballX     = (gameCapsule.ball.ballX * game.p5.width / 400);
    ballY     = (gameCapsule.ball.ballY * game.p5.height / 200);
    ballWH    = (gameCapsule.ball.ballWH * game.p5.height / 200);
    ballSpeed = (gameCapsule.ball.ballSpeed * game.p5.width / 400);
    // ends

    // make racket sound
    if (muteSound)
    {
      if (gameCapsule.init && ballX  - ballWH < (game.p5.width / 80) && Sounds.isTap === 0 && gameCapsule.ball.ballDirection !== undefined) 
      {
        if (ballY > game.rightRacket.racketY && ballY < game.rightRacket.racketY + game.rightRacket.racketH)
        {
          Sounds.racketSound.play()
          Sounds.isTap++;
        }
        if (gameCapsule.playerNumber === 3 && ballY > game.leftRacket.racketY && ballY < game.leftRacket.racketY + game.leftRacket.racketH)
        {
          Sounds.racketSound.play()
          Sounds.isTap++;
        }
      }
      else if (gameCapsule.init && ballX + ballWH > game.p5.width - (game.p5.width / 80) && Sounds.isTap === 0 && gameCapsule.ball.ballDirection !== undefined)
      {
        if (ballY > game.rightRacket.racketY && ballY < game.rightRacket.racketY + game.rightRacket.racketH)
        {
          Sounds.racketSound.play();
          Sounds.isTap++;
        }
      }
      else if (gameCapsule.init && ballX  - ballWH >= (game.p5.width / 80) && ballX + ballWH < game.p5.width - (game.p5.width / 80))
      {
        Sounds.isTap = 0;
      }
    }
    // end



    // top buttom rebound
    if (muteSound)
    {
      if (ballWH && (ballY + ballWH >= game.p5.height || ballY - ballWH <= 0) && Sounds.isHitTopOrButtom === 0)
      {
        Sounds.topButtomReboundSound.play()
        Sounds.isHitTopOrButtom++;
      }
      else if (ballY + ballWH < game.p5.height && ballY - ballWH > 0)
        Sounds.isHitTopOrButtom = 0;
    }
    // end


    // assign ball cordinate to glable object
    game.ball.ballX = ballX;
    game.ball.ballY = ballY;
    game.ball.ballWH = ballWH;
    game.ball.ballSpeed = ballSpeed;
    game.ball.ballAngle = gameCapsule.ball.ballAngle;
    game.ball.ballDirection = gameCapsule.ball.ballDirection;
    // ends

    // call of the racket depending on player opetions
    if (playerOne.playWithMouse === 1)
      game.rightRacket.drawAndMoveRacketWithMouse();
    else if (playerOne.playWithMouse === 2)
     game.rightRacket.MoveRacketWithKeyBoard();
    else
      game.rightRacket.automaticRacket();

    if (playerOne.playWithRobot === true)
      game.leftRacket.automaticRacket();
    // ends of racket call
    
    // convert ball coordinate depending on player side (both player are in the right side)
    if (game.playerNumber === 2)
    {
      let tmpBallX : number = 400 - gameCapsule.ball.ballX; 
      ballX                  = (tmpBallX * game.p5.width / 400);
      game.ball.ballX        = ballX;
    }
    // end 

    // assing racket date to the global object so it will be emited the opponent player
    if (playerOne.playWithRobot === false)
    {
      gameCapsule.sentRacket.lastPosY= game.rightRacket.lastPositionOfRacketY;
      gameCapsule.sentRacket.height = game.p5.height;
      gameCapsule.sentRacket.width = game.p5.width;
    }
    else if (playerOne.playWithRobot)
    {
      gameCapsule.robotRacket.lastPosY = game.rightRacket.lastPositionOfRacketY;
      gameCapsule.robotRacket.robotLastPosY = game.leftRacket.lastPositionOfRacketY;
      gameCapsule.robotRacket.height = game.p5.height;
      gameCapsule.robotRacket.width = game.p5.width;
    }
    // end

    // assign true ti init when all data (ball racket) are ready (we can start the draw!!!)
    gameCapsule.init = true;
    //end

    // draw the ball , oppenent racket , the game is <over> and loading
    if (gameCapsule.ball.ballX && gameCapsule.ball.ballY)
    {
      if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5)
      {
        game.p5.circle(ballX, ballY, ballWH);
        if (playerOne.playWithRobot === false)
          game.p5.rect(0, gameCapsule.recvRacket.lastPosY / gameCapsule.recvRacket.height * game.p5.height, game.p5.width / 80, game.p5.height / 4);
      }
      else
      {
        game.p5.fill('#bdebf6')
        game.p5.textSize(game.p5.width / 12);
        let txtW = game.p5.textWidth('The game is <over>')
        game.p5.text("The game is <over>", game.p5.width / 2 - txtW / 2,  game.p5.height / 2); 
        game.p5.fill('white')
      }  
    }
    else
      game.p5.text("loading", 20, 20); 
  }
  //end
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
      canvasWidth = game.canvasPranetDiv.elt.clientWidth - (game.canvasPranetDiv.elt.clientWidth / 2)// game.gameBordersPixel;//the 15 for border pixel
      canvasHeight = (game.canvasPranetDiv.elt.clientWidth / 2.5) - 15;// game.gameBordersPixel;
      game.cnv = game.p5.createCanvas( canvasWidth ,  canvasHeight);
      game.cnv.parent('root');
      game.canvasResizedHeight = canvasHeight;
      game.canvasResizedWidth = canvasWidth;
      soundButton = game.p5.createButton('mute')
      soundButton.parent("#root")
      soundButton.size(game.canvasPranetDiv.elt.clientWidth / 10)
      soundButton.style("font-size", "2vmin")
      soundButton.position(game.canvasPranetDiv.elt.clientWidth / 2 - (game.canvasPranetDiv.elt.clientWidth / 10 / 2), 0, 'relative')
    }
    else
      console.log("Error: in sketch file, failed to select the parent of canvas element.")
  };
}



let loadSounds = () => 
{
  Sounds.racketSound = new Howl({
    src: ['/Sounds/racketRebound.wav'],
    onload: () => {
      console.log('Audio loaded successfully');
      Howler.volume(0);
      // Sounds.racketSound.play(); 
      Howler.volume(1.0);
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.goalSound = new Howl({
    src: ['/Sounds/goal.wav'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.opponentGoalSound = new Howl({
    src: ['/Sounds/opponentGoal.wav'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.topButtomReboundSound = new Howl({
    src: ['/Sounds/topButtomRebound.mp3'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.winSound = new Howl({
    src: ['/Sounds/successGameOver.wav'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.loseSound = new Howl({
    src: ['/Sounds/loseGameOver.wav'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.mode1Music = new Howl({
    src: ['/Sounds/mode1Music.mp3'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

  Sounds.mode2Music = new Howl({
    src: ['/Sounds/mode2Music.mp3'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });


  Sounds.mode3Music = new Howl({
    src: ['/Sounds/mode3Music.mp3'],
    onload: () => {
      console.log('Audio loaded successfully');
      // You can play the sound or perform other actions here
    },
    onloaderror: (error) => {
      console.error('Error loading audio:', error);
    },
  });

}


function MySketch(gameCapsule : GameContainer,  p5: p5Types , playerOne : UserInfo, playerTwo : UserInfo )
{
  let game: Game | null = null;

  const setupGame = () => 
  {
    game = new Game(p5);
    // load images for background and sounds effect 
    game.p5.preload = () =>
    {
      if (game && playerOne.modePlaying === 1)
        img1 = game.p5.loadImage('./BackgroundImages/background_image1.jpg')
      if (game && playerOne.modePlaying === 2)
        img2 = game.p5.loadImage("./BackgroundImages/background_image2.jpg")
      if (game && playerOne.modePlaying === 3)
        img3 = game.p5.loadImage("./BackgroundImages/background_image3.jpg")
      loadSounds();
      
    }
    game.p5.setup = setup(game);
    game.p5.draw = draw(game, gameCapsule, playerOne, playerTwo);
  };

  // Call setupGame once when the component mounts
  if (!game)
  {
    setupGame();
  }
}
export default MySketch;
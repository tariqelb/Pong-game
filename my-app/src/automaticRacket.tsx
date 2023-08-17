import p5Types from 'p5';
import { drawInitLeftRacket, lastPossitionOfLeftRectY } from './mySketch';
import { lrecX }  from './mySketch'; 
import { lrecY }  from './mySketch'; 
import { lrecH }  from './mySketch'; 
import { lrecW }  from './mySketch'; 
import { ballX }  from './ballMove';
import { ballY }  from './ballMove';
import { ballWH } from './ballMove';
import { ballAngle } from './ballMove';
import { ballDirection } from './ballMove';
import { ballSpeed } from './ballMove';
import { restart } from './ballMove';


let restartTwo : boolean = false;
let virtualLineX : number ;//in the case where the ball start go back to robot from player , virtua_line_X is a vertical line in the canvas where the robot start moving to reach the right point where the ball will hit in the robot wall when the ball pass the virtual line
let virtualLineSet : number; // virtual line set variable used to calculate the X coordinate of the virtual line for example 2 virtual line is in the middle 4 virtual line is in the third quarter of the canvas with
let virtualBallX : number;
let virtualBallY : number;
let virtualBallH : number;
let virtualBallW : number;
let autoRacketX : number;
let autoRacketY : number;
let autoRacketH : number;
let autoRacketW : number;
let virtualBallAngle : number;
let robotStartMoving : boolean = false; //set to true when the ball come from player and pass the virtual line, so robot racket need to start moving
let coordinateAlreadyGot : boolean = false;// already get the virtual coordinate of the ball;
let startSimulation : boolean = true;
let lastPossitionOfLeftAutoRectY : number ;

let virtualBallUpbottomRebound = (p5 : p5Types) : void =>
{
    let radAngle : number;
    let adj : number;
    let tempAngle : number;

    if (virtualBallY - ballWH <= 0)
    {
        if (virtualBallAngle >= 0 && virtualBallAngle <= 100)
        {
            virtualBallAngle += 100;

        }
        else if (ballAngle >= 300 && ballAngle <= 400)
        {
            virtualBallAngle -= 100;
        }
        //ballTopTan = 0;
        tempAngle = virtualBallAngle;
        if (virtualBallAngle > 100 && virtualBallAngle < 200)
            tempAngle = virtualBallAngle - 100;
        else if (virtualBallAngle >= 200 && virtualBallAngle < 300)
            tempAngle = virtualBallAngle - 200;
        else if (virtualBallAngle >= 300 && virtualBallAngle < 400)
            tempAngle = virtualBallAngle - 300;
        else if (virtualBallAngle >= 400)
            tempAngle = virtualBallAngle - 400;
        radAngle = tempAngle  * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle); 
        if (tempAngle === 100 || tempAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY < 0)
            virtualBallY = 0 + adj;
        else
            virtualBallY += adj;
    }
    else if (virtualBallY + ballWH >= p5.height - ballWH / 2)
    {
        if (virtualBallAngle >= 200 && virtualBallAngle <= 300)
        {
            virtualBallAngle += 100;
        }
        else if (virtualBallAngle >= 100 && virtualBallAngle < 200)
        {
            virtualBallAngle -= 100;
        }
        tempAngle = virtualBallAngle;
        if (virtualBallAngle > 100 && virtualBallAngle < 200)
            tempAngle = virtualBallAngle - 100;
        else if (virtualBallAngle >= 200 && virtualBallAngle < 300)
            tempAngle = virtualBallAngle - 200;
        else if (virtualBallAngle >= 300 && virtualBallAngle < 400)
            tempAngle = virtualBallAngle - 300;
        else if (virtualBallAngle >= 400)
            tempAngle = virtualBallAngle - 400;
        radAngle = tempAngle * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        if (tempAngle === 100 || tempAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (virtualBallY >= p5.height - (ballWH / 2))
            virtualBallY = (p5.height - (ballWH / 2)) - adj;
        else
            virtualBallY -= adj;
    }
    if (ballDirection)
        virtualBallX += ballSpeed;
    else
        virtualBallX -= ballSpeed;
    console.log("The Holly X Y: " , virtualBallX, virtualBallY);
    p5.rect(virtualBallX, virtualBallY, 15, 15)
}

let getCoordinates = (p5 : p5Types) : void =>
{
    let tempAngle   : number;
    let radAngle    : number;
    let adj         : number;
    
    console.log("last position : " , virtualBallX, virtualBallY)
    virtualBallAngle = ballAngle;
    virtualBallX = ballX;
    virtualBallY = ballY;
    console.log("new position : " , virtualBallX, virtualBallY)
    while (virtualBallX > 0 && !ballDirection)
    {
        tempAngle = virtualBallAngle;
        if (virtualBallAngle > 100 && virtualBallAngle < 200)
            tempAngle = virtualBallAngle - 100;
        else if (virtualBallAngle >= 200 && virtualBallAngle < 300)
            tempAngle = virtualBallAngle - 200;
        else if (virtualBallAngle >= 300 && virtualBallAngle < 400)
            tempAngle = virtualBallAngle - 300;
        else if (ballAngle >= 400)
            tempAngle = virtualBallAngle - 400;
        radAngle = tempAngle * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        //console.log("adj : ", adj , virtualBallAngle);
        if (tempAngle === 100 || tempAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        //console.log("adj 2: ", adj , virtualBallAngle);
        if (virtualBallAngle < 100)
            virtualBallY -= adj;
        else if (virtualBallAngle >= 0 && virtualBallAngle < 100)
            virtualBallY -= adj;
        else if (virtualBallAngle >= 100 && virtualBallAngle < 200)
            virtualBallY += adj;
        else if (virtualBallAngle >= 200 && virtualBallAngle < 300)
            virtualBallY += adj;
        else if (virtualBallAngle >= 300 && virtualBallAngle <= 400)
            virtualBallY -= adj;
        if (ballDirection)
            virtualBallX += ballSpeed;
        else
            virtualBallX -= ballSpeed;
        if (virtualBallY - ballWH <= 0 || (virtualBallY + ballWH) >= p5.height)
        {
               console.log("before : ", virtualBallX, virtualBallY - ballWH, virtualBallAngle);
               virtualBallUpbottomRebound(p5);
               console.log("is the some : ", virtualBallX, virtualBallY, virtualBallAngle);
        } 

    }
    if (virtualBallX < 0)
        virtualBallX = 0;
    p5.rect(virtualBallX, virtualBallY, virtualBallH, virtualBallW);
    console.log("look for position : " , virtualBallX, virtualBallY)
}

let drawAutoInitLeftRacket = (p5 : p5Types ) : void =>
{
  autoRacketH = (p5.height / 4);
  autoRacketX = 0; 
  autoRacketY = (p5.height / 2) - (autoRacketH / 2); 
  autoRacketW = (p5.width / 80); 

  virtualBallH = ballWH
  virtualBallW = ballWH;
  virtualBallX = ballX;
  virtualBallY = ballY;
  p5.rect(autoRacketX, autoRacketY , autoRacketW,  autoRacketH);
  startSimulation = false;
  lastPossitionOfLeftAutoRectY = autoRacketY;
  console.log("new start");
}

let drawAutomaticRacket = (p5 : p5Types) : void =>
{
    //console.log("auto called" , startSimulation  , coordinateAlreadyGot, lastPossitionOfLeftAutoRectY);
   if (startSimulation === true)
   {
        drawAutoInitLeftRacket(p5);
   }
   else if (coordinateAlreadyGot)
   {
        /*if (virtualBallY === undefined)
        {
            virtualBallH = ballWH
            virtualBallW = ballWH;
            virtualBallX = ballX;
            virtualBallY = ballY;
        }*/
        //console.log("get here", virtualBallY , ballY, autoRacketY);
        if (coordinateAlreadyGot)
        {
            //console.log("virual coordinate : ", virtualBallY , virtualBallX);
        }
        if (virtualBallY < autoRacketY + autoRacketH / 2)
        {
            autoRacketY -= 5;
        }
        else if (virtualBallY > autoRacketY + autoRacketH / 2)
            autoRacketY += 5;
        if (autoRacketY < 0)
            autoRacketY = 0;
        else if (autoRacketY + autoRacketH > p5.height)
            autoRacketY = p5.height - autoRacketH;
        //console.log("get There", virtualBallY , ballY, autoRacketY);
        p5.rect(autoRacketX, autoRacketY, autoRacketW,  autoRacketH);
        lastPossitionOfLeftAutoRectY = autoRacketY;
   }
   //else 
   {
    //    console.log("get There");
        p5.rect(autoRacketX, lastPossitionOfLeftAutoRectY , autoRacketW,  autoRacketH);
   }
   /*else if (coordinateAlreadyGot)
   {*/
    //console.log("Virtual : ", virtualRacketX , virtualRacketY, virtualRacketW , virtualRacketH);
    //p5.rect(virtualRacketX, virtualRacketY - virtualRacketH / 2 , virtualRacketW,  virtualRacketW);
   //}
}

let automaticRacket = (p5 : p5Types) : void =>
{
    //console.log("Ball direction : ",  ballDirection, coordinateAlreadyGot)
    if (restart)
    {
        startSimulation = true;
        coordinateAlreadyGot = false;
        console.log("start again------------------>")
    }
    if (ballDirection === false)// || ballDirection === undefined)
    {
        if (coordinateAlreadyGot == false)// && ballX < virtualLineX)
        {
            console.log("search for coordinate : ");
            getCoordinates(p5);
            coordinateAlreadyGot = true;
        }
    }
    else
    {
        console.log("already got it turn to false : ");
        coordinateAlreadyGot = false;
    }
    drawAutomaticRacket(p5);
}

export default automaticRacket;
export {autoRacketX};
export {autoRacketY};
export {autoRacketW};
export {autoRacketH};
export {restartTwo};
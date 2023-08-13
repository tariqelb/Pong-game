import p5Types from 'p5';
import MySketch  from './mySketch';

import {lrecX}  from './mySketch'; 
import {lrecY}  from './mySketch'; 
import {lrecH}  from './mySketch'; 
import {lrecW}  from './mySketch'; 
import {rrecX}  from './mySketch'; 
import {rrecY}  from './mySketch'; 
import {rrecH}  from './mySketch'; 
import {rrecW}  from './mySketch'; 
import {lastPossitionOfRightRectY} from './mySketch'; 
import {lastPossitionOfLeftRectY} from './mySketch'; 
//set the ball  variable ballX ballY ballWH  (ellipse) 
let ballX : number ;
let ballY : number ;
let ballWH : number ; // ball width and height 
let ballFirstMove : boolean = true;
let ballDirection : boolean | undefined = undefined;
let ballAngle : number;
let ballSpeed : number;
let first50Time : number = 0;
let castLrecY : number;
let castRrecY : number;
let restart : boolean = false;


let calculateRightBallRebound = () : void =>
{
    let diff : number = ballY - castLrecY;
    let adj : number;

    if (diff < 0)
        diff = diff * -1;
    ballAngle = diff * 200 / rrecH;
    console.log("The diff right: ", diff, ballAngle, ballDirection);
    ballDirection = !ballDirection;
    adj = 10 * Math.tan(ballAngle);
    if (ballAngle < 100)
        ballY = ballY + adj;
    else if (ballAngle > 100)
        ballY = ballY - adj;
}

let calculateLeftBallRebound = () : void =>
{
    let diff : number = ballY - castRrecY;
    let adj : number;
    
    if (diff < 0)
        diff = diff * -1;
    ballAngle = diff * 200 / lrecH;
    console.log("The diff : ", diff, ballAngle);
    ballDirection = !ballDirection;
    adj = 10 * Math.tan(ballAngle);
    if (ballAngle < 100)
        ballY = ballY + adj;
    else if (ballAngle > 100)
        ballY = ballY - adj; 
}

let calculateBallOnSpace = () : void =>
{
    let adj : number;

    adj = 10 * Math.tan(ballAngle);
    if (ballAngle < 100)
        ballY = ballY + adj;
    else if (ballAngle > 100)
        ballY = ballY - adj;
}

let calculateTopAndBottomBallRebound = () : void =>
{

}

let ballMove =  (p5 : p5Types) : void =>
{
    let ballRightTan : number = ballX + ballWH / 2;
    let ballLeftTan : number = ballX - ballWH / 2;
    let ballTopTan : number = ballY + ballWH / 2;
    let ballBottomTan : number = ballY - ballWH / 2;
    if (ballDirection === undefined)
    {
        ballDirection = (Math.floor(Math.random() * (2))) ? true : false;//generate a random number between 0 ans 1 , 0 for left and 1 for right first move direction
        if (ballDirection == true)
            ballAngle = 100;
        else
            ballAngle = 300;
    }
    if (ballFirstMove)
    {
        if (ballDirection)
            ballX += 5;
        else
            ballX -= 5;
        if (ballDirection === true && ballRightTan >= rrecX)
        {
            //console.log("-Right : ", ballDirection , ballRightTan , rrecX, ballY , castRrecY, ballY , (castRrecY - rrecH), "is it :" , p5.height / 2 + (rrecH / 2))
            //if ( ballY >= castRrecY && ballY <= castRrecY + rrecH)
            //    ballDirection = false;
            //else
                //p5.setup();   
            ballFirstMove = false; 
        }   
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) )
        {
            //console.log("-Left : ", ballDirection , ballLeftTan , lrecX, ballY , castLrecY, ballY , (castLrecY - lrecH), "is it :" , p5.height / 2 + (lrecH / 2))
            //if (ballY >= castLrecY && ballY <= castLrecY + lrecH)
            //    ballDirection = true;
            ballFirstMove = false; 
        }
        //if (ballTopTan >= 0)
        p5.ellipse(ballX, ballY, ballWH, ballWH);
    }
    /*console.log(ballLeftTan , ballRightTan, p5.width)
    if (ballRightTan <= 0 || ballLeftTan >= p5.width)
    {
     console.log("Yep 1");   
        p5.remove();
        MySketch(p5);
    }*/
    if (!ballFirstMove)
    {
        if (ballDirection === true && ballRightTan >= rrecX && (ballY >= castRrecY && ballY <= castRrecY + rrecH))
        {
            calculateRightBallRebound();
        }
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) && (ballY >= castLrecY && ballY <= castLrecY + lrecH)) 
        {
            calculateLeftBallRebound();
        }
        else if (ballTopTan > 0 && ballBottomTan < p5.height)
        {
            calculateBallOnSpace();
        }
        else if (ballTopTan <= 0 || ballBottomTan >= p5.height)
        {
            calculateTopAndBottomBallRebound();
        }
        else
        {
            console.log("Yep 1");
            restart = true;
            ballFirstMove = true;
            first50Time = 0;
            ballDirection = undefined;
        }
    }
}

// Draw the ball 
let drawAndMoveTheBall = (p5 : p5Types) : void =>
{
    if (lrecY != undefined)
        castLrecY = lrecY;
    if (rrecY != undefined)
        castRrecY = rrecY
    if (first50Time < 50)
    {
        restart = false;
        ballWH = p5.height / 25;
        ballX = p5.width / 2;
        ballY = p5.height / 2;
        p5.stroke(1)
        p5.ellipse(ballX, ballY, ballWH, ballWH);
        first50Time++;
    } 
    else
        ballMove(p5);
}




export default drawAndMoveTheBall;
export {restart}
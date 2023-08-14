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
let ballSpeed : number = 5;
let first50Time : number = 0;
let castLrecY : number;
let castRrecY : number;
let restart : boolean = false;
let ballRightTan : number; 
let ballLeftTan : number;
let ballTopTan : number; 
let ballBottomTan : number;
let cnvHeight : number ;

let calculateRightBallRebound = () : void =>
{
    let diff : number = castLrecY - ballY;
    let adj : number = 0;
    let radAngle : number;

    //console.log("before right:" , diff,  rrecH, rrecH / 2 ,ballAngle);
    if (diff < 0)
        diff = diff * -1;
    //console.log("before 2 right:" , diff,  rrecH, rrecH / 2 ,ballAngle);
    if (diff <= rrecH / 2)
        ballAngle = 350;
    else
        ballAngle = 250;
    //console.log("rebound : " , ballAngle);
    radAngle = 50 * (Math.PI / 2 / 200);
    //console.log("The diff : ", diff, radAngle , ballAngle, "ball direction : ", ballDirection, !ballDirection);
    ballDirection = !ballDirection;
    //console.log("The adj be : ", adj);
    adj = ballSpeed * Math.tan(radAngle);
    if (adj < 0)
        adj *= -1;
    if (ballAngle > 300 && ballAngle <= 400)
        ballY = ballY - adj;
    else if (ballAngle >= 200 && ballAngle < 300)
        ballY = ballY + adj;
    //console.log("ball Y ", ballY);
    //console.log("The adj : ", adj);
    if (ballDirection)
        ballX += ballSpeed;
    else
        ballX -= ballSpeed;
}

let calculateLeftBallRebound = () : void =>
{
    let diff : number = castRrecY - ballY;
    let adj : number;
    let radAngle : number;
    
    //console.log("before left:" , diff, lrecH, ballAngle);
    if (diff < 0)
        diff = diff * -1;
    //ballAngle = diff * 200 / lrecH;
    if (diff <= lrecH / 2)
        ballAngle = 50;
    else
        ballAngle = 150;
    //console.log("rebound :" , ballAngle);
    radAngle = 50 * (Math.PI / 2 / 200);
    //console.log("The diff : ", diff, radAngle ,ballAngle, "ball direction : ", ballDirection, !ballDirection, Math.PI);
    ballDirection = !ballDirection;
    adj = ballSpeed * Math.tan(radAngle);
    if (adj < 0)
        adj *= -1
    //console.log("ball --> ", ballY , ballY + adj, ballAngle);
    if (ballAngle >= 0 && ballAngle < 100)
        ballY = ballY - adj;
    else if (ballAngle > 100 && ballAngle <= 200)
        ballY = ballY + adj; 
    //console.log("ball Y ", ballY);
    //console.log("The adj : ", adj);
    if (ballDirection)
        ballX += ballSpeed;
    else
        ballX -= ballSpeed;
}

let calculateBallOnSpace = () : void =>
{
    let adj : number;
    let radAngle : number;

 
    radAngle = 50/*ballAngle*/ * (Math.PI / 2 / 200);
    adj = ballSpeed * Math.tan(radAngle);
    //console.log("Ya : ", ballAngle, adj , ballSpeed);
    if (adj < 0)
        adj *= -1;
    if (ballAngle < 100)
        ballY = ballY - adj;
    else if (ballAngle >= 0 && ballAngle < 100)
        ballY = ballY - adj;
    else if (ballAngle >= 100 && ballAngle < 200)
        ballY = ballY + adj;
    else if (ballAngle >= 200 && ballAngle < 300)
        ballY = ballY + adj;
    else if (ballAngle >= 300 && ballAngle <= 400)
        ballY = ballY - adj;
    if (ballDirection)
        ballX += ballSpeed;
    else
        ballX -= ballSpeed;
    if (ballY < 0)
        ballY = 0;
    if (ballY > cnvHeight - ballWH / 2)
        ballY = cnvHeight - ballWH / 2;
}

let calculateTopAndBottomBallRebound = () : void =>
{
    let radAngle : number;
    let adj : number;

    if (ballTopTan <= 0)
    {
        //console.log("U4 : ballAngle : ", ballAngle, ballTopTan, ballBottomTan);
        if (ballAngle >= 0 && ballAngle <= 100)
        {
            //console.log("One : ", ballAngle);
            ballAngle += 100;

        }
        else if (ballAngle >= 300 && ballAngle < 400)
        {
            //console.log("Two : ", ballAngle);
            ballAngle -= 100;
        }
        ballTopTan = 0;
        radAngle = 50  /*ballAngle*/ * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        if (adj < 0)
            adj *= -1;
        if (ballY < 0)
            ballY = 0 + adj;
        else
            ballY += adj;
    }
    else if (ballBottomTan >= cnvHeight - ballWH / 2)
    {
        //console.log("B4 : ballAngle : ", ballAngle, ballTopTan, ballBottomTan, cnvHeight - ballWH / 2);
        if (ballAngle >= 200 && ballAngle < 300)
        {
            //console.log("tree : ", ballAngle);
            ballAngle += 100;
        }
        else if (ballAngle > 100 && ballAngle < 200)
        {
            //console.log("Fore : ", ballAngle);
            ballAngle -= 100;
        }
        //ballBottomTan = cnvHeight - ballWH / 2;
        radAngle = 50 * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        if (adj < 0)
            adj *= -1;
        if (ballY >= cnvHeight - (ballWH / 2))
        {
            ballY = (cnvHeight - (ballWH / 2)) - adj;
            console.log(1);
        }
        else
        {
            console.log(2);
            ballY -= adj;
        }
    }
    if (ballDirection)
        ballX += ballSpeed;
    else
        ballX -= ballSpeed;
}

let ballMove =  (p5 : p5Types) : void =>
{
    ballRightTan = ballX + ballWH / 2;
    ballLeftTan = ballX - ballWH / 2;
    ballTopTan = ballY - ballWH / 2;
    ballBottomTan = ballY + ballWH / 2;

    if (ballDirection === undefined)
    {
        console.log("ballDirection is undefined");
        ballDirection = (Math.floor(Math.random() * (2))) ? true : false;//generate a random number between 0 ans 1 , 0 for left and 1 for right first move direction
        if (ballDirection === true)
            ballAngle = 100;
        else
            ballAngle = 300;
    }
    if (ballFirstMove)
    {
        if (ballDirection)
            ballX += ballSpeed;
        else
            ballX -= ballSpeed;
        if (ballDirection === true && ballRightTan >= rrecX)
        {
            //console.log("Change ball direction right: "); 
            ballFirstMove = false; 
        }   
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) )
        {
            //console.log("Change ball direction left: "); 
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
    if (ballFirstMove === false)
    {
        //console.log("First ball move is false", ballFirstMove);
        if (ballX <= 0 || ballX >= p5.width - ballWH / 2)
        {
            //console.log("Yep 1");
            //console.log("Except : " , ballTopTan , ballBottomTan , p5.height - (ballWH / 2));
            restart = true;
            ballFirstMove = true;
            first50Time = 0;
            ballDirection = undefined;
        }
        else if (ballDirection === true && ballRightTan >= rrecX && (ballY >= castRrecY && ballY <= castRrecY + rrecH))
        {
            calculateRightBallRebound();
            //console.log("in 1");
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) && (ballY >= castLrecY && ballY <= castLrecY + lrecH)) 
        {
            calculateLeftBallRebound();
            //console.log("in 2");
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballTopTan > 0 && ballBottomTan < p5.height /*- ballWH / 2*/)
        {
            calculateBallOnSpace();
            //console.log("in 3", ballTopTan, ballBottomTan, p5.height - ballWH / 2);
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballTopTan <= 0 || ballBottomTan >= p5.height)
        {
            calculateTopAndBottomBallRebound();
            //console.log("in 4", );
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
    }
}

// Draw the ball 
let drawAndMoveTheBall = (p5 : p5Types) : void =>
{
    cnvHeight = p5.height;
    if (lrecY !== undefined)
        castLrecY = lrecY;
    if (rrecY !== undefined)
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
        ballFirstMove = true;
    } 
    else
        ballMove(p5);
}




export default drawAndMoveTheBall;
export {restart}
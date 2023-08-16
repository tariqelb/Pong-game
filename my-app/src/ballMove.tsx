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
//set the ball  variable ballX ballY ballWH  (circle) 
let ballX : number ;
let ballY : number ;
let ballWH : number ; // ball width and height 
let ballFirstMove : boolean = true;
let ballDirection : boolean | undefined = undefined; // the direction of the ball right == true , left == flase
let ballAngle : number;
let ballSpeed : number = 7; // the opposite of the ballAngle // conatant added to ballX;
let first50Time : number = 0;//  1 2 3 before the ball start move , just a short time for the player to be ready;
let castLrecY : number;// left racket Y coordinate read-only import variable cast it to number;
let castRrecY : number;// right racket Y coordinate read-only import variable cast it to number;
let restart : boolean = false;// restart the game , set variable to initial value;
let ballRightTan  : number; // ball is a circle from 0 to 400 grade ballRightTan is the x coordinate of the grade 300
let ballLeftTan   : number; // the x coordinate of the grade 100
let ballTopTan    : number; // the y coordinate of the grade 0 (400)
let ballBottomTan : number; // the Y coordinate of the grade 200
let cnvHeight : number ; // p5.height canvas height

let calculateRightBallRebound = () : void =>
{
    let diff : number = castLrecY - ballY;
    let adj : number = 0;
    let radAngle : number;
    let tmpAngle : number;

    if (diff < 0)
        diff = diff * -1;

    ballAngle = diff * 200 / rrecH;
    if (ballAngle < 100)
        ballAngle = ballAngle + 300;
    else 
        ballAngle = ballAngle + 100
    tmpAngle = ballAngle;
    if (ballAngle > 100 && ballAngle < 200)
        tmpAngle = ballAngle - 100;
    else if (ballAngle >= 200 && ballAngle < 300)
        tmpAngle = ballAngle - 200;
    else if (ballAngle >= 300 && ballAngle < 400)
        tmpAngle = ballAngle - 300;
    else if (ballAngle >= 400)
        tmpAngle = ballAngle - 400;
    radAngle = tmpAngle * (Math.PI / 2 / 200);
    ballDirection = !ballDirection;
    adj = ballSpeed * Math.tan(radAngle);
    if (tmpAngle === 100 || tmpAngle === 300)
        adj = 0;
    if (adj < 0)
        adj *= -1;
    if (ballAngle >= 300 && ballAngle <= 400)
        ballY = ballY - adj;
    else if (ballAngle >= 200 && ballAngle < 300)
        ballY = ballY + adj;
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
    let tmpAngle : number ;
    
    if (diff < 0)
        diff = diff * -1;

    ballAngle = diff * 200 / lrecH;
    tmpAngle = ballAngle;
    if (ballAngle > 100 && ballAngle < 200)
        tmpAngle = ballAngle - 100;
    else if (ballAngle >= 200 && ballAngle < 300)
        tmpAngle = ballAngle - 200;
    else if (ballAngle >= 300 && ballAngle < 400)
        tmpAngle = ballAngle - 300;
    else if (ballAngle >= 400)
        tmpAngle = ballAngle - 400;
    radAngle = tmpAngle * (Math.PI / 2 / 200);
    ballDirection = !ballDirection;

    adj = ballSpeed * Math.tan(radAngle);
    if (tmpAngle === 100 || tmpAngle === 300)
        adj = 0;
    if (adj < 0)
        adj *= -1;
    if (ballAngle >= 0 && ballAngle < 100)
        ballY = ballY - adj;
    else if (ballAngle >= 100 && ballAngle <= 200)
        ballY = ballY + adj;
    if (ballDirection)
        ballX += ballSpeed;
    else
        ballX -= ballSpeed;
}

let calculateBallOnSpace = () : void =>
{
    let adj : number;
    let radAngle : number;
    let tmpAngle: number;

    tmpAngle = ballAngle;
    if (ballAngle > 100 && ballAngle < 200)
        tmpAngle = ballAngle - 100;
    else if (ballAngle >= 200 && ballAngle < 300)
        tmpAngle = ballAngle - 200;
    else if (ballAngle >= 300 && ballAngle < 400)
        tmpAngle = ballAngle - 300;
    else if (ballAngle >= 400)
        tmpAngle = ballAngle - 400;
    radAngle = tmpAngle  * (Math.PI / 2 / 200);
    adj = ballSpeed * Math.tan(radAngle);
    if (ballAngle === 200 || ballAngle === 0)
        console.log("The space : ", ballAngle,  tmpAngle);
    if (tmpAngle === 100 || tmpAngle === 300)
        adj = 0;
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
    let tmpAngle : number;

    if (ballTopTan <= 0)
    {
        if (ballAngle >= 0 && ballAngle <= 100)
        {
            ballAngle += 100;

        }
        else if (ballAngle >= 300 && ballAngle <= 400)
        {
            ballAngle -= 100;
        }
        ballTopTan = 0;
        tmpAngle = ballAngle;
        if (ballAngle > 100 && ballAngle < 200)
            tmpAngle = ballAngle - 100;
        else if (ballAngle >= 200 && ballAngle < 300)
            tmpAngle = ballAngle - 200;
        else if (ballAngle >= 300 && ballAngle < 400)
            tmpAngle = ballAngle - 300;
        else if (ballAngle >= 400)
            tmpAngle = ballAngle - 400;
        radAngle = tmpAngle  * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle); 
        if (ballAngle === 200 || ballAngle === 0)
            console.log("The space : ", ballAngle,  tmpAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY < 0)
            ballY = 0 + adj;
        else
            ballY += adj;
    }
    else if (ballBottomTan >= cnvHeight - ballWH / 2)
    {
        if (ballAngle >= 200 && ballAngle <= 300)
        {
            ballAngle += 100;
        }
        else if (ballAngle >= 100 && ballAngle < 200)
        {
            ballAngle -= 100;
        }
        tmpAngle = ballAngle;
        if (ballAngle > 100 && tmpAngle < 200)
            tmpAngle = ballAngle - 100;
        else if (ballAngle >= 200 && tmpAngle < 300)
            tmpAngle = ballAngle - 200;
        else if (ballAngle >= 300 && tmpAngle < 400)
            tmpAngle = ballAngle - 300;
        else if (ballAngle >= 400)
            tmpAngle = ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        if (ballAngle === 200 || ballAngle === 0)
            console.log("The space : ", ballAngle,  tmpAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY >= cnvHeight - (ballWH / 2))
            ballY = (cnvHeight - (ballWH / 2)) - adj;
        else
            ballY -= adj;
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
        //console.log("ballDirection is undefined");
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
            ballFirstMove = false; 
        }   
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) )
        {
            ballFirstMove = false; 
        }
        if (ballDirection && ballX >= p5.width && ballY > castRrecY && ballY < castRrecY + rrecH)
            ballX = p5.width - rrecW + 1;
        if (!ballDirection && ballX <= 0 && ballY > castLrecY && ballY < castLrecY + lrecH)
            ballX = lrecW - 1;
        p5.ellipse(ballX, ballY, ballWH, ballWH);
    }
    if (ballFirstMove === false)
    {
        if ((ballDirection && ballX > p5.width && (ballY < castRrecY || ballY > castRrecY + rrecH))
            || (!ballDirection && ballX <= 0 && (ballY < castLrecY || ballY > castLrecY + lrecH)))
        {
            console.log("Yep");
            restart = true;
            ballFirstMove = true;
            first50Time = 0;
            ballDirection = undefined;
        }
        else if (ballDirection === true && ballRightTan >= rrecX && (ballY >= castRrecY && ballY <= castRrecY + rrecH))
        {
            calculateRightBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) && (ballY >= castLrecY && ballY <= castLrecY + lrecH)) 
        {
            calculateLeftBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballTopTan > 0 && ballBottomTan < p5.height /*- ballWH / 2*/)
        {
            calculateBallOnSpace();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
        }
        else if (ballTopTan <= 0 || ballBottomTan >= p5.height)
        {
            calculateTopAndBottomBallRebound();
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
    {
        ballMove(p5);
    }
}

export { ballX };
export { ballY };
export { ballWH };
export { ballAngle };
export { ballDirection };
export { restart };
export { ballSpeed }


export default drawAndMoveTheBall;
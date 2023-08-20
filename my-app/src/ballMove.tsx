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
//import { automaticRacket } from './automaticRacket';
import { autoRacketH } from './automaticRacket';
import { autoRacketW } from './automaticRacket';
import { autoRacketX } from './automaticRacket';
import { autoRacketY } from './automaticRacket';
import { autoRightRacketH } from './automaticRacket';
import { autoRightRacketW } from './automaticRacket';
import { autoRightRacketX } from './automaticRacket';
import { autoRightRacketY } from './automaticRacket';
import { automaticRacketFlag } from './mySketch';
import { randomRebound } from './automaticRacket';


//set the ball  variable ballX ballY ballWH  (circle) 
let ballX : number ;
let ballY : number ;
let ballWH : number ; // ball width and height 
let ballFirstMove : boolean = true;
let ballDirection : boolean | undefined = undefined; // the direction of the ball right == true , left == flase
let ballAngle : number;
let ballSpeed : number = 20; // the opposite of the ballAngle // conatant added to ballX;
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
    let diff : number;
    let adj : number = 0;
    let radAngle : number;
    let tmpAngle : number;

    if (automaticRacketFlag)
        diff = autoRightRacketY - ballY;
    else
        diff = castRrecY - ballY; 
    //console.log("right racket : ", automaticRacketFlag, autoRightRacketY, ballY, diff); 
    if (diff < 0)
        diff = diff * -1;
    if (automaticRacketFlag)
        ballAngle = diff * 200 / autoRacketH;
    else
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
        if (Number.isNaN(adj))
            console.log("rr is adj");
        if (Number.isNaN(radAngle))
            console.log("rr is adj");
}

let calculateLeftBallRebound = () : void =>
{
    let diff : number;
    let adj : number;
    let radAngle : number;
    let tmpAngle : number ;
    
    if (automaticRacketFlag)
        diff = autoRacketY - ballY;
    else
        diff = castRrecY - ballY;   
    if (diff < 0)
        diff = diff * -1;
    if (automaticRacketFlag)
        ballAngle = diff * 200 / autoRacketH;
    else
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
    //console.log("data : ", tmpAngle, radAngle , ballAngle, diff, lrecH, adj)
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
        if (Number.isNaN(adj))
            console.log("at is adj");
        if (Number.isNaN(radAngle))
            console.log("at is adj");
}
let ii : number = 0;
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
    //console.log("Data : ",ballAngle,  radAngle, tmpAngle, ballSpeed);
    adj = ballSpeed * Math.tan(radAngle);
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
        //if (Number.isNaN(adj))
        //    console.log("on is adj");
        //if (Number.isNaN(radAngle))
        //    console.log("on is adj");
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
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY < 0)
            ballY = 0 + adj;
        else
            ballY += adj;
        //console.log("data : ", tmpAngle, radAngle , ballAngle, "diff", lrecH, adj)
        if (Number.isNaN(adj))
            console.log("upis adj");
        if (Number.isNaN(radAngle))
            console.log("upis adj");
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
        if (ballAngle > 100 && ballAngle < 200)
            tmpAngle = ballAngle - 100;
        else if (ballAngle >= 200 && ballAngle < 300)
            tmpAngle = ballAngle - 200;
        else if (ballAngle >= 300 && ballAngle < 400)
            tmpAngle = ballAngle - 300;
        else if (ballAngle >= 400)
            tmpAngle = ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY >= cnvHeight - (ballWH / 2))
            ballY = (cnvHeight - (ballWH / 2)) - adj;
        else
            ballY -= adj;
        //console.log("data : ", tmpAngle, radAngle , ballAngle, "diff", lrecH, adj)
        if (Number.isNaN(adj))
            console.log("dwis adj");
        if (Number.isNaN(radAngle))
            console.log("dwis adj");
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
        else if (ballDirection === false && ballLeftTan <= (autoRacketX + autoRacketW / 2) )
        {
            ballFirstMove = false; 
        }
        else if (ballDirection === true && ballRightTan >= (autoRightRacketX) )
        {
            ballFirstMove = false; 
        }
        if (ballDirection && ballX >= p5.width && ballY > castRrecY && ballY < castRrecY + rrecH)
            ballX = p5.width - rrecW + 1;
        if (!ballDirection && ballX <= 0 && ballY > castLrecY && ballY < castLrecY + lrecH)
            ballX = lrecW - 1;
        if (ballDirection && ballX <= 0 && ballY > autoRacketY && ballY < autoRacketY + autoRacketH)
            ballX = autoRacketW - 1;
        p5.ellipse(ballX, ballY, ballWH, ballWH);
    } 
    if (Number.isNaN(ballY))
        console.log(1);
    if (ballFirstMove === false)
    {
        if ((ballDirection && ballX > p5.width && (ballY < castRrecY || ballY > castRrecY + rrecH))
            || (!ballDirection && ballX <= 0 && (ballY < castLrecY || ballY > castLrecY + lrecH)) ||
            (automaticRacketFlag && !ballDirection && ballX <= 0 && (ballY < autoRacketY || ballY > autoRacketY + autoRacketH))
            || (automaticRacketFlag && ballDirection && ballX > p5.width - autoRightRacketW  && (ballY < autoRightRacketY || ballY > autoRightRacketY + autoRightRacketH)))
        {
            console.log("You lose : ", ballX, ballY, autoRacketY, autoRacketY + autoRacketH, randomRebound, autoRacketY + randomRebound);
            restart = true;
            ballFirstMove = true;
            first50Time = 0;
            ballDirection = undefined;
        }
        else if (ballDirection === true && ballRightTan >= rrecX && (ballY >= castRrecY && ballY <= castRrecY + rrecH))
        {
            if (Number.isNaN(ballY))
                console.log(2);
            calculateRightBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(20);
        }
        else if (ballDirection === true && ballRightTan >= (autoRightRacketX) && (ballY >= autoRightRacketY && ballY <= autoRightRacketY + autoRightRacketH))
        {
            if (Number.isNaN(ballY))
                console.log(2);
            calculateRightBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(20);
        }
        else if (ballDirection === false && ballLeftTan <= (lrecX + lrecW / 2) && (ballY >= castLrecY && ballY <= castLrecY + lrecH)) 
        {
            if (Number.isNaN(ballY))
                console.log(3);
            calculateLeftBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(30);
            //console.log("left re ", ballY);
        }
        else if (ballDirection === false && ballLeftTan <= (autoRacketX  + autoRacketW / 2) && (ballY >= autoRacketY && ballY <= autoRacketY + autoRacketH)) 
        {
            if (Number.isNaN(ballY))
                console.log(4);
            calculateLeftBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(40);
            //console.log("left re au ", ballY);
        }
        else if (ballTopTan > 0 && ballBottomTan < p5.height /*- ballWH / 2*/)
        {
            if (Number.isNaN(ballY))
                console.log(5);
            calculateBallOnSpace();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(50);
        }
        else if (ballTopTan <= 0 || ballBottomTan >= p5.height)
        {
            if (Number.isNaN(ballY))
                console.log(6);
            calculateTopAndBottomBallRebound();
            p5.ellipse(ballX, ballY, ballWH, ballWH);
            if (Number.isNaN(ballY))
                console.log(60);
            //console.log("up down ", ballY);
        }
        else
        {
            console.log("The bug : ", ballX, ballY, p5.width , p5.height, castLrecY, castLrecY + ballWH)
        }
    }
}

// Draw the ball 
let drawAndMoveTheBall = (p5 : p5Types) : void =>
{
    cnvHeight = p5.height;
    if (lrecY !== undefined)
        castLrecY = lrecY;
    if (automaticRacketFlag)
    {
        castLrecY = autoRacketY
    }
    if (rrecY !== undefined)
        castRrecY = rrecY
    if (first50Time < 50)
    {
        if (Number.isNaN(ballY))
            console.log(0);
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
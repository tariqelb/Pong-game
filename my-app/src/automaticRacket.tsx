import p5Types from 'p5';

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

let restartTwo : boolean = false;
let virtualLineX : number ;//in the case where the ball start go back to robot from player , virtua_line_X is a vertical line in the canvas where the robot start moving to reach the right point where the ball will hit in the robot wall when the ball pass the virtual line
let virtualLineSet : number; // virtual line set variable used to calculate the X coordinate of the virtual line for example 2 virtual line is in the middle 4 virtual line is in the third quarter of the canvas with
let virtualBallX : number;
let virtualBallY : number;
let virtualBallAngle : number;
let robotStartMoving : boolean = false; //set to true when the ball come from player and pass the virtual line, so robot racket need to start moving
let coordinateAlreadyGot : boolean = false;// already get the virtual coordinate of the ball;


let getCoordinates = (p5 : p5Types) : void =>
{
    let tempAngle   : number;
    let radAngle    : number;
    let adj         : number;
    virtualBallAngle = ballAngle;
    virtualBallX = ballX;
    virtualBallY = ballY;
    while (virtualBallX > 0)
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
        if (tempAngle === 100 || tempAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (virtualBallAngle < 100)
            virtualBallY -= adj;
        else if (virtualBallAngle >= 0 && ballAngle < 100)
            virtualBallY -= adj;
        else if (virtualBallAngle >= 100 && ballAngle < 200)
            virtualBallY += adj;
        else if (virtualBallAngle >= 200 && ballAngle < 300)
            virtualBallY += adj;
        else if (virtualBallAngle >= 300 && ballAngle <= 400)
            virtualBallY -= adj;
        if (ballDirection)
            virtualBallX += ballSpeed;
        else
            virtualBallX -= ballSpeed;
        if (virtualBallY <= 0 || (virtualBallY - ballWH) >= p5.height)
            //virtualBallUpbottomRebound(p5);
    }
    //if ()
}

let automaticRacket = (p5 : p5Types) : void =>
{
    if (!ballDirection)
    {
        if (!coordinateAlreadyGot && ballX < virtualLineX)
        {
            getCoordinates(p5);
            coordinateAlreadyGot = true;
        }
    }
}

export default automaticRacket;
export {restartTwo};
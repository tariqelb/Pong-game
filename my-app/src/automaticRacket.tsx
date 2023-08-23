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
import { canvasResizedHeight } from './mySketch';
import { canvasResizedWidth } from './mySketch';
import { animationData } from './animationOne';

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
let autoRightRacketX : number;
let autoRightRacketY : number;
let autoRightRacketH : number;
let autoRightRacketW : number;
let virtualBallAngle : number;
let robotStartMoving : boolean = false; //set to true when the ball come from player and pass the virtual line, so robot racket need to start moving
let coordinateAlreadyGot : boolean = false;// already get the virtual coordinate of the ball;
let rightCoordinateAlreadyGot : boolean = false;// already get the virtual coordinate of the ball;
let startSimulation : boolean = true;
let lastPossitionOfLeftAutoRectY : number ;
let lastPossitionOfRightAutoRectY : number ;
let rightRandomRebound : number; 
let randomRebound : number; //a distance added to the (up or bottom) of automatic racket where the ball will hit so we get a random rebound of the ball
                            // which point in the automatic racket will track ballY coordinate /
let edge : number = 6; // when i generate a number that will represent a point in autoracket that will track the ball this point should not be in the egde of autoracket 
                        // it should be between autoracket height - egde * 2 (|*_______*|) the asterisk is the edge and the pipe is the start and the end of the autoracket
let autoracketSpeed : number = 10; //the speed of autoRacket
let racketInitialPositionIsready : number = 0; // variable used to check in the start of each round the the two auturacket get his initial places

let rRacketDirection : boolean | undefined;
let lRacketDirection : boolean | undefined;

let virtualBallUpbottomRebound = (p5 : p5Types) : void =>
{
    let radAngle : number;
    let adj : number;
    let tempAngle : number;

    if (virtualBallY - virtualBallH <= 0)
    {
        if (virtualBallAngle >= 0 && virtualBallAngle <= 100)
        {
            virtualBallAngle += 100;

        }
        else if (virtualBallAngle >= 300 && virtualBallAngle <= 400)
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
        radAngle = tempAngle  * (Math.PI / 2 / 200);
        adj = ballSpeed * Math.tan(radAngle); 
        if (tempAngle === 100 || tempAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (ballY + ballWH / 2 < 0)
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
   
}

let getCoordinates = (p5 : p5Types) : void =>
{
    let tempAngle   : number;
    let radAngle    : number;
    let adj         : number;
    
    virtualBallAngle = ballAngle;
    virtualBallX = ballX;
    virtualBallY = ballY;
    virtualBallW = ballWH;
    virtualBallH = ballWH;
    let i : number = 0;
    while ((virtualBallX  > autoRacketW)&& !ballDirection)
    {
        if (virtualBallY - virtualBallH / 2 > 0 &&  virtualBallY + virtualBallH / 2 < p5.height)
        {
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
            {
                virtualBallX += ballSpeed;
            }    
            else
            {
                virtualBallX -= ballSpeed;
            }
        }
       
        else if (virtualBallY - ballWH <= 0 || (virtualBallY + ballWH) >= p5.height)
        {
            if (virtualBallY < 0)
                virtualBallY = 0;
            if (virtualBallY > p5.height - virtualBallH / 2)
                virtualBallY = p5.height - virtualBallH / 2;
            virtualBallUpbottomRebound(p5);       
        }   
    }
    while ((virtualBallX  < autoRightRacketX)&& ballDirection)
    {
        if (virtualBallY - virtualBallH / 2 > 0 &&  virtualBallY + virtualBallH / 2 < p5.height)
        {
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
            {
                virtualBallX += ballSpeed;
            }    
            else
            {
                virtualBallX -= ballSpeed;
            }
        }  
        else if (virtualBallY - ballWH <= 0 || (virtualBallY + ballWH) >= p5.height)
        {
            if (virtualBallY < 0)
                virtualBallY = 0;
            if (virtualBallY > p5.height - virtualBallH / 2)
                virtualBallY = p5.height - virtualBallH / 2;
            virtualBallUpbottomRebound(p5);   
               
        }     
    }
    if (virtualBallX < 0)
        virtualBallX = 0;
    if (virtualBallX > p5.width)
        virtualBallX = p5.width;  
    if (ballDirection)
    {
        if (virtualBallY > autoRightRacketY)
            rRacketDirection = true;
        else
            rRacketDirection = false; 
    }
    if (!ballDirection)
    {
        if (virtualBallY > autoRacketY)
            lRacketDirection = true;
        else
            lRacketDirection = false;
    }
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
    racketInitialPositionIsready++;
    if (racketInitialPositionIsready == 2)
        startSimulation = false;
    lastPossitionOfLeftAutoRectY = autoRacketY;
    console.log("new start");
}

let drawAutoInitRightRacket = (p5 : p5Types ) : void =>
{
    autoRightRacketW = (p5.width / 80); 
    autoRightRacketH = (p5.height / 4);
    autoRightRacketX = p5.width - autoRightRacketW; 
    autoRightRacketY = (p5.height / 2) - (autoRightRacketH / 2); 

    virtualBallH = ballWH
    virtualBallW = ballWH;
    virtualBallX = ballX;
    virtualBallY = ballY;
    p5.rect(autoRightRacketX, autoRightRacketY , autoRightRacketW,  autoRightRacketH);
    racketInitialPositionIsready++;
    if (racketInitialPositionIsready == 2)
    startSimulation = false;
    lastPossitionOfRightAutoRectY = autoRightRacketY;
    console.log("new start");
}


let drawAutomaticRacket = (p5 : p5Types) : void =>
{

    if (startSimulation === true)
    {
        drawAutoInitLeftRacket(p5);
    }
    else if (coordinateAlreadyGot && (animationData.player == undefined || animationData.player == true))
    {
        if (p5.height !== canvasResizedHeight || p5.width !== canvasResizedWidth)
        {
            autoRacketH = (p5.height / 4);
            autoRacketX = 0; 
            autoRacketW = (p5.width / 80); 
            autoRacketY = lastPossitionOfLeftAutoRectY; 
        }
        if (lRacketDirection === false)
        {
            if (autoRacketY + randomRebound >= virtualBallY)// && autoRacketY + autoRacketH > virtualBallY)
                autoRacketY -= autoracketSpeed;
            else
            {
                let diff = autoRacketY + randomRebound - virtualBallY;
                autoRacketY = autoRacketY - diff;
                lRacketDirection = undefined;
            }
        }
        else if (lRacketDirection === true)// -+ 1 to move a little bit from the edge
        {
            if (autoRacketY + randomRebound <= virtualBallY)// && autoRacketY + autoRacketH < virtualBallY)
                autoRacketY += autoracketSpeed;
            else
            {
                let diff = virtualBallY - (autoRacketY + randomRebound);
                autoRacketY = autoRacketY + diff;
                lRacketDirection = undefined;
            }
        }
        if (autoRacketY < 0)
            autoRacketY = 0;
        else if (autoRacketY + autoRacketH > p5.height)
            autoRacketY = p5.height - autoRacketH;
        p5.rect(autoRacketX, autoRacketY, autoRacketW,  autoRacketH);
        lastPossitionOfLeftAutoRectY = autoRacketY;
    }
    if (animationData.player === false)
    {
        p5.fill('red');
        p5.rect(autoRacketX, lastPossitionOfLeftAutoRectY , autoRacketW,  autoRacketH);
        p5.fill('white');
    }
    else
        p5.rect(autoRacketX, lastPossitionOfLeftAutoRectY , autoRacketW,  autoRacketH);
}

let drawAutomaticRightRacket = (p5 : p5Types) : void =>
{
    if (startSimulation === true)
    {
        drawAutoInitRightRacket(p5);
    }
    else if (rightCoordinateAlreadyGot && (animationData.player == undefined || animationData.player == false))
    {
        if (p5.height !== canvasResizedHeight || p5.width !== canvasResizedWidth)
        {
            autoRightRacketW = (p5.width / 80); 
            autoRightRacketH = (p5.height / 4);
            autoRightRacketX = p5.width - autoRightRacketW; 
            autoRightRacketY = lastPossitionOfRightAutoRectY; 
        }
        //if (autoRightRacketY + rightRandomRebound > virtualBallY && rRacketDirection == false)
        if (rRacketDirection == false)
        {
            if (autoRightRacketY + rightRandomRebound >= virtualBallY)// && autoRightRacketY + autoRightRacketH - 10 > virtualBallY)
                autoRightRacketY -= autoracketSpeed;
            else
            {
                let diff = autoRightRacketY + rightRandomRebound - virtualBallY;
                autoRightRacketY = autoRightRacketY - diff;
                rRacketDirection = undefined;
            }

        }
        else if (rRacketDirection == true)// -+ 1 to move a little bit from the edge
        {
            if (autoRightRacketY + rightRandomRebound <= virtualBallY)// && autoRightRacketY + autoRightRacketH - 10 < virtualBallY)
                autoRightRacketY += autoracketSpeed;
            else
            {
                let diff = virtualBallY - (autoRightRacketY + rightRandomRebound);
                autoRightRacketY = autoRightRacketY + diff;
                rRacketDirection = undefined;
            }
        }
        if (autoRightRacketY < 0)
            autoRightRacketY = 0;
        else if (autoRightRacketY + autoRightRacketH > p5.height)
            autoRightRacketY = p5.height - autoRightRacketH;
        p5.rect(autoRightRacketX, autoRightRacketY, autoRightRacketW,  autoRightRacketH);
        lastPossitionOfRightAutoRectY = autoRightRacketY;
    }
    if (animationData.player === true)
    {
        p5.fill('red');
        p5.rect(autoRightRacketX, lastPossitionOfRightAutoRectY , autoRightRacketW,  autoRightRacketH);
        p5.fill('white');
    }
    else
        p5.rect(autoRightRacketX, lastPossitionOfRightAutoRectY , autoRightRacketW,  autoRightRacketH);
}
let automaticRacket = (p5 : p5Types) : void =>
{
   
    if (restart)
    {
        startSimulation = true;
        coordinateAlreadyGot = false;
        console.log("start again------------------>");
        racketInitialPositionIsready = 0;
    }
    drawAutomaticRacket(p5);
    drawAutomaticRightRacket(p5);
    
    if (ballDirection === false)// || ballDirection === undefined)
    {
        if (coordinateAlreadyGot == false)// && ballX < virtualLineX)
        {
            getCoordinates(p5);
            coordinateAlreadyGot = true;
            randomRebound = Math.floor(Math.random() * (autoRacketH - edge)) + edge;// move the random from the corners
        }
        else
        {
            p5.fill('red');
            p5.ellipse(virtualBallX , virtualBallY, virtualBallH, virtualBallW);
            p5.fill('white');
        }
    }
    else
    {
        coordinateAlreadyGot = false;
    }
    if (ballDirection === true)
    {
        if (rightCoordinateAlreadyGot === false)
        {
            getCoordinates(p5);
            rightCoordinateAlreadyGot = true;
            rightRandomRebound = Math.floor(Math.random() * (autoRacketH - 2)) + 2;// move the random from the corners
        }
        else
        {
            p5.fill('yellow')
            p5.ellipse(virtualBallX , virtualBallY, virtualBallH, virtualBallW);
            p5.fill('white');
        }
    }
    else
    {
        rightCoordinateAlreadyGot = false;
    }
}

export default automaticRacket;
export {autoRacketX};
export {autoRacketY};
export {autoRacketW};
export {autoRacketH};
export {autoRightRacketX};
export {autoRightRacketY};
export {autoRightRacketW};
export {autoRightRacketH};
export {restartTwo};
export {randomRebound};
export {rightRandomRebound};
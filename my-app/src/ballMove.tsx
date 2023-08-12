import p5Types from 'p5';
import MySketch  from './mySketch';

import {cnv as gCnv}  from './mySketch'; 
import {PlayWithMouse as gPlayWithMouse} from './mySketch';
import {keyIspress as gKeyIspress} from './mySketch';
import {speed as gSpeed} from './mySketch';
import {gameBorederPixel as gGameBorederPixel} from './mySketch';
import {fistMouseMove as gFistMouseMove} from './mySketch';
import {lastPossitionOfRectY as gLastPossitionOfRectY} from './mySketch'; 
import {ballX as gBallX} from './mySketch';
import {ballY as gBallY} from './mySketch';
import {ballWH as gBallWH} from './mySketch'; 



let ballMove =  (p5 : p5Types) : void =>
{
    let cnv  : p5Types.Renderer = gCnv; 
    let PlayWithMouse : boolean = gPlayWithMouse;
    let keyIspress : boolean = gKeyIspress;
    let speed : number = gSpeed;
    let gameBorederPixel : number = gGameBorederPixel;
    let fistMouseMove : boolean = gFistMouseMove;
    let lastPossitionOfRectY : number = gLastPossitionOfRectY;
    let ballX : number = gBallX;
    let ballY : number = gBallY;
    let ballWH : number = gBallWH; 

    //console.log("Draw ball movement", currentMouseX);
    
}



export default ballMove;
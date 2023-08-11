import p5Types from 'p5';
import MySketch  from './mySketch';

import {cnv as gCnv}  from './mySketch'; 
import {p5Cpy as gP5Cpy} from './mySketch';
import {PlayWithMouse as gPlayWithMouse} from './mySketch';
import {keyIspress as gKeyIspress} from './mySketch';
import {X0 as gX0} from './mySketch';
import {Y0 as gY0} from './mySketch';

import {speed as gSpeed} from './mySketch';

import {canvasWidth as gCanvasWidth} from './mySketch'; 
import {canvasHeight as gCanvasHeight} from './mySketch';
import {gameBorederPixel as gGameBorederPixel} from './mySketch';

import {fistMouseMove as gFistMouseMove} from './mySketch';
import {previewsMouseX as gPreviewsMouseX} from './mySketch';
import {previewsMouseY as gPreviewsMouseY} from './mySketch';
import {currentMouseX as gCurrentMouseX} from './mySketch';
import {currentMouseY as gCurrentMouseY} from './mySketch';
import {lastPossitionOfRectY as gLastPossitionOfRectY} from './mySketch'; 

import {ballX as gBallX} from './mySketch';
import {ballY as gBallY} from './mySketch';
import {ballWH as gBallWH} from './mySketch'; 



let ballMove =  (p5 : p5Types) : void =>
{
    let cnv  : p5Types.Renderer = gCnv; 
    let p5Cpy : p5Types = gP5Cpy;
    let PlayWithMouse : boolean = gPlayWithMouse;
    let keyIspress : boolean = gKeyIspress;
    let X0 : number = gX0;
    let Y0 : number = gY0;

    let speed : number = gSpeed;

    let canvasWidth : number = gCanvasWidth;
    let canvasHeight : number = gCanvasHeight;
    let gameBorederPixel : number = gGameBorederPixel;

    let fistMouseMove : boolean = gFistMouseMove;
    let previewsMouseX : number = gPreviewsMouseX;
    let previewsMouseY : number = gPreviewsMouseY;
    let currentMouseX : number = gCurrentMouseX;
    let currentMouseY : number = gCurrentMouseY;
    let lastPossitionOfRectY : number = gLastPossitionOfRectY;


    let ballX : number = gBallX;
    let ballY : number = gBallY;
    let ballWH : number = gBallWH; 

    //console.log("Draw ball movement", currentMouseX);
    
}



export default ballMove;
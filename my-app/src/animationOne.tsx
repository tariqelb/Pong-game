import p5Types from 'p5';
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
import { flagImage } from './mySketch';
import { chainImage } from './mySketch';

let animationData : 
{
    rotateAngle : number ,
    lightFlash : number  ,
    animOneX : number ,
    animOneY : number ,
    animOneWH : number ,
    animOne : boolean | undefined
} = 
{
    rotateAngle : 0,
    lightFlash : 0,
    animOneX : 0,
    animOneY : 0,
    animOneWH : 0,
    animOne : false

};


let rotate = (p5 : p5Types) =>
{
    p5.push();
    //p5.rectMode('center');
    //p5.translate(p5.width / 2, p5.height / 2);
    //p5.angleMode('degrees');
    //p5.rotate(rotateAngle);
    //p5.circle(40, 40, p5.height / 18);
    //p5.scale(1 , -1)
    
    p5.pop()
    animationData.animOneX =  p5.width / 2 - (p5.height / 8 / 2) - 5;
    animationData.animOneY = p5.height / 2 - (p5.height / 8 / 2) - 5;
    animationData.animOneWH =  p5.height / 8 + 10;
    if (animationData.lightFlash < 20)
    {
        animationData.lightFlash++;
        p5.fill('gray');   
        p5.square(p5.width / 2 - (p5.height / 8 / 2) - 5, p5.height / 2 - (p5.height / 8 / 2) - 5, p5.height / 8 + 10);
        if (animationData.lightFlash === 40)
            animationData.lightFlash = 0;
    }
    else 
    {
        animationData.lightFlash++;
        p5.fill('blue');
        p5.square(p5.width / 2 - (p5.height / 8 / 2) - 5 , p5.height / 2 - (p5.height / 8 / 2) - 5, p5.height / 8 + 10);
        if (animationData.lightFlash === 40)
            animationData.lightFlash = 0;
    }
    p5.fill('white');
    p5.fill(255, 255, 100);
    p5.square(p5.width / 2 - (p5.height / 8 / 2), p5.height / 2 - (p5.height / 8 / 2), p5.height / 8);
    p5.fill('white');
    //p5.strokeWeight(2);
    //p5.stroke('white')
    //p5.strokeWeight(2);
    animationData.rotateAngle += 1;
    if (animationData.rotateAngle === 360)
        animationData.rotateAngle = 0;
    if (chainImage)
        p5.image(chainImage, p5.width / 2 - ((p5.width / 15) / 2) , p5.height / 2 - (p5.height / 8 / 2), p5.width / 15, p5.width / 15 );

}

let crt = (p5 : p5Types) =>
{
    if (animationData.animOne)
    {
        p5.stroke(60);
        p5.strokeWeight(10)
        p5.line(0,autoRacketY,p5.width / 2,p5.height / 2);   
        p5.strokeWeight(0);
    }
}

let animationOne = (p5 : p5Types) : void =>
{
    if (animationData.animOne === false)
        rotate(p5);
    else if (animationData.animOne === true) 
        crt(p5);

}

export default animationOne;
export {animationData};
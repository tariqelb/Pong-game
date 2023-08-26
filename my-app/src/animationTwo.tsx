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
import { ballDirection, ballX , ballY} from './ballMove';
import { expandImage } from './mySketch';
import animation from './animation';


let animationTwo = (p5 : p5Types, animTwo : animation) : void =>
{
    console.log("animation Two called");
    if (animTwo.animState === false)
    {
        if (animTwo.animImage === null)
            animTwo.animImage = expandImage;
        animTwo.getRandomPosition(p5);
        console.log("here , ", animTwo.animState);
        animTwo.animState = true;
    }
    if (animTwo.animState)
    {
        if (animTwo.animLightFlash < 20)
        {
            p5.fill('grey');
            p5.rect(animTwo.animX - 5, animTwo.animY - 5, animTwo.animWH + 10);
            animTwo.animLightFlash++;
        }
        if (animTwo.animLightFlash >= 20)
        {
            p5.fill('blue');
            p5.rect(animTwo.animX - 5, animTwo.animY - 5, animTwo.animWH + 10);
            animTwo.animLightFlash++;
            if (animTwo.animLightFlash === 40)
                animTwo.animLightFlash = 0;
        }
        p5.fill('red');
        p5.rect(animTwo.animX, animTwo.animY, animTwo.animWH);
        p5.fill('white');
        console.log("u shuld see it", animTwo.animX, animTwo.animY, animTwo.animWH);
        if (animTwo.animImage)
            p5.image(animTwo.animImage, animTwo.animX, animTwo.animY, p5.width / 15, p5.width / 15)
    }
    if (animTwo.animActive && animTwo.activeEffect(ballX, ballY, ballDirection))
        console.log ("active Your animation");

}
export default animationTwo;
import p5Types from 'p5';
import animation from './animation';
/*import {lastPossitionOfRightRectY} from './mySketch'; 
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
//import { flagImage } from './mySketch';
//import { chainImage } from './mySketch';
import { ballDirection } from './ballMove';

*/


/*
let rotate = (p5 : p5Types) : void  =>
{
    animationData.animOneX =  p5.width / 2 - (p5.height / 8 / 2) - 5;
    animationData.animOneY = p5.height / 2 - (p5.height / 8 / 2) - 5;
    animationData.animOneWH =  p5.height / 8 + 10;
    if (animationData.lightFlash < 20)
    {
        animationData.lightFlash++;
        p5.fill('gray');   
        p5.square(animationData.animOneX, animationData.animOneY, animationData.animOneWH);
        if (animationData.lightFlash === 40)
            animationData.lightFlash = 0;
    }
    else 
    {
        animationData.lightFlash++;
        p5.fill('blue');
        p5.square(animationData.animOneX , animationData.animOneY, animationData.animOneWH);
        if (animationData.lightFlash === 40)
            animationData.lightFlash = 0;
    }
    p5.fill('white');
    p5.fill(255, 255, 100);
    p5.square(p5.width / 2 - (p5.height / 8 / 2), p5.height / 2 - (p5.height / 8 / 2), p5.height / 8);
    p5.fill('white');
    //if (chainImage)
    //    p5.image(chainImage, p5.width / 2 - ((p5.width / 15) / 2) , p5.height / 2 - (p5.height / 8 / 2), p5.width / 15, p5.width / 15 );

}

let crt = (p5 : p5Types) =>
{
    if (!animationData.player)
    {
        //let text : string = "The left Racket is blocked HIHI";
        //p5.textSize(32);
        //p5.text(text, autoRacketX + autoRacketW, 30);
        p5.stroke(255, 0 , 0);
        p5.strokeWeight(5)
        //p5.fill('red');
        //p5.curve(0, 0, p5.width / 2 , p5.height / 2, autoRacketW, autoRacketY + autoRacketH / 2, p5.width, p5.height);
        p5.curve(p5.width , p5.height, p5.width / 2 , p5.height / 2, autoRacketW, autoRacketY + autoRacketH / 2, 0, 0);
        p5.strokeWeight(0);
        p5.stroke(0);
        p5.fill('white');
    }
    if (animationData.player)
    {
        //let text : string = "The right Racket is blocked HIHI";
        //p5.textSize(32);
        //p5.text(text, autoRacketX + autoRacketW, 30);
        p5.stroke(255 , 0 , 0);
        p5.strokeWeight(5)
        //p5.fill('red');
        p5.curve(0, 0, p5.width / 2, p5.height / 2, autoRightRacketX, autoRightRacketY  + autoRightRacketH / 2, p5.width, p5.height); 
        p5.strokeWeight(0);
        p5.stroke(0);
        p5.fill('white');

    }
}

let animationOne = (p5 : p5Types) : void =>
{
    p5.noFill();
    p5.stroke(12);
    if (animationData.animOne === false)
        rotate(p5);
    else if (animationData.animOne === true) 
        crt(p5);
    if (animationData.chances >= 2)
    {
        animationData.animOne = false; 
        animationData.player = undefined;
        animationData.chances = 0;
    }
    let text : string = "The left Racket is blocked HIHI";
    p5.textSize(32);
    p5.text(text, 20, 30);

}

export default animationOne;
export {animationData};*/
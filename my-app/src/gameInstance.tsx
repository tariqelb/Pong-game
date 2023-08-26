import p5Types from 'p5';
import Ball from './ball'
import Racket from './Racket';


class Game
{
    constructor (p5Instance : p5Types) 
    {
        this.p5 = p5Instance;
        this.canvasResizedHeight = this.p5.height;
        this.canvasResizedWidth = this.p5.width;
        //this.cnv =  
    }

    p5 : p5Types ;
    cnv : p5Types.Renderer | null = null;
    modeOfLeftRacket : boolean | undefined = undefined;
    modeOfRightRacket : boolean | undefined = undefined;
    gameBordersPixel : number = 15;
    canvasPranetDiv : p5Types.Element | null = null;
    canvasResizedWidth : number;
    canvasResizedHeight : number;
    ball : Ball = new Ball()
    leftRacket : Racket | null = null;
    rightRacket : Racket | null = null;
}

export default Game;
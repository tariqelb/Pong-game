import p5Types from 'p5';
import Ball from './ball'
import Racket from './racket';


class Game
{
    constructor (p5Instance : p5Types) 
    {
        this.p5 = p5Instance;
        this.canvasResizedHeight = this.p5.height;
        this.canvasResizedWidth = this.p5.width;
        this.leftRacket = new Racket(this, undefined, false);
        this.rightRacket = new Racket(this, undefined, true);
        this.ball = new Ball(this);
    }
    
    p5 : p5Types ;
    cnv : p5Types.Renderer | null = null;
    canvasPranetDiv : p5Types.Element | null = null;
    gameBordersPixel : number = 15;
    canvasResizedWidth : number;
    canvasResizedHeight : number;
    leftRacket : Racket;
    rightRacket : Racket;
    modeOfLeftRacket : boolean | undefined = undefined;
    modeOfRightRacket : boolean | undefined = undefined;
    ball : Ball;
    leftPlayerGoals : number = 0;
    rightPlayerGoals : number = 0;
    goalRestart : boolean = false;
}

export default Game;
import p5Types from 'p5';
import Ball from './ball'
import Racket from './racket';
import animation from './animation';

class Game
{
    constructor (p5Instance : p5Types) 
    {
        this.p5 = p5Instance;
        this.canvasResizedHeight = this.p5.height;
        this.canvasResizedWidth = this.p5.width;
        this.leftRacket = new Racket(null, undefined, false);
        this.rightRacket = new Racket(null, undefined, true);
        this.ball = new Ball(this.leftRacket, this.rightRacket);
        this.anim = new animation(this);
    }
    
    loading : boolean = true;
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
    anim : animation;
}

export default Game;
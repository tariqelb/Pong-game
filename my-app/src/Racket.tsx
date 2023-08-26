import p5Types from 'p5';
import Game from './gameInstance'

class Racket extends Game
{

    constructor (game : Game, racketMode : boolean | undefined, racketSide : boolean) 
    {
        super(game.p5);
        this.racketModes = racketMode;
        this.racketSides = racketSide;
        this.racketSpeed = this.p5.height / 40;
        this.cnv = game.cnv;
    };

    racketH : number = 0;
    racketW : number = 0;
    racketX : number = 0;
    racketY : number | undefined = undefined;
    lastPositionOfRacketY : number = 0;
    firstMouseMove : boolean = true;
    racketSpeed : number;
    racketModes : boolean | undefined;
    racketSides : boolean;

    keyIsPress : boolean = false;
    //mouseIsMoved : boolean = false;

    virtualBallX : number = 0;
    virtualBallY : number = 0;
    virtualBallH : number = 0;
    virtualBallW : number = 0;

    drawKeyBoardInitRacket()
    {
        if (this.racketSides === true)
            this.racketX = (this.p5.width) - (this.p5.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (this.p5.height / 4);
        this.racketW = (this.p5.width / 80); 
        this.racketY = (this.p5.height / 2) - (this.racketH / 2); 
        this.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
        this.keyIsPress = true;
        this.lastPositionOfRacketY = this.racketY;
    }

    MoveRacketWithKeyBoard ()
    {
        if (this.racketSides === true)
            this.racketX = (this.p5.width) - (this.p5.width / 80); 
        else
            this.racketX = 0; 
        this.racketW = (this.p5.width / 80); 
        this.racketH = (this.p5.height / 4); 
        this.racketY = undefined;
        
        if (this.p5.keyIsPressed)
        {
            if ((this.p5.keyCode === 40 || this.p5.keyCode === 38) && this.lastPositionOfRacketY === undefined) // first time press arrow key
            {
            if (this.p5.keyCode === 40)
                this.racketY = ((this.p5.height / 2) - (this.racketH / 2)) + this.racketSpeed; 
            else
                this.racketY = ((this.p5.height / 2) - (this.racketH / 2)) - this.racketSpeed;
            }
            else if ((this.p5.keyCode === 40 || this.p5.keyCode === 38) && this.lastPositionOfRacketY !== undefined)
            {
                if (this.p5.keyCode === 40)
                    this.racketY = this.lastPositionOfRacketY + this.racketSpeed;
                else
                    this.racketY = this.lastPositionOfRacketY - this.racketSpeed;
            }
        }
        else if (this.lastPositionOfRacketY === undefined) // press other key in the first time
            this.racketY  = (this.p5.height / 2) - (this.racketH / 2);
        else
            this.racketY = this.lastPositionOfRacketY;
        if (this.racketY === undefined)
            this.p5.rect(this.racketX, this.lastPositionOfRacketY , this.racketW, this.racketH);
        else
        {
            if (this.racketY < 0)
            {
                this.p5.rect(this.racketX, 0 , this.racketW,  this.racketH);
                this.racketY = 0;
            }
            else if (this.racketY >= (this.p5.height - this.racketH))
            {
                this.p5.rect(this.racketX, (this.p5.height - this.racketH) , this.racketW,  this.racketH);
                this.racketY = (this.p5.height - this.racketH);
            }
            else
                this.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
        }
        if (this.racketY !== undefined)
            this.lastPositionOfRacketY = this.racketY;
    }

    drawAndMoveRightRacketWithMouse()
    {
        if (this.racketSides === true)
            this.racketX = (this.p5.width) - (this.p5.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (this.p5.height / 4); //the height of the racket
        this.racketW = (this.p5.width / 80); //the width of the racket
        if (this.racketY === undefined)
        { 
            this.racketY = (this.p5.height / 2) - this.racketH / 2;
            this.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
        }
        else
        {
            let mY = this.p5.constrain(this.p5.mouseY, 0, this.p5.height - this.racketH);//mY is mouse Y coordinate after constrain
            if (this.p5.mouseX > 0 && this.p5.mouseX < this.p5.width)
            {
                if (this.lastPositionOfRacketY === this.p5.height - this.racketH && mY === 0)
                this.racketY = this.lastPositionOfRacketY;
                else if (this.lastPositionOfRacketY === 0 && mY === this.p5.height - this.racketH)
                this.racketY = this.lastPositionOfRacketY;
                else
                this.racketY = mY; 
                this.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
            }
            else
                this.p5.rect(this.racketX, this.lastPositionOfRacketY , this.racketW,  this.racketH);
        }
        if (this.racketY !== undefined)
            this.lastPositionOfRacketY = this.racketY;
    }


}



export default Racket;
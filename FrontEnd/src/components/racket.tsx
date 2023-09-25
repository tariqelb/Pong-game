import Game from './gameInstance'

class Racket
{

    constructor (game : Game, racketMode : boolean | undefined = undefined, racketSide : boolean) 
    {
        this.game = game;
        this.racketModes = racketMode;
        this.racketSides = racketSide;
        this.racketSpeed = this.game.p5.height / 40;
    };
    game : Game;
    racketH : number = 0;
    racketW : number = 0;
    racketX : number = 0;
    racketY : number = -100;
    lastPositionOfRacketY : number = 0;
    firstMouseMove : boolean = true;
    racketSpeed : number;
    racketModes : boolean | undefined;
    racketSides : boolean;

    keyIsPress : boolean = false;
    //mouseIsMoved : boolean = false;

    virtualBallX : number = 0;
    virtualBallY : number = 0;
    virtualBallWH : number = 0;
    virtualBallA : number = 0;
    virtualBallS : number = 0;

    startOfSimulation : boolean = true;
    randomRebound : number = 0;
    coordinateAlreadyGot : boolean = false;
    racketVibrationUpDown : boolean | undefined = undefined;
    edge : number = 10;
    steps : number = 0;

    drawKeyBoardInitRacket()
    {
        if (this.racketSides)
            this.game.p5.fill('blue')
        else
            this.game.p5.fill('green')
        if (this.racketSides === true)
            this.racketX = (this.game.p5.width) - (this.game.p5.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (this.game.p5.height / 4);
        this.racketW = (this.game.p5.width / 80); 
        this.racketY = (this.game.p5.height / 2) - (this.racketH / 2); 
        this.game.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
        this.keyIsPress = true;
        this.startOfSimulation = false;
        this.lastPositionOfRacketY = this.racketY;
        if (this.racketSpeed === 0)
            this.racketSpeed = this.game.p5.height / 40;
        this.game.p5.fill('white')
    }

    MoveRacketWithKeyBoard ()
    {
        if (this.racketSides)
            this.game.p5.fill('blue')
        else
            this.game.p5.fill('green')
        if (this.keyIsPress === false)
        {
            if (this.racketSides === true)
                this.racketX = (this.game.p5.width) - (this.game.p5.width / 80); 
            else
                this.racketX = 0; 
            this.racketW = (this.game.p5.width / 80); 
            this.racketH = (this.game.p5.height / 4);
            this.racketY = (this.game.p5.height / 2) - (this.racketH / 2);
            this.lastPositionOfRacketY = this.racketY;
            this.keyIsPress = true;
            this.game.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
            if (this.racketSpeed === 0)
                this.racketSpeed = this.game.p5.height / 40;
        }
        if (this.game.p5.keyIsPressed && (this.game.p5.keyCode === 40 || this.game.p5.keyCode === 38))
        {
            if ((this.game.p5.keyCode === 40 || this.game.p5.keyCode === 38))
            {
                if (this.game.p5.keyCode === 40)
                    this.racketY = this.lastPositionOfRacketY + this.racketSpeed;
                else
                    this.racketY = this.lastPositionOfRacketY - this.racketSpeed;
                if (this.racketY < 0)
                    this.racketY = 0;
                else if (this.racketY >= (this.game.p5.height - this.racketH))
                    this.racketY = (this.game.p5.height - this.racketH);
                this.game.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
                this.lastPositionOfRacketY = this.racketY;
            }
        }
        else
            this.game.p5.rect(this.racketX, this.lastPositionOfRacketY , this.racketW,  this.racketH);
        this.game.p5.fill('white')
    }

    drawAndMoveRacketWithMouse()
    {
        if (this.racketSides)
            this.game.p5.fill('blue')
        else
            this.game.p5.fill('green')
        if (this.racketSides === true)
            this.racketX = (this.game.p5.width) - (this.game.p5.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (this.game.p5.height / 4);
        this.racketW = (this.game.p5.width / 80);
        if (this.racketY === -100)
        { 
            this.racketY = (this.game.p5.height / 2) - this.racketH / 2;
            this.game.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
        }
        else
        {
            let mY = this.game.p5.constrain(this.game.p5.mouseY, 0, this.game.p5.height - this.racketH);//mY is mouse Y coordinate after constrain
            if (this.game.p5.mouseX > 0 && this.game.p5.mouseX < this.game.p5.width)
            {
                if (this.lastPositionOfRacketY === this.game.p5.height - this.racketH && mY === 0)
                    this.racketY = this.lastPositionOfRacketY;
                else if (this.lastPositionOfRacketY === 0 && mY === this.game.p5.height - this.racketH)
                    this.racketY = this.lastPositionOfRacketY;
                else
                    this.racketY = mY; 
                this.game.p5.rect(this.racketX, this.racketY , this.racketW,  this.racketH);
            }
            else
                this.game.p5.rect(this.racketX, this.lastPositionOfRacketY , this.racketW,  this.racketH);
        }
        this.lastPositionOfRacketY = this.racketY;
        this.game.p5.fill('white')
    }

    drawAutomaticRacket()
    {
        if (this.racketSides)
            this.game.p5.fill('blue');
        else
            this.game.p5.fill('green');
        if (this.startOfSimulation === true)
            this.drawKeyBoardInitRacket();
        else if (this.coordinateAlreadyGot)
        {
            if (this.game.p5.height !== this.game.canvasResizedHeight || this.game.p5.width !== this.game.canvasResizedWidth)
            {
                this.racketH = (this.game.p5.height / 4);
                this.racketW = (this.game.p5.width / 80); 
                this.racketY = this.lastPositionOfRacketY; 
                if (this.racketSides)
                    this.racketX = (this.game.p5.width) - (this.game.p5.width / 80);  
                else
                    this.racketX = 0; 
            }
            if (this.racketVibrationUpDown === false)
            {
                if (this.steps < 80)
                {
                    if (this.steps % 2)
                        this.racketY -= this.racketSpeed;
                    this.steps++;
                }
            }
            else if (this.racketVibrationUpDown === true)
            {

                if (this.steps < 80)
                {
                    if (this.steps % 2)
                        this.racketY += this.racketSpeed;
                    this.steps++;
                }
            }
            if (this.racketY < 0)
                this.racketY = 0;
            else if (this.racketY + this.racketH > this.game.p5.height)
                this.racketY = this.game.p5.height - this.racketH;
            this.game.p5.rect(this.racketX, this.racketY, this.racketW, this.racketH);
            this.lastPositionOfRacketY = this.racketY;
        }
     
            this.game.p5.rect(this.racketX, this.lastPositionOfRacketY , this.racketW,  this.racketH);
        this.game.p5.fill('white');
    }
    
    automaticRacket()
    {
        if (this.game.goalRestart)
        {
            this.startOfSimulation = true;
            this.coordinateAlreadyGot = false;
            //console.log("start again------------------>");
            //this.racketInitialPositionIsready = 0;
        }
        this.drawAutomaticRacket();
        
        if ((this.game.playerNumber === 1 && this.game.ball.ballDirection === true ) || (this.game.playerNumber === 2 && this.game.ball.ballDirection === true))
        {
            if (this.coordinateAlreadyGot === false)
            {
                this.coordinateAlreadyGot = true;
                this.randomRebound = Math.floor(Math.random() * (this.racketH - this.edge)) + this.edge;
                this.getCoordinates();
            }
            else
            {
                if (this.game.playerNumber === 1)
                    this.game.p5.fill('red');
                else
                    this.game.p5.fill('green');
                this.game.p5.circle(this.virtualBallX , this.virtualBallY, this.virtualBallWH);
                this.game.p5.fill('white');
            }
        }
        else
        {
            this.coordinateAlreadyGot = false;
        }
    }


    virtualBallUpbottomRebound()
    {
        if ((this.virtualBallY - (this.virtualBallWH / 2)) <= 0)
        {
            if (this.virtualBallA >= 0 && this.virtualBallA <= 100)
            {
                this.virtualBallA += 100;
            }
            else if (this.virtualBallA >= 300 && this.virtualBallA <= 400)
            {
                this.virtualBallA -= 100;
            }
            this.virtualBallY = this.virtualBallWH / 2 + 2;
        }
        else if ((this.virtualBallY + (this.virtualBallWH / 2)) >= 200/*this.game.p5.height*/)
        {
            if (this.virtualBallA >= 200 && this.virtualBallA <= 300)
            {
                this.virtualBallA += 100;
            }
            else if (this.virtualBallA >= 100 && this.virtualBallA < 200)
            {
                this.virtualBallA -= 100;
            }
            this.virtualBallY = (200/*this.game.p5.height*/ - (this.virtualBallWH / 2)) - 2;
        }
    }

    getCoordinates ()
    {
        while ((this.virtualBallX  < 395))//this.racketX))// && this.game.ball.ballDirection)
        {
            if (this.virtualBallY - this.virtualBallWH / 2 > 0 &&  this.virtualBallY + this.virtualBallWH / 2 < 200/*this.game.p5.height*/)
            {

                let adj : number;
                let radAngle : number;
                let tmpAngle: number;
        
                tmpAngle = this.virtualBallA;
                if (this.virtualBallA > 100 && this.virtualBallA < 200)
                    tmpAngle = this.virtualBallA - 100;
                else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                    tmpAngle = this.virtualBallA - 200;
                else if (this.virtualBallA >= 300 && this.virtualBallA < 400)
                    tmpAngle = this.virtualBallA - 300;
                else if (this.virtualBallA >= 400)
                    tmpAngle = this.virtualBallA - 400;
                radAngle = tmpAngle  * (Math.PI / 2 / 200);
                adj = this.virtualBallS * Math.tan(radAngle);
                if (tmpAngle === 100 || tmpAngle === 300)
                    adj = 0;
                if (adj < 0)
                    adj *= -1;
                if ((this.virtualBallA >= 0 && this.virtualBallA < 100) || (this.virtualBallA >= 300 && this.virtualBallA <= 400))
                {
                        this.virtualBallY = this.virtualBallY - adj;
                }
                else if ((this.virtualBallA >= 100 && this.virtualBallA < 200) || (this.virtualBallA >= 300 && this.virtualBallA <= 400))
                {
                        this.virtualBallY = this.virtualBallY + adj;
                }
                if (this.game.ball.ballDirection)
                    this.virtualBallX += this.virtualBallS;
                else
                    this.virtualBallX -= this.virtualBallS;

            }  
            else if (this.virtualBallY - this.virtualBallWH / 2 <= 0 || (this.virtualBallY + this.virtualBallWH / 2 >= 200/*this.game.p5.height*/))
            {
                this.virtualBallUpbottomRebound();   
            }     
        }
        this.virtualBallX =  (this.virtualBallX * this.game.p5.width / 400);
        this.virtualBallY = (this.virtualBallY * this.game.p5.height / 200);
        this.virtualBallWH =  (this.virtualBallWH * this.game.p5.height / 200);

        if (this.virtualBallY > this.racketY + this.randomRebound)
        {
            this.racketSpeed = (this.virtualBallY - (this.racketY + this.randomRebound)) / 40;
            this.steps = 0;
            this.racketVibrationUpDown = true;
        }
        else
        {
            this.racketSpeed = ((this.racketY + this.randomRebound) - this.virtualBallY) / 40;
            this.steps = 0;
            this.racketVibrationUpDown = false; 
        }
    }

}



export default Racket;
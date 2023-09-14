import Game from './gameInstance'
import Ball from './ball';
import GameContainer from './gamecontainer';

class Racket
{
    constructor (data : GameContainer , racketMode : boolean | undefined = undefined, racketSide : boolean) 
    {
        //this.game = game;
        this.racketModes = racketMode;
        this.racketSides = racketSide;
        this.racketSpeed = data.height / 40;
        this.width = data.width;
        this.height = data.height;
    };
    height : number;
    width : number;
    racketH : number = 0;
    racketW : number = 0;
    racketX : number = 0;
    racketY : number = -100;
    lastPositionOfRacketY : number = 0;
    racketSpeed : number;
    racketModes : boolean | undefined;
    racketSides : boolean;
    
    keyIsPress : boolean = false;
    firstMouseMove : boolean = true;
    //mouseIsMoved : boolean = false;

    virtualBallX : number = 0;
    virtualBallY : number = 0;
    virtualBallWH : number = 0;
    virtualBallA : number = 0;

    startOfSimulation : boolean = true;
    randomRebound : number = 0;
    coordinateAlreadyGot : boolean = false;
    racketVibrationUpDown : boolean | undefined = undefined;
    edge : number = 10;

    constrainValue(value: number, minValue: number, maxValue: number): number 
    {
        if (value < minValue)
          return minValue;
        else if (value > maxValue)
          return maxValue;
        else
          return value;
    }

    drawKeyBoardInitRacket(data : GameContainer)
    {
        if (this.racketSides === true)
            this.racketX = (data.width) - (data.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (data.height / 4);
        this.racketW = (data.width / 80); 
        this.racketY = (data.height / 2) - (this.racketH / 2); 
        data.keyIsPress = true;
        this.startOfSimulation = false;
        this.lastPositionOfRacketY = this.racketY;
        if (this.racketSpeed === 0)
            this.racketSpeed = data.height / 40;
    }

    MoveRacketWithKeyBoard (data : GameContainer)
    {
        if (data.keyIsPress === false)
        {
            if (this.racketSides === true)
                this.racketX = (data.width) - (data.width / 80); 
            else
                this.racketX = 0; 
            this.racketW = (data.width / 80); 
            this.racketH = (data.height / 4);
            this.racketY = (data.height / 2) - (this.racketH / 2);
            this.lastPositionOfRacketY = this.racketY;
            this.keyIsPress = true;
            if (this.racketSpeed === 0)
                this.racketSpeed = data.height / 40;
        }
        if (data.keyIsPressed)
        {
            if ((data.keyCode === 40 || data.keyCode === 38))
            {
                if (data.keyCode === 40)
                    this.racketY = this.lastPositionOfRacketY + this.racketSpeed;
                else
                    this.racketY = this.lastPositionOfRacketY - this.racketSpeed;
                if (this.racketY < 0)
                    this.racketY = 0;
                else if (this.racketY >= (data.height - this.racketH))
                    this.racketY = (data.height - this.racketH);
                this.lastPositionOfRacketY = this.racketY;
            }
        }
        else
            this.racketY = this.lastPositionOfRacketY;
    }

    drawAndMoveRacketWithMouse(data: GameContainer)
    {
        if (this.racketSides === true)
            this.racketX = (data.width) - (data.width / 80); 
        else
            this.racketX = 0;
        this.racketH = (data.height / 4);
        this.racketW = (data.width / 80);
        if (this.racketY === -100)
            this.racketY = (data.height / 2) - this.racketH / 2;
        else
        {
            let mY = this.constrainValue(data.mouseY, 0, data.height - this.racketH);//mY is mouse Y coordinate after constrain
            if (data.mouseX > 0 && data.mouseX < data.width)
            {
                if (this.lastPositionOfRacketY === data.height - this.racketH && mY === 0)
                    this.racketY = this.lastPositionOfRacketY;
                else if (this.lastPositionOfRacketY === 0 && mY === data.height - this.racketH)
                    this.racketY = this.lastPositionOfRacketY;
                else
                    this.racketY = mY; 
            }
            else
                this.racketY = this.lastPositionOfRacketY;
        }
        this.lastPositionOfRacketY = this.racketY;
    }
    
    drawAutomaticRacket(data : GameContainer)
    {
        if (this.startOfSimulation === true)
            this.drawKeyBoardInitRacket(data);
        else if (this.coordinateAlreadyGot)
        {
            if (data.height !== this.height || data.width !== this.width)
            {
                this.racketH = (data.height / 4);
                this.racketW = (data.width / 80); 
                this.racketY = this.lastPositionOfRacketY; 
                if (this.racketSides)
                    this.racketX = (this.width) - (this.width / 80);  
                else
                    this.racketX = 0;
                this.height = data.height;
                this.width = data.width; 
            }
            if (this.racketVibrationUpDown === false)
            {
                if (this.racketY + this.randomRebound >= this.virtualBallY)
                    this.racketY -= this.racketSpeed;
                else
                {
                    let diff = this.racketY + this.randomRebound - this.virtualBallY;
                    this.racketY = this.racketY - diff;
                    this.racketVibrationUpDown = undefined;
                }
            }
            else if (this.racketVibrationUpDown === true)
            {
                if (this.racketY + this.randomRebound <= this.virtualBallY)
                    this.racketY += this.racketSpeed;
                else
                {
                    let diff = this.virtualBallY - (this.racketY + this.randomRebound);
                    this.racketY = this.racketY + diff;
                    this.racketVibrationUpDown = undefined;
                }
            }
            if (this.racketY < 0)
                this.racketY = 0;
            else if (this.racketY + this.racketH > this.height)
                this.racketY = this.height - this.racketH;
            this.lastPositionOfRacketY = this.racketY;
        }
    }
    /*
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
        
        
        if ((this.racketSides === false && this.game.ball.ballDirection === false )|| (this.racketSides && this.game.ball.ballDirection))
        {
            if (this.coordinateAlreadyGot === false)
            {
                this.getCoordinates();
                this.coordinateAlreadyGot = true;
                this.randomRebound = Math.floor(Math.random() * (this.racketH - this.edge)) + this.edge;
            }
            else
            {
                this.game.p5.fill('red');
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
        let radAngle : number;
        let adj : number;
        let tempAngle : number;

        if (this.virtualBallY - this.virtualBallWH <= 0)
        {
            if (this.virtualBallA >= 0 && this.virtualBallA <= 100)
            {
                this.virtualBallA += 100;
            }
            else if (this.virtualBallA >= 300 && this.virtualBallA <= 400)
            {
                this.virtualBallA -= 100;
            }
            tempAngle = this.virtualBallA;
            if (this.virtualBallA > 100 && this.virtualBallA < 200)
                tempAngle = this.virtualBallA - 100;
            else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                tempAngle = this.virtualBallA - 200;
            else if (this.virtualBallA >= 300 && this.virtualBallA < 400)
                tempAngle = this.virtualBallA - 300;
            else if (this.virtualBallA >= 400)
                tempAngle = this.virtualBallA - 400;
            radAngle = tempAngle  * (Math.PI / 2 / 200);
            adj = this.game.ball.ballSpeed * Math.tan(radAngle); 
            if (tempAngle === 100 || tempAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.game.ball.ballY + this.game.ball.ballWH / 2 < 0)
                this.virtualBallY = 0 + adj;
            else
                this.virtualBallY += adj;
        }
        else if (this.virtualBallY + this.game.ball.ballWH >= this.height - this.game.ball.ballWH / 2)
        {
            if (this.virtualBallA >= 200 && this.virtualBallA <= 300)
            {
                this.virtualBallA += 100;
            }
            else if (this.virtualBallA >= 100 && this.virtualBallA < 200)
            {
                this.virtualBallA -= 100;
            }
            tempAngle = this.virtualBallA;
            if (this.virtualBallA > 100 && this.virtualBallA < 200)
                tempAngle = this.virtualBallA - 100;
            else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                tempAngle = this.virtualBallA - 200;
            else if (this.virtualBallA >= 300 && this.virtualBallA < 400)
                tempAngle = this.virtualBallA - 300;
            else if (this.virtualBallA >= 400)
                tempAngle = this.virtualBallA - 400;
            radAngle = tempAngle * (Math.PI / 2 / 200);
            adj = this.game.ball.ballSpeed * Math.tan(radAngle);
            if (tempAngle === 100 || tempAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.virtualBallY >= this.height - (this.game.ball.ballWH / 2))
                this.virtualBallY = (this.height - (this.game.ball.ballWH / 2)) - adj;
            else
                this.virtualBallY -= adj;
        }
        if (this.game.ball.ballDirection)
            this.virtualBallX += this.game.ball.ballSpeed;
        else
            this.virtualBallX -= this.game.ball.ballSpeed;
    
    }

    getCoordinates ()
    {
        let tempAngle   : number;
        let radAngle    : number;
        let adj         : number;
        
        this.virtualBallA = this.game.ball.ballAngle;
        this.virtualBallX = this.game.ball.ballX;
        this.virtualBallY = this.game.ball.ballY;
        this.virtualBallWH = this.game.ball.ballWH;
        while ((this.virtualBallX  > this.racketW) && !this.game.ball.ballDirection)
        {
            if (this.virtualBallY - this.virtualBallWH / 2 > 0 &&  this.virtualBallY + this.virtualBallWH / 2 < this.height)
            {
                tempAngle = this.virtualBallA;
                if (this.virtualBallA > 100 && this.virtualBallA < 200)
                    tempAngle = this.virtualBallA - 100;
                else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                    tempAngle = this.virtualBallA - 200;
                else if (this.virtualBallA >= 300 && this.virtualBallA < 400)
                    tempAngle = this.virtualBallA - 300;
                else if (this.virtualBallA >= 400)
                    tempAngle = this.virtualBallA - 400;
                radAngle = tempAngle * (Math.PI / 2 / 200);
                adj = this.game.ball.ballSpeed * Math.tan(radAngle);
                if (tempAngle === 100 || tempAngle === 300)
                    adj = 0;
                if (adj < 0)
                    adj *= -1;
                if (this.virtualBallA < 100)
                    this.virtualBallY -= adj;
                else if (this.virtualBallA >= 0 && this.virtualBallA < 100)
                    this.virtualBallY -= adj;
                else if (this.virtualBallA >= 100 && this.virtualBallA < 200)
                    this.virtualBallY += adj;
                else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                    this.virtualBallY += adj;
                else if (this.virtualBallA >= 300 && this.virtualBallA <= 400)
                    this.virtualBallY -= adj;
                if (this.game.ball.ballDirection)
                {
                    this.virtualBallX += this.game.ball.ballSpeed;
                }    
                else
                {
                    this.virtualBallX -= this.game.ball.ballSpeed;
                }
            }
        
            else if (this.virtualBallY - this.game.ball.ballWH <= 0 || (this.virtualBallY + this.game.ball.ballWH) >= this.height)
            {
                if (this.virtualBallY < 0)
                    this.virtualBallY = 0;
                if (this.virtualBallY > this.height - this.virtualBallWH / 2)
                    this.virtualBallY = this.height - this.virtualBallWH / 2;
                this.virtualBallUpbottomRebound();       
            }   
        }
        while ((this.virtualBallX  < this.racketX) && this.game.ball.ballDirection)
        {
            if (this.virtualBallY - this.virtualBallWH / 2 > 0 &&  this.virtualBallY + this.virtualBallWH / 2 < this.height)
            {
                tempAngle = this.virtualBallA;
                if (this.virtualBallA > 100 && this.virtualBallA < 200)
                    tempAngle = this.virtualBallA - 100;
                else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                    tempAngle = this.virtualBallA - 200;
                else if (this.virtualBallA >= 300 && this.virtualBallA < 400)
                    tempAngle = this.virtualBallA - 300;
                else if (this.virtualBallA >= 400)
                    tempAngle = this.virtualBallA - 400;
                radAngle = tempAngle * (Math.PI / 2 / 200);
                adj = this.game.ball.ballSpeed * Math.tan(radAngle);
                if (tempAngle === 100 || tempAngle === 300)
                    adj = 0;
                if (adj < 0)
                    adj *= -1;
                if (this.virtualBallA < 100)
                    this.virtualBallY -= adj;
                else if (this.virtualBallA >= 0 && this.virtualBallA < 100)
                    this.virtualBallY -= adj;
                else if (this.virtualBallA >= 100 && this.virtualBallA < 200)
                    this.virtualBallY += adj;
                else if (this.virtualBallA >= 200 && this.virtualBallA < 300)
                    this.virtualBallY += adj;
                else if (this.virtualBallA >= 300 && this.virtualBallA <= 400)
                    this.virtualBallY -= adj;
                if (this.game.ball.ballDirection)
                {
                    this.virtualBallX += this.game.ball.ballSpeed;
                }    
                else
                {
                    this.virtualBallX -= this.game.ball.ballSpeed;
                }
            }  
            else if (this.virtualBallY - this.game.ball.ballWH <= 0 || (this.virtualBallY + this.game.ball.ballWH) >= this.height)
            {
                if (this.virtualBallY < 0)
                    this.virtualBallY = 0;
                if (this.virtualBallY > this.height - this.virtualBallWH / 2)
                    this.virtualBallY = this.height - this.virtualBallWH / 2;
                this.virtualBallUpbottomRebound();   
                
            }     
        }
        if (this.virtualBallX < 0)
            this.virtualBallX = 0;
        if (this.virtualBallX > this.width)
            this.virtualBallX = this.width;  
        if (this.game.ball.ballDirection && this.racketY)
        {
            if (this.virtualBallY > this.racketY)
                this.racketVibrationUpDown = true;
            else
                this.racketVibrationUpDown = false; 
        }
        if (!this.game.ball.ballDirection && this.racketY)
        {
            if (this.virtualBallY > this.racketY)
                this.racketVibrationUpDown = true;
            else
                this.racketVibrationUpDown = false;
        }
    }
*/
}



export default Racket;
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
        this.racketSpeed = data.height / 100;
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
        //console.log("coordinate: ",  this.coordinateAlreadyGot, " Racket side : ", this.racketSides, this.racketVibrationUpDown,"\n------------\n");
        if (this.startOfSimulation === true)
        {
            this.drawKeyBoardInitRacket(data);
        }
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
            //    console.log("what happen 1 ", this.racketVibrationUpDown, this.racketY, this.randomRebound ,this.racketSpeed);
                if (this.racketY + this.randomRebound >= this.virtualBallY)
                {
                    console.log("1 : ",this.racketY, this.racketY + this.randomRebound , this.virtualBallY);
                    this.racketY -= this.racketSpeed;
                }   
                else
                {
                    console.log("1.1 : ", this.racketY, this.racketY + this.randomRebound , this.virtualBallY);
                    let diff = this.racketY + this.randomRebound - this.virtualBallY;
                    this.racketY = this.racketY - diff;
                    this.racketVibrationUpDown = undefined;
                }
              //  console.log("after 1 : ", this.racketY);
            }
            else if (this.racketVibrationUpDown === true)
            {
             //   console.log("what happen 2 ", this.racketVibrationUpDown , this.racketY, this.racketSpeed);
                if (this.racketY + this.randomRebound <= this.virtualBallY)
                {
                    console.log("2 : ",this.racketY, this.racketY + this.randomRebound , this.virtualBallY, this.randomRebound);
                    this.racketY += this.racketSpeed;
                }
                else
                {
                    console.log("2.1 : ", this.racketY, this.racketY + this.randomRebound , this.virtualBallY);
                    let diff = this.virtualBallY - (this.racketY + this.randomRebound);
                    this.racketY = this.racketY + diff;
                    this.racketVibrationUpDown = undefined;
                }
               // console.log("after 2 : ", this.racketY);
            }
            if (this.racketY < 0)
                this.racketY = 0;
            else if (this.racketY + this.racketH > this.height)
                this.racketY = this.height - this.racketH;
            this.lastPositionOfRacketY = this.racketY;
        }
    }
    
    automaticRacket(data : GameContainer)
    {
        if (data.goalRestart)
        {
            this.startOfSimulation = true;
            this.coordinateAlreadyGot = false;
            console.log("start again------------------>");
        }
        //console.log("-----------\ndata : ","racket side : ", this.racketSides, "ball direction :", data.ballDirection)
        this.drawAutomaticRacket(data);
        
        if ((this.racketSides === false && data.ballDirection === false )|| (this.racketSides && data.ballDirection))
        {
            if (this.coordinateAlreadyGot === false)
            {
                this.getCoordinates(data);
                this.coordinateAlreadyGot = true;
                this.randomRebound = Math.floor(Math.random() * (this.racketH - this.edge)) + this.edge;
                console.log("random rebound : ", this.randomRebound, this.racketY , this.racketY + this.randomRebound, this.virtualBallY, this.virtualBallX)
            }
            else
            {
                //this.game.p5.fill('red');
                //this.game.p5.circle(this.virtualBallX , this.virtualBallY, this.virtualBallWH);
                //this.game.p5.fill('white');
            }
        }
        else
        {
            this.coordinateAlreadyGot = false;
        }
    }


    virtualBallUpbottomRebound(data: GameContainer)
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
            adj = data.ballSpeed * Math.tan(radAngle); 
            if (tempAngle === 100 || tempAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (data.ballY + data.ballWH / 2 < 0)
                this.virtualBallY = 0 + adj;
            else
                this.virtualBallY += adj;
        }
        else if (this.virtualBallY + data.ballWH >= this.height - data.ballWH / 2)
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
            adj = data.ballSpeed * Math.tan(radAngle);
            if (tempAngle === 100 || tempAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.virtualBallY >= this.height - (data.ballWH / 2))
                this.virtualBallY = (this.height - (data.ballWH / 2)) - adj;
            else
                this.virtualBallY -= adj;
        }
        if (data.ballDirection)
            this.virtualBallX += data.ballSpeed;
        else
            this.virtualBallX -= data.ballSpeed;
    
    }

    getCoordinates (data : GameContainer)
    {
        let tempAngle   : number;
        let radAngle    : number;
        let adj         : number;
        
        this.virtualBallA = data.ballAngle;
        this.virtualBallX = data.ballX;
        this.virtualBallY = data.ballY;
        this.virtualBallWH = data.ballWH;
        while ((this.virtualBallX  > this.racketW) && !data.ballDirection)
        {
            //console.log('the while loop', this.virtualBallX, this.racketW, data.ballSpeed);
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
                adj = data.ballSpeed * Math.tan(radAngle);
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
                if (data.ballDirection)
                {
                    this.virtualBallX += data.ballSpeed;
                }    
                else
                {
                    this.virtualBallX -= data.ballSpeed;
                }
            }
        
            else if (this.virtualBallY - data.ballWH <= 0 || (this.virtualBallY + data.ballWH) >= this.height)
            {
                if (this.virtualBallY < 0)
                    this.virtualBallY = 0;
                if (this.virtualBallY > this.height - this.virtualBallWH / 2)
                    this.virtualBallY = this.height - this.virtualBallWH / 2;
                this.virtualBallUpbottomRebound(data);       
            }   
        }
        while ((this.virtualBallX  < this.racketX) && data.ballDirection)
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
                adj = data.ballSpeed * Math.tan(radAngle);
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
                if (data.ballDirection)
                {
                    this.virtualBallX += data.ballSpeed;
                }    
                else
                {
                    this.virtualBallX -= data.ballSpeed;
                }
            }  
            else if (this.virtualBallY - data.ballWH <= 0 || (this.virtualBallY + data.ballWH) >= this.height)
            {
                if (this.virtualBallY < 0)
                    this.virtualBallY = 0;
                if (this.virtualBallY > this.height - this.virtualBallWH / 2)
                    this.virtualBallY = this.height - this.virtualBallWH / 2;
                this.virtualBallUpbottomRebound(data);   
                
            }     
        }
        if (this.virtualBallX < 0)
            this.virtualBallX = 0;
        if (this.virtualBallX > this.width)
            this.virtualBallX = this.width;  
        if (data.ballDirection && this.racketY)
        {
            if (this.virtualBallY > this.racketY)
                this.racketVibrationUpDown = true;
            else
                this.racketVibrationUpDown = false; 
        }
        if (!data.ballDirection && this.racketY)
        {
            if (this.virtualBallY > this.racketY)
                this.racketVibrationUpDown = true;
            else
                this.racketVibrationUpDown = false;
        }
    }

}



export default Racket;
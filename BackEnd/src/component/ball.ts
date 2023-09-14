import Game from './gameInstance'
import Racket from './racket';
import GameContainer from './gamecontainer';

class Ball
{
    constructor (leftRackt : Racket , rightRacket : Racket)
    {
        //this.leftRacket = new Racket(null, undefined, false);
        //this.rightRacket = new Racket(null, undefined, true);
        this.leftRacket = leftRackt;
        this.rightRacket = rightRacket;
    }
    //game : Game;
    ballX : number = 0;
    ballY : number = 0;
    ballWH : number = 0;
    ballFirstMove : boolean = true;
    ballDirection : boolean | undefined = undefined;
    ballAngle : number = 0;
    ballSpeed : number = 0;
    ballFirst50Time : number = 0;
    ballRightTan : number = 0;
    ballLeftTan : number = 0;
    ballTopTan : number = 0;
    ballBottomTan : number = 0;
    width : number = 0;
    height : number = 0;
    leftRacket : Racket ;
    rightRacket : Racket ;
    
    drawAndMove(width: number, height : number)
    {
        this.height = height;
        this.width = width;
        this.ballSpeed = this.width / 70;
        if (this.ballFirst50Time < 10)
        {
            //this.game.goalRestart = false;
            this.ballWH = this.height / 25;
            this.ballX = this.width / 2;
            this.ballY = this.height / 2;
            this.ballFirst50Time++;
            this.ballFirstMove = true;
        } 
        else
        {
            this.ballMove();
        }

    }

    ballMove()
    {
        this.ballRightTan = this.ballX + this.ballWH / 2;
        this.ballLeftTan = this.ballX - this.ballWH / 2;
        this.ballTopTan = this.ballY - this.ballWH / 2;
        this.ballBottomTan = this.ballY + this.ballWH / 2;
        if (this.ballDirection === undefined)
        {
            this.ballDirection = (Math.floor(Math.random() * (2))) ? true : false;
            if (this.ballDirection === true)
                this.ballAngle = 100;
            else
                this.ballAngle = 300;
        }
        if (this.ballFirstMove && this.rightRacket && this.leftRacket)
        {
            if (this.ballDirection)
                this.ballX += this.ballSpeed;
            else
                this.ballX -= this.ballSpeed;
                
            if (this.ballDirection === true && this.ballRightTan >= this.rightRacket.racketX)
                this.ballFirstMove = false; 
            else if (this.ballDirection === false && this.ballLeftTan <= (this.leftRacket.racketX + this.leftRacket.racketW / 2) )
                this.ballFirstMove = false;
            if (this.ballDirection && this.ballX >= this.width && this.ballY > this.rightRacket.racketY  && this.ballY < this.rightRacket.racketY + this.rightRacket.racketH)
                this.ballX = this.width - this.rightRacket.racketW + 1;
            if (!this.ballDirection && this.ballX <= 0 && this.ballY > this.leftRacket.racketY && this.ballY < this.leftRacket.racketY + this.leftRacket.racketH)
                this.ballX = this.leftRacket.racketW - 1;
            
        } 
        
        if (this.ballFirstMove === false && this.rightRacket && this.leftRacket)
        {
            if ((this.ballDirection && this.ballX > this.width - this.rightRacket.racketW  && (this.ballY < this.rightRacket.racketY || this.ballY > this.rightRacket.racketY + this.rightRacket.racketH))
                || (!this.ballDirection && this.ballX < this.leftRacket.racketW && (this.ballY < this.leftRacket.racketY || this.ballY > this.leftRacket.racketY + this.leftRacket.racketH)))
            {
                console.log("You lose ==================== : ");
                //if ((!this.ballDirection && this.ballX < this.leftRacket.racketW && (this.ballY < this.leftRacket.racketY || this.ballY > this.leftRacket.racketY + this.leftRacket.racketH)))
                    //this.game.rightPlayerGoals++;
                ///else
                    //this.game.leftPlayerGoals++;
                //this.game.goalRestart = true;
                this.ballFirstMove = true;
                this.ballFirst50Time = 0;
                this.ballDirection = undefined;
            }
            else if (this.ballDirection === true && this.ballRightTan >= this.rightRacket.racketX && (this.ballY >= this.rightRacket.racketY && this.ballY <= this.rightRacket.racketY + this.rightRacket.racketH))
            {
                this.calculateRightBallRebound();
            }
            else if (this.ballDirection === false && this.ballLeftTan <= (this.leftRacket.racketX + this.leftRacket.racketW / 2) && (this.ballY >= this.leftRacket.racketY && this.ballY <= this.leftRacket.racketY + this.leftRacket.racketH)) 
            {
                this.calculateLeftBallRebound();
            }
            else if (this.ballTopTan > 0 && this.ballBottomTan < this.height )
            {
                this.calculateBallOnSpace();
            }
            else if (this.ballTopTan <= 0 || this.ballBottomTan >= this.height)
            {
                this.calculateTopAndBottomBallRebound();
            }
        }
    }

    calculateTopAndBottomBallRebound()
    {
        let radAngle : number;
        let adj : number;
        let tmpAngle : number;

        if (this.ballTopTan <= 0)
        {
            if (this.ballAngle >= 0 && this.ballAngle <= 100)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 300 && this.ballAngle <= 400)
            {
                this.ballAngle -= 100;
            }
            this.ballTopTan = 0;
            tmpAngle = this.ballAngle;
            if (this.ballAngle > 100 && this.ballAngle < 200)
                tmpAngle = this.ballAngle - 100;
            else if (this.ballAngle >= 200 && this.ballAngle < 300)
                tmpAngle = this.ballAngle - 200;
            else if (this.ballAngle >= 300 && this.ballAngle < 400)
                tmpAngle = this.ballAngle - 300;
            else if (this.ballAngle >= 400)
                tmpAngle = this.ballAngle - 400;
            radAngle = tmpAngle  * (Math.PI / 2 / 200);
            adj = this.ballSpeed * Math.tan(radAngle); 
            if (tmpAngle === 100 || tmpAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.ballY < 0)
                this.ballY = 0 + adj;
            else
                this.ballY += adj;
        }
        else if (this.ballBottomTan >= this.height - this.ballWH / 2)
        {
            if (this.ballAngle >= 200 && this.ballAngle <= 300)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 100 && this.ballAngle < 200)
            {
                this.ballAngle -= 100;
            }
            tmpAngle = this.ballAngle;
            if (this.ballAngle > 100 && this.ballAngle < 200)
                tmpAngle = this.ballAngle - 100;
            else if (this.ballAngle >= 200 && this.ballAngle < 300)
                tmpAngle = this.ballAngle - 200;
            else if (this.ballAngle >= 300 && this.ballAngle < 400)
                tmpAngle = this.ballAngle - 300;
            else if (this.ballAngle >= 400)
                tmpAngle = this.ballAngle - 400;
            radAngle = tmpAngle * (Math.PI / 2 / 200);
            adj = this.ballSpeed * Math.tan(radAngle);
            if (tmpAngle === 100 || tmpAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.ballY >= (this.height - (this.ballWH / 2)))
                this.ballY = (this.height - (this.ballWH / 2)) - adj;
            else
                this.ballY -= adj;
        }
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        
    }


    calculateBallOnSpace()
    {
        let adj : number;
        let radAngle : number;
        let tmpAngle: number;

        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle  * (Math.PI / 2 / 200);
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 0 && this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 100 && this.ballAngle < 200)
            this.ballY = this.ballY + adj;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            this.ballY = this.ballY + adj;
        else if (this.ballAngle >= 300 && this.ballAngle <= 400)
            this.ballY = this.ballY - adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        if (this.ballY < 0)
            this.ballY = 0;
        if (this.ballY > this.height - this.ballWH / 2)
            this.ballY = this.height - this.ballWH / 2;
    }

    calculateRightBallRebound()
    {
        let diff : number;
        let adj : number = 0;
        let radAngle : number;
        let tmpAngle : number;
        
        if (this.rightRacket?.racketY)
        {
            diff = this.ballY - this.rightRacket.racketY;
            if (diff < this.rightRacket.racketH / 2)
                this.ballAngle = 100 - ((this.rightRacket.racketH / 2 - diff) * 100 / this.rightRacket.racketH / 2);
            else
                this.ballAngle = 100 + ((diff - this.rightRacket.racketH / 2) * 100 / (this.rightRacket.racketH / 2)); 
        }
        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle >= 300 && this.ballAngle <= 400)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            this.ballY = this.ballY + adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
    }

    calculateLeftBallRebound()
    {
        let diff : number;
        let adj : number;
        let radAngle : number;
        let tmpAngle : number ;
        
        if (this.leftRacket?.racketY)
        {
            diff = this.ballY - this.leftRacket.racketY;
            if (diff < this.leftRacket.racketH / 2)
                this.ballAngle = 100 - ((this.leftRacket.racketH / 2 - diff) * 100 / this.leftRacket.racketH / 2);
            else
                this.ballAngle = 100 + ((diff - this.leftRacket.racketH / 2) * 100 / (this.leftRacket.racketH / 2)); 
        }
        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle >= 0 && this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 100 && this.ballAngle <= 200)
            this.ballY = this.ballY + adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
    }

}

export default Ball;
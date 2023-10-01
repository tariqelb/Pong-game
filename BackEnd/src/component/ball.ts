import GameContainer from './gamecontainer';

class Ball
{
    constructor ()
    {
    }
    
    ballX : number = 0;
    ballY : number = 0;
    ballWH : number = 0;
    ballAngle : number = 0;
    ballSpeed : number = 0;
    ballDirection : boolean | undefined = undefined;
    
    ballRightTan : number = 0;
    ballLeftTan : number = 0;
    ballTopTan : number = 0;
    ballBottomTan : number = 0;
    
    width : number = 400;
    height : number = 200;
    
    ballFirst50Time : number = 0;
    ballFirstMove : boolean = true;
    goalRestart : boolean = false;
    
    drawAndMove(data : GameContainer)
    {
        if (this.goalRestart)
        {
            if (data.lRacketY !== (100 - data.lRacketH / 2) && (data.rRacketY !== ( 100 - data.rRacketH / 2)))
                return
        }
        if (this.ballFirst50Time < 250)
        {
            this.ballSpeed = this.width / 200;
            this.goalRestart = false;
            this.ballWH = this.height / 25;
            this.ballX = this.width / 2;
            this.ballY = this.height / 2;
            this.ballFirst50Time++;
            this.ballFirstMove = true;
        } 
        else
        {
            this.ballMove(data);
        }

    }

    ballMove(data : GameContainer)
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
        if (this.ballFirstMove)// && data&& this.leftRacket)
        {
            if (this.ballDirection)
                this.ballX += this.ballSpeed;
            else
                this.ballX -= this.ballSpeed;
                
            if (this.ballDirection === true && this.ballRightTan >= data.rRacketX)
                this.ballFirstMove = false; 
            else if (this.ballDirection === false && this.ballLeftTan <= (data.lRacketX + data.lRacketW / 2) )
                this.ballFirstMove = false;
            if (this.ballDirection && this.ballX >= this.width && this.ballY > data.rRacketY  && this.ballY < data.rRacketY + data.rRacketH)
                this.ballX = this.width - data.rRacketW + 1;
            if (!this.ballDirection && this.ballX <= 0 && this.ballY > data.lRacketY && this.ballY < data.lRacketY + data.lRacketH)
                this.ballX = data.lRacketW - 1;
            
        } 
        
        if (this.ballFirstMove === false )
        {
            if ((this.ballDirection && this.ballX > this.width - data.rRacketW  && (this.ballY < data.rRacketY || this.ballY > data.rRacketY + data.rRacketH))
                || (!this.ballDirection && this.ballX < data.lRacketW && (this.ballY < data.lRacketY || this.ballY > data.lRacketY + data.lRacketH)))
            {
                console.log("You lose ==================== : ");
                //if ((!this.ballDirection && this.ballX < data.lRacketW && (this.ballY < data.lRacketY || this.ballY > data.lRacketY + data.lRacketH)))
                    //this.game.rightPlayerGoals++;
                ///else
                    //this.game.leftPlayerGoals++;
                this.goalRestart = true;
                this.ballFirstMove = true;
                this.ballFirst50Time = 0;
                this.ballDirection = undefined;
            }
            else if (this.ballDirection === true && this.ballRightTan >= data.rRacketX && (this.ballY >= data.rRacketY && this.ballY <= data.rRacketY + data.rRacketH))
            {
                this.calculateRightBallRebound(data);
            }
            else if (this.ballDirection === false && this.ballLeftTan <= (data.lRacketX + data.lRacketW / 2) && (this.ballY >= data.lRacketY && this.ballY <= data.lRacketY + data.lRacketH)) 
            {
                this.calculateLeftBallRebound(data);
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
            this.ballY = this.ballWH / 2 + 2;
        }
        else if (this.ballBottomTan >= this.height)
        {
            if (this.ballAngle >= 200 && this.ballAngle <= 300)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 100 && this.ballAngle < 200)
            {
                this.ballAngle -= 100;
            }
            this.ballY = (this.height - (this.ballWH / 2)) - 2;
        }
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
        if ((this.ballAngle >= 0 && this.ballAngle < 100) || (this.ballAngle >= 300 && this.ballAngle <= 400))
        {
                this.ballY = this.ballY - adj;
        }
        else if ((this.ballAngle >= 100 && this.ballAngle < 200) || (this.ballAngle >= 300 && this.ballAngle <= 400))
        {
                this.ballY = this.ballY + adj;
        }
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
    }

    calculateRightBallRebound(data : GameContainer)
    {
        let diff : number;
        let adj : number = 0;
        let radAngle : number;
        let tmpAngle : number;
        
        if (data.rRacketY)
        {
            diff = this.ballY - data.rRacketY;
            if (diff < data.rRacketH / 2)
                this.ballAngle = 100 - ((data.rRacketH / 2 - diff) * 100 / data.rRacketH / 2);
            else
                this.ballAngle = 100 + ((diff - data.rRacketH / 2) * 100 / (data.rRacketH / 2)); 
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
        //if (this.ballSpeed < 2)
        //    this.ballSpeed += 0.2;
    }

    calculateLeftBallRebound(data : GameContainer)
    {
        let diff : number;
        let adj : number;
        let radAngle : number;
        let tmpAngle : number ;
        
        if (data.lRacketY)
        {
            diff = this.ballY - data.lRacketY;
            if (diff < data.lRacketH / 2)
                this.ballAngle = 100 - ((data.lRacketH / 2 - diff) * 100 / data.lRacketH / 2);
            else
                this.ballAngle = 100 + ((diff - data.lRacketH / 2) * 100 / (data.lRacketH / 2)); 
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
        //console.log(this.ballSpeed)
        //if (this.ballSpeed < 2)
        //    this.ballSpeed += 0.2;
    }

}

export default Ball;
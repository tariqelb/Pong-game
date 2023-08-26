import p5Types from 'p5';

class Ball 
{
    constructor (){}

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
    ballBottmTan : number = 0;
    
    drawAndMove()
    {
     /*   cnvHeight = this.p5.height;
        this.ballSpeed = this.p5.width / 40;
        if (lrecY !== undefined)
            castLrecY = lrecY;
        if (automaticRacketFlag)
        {
            castLrecY = autoRacketY
        }
        if (rrecY !== undefined)
            castRrecY = rrecY
        if (this.ballFirst50Time < 50)
        {
            restart = false;
            this.ballWH = this.p5.height / 25;
            this.ballX = this.p5.width / 2;
            this.ballY = this.p5.height / 2;
            this.p5.stroke(1)
            this.p5.ellipse(this.ballX, this.ballY, this.ballWH, this.ballWH);
            this.ballFirst50Time++;
            this.ballFirstMove = true;
            //console.log("ball ", p5.width/ 2 , p5.height / 2);
        } 
        else
        {
            ballMove(p5);
        }
        */
    };
}

export default Ball;
import p5Types from 'p5';


class animation 
{
    animX : number = 0;
    animY : number = 0;
    animWH : number = 0;
    animImage : p5Types.Image | p5Types.Element | null = null;
    animState : boolean = false;
    animDuration : number = 3;
    animEffectPlayer : boolean | undefined = undefined;
    animActive : boolean = false;
    animLightFlash : number = 0;
    
    constructor() {};

    activeEffect(ballX : number, ballY : number, ballDirection : boolean | undefined) : boolean
    {
        if (this.animState === true && this.animActive === false)
        {
            if (ballX >= this.animX && ballX <= this.animX + this.animWH && ballY >= this.animY && ballY <= this.animY + this.animWH)
            {
                if (ballDirection)
                    this.animEffectPlayer = true;
                else
                    this.animEffectPlayer = false;
                this.animActive = true;
                return (true);
            }

        }
        return (false);
    }
    getRandomPosition(p5 : p5Types) : void
    {
        this.animWH = p5.width / 16;
        this.animX = p5.width / 2 - (this.animWH / 2);
        this.animY = 0 + Math.floor(Math.random() * (p5.height - this.animWH - 1)) + 1;
    }
}

export default animation;
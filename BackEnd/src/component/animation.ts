import p5Types from 'p5';
import Game from './gameInstance';

class animation 
{
    constructor(game : Game)
    {
        this.game = game;
    }

    game : Game;
    animX : number = 0;
    animY : number = 0;
    animWH : number = 0;
    animPos : boolean = false;
    animImage : p5Types.Image | p5Types.Element | null = null;
    animState : boolean = true;
    animDuration : number = 3;
    animEffectPlayer : boolean | undefined = undefined;
    animActive : boolean = false;
    animLightFlash : number = 0;

    activeEffect() : boolean
    {
        if (this.animState === true && this.animActive === false)
        {
            if (this.game.ball.ballX >= this.animX && this.game.ball.ballX <= this.animX + this.animWH && this.game.ball.ballY >= this.animY && this.game.ball.ballY <= this.animY + this.animWH)
            {
                if (this.game.ball.ballDirection)
                    this.animEffectPlayer = true;
                else
                    this.animEffectPlayer = false;
                this.animActive = true;
                return (true);
            }
            this.animState = false;
        }
        return (false);
    }

    getRandomPosition() : void
    {
        this.animWH = this.game.p5.width / 16;
        this.animX = this.game.p5.width / 2 - (this.animWH / 2);
        this.animY = 0 + Math.floor(Math.random() * (this.game.p5.height - this.animWH - 1)) + 1;
        this.animPos = true;
    }

    drawAnimation() : void
    {
        if (this.animState)
        {
            if (this.animLightFlash < 20)
            {
                this.game.p5.fill('green');   
                this.animLightFlash++;
            }
            if (this.animLightFlash >= 20)
            {
                this.game.p5.fill('blue');   
                this.animLightFlash++;
                if (this.animLightFlash === 40)
                this.animLightFlash = 0;
            }
            this.game.p5.square(this.animX, this.animY, this.animWH);
            this.game.p5.fill('white');
            if (this.animImage)
                this.game.p5.image(this.animImage, this.animX + 5 , this.animY + 5, this.animWH - 10, this.animWH - 10)
        }
    }
}

export default animation;
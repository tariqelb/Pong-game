import Sketch from "react-p5";
import p5Types from 'p5';

function sketch(p :p5Types ) : void
{
    //let rotation : number = 0;
    p.setup = function () {
        p.createCanvas(500, 700);
    };
    p.draw = function () {
        p.background(220);
        if (p.mouseIsPressed)
        {
            p.fill(0);
        }
        else
        {
            p.fill(255);
        }
        p.ellipse(p.mouseX, p.mouseY, 80,80);
    }
}
export default sketch;
import p5Types from 'p5';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
//import {useLayoutEffect, useRef, useState} from 'react';
/*
const MySketch = (p: p5Types ) => {
  p.setup = function () {
    p.createCanvas(500, 700);
    p.background(153);
  };
  p.draw = function () {
    p.background(220);
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  };
};

*/


/*function canvasSize() {
  const ref = useRef<>(null);
  const [width, setWidth] = useState(0); //this code extract two values from useState and place them in width and setWidth variables;
  const [height, setHeight] = useState(0);
  
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);
  console.log(width, height);
}*/
let canvasWidth : number ; //this var hold the width of the canvas
let canvasHeight : number ;//this var hold the height of the canvas


function setup(p5 : p5Types) {
  return () => {
    const container : p5Types.Element | null = p5.select('#root');
    if (container)
    {
      console.log(container);
      canvasWidth  = container.elt.clientWidth - 15;//the 15 for border pixel
      canvasHeight = container.elt.clientHeight - 15;
      let cnv : p5Types.Renderer = p5.createCanvas( canvasWidth ,  canvasHeight, p5.WEBGL);
      cnv.parent('root');
    }
    else
    {
      p5.createCanvas( 300 ,  300 , p5.WEBGL);
      console.log("Error: in sketch file, failed to select the canvas element.")
    }
  };
}

let lSquare = (p5 : p5Types )  =>
{
  //p5.line((canvasWidth / 2) , (0 - (canvasHeight / 10)) , (canvasWidth / 2), (canvasHeight / 10));
  //p5.line(100 , 150 , 150, 200);
  //p5.stroke(200);
  //p5.strokeWeight(15);

}

function draw(p5 : p5Types) {
  p5.windowResized = () => {
    const container : p5Types.Element | null = p5.select('#root');
    if (container)
    {
      console.log(container);
      canvasWidth = container.elt.clientWidth - 15; //the 15 for border pixel
      canvasHeight = container.elt.clientHeight - 15;
      p5.resizeCanvas(canvasWidth, canvasHeight);
    }
    // Additional code to handle any resizing-related adjustments
  }

  return () => {
    lSquare(p5);
    p5.background(25, 25, 25);
    //console.log("Canvas height : ", (0 - (  canvasHeight / 2) + 10 ) , (canvasHeight / 2 - 10), canvasHeight);
    p5.line(0, (0 - (canvasHeight / 2 ) + 10), 0, (canvasHeight / 2 - 10)); 
    p5.stroke(100);
    p5.strokeWeight(5);
    //p5.fill(159);

    /*p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();*/
  };
}

function MySketch(p5 : p5Types) {
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}


/*
p5.windowResized = () => {
  const container : p5Types.Element | null = p5.select('#root');
  if (container)
  {
    console.log(container);
    const canvasWidth : number  = container.elt.clientWidth;
    const canvasHeight : number = container.elt.clientHeight;
    p.resizeCanvas(canvasWidth, canvasHeight);
  }
  // Additional code to handle any resizing-related adjustments
}
*/

export default MySketch;
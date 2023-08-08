import p5Types from 'p5';
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

function setup(p5 : p5Types) {
  return () => {
    p5.createCanvas(600, 400, p5.WEBGL);
  };
}

function draw(p5 : p5Types) {
  return () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

function MySketch(p5 : p5Types) {
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}

export default MySketch;
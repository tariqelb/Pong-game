class GameContainer 
{  
    constructor()
    {
        console.log("called again and again: __)");
    }
  init : boolean = false;
  //dataIsReady : boolean = false;
  width : number = 0;
  height : number = 0;
  
  ballX : number = 0;
  ballY : number = 0;
  ballWH : number = 0;
  ballFirst50Time = 0;
  ballSpeed : number = 0;
  ballAngle : number = 0;
  ballFirstMove : boolean = false;
  ballDirection : boolean | undefined = undefined;

  racketSide : number = 0;
  racketKind : number = 0;
  
  lRacketX : number = 0;
  lRacketY : number = 0;
  lRacketH : number = 0;
  lRacketW : number = 0;
  lLastPosY : number = 0;
  
  rRacketX : number = 0;
  rRacketY : number = 0;
  rRacketH : number = 0;
  rRacketW : number = 0;
  rLastPosY : number = 0;
  goalRestart : boolean = false;

  loading : boolean = true;
  clientOne : boolean = false;
  clientTwo : boolean = false;
}
export default GameContainer;
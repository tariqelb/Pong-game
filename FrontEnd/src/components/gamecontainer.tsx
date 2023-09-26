import RecieveBallData from "./RecieveBallData";
import SentRacketData from "./SentRacketData";


class GameContainer 
{  
    constructor()
    {
        console.log("called again and again: __)");
        this.ball = new RecieveBallData();
        this.recvRacket = new SentRacketData();
        this.sentRacket = new  SentRacketData();
    }
  
  init : boolean = false;
  loading : boolean = true;
  width : number = 0;
  height : number = 0;
  playerNumber : number = 0;
  
  ball : RecieveBallData;
  recvRacket : SentRacketData;
  sentRacket : SentRacketData;
}
export default GameContainer;
/*
  
  
  
    
  init : boolean = false;
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


  clientOne : boolean = false;
  clientTwo : boolean = false;*/

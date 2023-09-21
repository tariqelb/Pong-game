import RecieveBallData from "./RecieveBallData";
import SentRacketData from "./SentRacketData";
import RecieveRacketData from "./RecieveRacketData";
import Ball from './ball'
import GameContainer from "./gamecontainer";
import { Socket } from "socket.io";

class Rooms 
{
  constructor()
  {
    this.clientOneId = '';
    this.clientTwoId = '';
    this.clientOneSocket = null;
    this.clientTwoSocket = null;
    this.numberOfClients = 0;
  } 

  container : GameContainer = new GameContainer();
  
  clientOneId : string;
  clientTwoId : string; 
  clientOneSocket : Socket;
  clientTwoSocket : Socket;
  numberOfClients : number;
  getBothRacketData : boolean = false;
  clientTwoWidth : number = 0; 
};
export default Rooms;
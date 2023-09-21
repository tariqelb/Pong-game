// websocket.gateway.ts
import GameContainer from './component/gamecontainer';
import Ball from './component/ball';
import RacketData from './component/SentRacketData';

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import SentRacketData from './component/SentRacketData';
import RecieveBallData from './component/RecieveBallData';
import Rooms from './component/room';


let rooms : Rooms[] = [];

function addToRoom(client: Socket) 
{
  // Find or create a room for the client
  let room = findAvailableRoom();
  if (!room) 
  {
    room = new Rooms();
    rooms.push(room);
  }

  // Assign the client to the room
  if (room.numberOfClients === 0) 
  {
    room.clientOneId = client.id;
    room.clientOneSocket = client;
    room.numberOfClients = 1;
  } 
  else if (room.numberOfClients === 1) 
  {
    room.clientTwoId = client.id;
    room.clientTwoSocket = client;
    room.numberOfClients = 2;

    // Start the game or perform any other necessary actions
    //this.startGame(room);
  }
}

function findAvailableRoom(): Rooms | undefined 
{
  return rooms.find((room) => room.numberOfClients < 2);
}

function startGame(room: Rooms) 
{
  room.clientOneSocket.emit('start-game', 'Game has started!');
  room.clientTwoSocket.emit('start-game', 'Game has started!');
}

function getRoomByClientId(clientId: string): Rooms | undefined 
{
  return rooms.find((room) => room.clientOneId === clientId || room.clientTwoId === clientId);
}

function clearRoom(room: Rooms) 
{
  // Clear data or perform cleanup for the room
  room.clientOneId = '';
  room.clientTwoId = '';
  room.clientOneSocket = null;
  room.clientTwoSocket = null;
  room.numberOfClients = 0;

  // Remove the room from the rooms array
  const index = rooms.indexOf(room);
  if (index !== -1) 
  {
    rooms.splice(index, 1);
  }
}



//@WebSocketGateway(4056,{ namespace: '/game-container', transports: ['websocket'] })
//@WebSocketGateway(4056,{ /*namespace: '/socket.io',*/ transports: ['websocket'] })
@WebSocketGateway({ path : '/game-container', transports: ['websocket'] })
export class MyWebSocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  handleConnection(client: Socket) 
  {
    // Get the client's IP address
    const clientAddress = client.handshake.headers['x-forwarded-for'] || client.handshake.address;

    // Handle WebSocket connections here
    console.log(`WebSocket connection from ${clientAddress} client id : ${client.id}`);
    // You can perform any necessary initialization or validation here
    if (client.connected)
      console.log(`WebSocket connection established for client from ${clientAddress}`);
    
    addToRoom(client);

    
  }

  afterInit() 
  {
    console.log('WebSocket server initialized');
  }


  @SubscribeMessage('customEventDataRequestRacket') // Listen for the 'customEventDataRequest' event
  handleCustomEventRacket(client: Socket, data: SentRacketData) 
  {
    let room : Rooms = getRoomByClientId(client.id);
    //console.log("sending racket data : ", room.numberOfClients);
    if (room && room.numberOfClients === 2 && room.clientOneSocket === client)
    {
      room.container.rRacketX = 395;//data.racketX; server virtual canvas width is 400 and virtual racket width is 5 and the racket is in the right side
      room.container.rRacketY = data.racketY  * 200;//data.racketY; scale calculation
      room.container.rRacketW = 5;//data.racketW;
      room.container.rRacketH = 50//data.racketY;
      room.container.rLastPosY = data.lastPosY / data.height * 200;
      //console.log("set client 1 racket coordinate : ")
      client.broadcast.emit('customEventDataResponseRacket', data);
    }
    else if (room && room.numberOfClients === 2 && room.clientTwoSocket === client)
    {
      room.container.lRacketX = 0//data.racketX; left side of the canvas
      room.container.lRacketY = data.racketY  * 200;
      room.container.lRacketW = 5;//400 / 80 //data.racketW; scale calcule
      room.container.lRacketH = 50 ;//200 / 4//data.racketY;
      room.container.lLastPosY = data.lastPosY / data.height * 200;//data.lastPosY;
      room.clientTwoWidth = data.width;
      client.broadcast.emit('customEventDataResponseRacket', data);
      room.getBothRacketData = true;
    }
  }
  
  @SubscribeMessage('customEventDataRequestBall') // Listen for the 'customEventDataRequest' event
  handleCustomEventBall(client: Socket)
  {
    let data: RecieveBallData = new RecieveBallData();
    //let leftRacket = new Racket(data, true, false);
    //let rightRacket = new Racket(data, true , true);
    //let ball = new Ball(leftRacket, rightRacket);
    let room : Rooms = getRoomByClientId(client.id);
    //console.log("the room clt nbr : " , room.numberOfClients);
    if (!room) 
    {
      console.log(`Client ${client.id} is not in a room.`);
      return;
    }
    if (room.numberOfClients === 2)
    {
      //console.log ( 'the data comes like that : ', room.getBothRacketData);
      if (room.getBothRacketData)
      {
       // console.log("calculate the coordinate of the ball", room.container.ball.ballX, room.container.ball.ballY)
        room.container.ball.drawAndMove(room.container);
        
        data.ballX = room.container.ball.ballX;
        data.ballY = room.container.ball.ballY;
        data.ballWH = room.container.ball.ballWH;
        data.ballDirection = room.container.ball.ballDirection;
        data.ballSpeed = room.container.ball.ballSpeed;
        data.goalRestart = room.container.ball.goalRestart;
        console.log("then calculate clt 1: ", data.ballX, data.ballY)
        
        room.clientTwoSocket.emit('customEventDataResponseBall', data)
        data.ballX = 400 - room.container.ball.ballX;
        console.log("then calculate clt 2: ", data.ballX, data.ballY)
        room.clientOneSocket.emit('customEventDataResponseBall', data)
      }
    }
  }

  handleDisconnect(client: Socket) 
  {
    const room : Rooms = getRoomByClientId(client.id);

    if (room) 
    {
      // Clear data or perform cleanup when a client disconnects
      clearRoom(room);
    }

    // Handle WebSocket disconnections here
    console.log(`WebSocket connection closed`);
    client.disconnect(); // Handle WebSocket disconnections here
  }
}


// websocket.gateway.ts
import GameContainer from './component/gamecontainer';
import Ball from './component/ball';

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import  join from 'socket.io-client';
import  leave from 'socket.io-client';

//let data : GameContainer;

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
  clientOneId : string;
  clientTwoId : string; 
  clientOneSocket : Socket;
  clientTwoSocket : Socket;
  numberOfClients : number;
};

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


  @SubscribeMessage('customEventDataRequest') // Listen for the 'customEventDataRequest' event
  handleCustomEvent(client: Socket, data: GameContainer) 
  {
    //let leftRacket = new Racket(data, true, false);
    //let rightRacket = new Racket(data, true , true);
    //let ball = new Ball(leftRacket, rightRacket);
    const room : Rooms = getRoomByClientId(client.id);
    if (!room) 
    {
      console.log(`Client ${client.id} is not in a room.`);
      return;
    }
    if (room.numberOfClients === 2)
    {
      if (room.clientOneSocket === client)
      {
        if (data.clientOne === false)
          console.log("recieve a request from1 ", client.id);
        data.clientOne = true;
        data.clientTwo = false;
      }
      if (room.clientTwoSocket === client)
      {  
        if (data.clientTwo === false)
          console.log("recieve a request from2 ", client.id);
        data.clientOne = false;
        data.clientTwo = true;
      }
      let ball = new Ball();
      data.loading = false;
      if (data.init)
      {
        ball.ballX = data.ballX;
        ball.ballY = data.ballY;
        ball.ballWH = data.ballWH;
        ball.width = data.width;
        ball.height = data.height;
        ball.ballAngle = data.ballAngle;
        ball.ballDirection = data.ballDirection;
        ball.ballFirst50Time = data.ballFirst50Time;
        ball.ballFirstMove = data.ballFirstMove;
        ball.ballSpeed = data.ballSpeed;
        ball.goalRestart = data.goalRestart;


        ball.drawAndMove(data);
          
        data.ballX = ball.ballX;
        data.ballY = ball.ballY;
        data.ballWH = ball.ballWH;
        data.ballAngle = ball.ballAngle;
        data.ballFirst50Time = ball.ballFirst50Time;
        data.ballFirstMove = ball.ballFirstMove;
        data.ballDirection = ball.ballDirection;
        data.ballSpeed = ball.ballSpeed;
        data.goalRestart = ball.goalRestart;

      }
      // You can also broadcast the data to all connected clients if needed
      //this.server.emit('customEventDataResponse', data);
      //client.emit('customEventDataResponse', data);
      room.clientOneSocket.emit('customEventDataResponse', data);
      room.clientTwoSocket.emit('customEventDataResponse', data);
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


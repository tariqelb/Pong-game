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



//@WebSocketGateway(4056,{ path: '/game-container', transports: ['websocket'] })
//@WebSocketGateway(4056,{ /*namespace: '/socket.io',*/ transports: ['websocket'] })
//if port not set it takes the port that the server listening on
@WebSocketGateway({ path : '/game-container', transports: ['websocket'] })
export class MyWebSocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  handleConnection(client: Socket) 
  {
    const clientAddress = client.handshake.headers['x-forwarded-for'] || client.handshake.address;
    let playerNumber : number = 0;
    
    //logs
    console.log(`WebSocket connection from ${clientAddress} client id : ${client.id}`);
    if (client.connected)
      console.log(`WebSocket connection established for client from ${clientAddress}`);
    
    
    addToRoom(client);
    let room : Rooms = getRoomByClientId(client.id);
    
    if (room.clientOneSocket == client)
      playerNumber = 1;
    else
      playerNumber = 2;
    client.emit('getPlayerNumber', playerNumber);
  }

  afterInit() 
  {
    console.log('WebSocket server initialized');
  }


  @SubscribeMessage('customEventDataRequestRacket') // Listen for the 'customEventDataRequest' event
  handleCustomEventRacket(client: Socket, data: SentRacketData) 
  {
    let room : Rooms = getRoomByClientId(client.id);
    
    if (room && room.numberOfClients === 2 && room.clientTwoSocket === client)
    {
      room.container.lRacketX = 0;
      room.container.lRacketY = data.racketY  / data.height * 200;
      room.container.lRacketW = 5;
      room.container.lRacketH = 50;
      room.container.lLastPosY = data.lastPosY / data.height * 200;
      room.clientTwoWidth = data.width;
      room.clientOneSocket.emit('customEventDataResponseRacket', data);
    }
    else if (room && room.numberOfClients === 2 && room.clientOneSocket === client)
    {
      room.container.rRacketX = 395;
      room.container.rRacketY = data.racketY  / data.height * 200;
      room.container.rRacketW = 5;
      room.container.rRacketH = 50;
      room.container.rLastPosY = data.lastPosY / data.height * 200;
      room.clientTwoSocket.emit('customEventDataResponseRacket', data);
      room.getBothRacketData = true;
    }
  }
  
  @SubscribeMessage('customEventDataRequestBall')
  handleCustomEventBall(client: Socket)
  {
    let data: RecieveBallData = new RecieveBallData();
    let room : Rooms = getRoomByClientId(client.id);
    
    if (!room) 
    {
      console.log(`Client ${client.id} is not in a room.`);
      return;
    }
    if (room.numberOfClients === 2)
    {
      if (room.getBothRacketData)
      {
        room.container.ball.drawAndMove(room.container);
        
        data.ballX = room.container.ball.ballX;
        data.ballY = room.container.ball.ballY;
        data.ballWH = room.container.ball.ballWH;
        data.ballDirection = room.container.ball.ballDirection;
        data.ballSpeed = room.container.ball.ballSpeed;
        data.goalRestart = room.container.ball.goalRestart;
        data.ballAngle = room.container.ball.ballAngle;
        room.clientOneSocket.emit('customEventDataResponseBall', data)
        //server virtual canvas (400,200)
        data.ballX = 400 - room.container.ball.ballX;
        if (data.ballAngle > 400)
         data.ballAngle = data.ballAngle - 400;
        data.ballDirection = !data.ballDirection;
        if (data.ballAngle >= 0 && data.ballAngle < 100)
          data.ballAngle += 300;
        if (data.ballAngle >= 100 && data.ballAngle < 200)
          data.ballAngle += 100;
        if (data.ballAngle >= 200 && data.ballAngle < 300)
          data.ballAngle -= 100; 
        if (data.ballAngle >= 300 && data.ballAngle <= 400)
          data.ballAngle -= 300;
        room.clientTwoSocket.emit('customEventDataResponseBall', data)
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


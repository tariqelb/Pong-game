// websocket.gateway.ts
import GameContainer from './component/gamecontainer';
import Racket from './component/racket';
import Ball from './component/ball';

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

//let data : GameContainer;


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
    console.log(`WebSocket connection from ${clientAddress}`);
    // You can perform any necessary initialization or validation here
    if (client.connected)
      console.log(`WebSocket connection established for client from ${clientAddress}`);
  }

  afterInit() 
  {
    console.log('WebSocket server initialized');
  }


  @SubscribeMessage('customEventDataRequest') // Listen for the 'customEventDataRequest' event
  handleCustomEvent(client: Socket, data: GameContainer) 
  {
    // Handle the received data here
    //console.log('Received custom event on the server:', data);
    //console.log("data : ",  data.init);
    let leftRacket = new Racket(data, true, false);
    let rightRacket = new Racket(data, true , true);
    let ball = new Ball(leftRacket, rightRacket);
    
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

    ball.rightRacket.lastPositionOfRacketY = data.rLastPosY;
    ball.rightRacket.racketH = data.rRacketH;
    ball.rightRacket.racketW = data.rRacketW; 
    ball.rightRacket.racketX = data.rRacketX;
    ball.rightRacket.racketY = data.rRacketY;
    ball.leftRacket.lastPositionOfRacketY = data.lLastPosY;
    ball.leftRacket.racketH = data.lRacketH;
    ball.leftRacket.racketW = data.lRacketW; 
    ball.leftRacket.racketX = data.lRacketX;
    ball.leftRacket.racketY = data.lRacketY;

    ball.rightRacket.startOfSimulation = data.rightStartOfSimulation;
    ball.rightRacket.coordinateAlreadyGot = data.rightVBallCoordinate;
    ball.rightRacket.racketVibrationUpDown = data.rightRacketVibration;
    ball.leftRacket.startOfSimulation = data.leftStartOfSimulation;
    ball.leftRacket.coordinateAlreadyGot = data.leftVBallCoordinate;
    ball.leftRacket.racketVibrationUpDown = data.leftRacketVibration
    ball.leftRacket.randomRebound = data.leftRandomRebound;
    ball.leftRacket.virtualBallX = data.leftVBallX;
    ball.leftRacket.virtualBallY = data.leftVBallY;
    ball.leftRacket.virtualBallWH = data.leftVBallWH;
    ball.rightRacket.virtualBallX = data.rightVBallX;
    ball.rightRacket.virtualBallY = data.rightVBallY;
    ball.rightRacket.virtualBallWH = data.rightVBallWH;
    ball.rightRacket.randomRebound = data.rightRandomRebound;
    //ball.rightRacket.MoveRacketWithKeyBoard(data);
    //ball.rightRacket.drawAndMoveRacketWithMouse(data);
    //ball.leftRacket.drawAndMoveRacketWithMouse(data);
    ball.leftRacket.automaticRacket(data)
    ball.rightRacket.automaticRacket(data);
    ball.drawAndMove(data.width, data.height);
      
      //console.log("af " , ball.ballX, ball.ballY)
    data.ballX = ball.ballX;
    data.ballY = ball.ballY;
    data.ballWH = ball.ballWH;
    data.ballAngle = ball.ballAngle;
    data.ballFirst50Time = ball.ballFirst50Time;
    data.ballFirstMove = ball.ballFirstMove;
    data.ballDirection = ball.ballDirection;
    data.ballSpeed = ball.ballSpeed;

    data.rLastPosY = ball.rightRacket.lastPositionOfRacketY
    data.rRacketH = ball.rightRacket.racketH;
    data.rRacketW = ball.rightRacket.racketW;
    data.rRacketX = ball.rightRacket.racketX;
    data.rRacketY = ball.rightRacket.racketY;
    data.lLastPosY = ball.leftRacket.lastPositionOfRacketY
    data.lRacketH = ball.leftRacket.racketH;
    data.lRacketW = ball.leftRacket.racketW;
    data.lRacketX = ball.leftRacket.racketX;
    data.lRacketY = ball.leftRacket.racketY;

    data.rightRacketVibration = ball.rightRacket.racketVibrationUpDown;
    data.rightVBallCoordinate = ball.rightRacket.coordinateAlreadyGot;
    data.rightStartOfSimulation = ball.rightRacket.startOfSimulation;
    data.leftRacketVibration = ball.leftRacket.racketVibrationUpDown;
    data.leftVBallCoordinate = ball.leftRacket.coordinateAlreadyGot;
    data.leftStartOfSimulation = ball.leftRacket.startOfSimulation;
    data.rightVBallX = ball.rightRacket.virtualBallX;
    data.rightVBallY = ball.rightRacket.virtualBallY;
    data.rightVBallWH = ball.rightRacket.virtualBallWH;
    data.leftRandomRebound = ball.leftRacket.randomRebound;
    data.leftVBallX = ball.leftRacket.virtualBallX;
    data.leftVBallY = ball.leftRacket.virtualBallY;
    data.leftVBallWH = ball.leftRacket.virtualBallWH;
    data.rightRandomRebound = ball.rightRacket.randomRebound;
    }
    // You can also broadcast the data to all connected clients if needed
    
    //data.dataIsReady = true;
    this.server.emit('customEventDataResponse', data);
  }

  handleDisconnect(client: Socket) 
  {
    // Handle WebSocket disconnections here
    console.log(`WebSocket connection closed`);
    client.disconnect();
    
    
  }
}


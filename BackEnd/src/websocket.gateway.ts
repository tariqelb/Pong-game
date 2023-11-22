// websocket.gateway.ts
import GameContainer from './component/gamecontainer';
import Ball from './component/ball';
import RacketData from './component/SentRacketData';

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import SentRacketData from './component/SentRacketData';
import RecieveBallData from './component/RecieveBallData';
import SentRobotRacket from './component/SentRobotRacket';
import Rooms from './component/room';
import Goals from './component/Goals';
import UserInfo from './component/UserInfo';
import { isAlreadyWaiting, addPlayerToWaitingList, findMatchigPlayer, updatePlayerObject, removePlayerFromWaitingList } from './component/waitingPlayers'
import { getRoomByMatchId, clearRoom, getRoomByClientId, findAvailableRoom , addToRoom , checkIfGameNotOver, addInfoSocketToRoom, getRoomByClientInfoSocket} from './component/room'; 


interface PlayersList
{
    playersInfo   : UserInfo;
    playersSocket : Socket;
}

let waitingPlayers : PlayersList[] = []

class infoObj
{
  ID : string = "";
  tabId : string = "";
}

let rooms : Rooms[] = [];



function startGame(room: Rooms) 
{
  if (room.clientOneSocket)
    room.clientOneSocket.emit('start-game', 'Game has started!');
  if (room.clientTwoSocket)
    room.clientTwoSocket.emit('start-game', 'Game has started!');
}


//@WebSocketGateway(4056,{ path:G '/game-container', transports: ['websocket'] })
//@WebSocketGateway(4056,{ /*namespace: '/socket.io',*/ transports: ['websocket'] })
//if port not set it takes the port that the server listening on
@WebSocketGateway({ path : '/game-container', transports: ['websocket'] })
export class MyWebSocketGateway implements OnGatewayInit ,OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  handleConnection(client: Socket, ...args: any[]) 
  {
    const clientAddress = client.handshake.headers['x-forwarded-for'] || client.handshake.address;
    let playerNumber : number = 0;
    const query = client.handshake.query;
    const matchId : string  = query.ID as string ; 
    const tabsId : string  = query.tabId as string ; 
    const waitingTabsId : string  = query.waitingTabsId as string ;

    // console.log("query : ", query)
    //logs
    // console.log(`WebSocket connection from ${clientAddress} client id : ${client.id}  id : `, matchId);
    // if (client.connected)
    //   console.log(`WebSocket connection established for client from ${clientAddress}`);
    if (waitingTabsId !== undefined && waitingTabsId.length)
    {
      if (isAlreadyWaiting(waitingPlayers, waitingTabsId) === false)
        addPlayerToWaitingList(waitingPlayers, waitingTabsId, client);
      // console.log("Add player to waiting list : ", waitingTabsId, ' nbr of plys now :',  waitingPlayers.length);
    }
    if (matchId && matchId.length && matchId[0] !== 'A') 
    {
      addToRoom(rooms, client, matchId, tabsId);
      let room : Rooms = getRoomByClientId(rooms, client.id);
    
      if (room.clientOneSocket == client)
        playerNumber = 1;
      else
        playerNumber = 2;
    
      // console.log("nbr clt : ",room.numberOfClients)
      if (client)
        client.emit('getPlayerNumber', playerNumber);
    }
    //play with robot case
    if (matchId && matchId.length && matchId.substring(0, 5) === 'robot')
    {
      playerNumber = 1
      addToRoom(rooms, client, matchId, tabsId);
      let room : Rooms = getRoomByClientId(rooms, client.id)
      room.numberOfClients = 3;
      if (client)
      client.emit('getPlayerNumber', playerNumber);
    }
    // if (matchId && matchId[0] === 'A')
    // {
    //   console.log("the socket")
    //   addInfoSocketToRoom(rooms, client, matchId.substring(1, matchId.length));
    // }
  }
  
  afterInit() 
  {
    console.log('WebSocket server initialized');
  }
//--------------------------------------- start of events come from wainting component -------
  @SubscribeMessage('updatePlayerObject')
  handlePlayerObject(client: Socket, obj : UserInfo)
  {
    updatePlayerObject(waitingPlayers, obj)
  }

  @SubscribeMessage('matchingRequest')
  handleMatchingRequest(client : Socket, obj : UserInfo)
  {
    let findPlayer : PlayersList | undefined = undefined
    let caller : PlayersList ;
    let matchId : string = "";
    
    if (waitingPlayers.length)
      findPlayer =  (findMatchigPlayer(waitingPlayers, obj))
    if (findPlayer !== undefined)
    {
      matchId = (Math.floor(Math.random() * 10000) + 1).toString() + Date.now().toString();
      findPlayer.playersInfo.matchId = matchId;
      obj.matchId = matchId;
      console.log('the match id is : ', matchId)
      findPlayer.playersInfo.socket = null;
      if (client)
        client.emit('machingResponse', findPlayer.playersInfo);
      obj.socket = null;
      if (findPlayer.playersSocket)
        findPlayer.playersSocket.emit('machingResponse', obj);
      waitingPlayers = removePlayerFromWaitingList(waitingPlayers, findPlayer.playersSocket);
      waitingPlayers = removePlayerFromWaitingList(waitingPlayers, client);
      client.disconnect();
      findPlayer.playersSocket.disconnect();
    }
    else if (client)
      client.emit('machingResponse', findPlayer);
  }

//_______________________________________ End of events  come from waiting component _________


//--------------------------------------- start of events come from info component

  @SubscribeMessage('customGoalsEvent') // Listen for the 'customEventDataRequest' event
  handleGoalsEvent(client: Socket, obj : infoObj )//matchId : string)//, tabsId : string) 
  {
      //  console.log("match id : ", obj)
      let room = getRoomByMatchId(rooms, obj.ID.substring(1, obj.ID.length));
      if (room !== undefined && room.numberOfClients === 2)
      {
        let goal : Goals = new Goals();
        if (room.clientOneTabId === obj.tabId)
        {
          goal.leftPlayerGoals = room.container.leftPlayerGoal;
          goal.rightPlayerGoals = room.container.rightPlayerGoal;
          goal.playerNumber = 1;
          if (room.clientOneInfoSocket === null)
            room.clientOneInfoSocket = client;
        }
        else
        {
          goal.leftPlayerGoals = room.container.rightPlayerGoal;
          goal.rightPlayerGoals = room.container.leftPlayerGoal;
          goal.playerNumber = 2;
          if (room.clientTwoInfoSocket === null)
            room.clientTwoInfoSocket = client;
        }
        if (client)
          client.emit('goalsEvent', goal)
        // room.clientOneInfoSocket.emit('playerLeaveTheGame')
        // room.clientTwoInfoSocket.emit('playerLeaveTheGame')
      }
      else if (room !== undefined && room.numberOfClients === 3)
      {
        let goal : Goals = new Goals();

        goal.leftPlayerGoals = room.container.leftPlayerGoal;
        goal.rightPlayerGoals = room.container.rightPlayerGoal;
        goal.playerNumber = 1;
        if (room.clientOneInfoSocket === null)
            room.clientOneInfoSocket = client;
        if (client)
          client.emit('goalsEvent', goal)
      }
  }

//____________________________________ end of event come from info component

//------------------------------------ start of event come from App (game) component  
  @SubscribeMessage('customEventDataRequestRacket') // Listen for the 'customEventDataRequest' event
  handleCustomEventRacket(client: Socket, data: SentRacketData) 
  {
    let room : Rooms = getRoomByClientId(rooms, client.id);
    
    if (room && room.numberOfClients === 2 && room.clientTwoSocket === client)
    {
      room.container.lRacketX = 0;
      room.container.lRacketW = 5;
      room.container.lRacketH = 50;
      room.container.lRacketY = data.lastPosY  / data.height * 200;
      room.container.lLastPosY = data.lastPosY / data.height * 200;
      room.clientTwoWidth = data.width;
      if (room.clientOneSocket)
        room.clientOneSocket.emit('customEventDataResponseRacket', data);
    }
    else if (room && room.numberOfClients === 2 && room.clientOneSocket === client)
    {
      room.container.rRacketX = 395;
      room.container.rRacketW = 5;
      room.container.rRacketH = 50;
      room.container.rRacketY = data.lastPosY / data.height * 200;
      room.container.rLastPosY = data.lastPosY / data.height * 200;
      if (room.clientTwoSocket)
        room.clientTwoSocket.emit('customEventDataResponseRacket', data);
      room.getBothRacketData = true;
    }
  }

  @SubscribeMessage('customEventRobotRacket')
  handleCustomRobotRacket(client: Socket, data: SentRobotRacket)
  {
    let room : Rooms = getRoomByClientId(rooms, client.id);
    if (room && room.clientOneSocket === client && room.numberOfClients === 3)
    {
      room.container.lRacketX = 0;
      room.container.lRacketW = 5;
      room.container.lRacketH = 50;
      room.container.rRacketX = 395;
      room.container.rRacketW = 5;
      room.container.rRacketH = 50;
      room.container.lRacketY =  data.robotLastPosY  / data.height * 200;
      room.container.lLastPosY =  data.robotLastPosY / data.height * 200; 
      room.container.rRacketY = data.lastPosY  / data.height * 200; 
      room.container.rLastPosY = data.lastPosY / data.height * 200;  
      room.clientTwoWidth = data.width;
      room.getBothRacketData = true;
    }
  }
  
  @SubscribeMessage('customEventDataRequestBall')
  handleCustomEventBall(client: Socket, goalStart : boolean)
  {
    let data: RecieveBallData = new RecieveBallData();
    let room : Rooms = getRoomByClientId(rooms, client.id);
    
    // console.log( 'event is reached', room)
    if (!room) 
    {
      return;
    }
    if (room.numberOfClients === 2 || room.numberOfClients === 3)
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
        data.leftPlayerGoal = room.container.leftPlayerGoal;
        data.rightPlayerGoal = room.container.rightPlayerGoal;
        if (room.clientOneSocket)
          room.clientOneSocket.emit('customEventDataResponseBall', data)
        if (room.clientTwoSocket)
          room.clientTwoSocket.emit('customEventDataResponseBall', data)
      }
    }
  }

  handleDisconnect(client: Socket) 
  {
    let room : Rooms = getRoomByClientId(rooms, client.id);

    // App player disconnected
    if (room) 
    {
      clearRoom(rooms, room, client);
    }

    // info player disconnected
    room = getRoomByClientInfoSocket(rooms, client)
    if (room)
    {
      console.log("info leave")
      if (room.clientOneInfoSocket === client)
      {
        console.log("info leave p1")
        if (room.clientTwoInfoSocket)
          room.clientTwoInfoSocket.emit('playerLeaveTheGame')
      }
      else if (room.clientTwoInfoSocket === client)
      {
        console.log("info leave p2")
        if (room.clientOneInfoSocket)
          room.clientOneInfoSocket.emit('playerLeaveTheGame')
      }
    }



    //romeve player from waiting list
    if (waitingPlayers.find( (ply) => ply.playersSocket === client))
    {
      let tmpList : PlayersList[] = [];
      let i : number = 0;
      let size : number = 0;

      console.log("before remove the length is ", waitingPlayers.length)
      while (i < waitingPlayers.length)
      {
          if (waitingPlayers[i].playersSocket !== client)
              tmpList.push(waitingPlayers[i]);
          i++;
      }
      
      i = -1
      size = waitingPlayers.length;
      while (++i < size)
        waitingPlayers.pop();
      
      i = -1;
      while (++i < tmpList.length)
        waitingPlayers.push(tmpList[i]);

      console.log("Waiting list size : ", waitingPlayers.length)
    }


    // Handle WebSocket disconnections here
    console.log(`WebSocket connection closed-------->`);
    client.disconnect(); // Handle WebSocket disconnections here
  }
}
//___________________ End of event come from App component

export { waitingPlayers };
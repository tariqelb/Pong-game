import { io, Socket } from 'socket.io-client';
import { gameCapsule } from '../components/mySketch';
import  GameContainer  from '../components/gamecontainer';

// Define the URL of your WebSocket server
const serverUrl: string = 'ws://localhost:4055';

// Generate a unique identifier for this tab (you can use a library like uuid)
const tabId = generateUniqueTabId();

// Define the type for custom event data (you can modify this type according to your data structure)
interface CustomEventData 
{
  message: string ;
}

// Define a unique namespace or room name for this tab
//const namespace: string = `/tab-${tabId}`; 

//const namespace: string = 'game-container'; 


let socket: Socket | null;
socket = io(serverUrl, {
  path: '/game-container',
  transports: ['websocket'],
  });

let sendDataToServer =  () =>
{
  if (socket && gameCapsule.init)
    socket.emit('customEventDataRequest', gameCapsule);
}

if (socket)
{
  //send data to the server
  //socket.emit("customEventDataRequest", gameCapsule);
  setInterval(sendDataToServer, 50);
 
  socket.on('customEventDataResponse', (data : GameContainer) => 
  {
    //console.log(`Connected to WebSocket server in tab ${tabId}`);
    gameCapsule.ballAngle = data.ballAngle;
    gameCapsule.ballDirection = data.ballDirection;
    gameCapsule.ballFirstMove = data.ballFirstMove;
    gameCapsule.ballFirst50Time = data.ballFirst50Time;
    gameCapsule.ballWH = data.ballWH;
    gameCapsule.ballX =  data.ballX;
    gameCapsule.ballY = data.ballY;
    gameCapsule.ballWH = data.ballWH;
    gameCapsule.ballSpeed = data.ballSpeed;
    gameCapsule.goalRestart = data.goalRestart;
    gameCapsule.rRacketH = data.rRacketH;
    gameCapsule.rRacketW = data.rRacketW;
    gameCapsule.rRacketX = data.rRacketX;
    gameCapsule.rRacketY = data.rRacketY;
    gameCapsule.rLastPosY = data.rLastPosY;
    gameCapsule.lRacketH = data.lRacketH;
    gameCapsule.lRacketW = data.lRacketW;
    gameCapsule.lRacketX = data.lRacketX;
    gameCapsule.lRacketY = data.lRacketY;
    gameCapsule.lLastPosY = data.lLastPosY;
    gameCapsule.goalRestart = data.goalRestart;
    gameCapsule.leftStartOfSimulation = data.leftStartOfSimulation;
    gameCapsule.leftVBallCoordinate = data.leftVBallCoordinate;
    gameCapsule.leftRacketVibration = data.leftRacketVibration;
    gameCapsule.leftVBallX = data.leftVBallX;
    gameCapsule.leftVBallY = data.leftVBallY;
    gameCapsule.leftVBallWH = data.leftVBallWH;
    gameCapsule.leftRandomRebound = data.leftRandomRebound;
    gameCapsule.rightStartOfSimulation = data.rightStartOfSimulation;
    gameCapsule.rightVBallCoordinate = data.rightVBallCoordinate;
    gameCapsule.rightRacketVibration = data.rightRacketVibration;
    gameCapsule.rightVBallX = data.rightVBallX;
    gameCapsule.rightVBallY = data.rightVBallY;
    gameCapsule.rightVBallWH = data.rightVBallWH;
    gameCapsule.rightRandomRebound = data.rightRandomRebound;
  });
  
  
  
  console.log("after :", socket, gameCapsule);
  
  
  socket.on('connect', () => {
    console.log(`Connected to WebSocket server in tab id ${tabId}`);
  });
  
  socket.on('disconnect', () => {
    console.log(`Disconnected from WebSocket server in tab ${tabId}`);
  });

  socket.on('connect_error', (error) => {
    console.error('Error connecting to the WebSocket server:', error.cause, error.message, error.name , error.stack);
  });

  socket.on('connect_timeout', (timeout) => {
    console.error('Connection to the WebSocket server timed out:', timeout);
  });

}
// Function to generate a unique tab identifier
function generateUniqueTabId(): string 
{
  // You can implement your own logic here to generate a unique ID
  // For simplicity, you can use a timestamp
  return Date.now().toString();
}
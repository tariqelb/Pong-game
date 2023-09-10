import { io, Socket } from 'socket.io-client';
import { gameCapsule } from '../components/mySketch';
import  GameContainer  from '../components/gamecontainer';

// Define the URL of your WebSocket server
const serverUrl: string = 'ws://localhost:4056';

// Generate a unique identifier for this tab (you can use a library like uuid)
const tabId = generateUniqueTabId();

// Define the type for custom event data (you can modify this type according to your data structure)
interface CustomEventData 
{
  message: string ;
}

// Define a unique namespace or room name for this tab
//const namespace: string = `/tab-${tabId}`; 

const namespace: string = 'game-container'; 


let socket: Socket | null;
socket = io(serverUrl/* + namespace*/, {
  
  //path: '/game-container/',
  transports: ['websocket'],
  });

  let sendRequest = () => 
  {
    if (socket && gameCapsule.init)
      socket.emit("customEventDataRequest", gameCapsule);
    setTimeout(sendRequest, 100); // Send request every 0.5 seconds
  }

if (socket)
{
  //send data to the server
  
  socket.on('customEventDataResponse', (data : GameContainer) => 
  {
    console.log(`Connected to WebSocket server in tab ${tabId}`);
    gameCapsule.ballX = data.ballX;
    gameCapsule.ballY = data.ballY;
    gameCapsule.ballWH = data.ballWH;
    gameCapsule.ballFirst50Time = data.ballFirst50Time;
    gameCapsule.ballAngle = data.ballAngle;
    gameCapsule.ballSpeed = data.ballSpeed;
    gameCapsule.ballDirection = data.ballDirection;
    gameCapsule.ballFirstMove = data.ballFirstMove;
  });
  
  
  
  //console.log("after :", socket, gameCapsule);
  
  sendRequest();
  
  socket.on('connect', ()=>  {
    console.log(`Connected to WebSocket server in tab id ${tabId}`);
  });
  
  socket.on('disconnect', () => {
    console.log(`Disconnected from WebSocket server in tab ${tabId}`);
    gameCapsule.init = false;
    gameCapsule.ballX = 0;
    gameCapsule.ballY = 0;
    gameCapsule.ballWH = 0;
    gameCapsule.ballDirection = undefined;
    gameCapsule.ballFirst50Time = 0;
    gameCapsule.ballSpeed = 0;
    gameCapsule.ballFirstMove = true;
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

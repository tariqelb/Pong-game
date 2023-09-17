import './App.css';
import React, { useEffect } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { io, Socket } from 'socket.io-client';
import MySketch from '../components/mySketch';
import GameContainer from '../components/gamecontainer';
//import { gameCapsule } from '../components/mySketch';


const serverUrl: string = 'ws://localhost:4055';

function App() 
{
  let gameCapsule: GameContainer = new GameContainer();
  const tabId = generateUniqueTabId();
  let socket: Socket | null = null;

  // Function to generate a unique tab identifier
  function generateUniqueTabId(): string {
    return Date.now().toString();
  }

  // Function to send data to the server
  const sendDataToServer = () => {
    if (socket && gameCapsule.init) {
      socket.emit('customEventDataRequest', gameCapsule);
    }
  };

  // Function to handle WebSocket events
  const setupSocket = () => {
    socket = io(serverUrl, { path: '/game-container', transports: ['websocket'] });

    socket.on('connect', () => {
      console.log(`Connected to WebSocket server in tab id ${tabId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from WebSocket server in tab ${tabId}`);
    });

    socket.on('customEventDataResponse', (data: GameContainer) => 
    {
      console.log(`send response to server : ${tabId}`);
      gameCapsule.ballAngle = data.ballAngle;
      gameCapsule.ballDirection = data.ballDirection;
      gameCapsule.ballFirstMove = data.ballFirstMove;
      gameCapsule.ballFirst50Time = data.ballFirst50Time;
      gameCapsule.ballWH = data.ballWH;
      gameCapsule.ballX =  data.ballX;
      gameCapsule.ballY = data.ballY;
      gameCapsule.ballWH = data.ballWH;
      gameCapsule.ballSpeed = data.ballSpeed;
      
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
      gameCapsule.loading = data.loading;
      gameCapsule.clientOne = data.clientOne;
      gameCapsule.clientTwo = data.clientTwo
    });

    socket.on('connect_error', (error) => {
      console.error('Error connecting to the WebSocket server:', error.cause, error.message, error.name, error.stack);
    });

    socket.on('connect_timeout', (timeout) => {
      console.error('Connection to the WebSocket server timed out:', timeout);
    });
  };

  useEffect(() => {
    setupSocket(); // Initialize WebSocket when the component mounts

    const intervalId = setInterval(sendDataToServer, 50);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
      if (socket) {
        socket.disconnect(); // Close the WebSocket connection
      }
    };
  }, []); // Use an empty dependency array to run this effect only once

  return (
    <ReactP5Wrapper sketch={(p5) => MySketch(gameCapsule, p5)} />
  );
}

export default App;
//export { gameCapsule };


/*
//import { gameCapsule } from '../components/mySketch';
import { io, Socket } from 'socket.io-client';
import { gameCapsule } from '../components/mySketch';
import  GameContainer  from '../components/gamecontainer';

const serverUrl: string = 'ws://localhost:4055';

function App() {

  let socket: Socket | null;
  socket = io(serverUrl, { path: '/game-container', transports: ['websocket'] });

  let sendDataToServer =  () =>
  {
    if (socket && gameCapsule.init)
      socket.emit('customEventDataRequest', gameCapsule);
  }

  function generateUniqueTabId(): string 
  {
    // You can implement your own logic here to generate a unique ID
    // For simplicity, you can use a timestamp
    return Date.now().toString();
  }
  const tabId = generateUniqueTabId();

  if (socket)
  {
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
    });
  
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

  return (
    <ReactP5Wrapper sketch={MySketch} />
  );
}

export default App;*/
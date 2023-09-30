import './App.css';
import React, { useEffect } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { io, Socket } from 'socket.io-client';
import MySketch from '../components/mySketch';
import GameContainer from '../components/gamecontainer';
import SentRacketData from '../components/SentRacketData';
import RecieveBallData from '../components/RecieveBallData';

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
  const sendDataToServer = () => 
  {
    if (socket && gameCapsule.init) 
    {
      socket.emit('customEventDataRequestBall');
      socket.emit('customEventDataRequestRacket', gameCapsule.sentRacket);
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

    socket.on('customEventDataResponseBall', (data : RecieveBallData) =>
    {
      //console.log(`get response from server : ${tabId}`, gameCapsule.ball.ballX, gameCapsule.ball.ballY, data.ballX, data.ballY);
        gameCapsule.ball.ballX = data.ballX;
        gameCapsule.ball.ballY = data.ballY;
        gameCapsule.ball.ballWH = data.ballWH;
        gameCapsule.ball.ballDirection = data.ballDirection;
        gameCapsule.ball.ballSpeed = data.ballSpeed;
        gameCapsule.ball.goalRestart = data.goalRestart;
        gameCapsule.ball.ballAngle = data.ballAngle;
        
        if (gameCapsule.ball.goalRestart)
          gameCapsule.init = false;
    });
    socket.on('customEventDataResponseRacket', (data: SentRacketData) => 
    {
        gameCapsule.recvRacket.lastPosY = data.lastPosY;
        gameCapsule.recvRacket.width = data.width;
        gameCapsule.recvRacket.height = data.height;
    });

    socket.on('getPlayerNumber', (plyNumber) =>
    {
        gameCapsule.playerNumber = plyNumber;
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

    const intervalId = setInterval(sendDataToServer, 10);

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
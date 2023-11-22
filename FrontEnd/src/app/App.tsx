/*



import './App.css';
import React, { useEffect, useState } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { io, Socket } from 'socket.io-client';
import MySketch from '../components/mySketch';
import GameContainer from '../components/gamecontainer';
import SentRacketData from '../components/SentRacketData';
import RecieveBallData from '../components/RecieveBallData';

// import { gameCapsule } from '../components/mySketch';

const serverUrl: string = 'ws://localhost:4055';

function App() {
  let gameCapsule: GameContainer = new GameContainer();
  const tabId = generateUniqueTabId();
  let socket: Socket | null = null;

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to generate a unique tab identifier
  function generateUniqueTabId(): string {
    return Date.now().toString();
  }

  // Function to send data to the server
  const sendDataToServer = () => {
    if (socket && gameCapsule.init) {
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

    // ... rest of your socket setup code ...

    socket.on('connect_timeout', (timeout) => {
      console.error('Connection to the WebSocket server timed out:', timeout);
    });
  };

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement; // Fullscreen the entire page
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } 
      // else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen();
      // }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      //  else if (element.mozRequestFullScreen) {
      //   element.mozRequestFullScreen();
      // } else if (element.webkitRequestFullscreen) {
      //   element.webkitRequestFullscreen();
      // } else if (element.msRequestFullscreen) {
      //   element.msRequestFullscreen();
      // }
    }
    setIsFullscreen(!isFullscreen);
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
    <div>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </button>
      <ReactP5Wrapper sketch={(p5) => MySketch(gameCapsule, p5)} />
    </div>
  );
}

export default App;




*/

import * as p5 from 'p5'
import p5Types, { Image } from 'p5';

import './App.css';
import React, { useEffect, useState } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { io, Socket } from 'socket.io-client';
import MySketch from '../components/mySketch';
import GameContainer from '../components/gamecontainer';
import SentRacketData from '../components/SentRacketData';
import RecieveBallData from '../components/RecieveBallData';
import UserInfo from './UserInfo';
// import { tabId } from './ParentComponent';
// import { userInfo1, userInfo2 } from './ParentComponent';


// Function to generate a unique tab identifier
function generateUniqueTabId(): string 
{
  return Date.now().toString();
}
const tabId = generateUniqueTabId();

// let userInfo1 : UserInfo = new UserInfo(tabId,"", 100, 1, "hunter x111", "kilua.jpg", "kilua.jpg", 20, 1520, 22, 152, 14, 3);
// let userInfo2 : UserInfo = new UserInfo(tabId,"", 100, 1, "machi +", "mahi.jpg", "machi.jpg", 20, 1520, 22, 152, 14, 3);


// let playerOne : UserInfo = new UserInfo(tabId, "", 200, 1, "hunter X111", "kilua.jpg", "", 0, 0, 0, 0, 0, 0);
// let playerTwo : UserInfo = new UserInfo(tabId, "", 300, 2, "machi +", "machi.jpg", "", 0, 0, 0, 0, 0, 0);



// userInfo1.matchId = (Math.floor(Math.random() * 1) + 1).toString();
// console.log("MatchId : ", userInfo1.matchId);

const serverUrl: string = 'ws://localhost:4055';
interface AppProps
{
  gameCapsule : GameContainer;
  playerOne : UserInfo;
  playerTwo : UserInfo;
}


function App({ gameCapsule, playerOne, playerTwo  }: AppProps ) 
{


  function forcePortrait() 
  {
    if (typeof window.screen !== 'undefined')
    {
      if (window.screen.orientation)
      {
        window.screen.orientation.lock('portrait');
      }
    }
  }

  // Call the function on page load
  window.addEventListener('load', forcePortrait);
  // console.log("Goals stat : ", goals.leftPlayerGoals, goals.rightPlayerGoals);

  // Function to update goals

  //let gameCapsule: GameContainer = new GameContainer();
  let socket: Socket | null = null;
  

  // Function to send data to the server
  const sendDataToServer = () => 
  {
    if (socket && gameCapsule.init) 
    {
      socket.emit('customEventDataRequestBall');
      if (playerOne.playWithRobot === false)
        socket.emit('customEventDataRequestRacket', gameCapsule.sentRacket);
      else if (playerOne.playWithRobot)
      {
        socket.emit('customEventRobotRacket', gameCapsule.robotRacket);
      }

    }
  };

  // Function to handle WebSocket events:
  const setupSocket = (ID : string, tabId : string) => {
    socket = io(serverUrl, { path: '/game-container'
    , transports: ['websocket'], query: { ID , tabId} });

    socket.on('connect', () => {
      console.log(`App Connected to WebSocket server in tab id ${tabId}`);
    });

    socket.on('disconnect', () => {
      console.log(`App Disconnected from WebSocket server in tab ${tabId}`);
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
        gameCapsule.leftPlayerGoals = data.leftPlayerGoal;
        gameCapsule.rightPlayerGoals = data.rightPlayerGoal;
        if (gameCapsule.ball.goalRestart)
          gameCapsule.init = false;
        // console.log("up : ", localGoal.leftPlayerGoals, localGoal.rightPlayerGoals, globalGoal.leftPlayerGoals, globalGoal.rightPlayerGoals)

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
        if (playerOne.playWithRobot)
          gameCapsule.playerNumber = 3;
        console.log("player Number is : ", plyNumber);
    });
    console.log('the goals : ', gameCapsule.leftPlayerGoals, gameCapsule.rightPlayerGoals)
    // if (gameCapsule.leftPlayerGoals === 5 || gameCapsule.rightPlayerGoals === 5)
    //   socket.disconnect();

    socket.on('connect_error', (error) => {
      console.error('Error connecting to the WebSocket server:', error.cause, error.message, error.name, error.stack);
    });

    socket.on('connect_timeout', (timeout) => {
      console.error('Connection to the WebSocket server timed out:', timeout);
    });
  };

  useEffect(() => {
    setupSocket(playerOne.matchId, playerOne.tabId); // Initialize WebSocket when the component mounts
    const intervalId = setInterval(sendDataToServer, 10);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
      if (socket) {
        socket.disconnect(); // Close the WebSocket connection
      }
    };
  }, []); // Use an empty dependency array to run this effect only once

 




  return (
    <ReactP5Wrapper sketch={(p5) => MySketch(gameCapsule, p5, playerOne, playerTwo)} />
  );
}

export default App;


// export { userInfo1 , userInfo2 };
export { tabId };
import MySketch from '../components/mySketch';
import './App.css';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState, useEffect } from 'react';
import GameContainer from '../components/gamecontainer';
import { gameCapsule } from '../components/mySketch';
/*
interface Data {
  result: unknown;
}

const getGameObject = (): RequestInit => {
  const requestObject: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameCapsule),
  };

  return requestObject;
};

const logData = async (): Promise<unknown> => 
{
  const requestOptions = getGameObject();
  try 
  {
    const response = await fetch("http://localhost:4011/game-container", requestOptions);
    const jsonData: JSON = await response.json();
    console.log("The jsona : ", jsonData);
    return jsonData;
  } 
  catch (error) 
  {
    console.error("Error fetching data:", error);
    throw error;
  }
};
*/
function App() 
{
/*  const [data, setData] = useState<Data>({ result: null });

  useEffect(() => {
    // Define the interval duration (e.g., every 5 seconds)
    const intervalDuration = 500; // 5000 milliseconds = 5 seconds

    // Create an interval that calls logData at the specified interval
    const intervalId = setInterval(() => 
    {
      logData().then((result) => 
      {
        setData({ result });
      }).catch((err) => 
        {
          console.log("Error fetching data:", err);
        });
    }, intervalDuration);

    // Cleanup the interval when the component unmounts
    return () => 
    {
      clearInterval(intervalId);
    };

  }, []);*/
  
  return (
    <ReactP5Wrapper sketch={MySketch} />
  );
}

export default App;








/*
import MySketch from '../components/mySketch'
import './App.css';
import { ReactP5Wrapper } from "@p5-wrapper/react";
//import  socket  from '../socket/connect';
import { useState, useEffect } from 'react';
//import websocketService from '../socket/webSocket';
import GameContainer from '../components/gamecontainer';



let gameCapsule : GameContainer = new GameContainer(); 

interface Data
{
  result : unknown;
}
//we create the object that will sent by fetch , inside it i  put ganeCapsule as json file that content  some data about the game canvas etc..
const getGameObject = (): RequestInit => {

  const requestObject: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameCapsule),
  };

  return requestObject;
};

const requestOptions = getGameObject();

/*async function logData() : Promise<unknown> {
  const response = await fetch("http://localhost:4011", requestOptions);
  const jnonaData : JSON = await response.json();
  console.log(jnonaData);
  return (response.json());
}*//*
const logData = async (): Promise<unknown> => {
  try {
    const response = await fetch("http://localhost:4011/game-container", requestOptions);
    const jsonData: JSON = await response.json();
    console.log("The jsona : ", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


function App() 
{
  const [data, setData] = useState<Data>({ result: null });

  useEffect(() => {
    // Fetch data from the NestJS backend when the component mounts
    logData().then((result) => {
    setData({ result });
    })
  //.then((res) => console.log(res))
  //.catch((err) => console.log("the error", err));


  }, []);

  return ( <ReactP5Wrapper  sketch={MySketch} />  );
}

export default App;

export { gameCapsule };*/
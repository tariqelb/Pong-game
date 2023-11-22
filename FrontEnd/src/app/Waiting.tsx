import './Waiting.css'
import UserInfo from './UserInfo';
import { io, Socket } from 'socket.io-client';
import { tabId as waitingTabsId } from './App'
import { useEffect , useState} from 'react';
import { Howl, Howler } from 'howler';

Howler.volume(1.0);
interface waitingProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo | undefined;
    updateRobotOpetion  : (val : boolean) => void;
    updateMatchId : (val : string)  => void;
    updatePlayerTwo : (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number ) => void;
}


let Waiting = ({ playerOne, playerTwo, updateRobotOpetion , updateMatchId, updatePlayerTwo } : waitingProps ) => 
{
    const serverUrl: string = 'ws://localhost:4055';
    let socket: Socket | null = null;
    let plyOneImg : HTMLElement | null = null;
    let plyTwoImg : HTMLElement | null = null;
    let PlayWithRobot : HTMLElement | null = null;
    let TheSwitch : boolean = false;
    let playersImages : string [] = ["broko.jpg", "flamingo.jpg", "franky.jpg", "Mihawk.jpg", "paji.jpg", "sabo.jpg", "usopp.jpg", "zoro.jpg", "ice.jpg", "bigMama.jpg", "illumi.jpg", "miluki.jpg", "pakunda.jpg", "shalnark.jpg", "shizuku.jpg", "corollo.jpg", "kurapika.jpeg", "sanji.jpg", "chopper.jpg", "nami.jpg", "luffy.jpg", "perona.jpg", "robin.jpg"];
    let index : number = 0;

    let slideSound = new Howl({
        src: ['/Sounds/slideImageSoundEffect.mp3'],
        onload: () => {
          console.log('Audio loaded successfully');
          // You can play the sound or perform other actions here
        },
        onloaderror: (error) => {
          console.error('Error loading audio:', error);
        },
      });
    
    plyOneImg  = document.getElementById("WaitingAvatarR1");
    plyTwoImg  = document.getElementById("WaitingAvatarR2");
    PlayWithRobot  = document.getElementById("robotReq");

    socket = io(serverUrl, { path: '/game-container', transports: ['websocket'], query: { waitingTabsId } });

    socket.on('connect', () => {
        console.log(`Connected to WebSocket server from waiting page`);
      });
  
    socket.on('disconnect', () => {
        console.log(`Waiting page disconnected from WebSocket server `);
      });

    socket.emit('updatePlayerObject', playerOne);

    socket.emit('matchingRequest', playerOne);

    socket.on('machingResponse', (player : UserInfo | undefined) : void =>
    {
        setTimeout(() => 
        {
            TheSwitch = true;
            setTimeout( () =>
            {
                if (player === null)
                {
                    plyTwoImg?.setAttribute('src', "question-mark.jpeg");
                    setTimeout(() => 
                    {
                        if (PlayWithRobot)
                            PlayWithRobot.style.display = 'inline-block';
                    }, 100);
                }
                else if (player)
                {
                    if (player)
                    updatePlayerTwo(player?.playWithRobot, player?.tabId, player?.matchId, 
                    player?.matchWager, player?.modePlaying, player?.userName, player?.userAvatar,
                    player?.userLogo , player?.matchWon, player?.bestWinStreak, player?.matchPlyed,
                    player?.level, player?.tournentPlayed, player?.tournentWon, player?.playWithMouse);
                    if (playerTwo)
                    {
                        plyTwoImg?.setAttribute('src', playerTwo.userAvatar);
                        console.log('The hidden match id is ', playerOne.matchId , playerTwo.matchId);
                        updateMatchId(playerTwo.matchId)
                    }
                }

            }, 500)
        }, 3000);// 3s for switching images 
    });    
    
    useEffect( () => 
    {
        const checkDocLoaded = () => 
        {
            if (plyOneImg === null)
            {
                setTimeout( () => 
                {
                    plyOneImg  = document.getElementById("WaitingAvatarR1");
                    plyTwoImg  = document.getElementById("WaitingAvatarR2");
                    PlayWithRobot  = document.getElementById("robotReq");
                    plyOneImg?.setAttribute('src', playerOne.userAvatar);
                }, 500);
            }
        }
        checkDocLoaded();

    }, [plyOneImg])

    useEffect ( () =>
    {
        const changeAvatar = () =>
        {

            if (TheSwitch !== true)
            {
                setTimeout( () => 
                {
                    plyTwoImg?.setAttribute('src', playersImages[index]);
                    slideSound.play();
                    index++;
                    if (index === playersImages.length)
                        index = 0;
                }, 100)
            }
            else
            {
                clearInterval(intervalId); 
            }
        }
        const intervalId = setInterval(changeAvatar, 100);

    }, [TheSwitch])
    
    document.addEventListener('DOMContentLoaded', function() 
    {
        plyOneImg?.setAttribute('src', playerOne.userAvatar);
        plyTwoImg?.setAttribute('src', "question-mark.jpeg");
    });

    let setRobotOpetion = (val : boolean) =>
    {
        updateRobotOpetion(val);
    }
    
    let hideRobotOpetiondiv = () =>
    {
        if (PlayWithRobot)
            PlayWithRobot.style.display = 'none';
    }


    return (
        <div className='WaitingContainer'>
            <div className='WaitingState'>
                <p>Wating for another player!</p>
            </div>
            <div className="WaitingVs">
                <div className="WaitingFlashLight"><p>VS</p></div>
            </div>
            <div className='WaitingCoins'>
                {/* <p>1000 &#128176;</p> */}
            </div>
            <div className='WaitingPlayer1'>
                <div className='WaitingPlyInside1'>
                    {/* <p className="winLose"> </p> */}
                    <div className="WaitingAvatarR1Cover">
                        <div className="WaitingAvatarR1"><img id="WaitingAvatarR2" src="question-mark.jpeg" alt="Avatar" ></img></div>
                    </div>
                    <div className='WaitingPlayerName1'>
                        <p>{playerTwo?.userName}</p>
                    </div>
                </div>
            </div>
            <div className='playWithRobot' id="robotReq" >
                <p>No player found online <br/>if you want to play with Robot click Yes <br/>otherwize you will wait until a new player come online</p>
                <div className='WaitingBtn'>
                    <button onClick={() => setRobotOpetion(true)}>Yes</button>
                    <button  onClick={ () => hideRobotOpetiondiv()}>No</button>
                </div>
            </div>
            <div className='WaitingPlayer2'>
                <div className='WaitingPlyInside2'>
                    {/* <p className="winLose">Winner</p> */}
                    <div className="WaitingAvatarR2Cover">
                        <div className="WaitingAvatarR2"><img id="WaitingAvatarR1" src="question-mark.jpeg" alt="Avatar"></img></div>
                    </div>
                    <div className='WaitingPlayerName2'>
                        <p>{playerOne.userName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Waiting;
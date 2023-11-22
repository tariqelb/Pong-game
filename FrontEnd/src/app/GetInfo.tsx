import './GetInfo.css'
import { useState } from 'react';

let chooseMode : number = 0;



let GetInfo = ( { dataIsReady } : {dataIsReady : boolean }) =>
{
    const [playWithAI, setPlayWithAI] = useState<boolean | undefined>(undefined);

    let handleButtonClick = (choose: boolean): void => 
    {
        setPlayWithAI(choose);
    };

    if (playWithAI === undefined)
    {
        return (
            <div className="choosePlayer">
                <div className="playWith">
                    <p className="choose">Play with :</p>
                    <button className="btn" onClick={() => handleButtonClick(true)}>Computer</button>
                    <button className="btn" onClick={() => handleButtonClick(false)}>Online</button>
                </div>                    
            </div>
        )
    }
    else
    {
        return (
            <div className="choosePlayer">
                <div className="playWith">
                    <p className="choose">Play with :</p>
                    <button className="btn" onClick={() => handleButtonClick(false)}>Standard</button>
                    <button className="btn" onClick={() => handleButtonClick(false)}>Online</button>
                    <button className="btn" onClick={() => handleButtonClick(false)}>Online</button>
                </div>                    
            </div>
        )
    }    
};

export default GetInfo;
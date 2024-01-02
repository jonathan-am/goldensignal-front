import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getGameList from '../../../clients/GetGameList';
//`https://i.ibb.co/sjthM7J/rato.webp`
function GameContainer() {

    const navigate = useNavigate();

    function dispatchToGamePage(game_id) {
        return navigate("/game/"+game_id);
    }

    const [gameList, setGameList] = useState([{}]);

    useEffect(()=> {
        getGameList(setGameList);
    }, [setGameList]);

    return (
        <div className='game-list-container'>
            {gameList.map( (v) => (
                <div key={`${v.gameId}`} className='game-card' onClick={()=> {dispatchToGamePage(v.gameId)}}>
                    <img src={v.gameImage} />
                    <span>{v.gameTitle} </span>
                    <span className='percentage'> {v.percentage}%</span>
                </div>
            ))}
        </div>
    );
}

export default GameContainer;
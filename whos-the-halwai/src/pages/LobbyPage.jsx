import { useEffect, useState} from 'react';
import { useParams, useNaviate } from 'react-router-dom';
import socket from "../socket";


export default function LobbyPage() {
    const { roomId } = useParams();
    const [players, setPlayers] = useState([]);
    const navigate = useNaviate();


    useEffect(() => {
        socket.on('playerListUpdate', ({ players }) => setPlayers(players));
        socket.on('gameStarted', (data) => {
            navigate(`/game/${roomId}`, {state: data});
        });
    }, [navigate, roomCode]);


    const startGame = () => socket.emit('startGame', {roomId});


    return (
        <div>
            <h2>Room Code: {roomId}</h2>
            <h3>Players:</h3>
            <ul>{players.map((p, idx) => <li key={idx}>{p.name}</li>)}</ul>
            <button onClick={startGame}>Start Game</button>
        </div>
    );
}
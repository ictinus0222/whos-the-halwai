import { useState } from 'react';
import socket from '../socket';
import { useNavigate } from 'react-router-dom';


export default function joinRoomPage() {
    const [roomId, seRoomId] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();


    const joinRoom = () => {
        socket.emit('joinRoom', { roomId, playerName: name});
        socket.on('roomJoined', () => navigate(`/lobby/${roomId}`));
        socket.on('error', (msg) => alert(msg));
    };


    return (
        <div>
            <h2>JoinRoom</h2>
            <input placeholder='Room Code' value={roomId} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} />
            <button onClick={joinRoom}>Join</button>
        </div>
    );
}
import { useState } from 'react';
import socket from '../socket';
import { useNavigate } from 'react-router-dom';


export default function CreateRoomPage() {
    const[name, setName] = useState('');
    const [players, setPlayers] = useState(4);
    const navigate = useNavigate();
    
    
    const createRoom = () => {
        socket.emit('createRoom', { hostName: name, maxPlayers: players });
        socket.on('roomCreated', ({ roomId }) => {
            navigate(`/lobby/${roomId}`);
        });
    };


    return (
        <div>
            <h2>Create Room</h2>
            <input placeHolder = 'Your Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='number' min='3' max='10' value={players} onChange={(e) => setPlayers(e.target.value)} />
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
} 
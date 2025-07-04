import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import socket from '../socket';

function GameRoomPage() {
  const { roomId } = useParams()
  const [players, setPlayers] = useState<{ id: string; name: string}[]>([])
  const [playerName, setPlayerName] = useState('')
  const [joined, setJoined] = useState(false)
  const [role, setRole] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [timer, setTimer] = useState<number>(120)


  type Player = {
    id: string
    name: string
  }


  const handleJoin = () => {
    if(playerName) {
      socket.emit('join_room', roomId, playerName)
      setJoined(true)
    }
  }


useEffect(() => {
  socket.on('update_players', (playersList: Player[]) => {
    setPlayers(playersList)
  })

  return () => {
    socket.off('update_players')
  }
}, [])


useEffect(() => {
  socket.on('role_assignment', ({ role }: { role: 'Spy' | 'Agent' }) => {
    alert(`Your role: ${role}`)
  })


  return () => {
    socket.off('role_assignment')
  }
}, [])



const startGame = () => {
  socket.emit('start_game', roomId)
}




useEffect(() => {
  socket.on('role_assignment', ({ role, image }: { role: string, image: string }) => {
    setRole(role)
    setImage(image)
  })


  socket.on('timer_update', (countdown: number) => {
    setTimer(countdown)
  })


  socket.on('time_up', () => {
    alert(`Time's up! Discuss who the Spy is.`)
    // TODO: voting logic
  })


  return () => {
    socket.off('role_assignment')
    socket.off('timer-update')
    socket.off('time_up')
  }
}, [])

//Restart Button
const restartGame = () => {
  socket.emit('start_game', roomId)
}


 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow">
        Who's The Spy?
      </h1>

      {!joined ? (
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            🚪 Join Game
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg text-gray-700">
            🎭 Your Role: <span className="font-semibold text-blue-600">{role}</span>
          </p>

          {image && (
            <img
              src={image}
              alt="Your Secret Image"
              className="rounded-xl shadow-lg w-full max-w-xs border-4 border-gray-300"
            />
          )}

          <div className="flex flex-col items-center space-y-2">
            <p className="text-xl font-semibold text-gray-800">
              ⏳ Time Left: {timer} sec
            </p>
            <button
              onClick={restartGame}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              🔄 Restart Game
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default GameRoomPage
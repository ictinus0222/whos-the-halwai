import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const [roomCode, setRoomCode] = useState('')
    const navigate = useNavigate()

    const handleCreateRoom = () => {
        const newRoomCode = Math.random().toString(36).substring(2,8).toUpperCase()
        navigate(`/room/${newRoomCode}`)
    }

    const handleJoinRoom = () => {
        if(roomCode) {
            navigate(`/room/${roomCode}`)
        }
    }

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center drop-shadow">
        Who's The Spy?
      </h1>

      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Enter Room Code"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          🔗 Join Room
        </button>

        <div className="text-gray-500 font-medium">OR</div>

        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          ➕ Create Room
        </button>
      </div>
    </div>
  )
}

export default HomePage
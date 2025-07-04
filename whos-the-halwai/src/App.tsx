import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameRoomPage from './pages/GameRoomPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<GameRoomPage />} />
    </Routes>
  )
}

export default App


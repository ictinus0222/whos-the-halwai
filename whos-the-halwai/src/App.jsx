import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameRoomPage from './pages/GameRoomPage';
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import LobbyPage from './pages/LobbyPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateRoomPage />} />
        <Route path='/join' element={<JoinRoomPage />} />
        <Route path='/lobby/:roomId' element={<LobbyPage />} />
        <Route path='/game/:roomId' element={<GameRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App


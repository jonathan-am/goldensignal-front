import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
            <Route index element={<HomePage />}/>
            <Route path="/game/:game_id" element={<GamePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

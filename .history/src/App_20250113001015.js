import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { About } from './pages/about/about'; // Ensure it's a named export
import { Home } from './pages/home/home'; // Ensure it's a named export

function App() {
  const navigate = useNavigate();

  const Routing = (target) => {
    navigate(target);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => Routing('/about')}>About</button>
        <button onClick={() => Routing('/home')}>Home</button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

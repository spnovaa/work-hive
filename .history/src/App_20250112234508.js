import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import {About} from './pages/about/about';
function App() {

  // function UserProfile() {
  //   const { username } = useParams();
  //   return <h1>Profile of {username}</h1>;
  // }
  
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/user/:username" element={<UserProfile />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
      </header>
    </div>
  );
}

export default App;

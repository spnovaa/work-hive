import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate} from 'react-router-dom';
import {About} from './pages/about/about';
import {Home} from './pages/home/home';
import {Button} from 'react';
function App() {

  // function UserProfile() {
  //   const { username } = useParams();
  //   return <h1>Profile of {username}</h1>;
  // }
  const Routing = (target) => {
    const navigate = useNavigate();
    navigate(target);
  }
  return (
    <div className="App">
       <header className="App-header">
        <Button onClick={Routing('/about')}>about</Button>
        <Button onClick={Routing('/home')}>home</Button>
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />} />
        {/* <Route path="/user/:username" element={<UserProfile />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </div>
  );
}

export default App;

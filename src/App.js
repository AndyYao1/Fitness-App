import './App.css';
import { Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import Workouts from './Routes/workouts';
import Macros from './Routes/macros';
import Home from './Routes/home';
import Dashboard from './Routes/dashboard';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="workouts" element={<Workouts/>} />
        <Route path="macros" element={<Macros/>} />
      </Routes>
    </>
  );
}

export default App;

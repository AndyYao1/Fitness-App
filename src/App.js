import './App.css';
import { Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import Workouts from './Routes/workouts';
import Macros from './Routes/macros';
import Home from './Routes/home';
import WorkoutsDashboard from './Routes/workoutsDashboard';
import MacrosDashboard from './Routes/macrosDashboard';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="workoutsdashboard" element={<WorkoutsDashboard/>} />
        <Route path="workouts" element={<Workouts/>} />
        <Route path="macros" element={<Macros/>} />
        <Route path="macrosdashboard" element={<MacrosDashboard/>} />
      </Routes>
    </>
  );
}

export default App;

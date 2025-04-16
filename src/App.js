import './App.css';
import { Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import Workouts from './Routes/workouts';
import Macros from './Routes/macros';
import Home from './Routes/home';
import WorkoutsDashboard from './Routes/workoutsDashboard';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="workoutsdashboard" element={<WorkoutsDashboard/>} />
        <Route path="workouts" element={<Workouts/>} />
        <Route path="macros" element={<Macros/>} />
        <Route path="mealsdashboard" element={<WorkoutsDashboard/>} />
      </Routes>
    </>
  );
}

export default App;

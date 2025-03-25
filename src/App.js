import './App.css';
import { Route, Routes } from 'react-router';
import Page1 from './Routes/page1';
import Page2 from './Routes/page2';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <Routes>
        <Route path="page1" element={<Page1/>} />
        <Route path="page2" element={<Page2/>} />
      </Routes>
      <NavBar />
    </>
  );
}

export default App;

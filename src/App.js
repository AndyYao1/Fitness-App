import './App.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Page1 from './Routes/page1';
import Page2 from './Routes/page2';

function App() {
  return (
    <>
      <Routes>
        <Route path="page1" element={<Page1/>} />
        <Route path="page2" element={<Page2/>} />
      </Routes>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/page1"/>}> Page1 </MenuItem>
          <MenuItem component={<Link to="/page2"/>}> Page2 </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default App;

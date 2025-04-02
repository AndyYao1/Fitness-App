import './NavBar.css';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { NavLink } from 'react-router';
import { FaDumbbell, FaHome } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdSpaceDashboard } from 'react-icons/md';


function NavBar() {
  return (
    <div id="app">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            height:"100vh",
            position: "fixed",
            width: "15vw",
            
          }
        }}
      >
        <h1 className="header"> Fitness Tracker </h1>
        <Menu>
          <MenuItem icon={<FaHome/>} component={<NavLink to="/"/>}> Home </MenuItem>
          <MenuItem icon={<MdSpaceDashboard/>} component={<NavLink to="/dashboard"/>}> Dashboard </MenuItem>
          <MenuItem icon={<FaDumbbell/>} component={<NavLink to="/workouts"/>}> Workouts </MenuItem>
          <MenuItem icon={<GiKnifeFork/>} component={<NavLink to="/macros"/>}> Macros </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavBar;
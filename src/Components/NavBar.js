import { Sidebar, Menu, MenuItem, sidebarClasses, SubMenu } from 'react-pro-sidebar';
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
        <h1 style={{textAlign:'center'}}> Fitness Tracker </h1>
        <Menu>
          <MenuItem icon={<FaHome/>} component={<NavLink to="/"/>}> Home </MenuItem>
          <SubMenu label="Workouts" defaultOpen={true}>
            <MenuItem icon={<FaDumbbell/>} component={<NavLink to="/workouts"/>}> All Workouts </MenuItem>
            <MenuItem icon={<MdSpaceDashboard/>} component={<NavLink to="/workoutsdashboard"/>}> Dashboard </MenuItem>
          </SubMenu>
          <SubMenu label="Nutrition" defaultOpen={true}>
            <MenuItem icon={<GiKnifeFork/>} component={<NavLink to="/macros"/>}> All Meals </MenuItem>
            <MenuItem icon={<MdSpaceDashboard/>} component={<NavLink to="/macrosdashboard"/>}> Dashboard </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavBar;
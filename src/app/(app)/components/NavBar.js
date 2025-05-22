'use client'

import { Sidebar, Menu, MenuItem, sidebarClasses, SubMenu } from 'react-pro-sidebar';
import { FaDumbbell, FaHome } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { MdSpaceDashboard } from 'react-icons/md';
import { useRouter } from 'next/navigation';


function NavBar() {
  const router = useRouter();

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
          <MenuItem icon={<FaHome/>} onClick={() => router.push("/home")}> Home </MenuItem>
          <SubMenu label="Workouts" defaultOpen={true}>
            <MenuItem icon={<FaDumbbell/>} onClick={() => router.push("/workouts")} >All Workouts</MenuItem>
            <MenuItem icon={<MdSpaceDashboard/>} onClick={() => router.push("/workoutsdashboard")}>Dashboard</MenuItem>
          </SubMenu>
          <SubMenu label="Nutrition" defaultOpen={true}>
            <MenuItem icon={<GiKnifeFork/>} onClick={() => router.push("/macros")}>All Meals</MenuItem>
            <MenuItem icon={<MdSpaceDashboard/>} onClick={() => router.push("/macrosdashboard")}>Dashboard</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavBar;
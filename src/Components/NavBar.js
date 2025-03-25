import './NavBar.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router';

function NavBar() {
  return (
    <div id="header">
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/page1"/>}> Page1 </MenuItem>
          <MenuItem component={<Link to="/page2"/>}> Page2 </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavBar;
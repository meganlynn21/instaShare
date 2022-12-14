import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  let history = useHistory();

  const handleLogOut = (e) => {
    history.push("/");
  };
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="violet">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={function (event) {
            logout();
            handleLogOut();
          }}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="violet">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/home"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}
export default MenuBar;

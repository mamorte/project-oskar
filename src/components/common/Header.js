import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import LoadingDots from "./LoadingDots";

const Header = ({ loading }) => {
  return (
    <div>
      <NavLink exact to="/home" activeStyle={{ color: "red" }}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/trackings" activeStyle={{ color: "red" }}>
        Trackings
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={{ color: "red" }}>
        About
      </NavLink>
      {loading && <LoadingDots interval={100} dots={20} />}
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;

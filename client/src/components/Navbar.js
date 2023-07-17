import React, { useContext } from "react";
import instagram from "../img/instagram.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return (
        <React.Fragment>
          <Link to={"/followingpost"}>
            <li>My Following</li>
          </Link>
          <Link to={"/profile"}>
            <li>Profile</li>
          </Link>
          <Link to="/createpost">Create Post</Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Logout
            </button>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to={"/signin"}>
            <li>SignIn</li>
          </Link>
          <Link to={"/signup"}>
            <li>SignUp</li>
          </Link>
        </React.Fragment>
      );
    }
  };
  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return (
        <React.Fragment>
          <Link to={"/"}>
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>
          <Link to={"/followingpost"}>
            <li>
              <span class="material-symbols-outlined">explore</span>
            </li>
          </Link>
          <Link to={"/profile"}>
            <li>
              <span class="material-symbols-outlined">account_circle</span>
            </li>
          </Link>
          <Link to="/createpost">
            <li>
              <span class="material-symbols-outlined">add_box</span>
            </li>
          </Link>
          <Link to={""}>
            <li  onClick={() => setModalOpen(true)}>
              <span class="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to={"/signin"}>
            <li>SignIn</li>
          </Link>
          <Link to={"/signup"}>
            <li>SignUp</li>
          </Link>
        </React.Fragment>
      );
    }
  };
  return (
    <div className="navbar">
      <img id="insta-logo" src={instagram} onClick={() => navigate("/")}></img>
      <ul className="nav-menu">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
}

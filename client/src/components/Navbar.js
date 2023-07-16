import React, {useContext} from "react";
import instagram from "../img/instagram.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({login}) {
  const navigate = useNavigate();
  const {setModalOpen} = useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return (
        <React.Fragment>
        <Link to = {'/followingpost'}><li>My Following</li></Link>
          <Link to={"/profile"}>
            <li>Profile</li>
          </Link>
          <Link to="/createpost">Create Post</Link>
          <Link to={""}>
          <button className="primaryBtn" onClick={()=>setModalOpen(true)}>Logout</button>
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
      )
    }
  };
  return (
    <div className="navbar">
      <img src={instagram} onClick={()=>navigate('/')}></img>
      <ul className="nav-menu">
        {loginStatus()}
      </ul>
    </div>
  );
}

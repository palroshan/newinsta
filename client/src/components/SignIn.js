import React, { useState, useContext } from "react";
import "../css/SignIn.css";
import instagram from "../img/instagram.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const {setUserLogin} = useContext(LoginContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifyA = (data) => toast.error(data);
  const notifyB = (data) => toast.success(data);
  const emailregex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const postData = () => {
    if (!emailregex.test(email)) {
      return notifyA("Please enter a valid email");
    }
    if (!passwordregex.test(password)) {
      return notifyA(
        "Minimum eight characters, at least one letter and one number"
      );
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true)
          navigate("/");
        }
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img src={instagram} alt="" className="signInLogo" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="submit"
              id="login-btn"
              value="sign In"
              onClick={() => postData()}
            />
          </div>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refConfirmPassword = useRef();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (refPassword.current.value !== refConfirmPassword.current.value) {
      refConfirmPassword.current.setCustomValidity("password not match");
    } else {
      const user = {
        username: refUsername.current.value,
        email: refEmail.current.value,
        password: refPassword.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {}
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat App</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              ref={refUsername}
              placeholder="Username"
              className="loginInput"
            />
            <input ref={refEmail} placeholder="Email" className="loginInput" />
            <input
              ref={refPassword}
              placeholder="Password"
              className="loginInput"
            />
            <input
              ref={refConfirmPassword}
              placeholder="Password Again"
              className="loginInput"
            />
            <button className="loginButton">Sign Up</button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

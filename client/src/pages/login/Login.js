import { useContext, useRef } from "react";
import { loginCall } from "../../apiCall";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const refEmail = useRef();
  const refPassword = useRef();
  const { user, isFetching, error, dispath } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: refEmail.current.value,
      password: refPassword.current.value,
    };
    loginCall(newUser, dispath);
    console.log(user);
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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              ref={refEmail}
              type="email"
              placeholder="Email"
              className="loginInput"
            />
            <input
              ref={refPassword}
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? "Loading" : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

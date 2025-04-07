import React, { useState, useContext } from "react";
// import twitterimg from "../../image/twitter.jpeg";

import { Twitter } from "@mui/icons-material";

import GoogleButton from "react-google-button";
import { useNavigate, Link } from "react-router-dom";

import "./Login.scss";

import { useUserAuth } from "../../context/userAuthContext";

const Login = () => {
  const [email, seteamil] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const { googleSignin, login } = useUserAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      seterror(error.message);
      window.alert(error.message);
    }
  };
  const hanglegooglesignin = async (e) => {
    e.preventDefault();
    try {
      await googleSignin();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="image-container">
          {/* <img src={twitterimg} className="image" alt="twitterimg" /> */}
          <img
            className="image"
            src="https://raw.githubusercontent.com/BitHeadmr/twiller-twitterclone/refs/heads/main/twiller/src/image/twitter.jpeg"
            alt="Twitter Image"
          />
        </div>
        <div className="form-container">
          <div className="form-box">
            <Twitter style={{ color: "skyblue" }} />
            <h2 className="heading">Happening now</h2>
            {error && <p>{error.message}</p>}
            <form onSubmit={handlesubmit}>
              <input
                type="email"
                className="email"
                placeholder="Email address"
                onChange={(e) => seteamil(e.target.value)}
              />
              <input
                type="password"
                className="password"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" className="btn">
                  Log In
                </button>
              </div>
            </form>
            <hr />
            <div>
              <GoogleButton
                className="g-btn"
                type="light"
                onClick={hanglegooglesignin}
              />
            </div>
          </div>
          <div>
            Don't have an account
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "var(--twitter-color)",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

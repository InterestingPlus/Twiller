import React, { useState, useContext, useEffect } from "react";
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
  const { googleSignin, login, user, loading } = useUserAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      seterror(error.message);
      // window.alert(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await googleSignin();

      const { displayName, email, photoURL } = data?.user;
      const user = { displayName, email, photoURL };

      fetch(`${window.getBackendServer()}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            console.log(data);
            navigate("/");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Error while creating user: ", error.message);
        });
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect once logged in
    }
  }, [user]);

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
                onClick={handleGoogleSignIn}
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

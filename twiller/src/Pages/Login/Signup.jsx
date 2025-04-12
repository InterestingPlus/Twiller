import { Link, useNavigate } from "react-router-dom";
// import twitterImg from "../../image/twitter.png";
import TwitterIcon from "@mui/icons-material/Twitter";

import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/userAuthContext";

import "./Login.scss";
import { useState, useEffect } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn, googleSignin, user } = useUserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);

      const user = {
        username,
        name,
        email,
        password,
      };

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
          }
        })
        .catch((error) => {
          console.log("Error while creating user: ", error.message);
        });
    } catch (error) {
      setError(error.message);
      // window.alert(error.message);
      navigate("/");
    }
  };

  const handleGoogleSignin = async (e) => {
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
          }
        })
        .catch((error) => {
          console.log("Error while creating user: ", error.message);
        });
      navigate("/");
    } catch (error) {
      setError(error.message);
      // window.alert(error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect once logged in
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="image-container">
        {/* <img className="image" src={twitterImg} alt="Twitter Image" /> */}

        <img
          className="image"
          src="https://raw.githubusercontent.com/BitHeadmr/twiller-twitterclone/refs/heads/main/twiller/src/image/twitter.jpeg"
          alt="Twitter Logo"
        />
      </div>

      <div className="form-container">
        <TwitterIcon className="TwitterIcon" style={{ color: "skyblue" }} />

        <h2 className="heading">Happening Now</h2>

        <div className="d-flex align-items-sm-center">
          <h3 className="heading1">Join Twiller Today!</h3>
        </div>

        {error && <p className="errorMessage">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="display-name"
            type="username"
            placeholder="@username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="display-name"
            type="name"
            placeholder="Enter Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="email"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn-login">
            <button type="submit" className="btn">
              Sign Up
            </button>
          </div>
        </form>

        <div className="google-button">
          <GoogleButton
            className="g-btn"
            type="light"
            onClick={handleGoogleSignin}
          />
        </div>

        <hr />

        <div className="sign-in">
          Already have an Account?
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "var(--twitter-color)",
              fontWeight: 600,
              marginLeft: "5px",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

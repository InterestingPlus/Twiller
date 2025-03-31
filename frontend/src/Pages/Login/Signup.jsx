import { Link, useNavigate } from "react-router-dom";
// import twitterImg from "../../image/twitter.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleButton from "react-google-button";
import "./Login.css";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = {
        username: username,
        name: name,
        email: email,
      };
    } catch (error) {
      setError(error.message);
      window.alert(error.message);
    }
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();

    try {
      //   navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        {/* <img className="image" src={twitterImg} alt="Twitter Image" /> */}
      </div>

      <div className="form-container">
        <div className="">
          <TwitterIcon className="TwitterIcon" style={{ color: "skyblue" }} />

          <h2 className="heading">Happening Now</h2>

          <div className="d-flex align-items-sm-center bg-blue-500">
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

          <hr />

          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignin}
            />
          </div>

          <div>
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
    </div>
  );
};

export default SignUp;

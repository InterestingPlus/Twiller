import React, { useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import "./Pages.scss";
import Widgets from "./Widgets/Widgets";
import { useUserAuth } from "../context/userAuthContext";

const Home = () => {
  const navigate = useNavigate();

  const { logout, user } = useUserAuth();

  // const user = {
  //   displayName: "Jatin Poriya",
  //   email: "poriyajatin914@gmail.com",
  // };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user == null) {
      navigate("/signup");

      console.log("TWWWUUUUUEEEE");
    } else {
      console.log("FAALSSSEEE");
    }
  }, [user]);

  return (
    <div className="page">
      <Sidebar handleLogout={handleLogout} user={user} />
      <Outlet />
      <Widgets />
    </div>
  );
};

export default Home;

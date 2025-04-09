import React from "react";
import "./Profile.scss";
import MainProfile from "./MainProfile/MainProfile";

import { useUserAuth } from "../../context/userAuthContext";

const Profile = () => {
  // const user = {
  //   displayName: "Jatin Poriya",
  //   email: "poriyajatin914@gmail.com",
  // };

  const { user } = useUserAuth();

  return (
    <div className="primary profilePage">
      <MainProfile user={user} />
    </div>
  );
};

export default Profile;

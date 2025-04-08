import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/userAuthContext";

const useLoggedinUser = () => {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinUser, setLoggedinUser] = useState({});

  useEffect(() => {
    if (!email) return;
    fetch(`${window.getBackendServer()}/loggedinuser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoggedinUser(data);
      });
  }, [email]);

  return [loggedinUser, setLoggedinUser];
};

export default useLoggedinUser;

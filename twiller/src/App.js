import "./App.scss";
import SignUp from "./Pages/Login/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Feed from "./Pages/Feed/Feed";
import Explore from "./Pages/Explore/Explore";
import Notification from "./Pages/Notification/Notification";
import Messages from "./Pages/Messages/Messages";
import Lists from "./Pages/Lists/Lists";
import Profile from "./Pages/Profile/Profile";
import More from "./Pages/More/More";
import Bookmark from "./Pages/Bookmark/Bookmark";
import { useUserAuth } from "./context/userAuthContext";

function App() {
  const { loading } = useUserAuth();

  if (loading) return <div>Firebase Setting Up...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Feed />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />}>
          <Route path="feed" element={<Feed />} />
          <Route path="explore" element={<Explore />} />
          <Route path="notification" element={<Notification />} />
          <Route path="messages" element={<Messages />} />
          <Route path="lists" element={<Lists />} />
          <Route path="bookmarks" element={<Bookmark />} />
          <Route path="profile" element={<Profile />} />
          <Route path="more" element={<More />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

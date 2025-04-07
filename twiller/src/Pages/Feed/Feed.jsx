import React, { useEffect, useState } from "react";
import "./Feed.scss";

import Post from "./Post/Post";
import Tweetbox from "./Tweetbox/Tweetbox";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/post`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
    } catch (error) {
      console.log("Post Error: ", error);
    }
  }, [posts]);

  return (
    <div className="primary feed">
      <div className="feed__header">
        <h1>Home</h1>
      </div>

      <Tweetbox />

      {posts?.map((post) => {
        return <Post key={post._id} p={post} />;
      })}
    </div>
  );
};

export default Feed;

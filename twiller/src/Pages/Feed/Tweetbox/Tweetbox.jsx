import React, { useState } from "react";
import "./Tweetbox.scss";

import { Avatar, Button } from "@mui/material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

import axios from "axios";
import { useUserAuth } from "../../../context/userAuthContext";
import useLoggedinUser from "../../../hooks/useLoggedinUser";

const Tweetbox = () => {
  const [profileImage, setProfileImage] = useState("");

  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { user } = useUserAuth();
  const [loggedinUser] = useLoggedinUser();
  const email = user?.email;
  const userProfileImg = loggedinUser[0]?.profileImage
    ? loggedinUser[0]?.profileImage
    : user && user.photoURL;

  const handleUploadImage = (e) => {
    setIsLoading(true);

    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    const imgbb_API = "166428306a3ed1e69f14ed013c480b0f";

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imgbb_API}`, formData)
      .then((res) => {
        setImageUrl(res.data.data.display_url);
        console.log(res.data.data.display_url);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTweet = async (e) => {
    e.preventDefault();

    if (user?.providerData[0]?.providerId === "password") {
      fetch(`http://localhost:5000/loggedinuser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      setName(user?.displayName);
      setUsername(email?.split("@")[0]);
    }

    if (name) {
      const userpost = {
        profilePhoto: userProfileImg,
        post,
        photo: imageUrl,
        username,
        name,
        email,
      };

      setPost("");
      setImageUrl("");

      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="tweetbox">
      <form onSubmit={handleTweet}>
        <div className="tweetbox__input">
          <Avatar src={profileImage} />

          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>

        <div className="img__tweetBtn">
          <label htmlFor="image" className="imageIcon" title="media">
            {isLoading ? (
              <p>Uploading Image...</p>
            ) : (
              <p>
                {imageUrl ? (
                  "Image Uploaded!"
                ) : (
                  <span>
                    <AddPhotoAlternateOutlined />
                  </span>
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBtn" type="submit" disabled={!post}>
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;

import React, { useState } from "react";

import "./Post.scss";
import { Avatar } from "@mui/material";
import {
  VerifiedUser,
  ChatBubbleOutline,
  Repeat,
  Publish,
} from "@mui/icons-material";
import LikeButton from "./LikeButton/LikeButton";

import { useUserAuth } from "../../../context/userAuthContext";

const Post = ({ p }) => {
  const { _id: postId, name, username, photo, post, profilePhoto, likes } = p;

  let defaultLike = likes ? likes + 1 : 1;

  const [likeCount, setLikeCount] = useState(defaultLike);

  const { user } = useUserAuth();

  const handleLikeCount = (count) => {
    setLikeCount(count);

    const newLikeCount = {
      likes: count,
    };

    if (count != undefined) {
      fetch(`${window.getBackendServer()}/likeupdate/${postId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newLikeCount),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Updated! ", data);
        })
        .catch((error) => {
          console.log("Error Updating Likes : ", error);
        });
    } else {
      console.log("same", defaultLike, count);
    }
  };

  return (
    <div className="post">
      <div className="post__body">
        <div className="post__header">
          <div className="post__avatar">
            <Avatar src={profilePhoto} />
            <div className="post__text">
              <h3>
                {name}
                <span className="header__special">
                  <VerifiedUser className="post__badge" /> <p>@{username}</p>
                </span>
              </h3>

              <p className="post__description">{post}</p>

              {photo && (
                <img
                  // src="https://pbs.twimg.com/media/GlBceMUbQAAKTcO.jpg"
                  src={photo}
                  alt={name}
                  className="post__image"
                />
              )}

              <div className="post__footer">
                <div className="footer__icon" title="Reply">
                  <ChatBubbleOutline fontSize="small" />
                </div>
                <div className="footer__icon" title="Repost">
                  <Repeat fontSize="small" />
                </div>
                <LikeButton
                  count={likeCount}
                  handleLikeCount={handleLikeCount}
                />
                <div className="footer__icon" title="Share">
                  <Publish />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

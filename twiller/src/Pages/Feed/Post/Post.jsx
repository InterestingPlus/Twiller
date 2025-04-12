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
  const { _id, name, username, photo, post, profilePhoto, likes } = p;

  let likesCount = Array.isArray(likes) ? likes.length : 0;

  const [likeCount, setLikeCount] = useState(likesCount);

  const handleLikeCount = (count) => {
    setLikeCount(count);
  };

  const { user } = useUserAuth();

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
                  postId={_id}
                  users={likes}
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

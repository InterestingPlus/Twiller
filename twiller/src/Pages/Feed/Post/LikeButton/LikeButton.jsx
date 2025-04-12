import React, { useEffect, useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import "./LikeButton.scss";
import { useUserAuth } from "../../../../context/userAuthContext";

const LikeButton = ({ count, handleLikeCount, postId, users }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserAuth();

  // Efficiently check if the user already liked the post
  useEffect(() => {
    if (Array.isArray(users) && user?.email) {
      const likedByUser = users.some((like) => like.email === user.email);
      setLiked(likedByUser);
    }
  }, [users, user?.email]);

  const handleLikeClick = async () => {
    if (!user || isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${window.getBackendServer()}/likeupdate/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setLiked((prev) => !prev);
        handleLikeCount(data.likesCount);
      }
    } catch (err) {
      console.error("Error updating likes:", err);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`footer__wrapper ${liked ? "liked" : ""}`}
      onClick={handleLikeClick}
      title={liked ? "Unlike" : "Like"}
      style={{
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
      }}
    >
      <div className="footer__icon like">
        {liked ? (
          <Favorite fontSize="small" className="likeBtn" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>
      <span>{count > 0 ? count : ""}</span>
    </div>
  );
};

export default LikeButton;

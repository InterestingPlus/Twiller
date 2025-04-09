import React, { useEffect, useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import "./LikeButton.scss";

const LikeButton = ({ count, handleLikeCount }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeClick = () => {
    if (!isLoading) {
      setLiked((prev) => !prev);

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const newCount = liked ? Number(count) + 1 : Number(count) - 1;
    handleLikeCount(newCount);
  }, [liked]);

  return (
    <div
      className={`footer__wrapper  ${liked ? "liked" : ""}`}
      onClick={handleLikeClick}
    >
      <div className="footer__icon like">
        {liked ? (
          <Favorite fontSize="small" titleAccess="Liked" className="likeBtn" />
        ) : (
          <FavoriteBorder fontSize="small" titleAccess="Like" />
        )}
      </div>
      <span>{count > 0 ? count : ""}</span>
    </div>
  );
};

export default LikeButton;

import React from "react";
import "./ProfilePost.scss";

const ProfilePost = ({ postData }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <img
          src={postData?.profilePhoto}
          alt={postData?.username}
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
        <h2>{postData?.name}</h2>
      </div>

      <p>{postData?.post}</p>

      <img
        src={postData?.photo}
        alt={postData?.username}
        width="200px"
        style={{ borderRadius: "15px" }}
      />
    </div>
  );
};

export default ProfilePost;

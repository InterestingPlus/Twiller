import React, { useEffect, useState } from "react";
import ProfilePost from "../ProfilePost/ProfilePost";
import { Link, useNavigate } from "react-router-dom";
import "./MainProfile.scss";

import {
  ArrowBack,
  CenterFocusWeak,
  LockReset,
  MyLocation,
  AddLink,
} from "@mui/icons-material";
import EditProfile from "../EditProfile/EditProfile";

import axios from "axios";
import useLoggedinUser from "../../../hooks/useLoggedinUser";
import Post from "../../Feed/Post/Post";

const MainProfile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const loggedinUser = [
  //   {
  //     bio: "😎I Love Challenges 😎",
  //     website: "https://jatinporiya.netlify.app",
  //     location: "India",
  //     dob: "31/10/2006",
  //   },
  // ];

  const loggedinUser = useLoggedinUser();

  const username = user?.email?.split("@")[0];
  const [post, setPost] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/userpost?email=${user?.email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
        });
    } catch (error) {
      console.log("Post Error: ", error);
    }
  }, [user.email]);

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);

    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    const imgbb_API = "166428306a3ed1e69f14ed013c480b0f";

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imgbb_API}`, formData)
      .then((res) => {
        const url = res.data.data.display_url;
        const userCoverImage = {
          email: user?.email,
          coverImage: url,
        };

        setIsLoading(false);

        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userCoverImage),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Updated! ", data);
            })
            .catch((error) => {
              console.log("Error Updating Profile : ", error);
              window.alert("Error Updating Profile : " + error);
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);

    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    const imgbb_API = "166428306a3ed1e69f14ed013c480b0f";

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imgbb_API}`, formData)
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = {
          email: user?.email,
          profileImage: url,
        };

        setIsLoading(false);

        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userProfileImage),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Updated! ", data);
            })
            .catch((error) => {
              console.log("Error Updating Profile : ", error);
              window.alert("Error Updating Profile : " + error);
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ArrowBack
        className="arrowIcon"
        onClick={() => {
          navigate(-1);
        }}
      />

      <h4 className="heading-4">
        {loggedinUser[0]?.name
          ? loggedinUser[0]?.name
          : user && user.displayName}
      </h4>

      <div className="mainProfile">
        <div className="">
          {
            <div>
              <div className="coverImageContainer">
                {loggedinUser.length > 0 && (
                  <div className="coverImageContainer">
                    <img
                      src={loggedinUser[0]?.coverImage || ""}
                      alt={`${username} Cover Image`}
                      className="coverImage"
                    />
                  </div>
                )}

                <div className="hoverCoverImage">
                  <div className="imageIcon__tweetBtn">
                    <label htmlFor="coverImage" className="imageIcon">
                      {isLoading ? (
                        <LockReset className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeak className="photoIcon" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="coverImage"
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>

              <div className="avatarImg">
                <div className="avatarContainer">
                  <img
                    src={
                      loggedinUser[0]?.profileImage
                        ? loggedinUser[0]?.profileImage
                        : user && user.photoURL
                      // : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                    alt={`${username} Avatar Image`}
                    className="avatar"
                  />

                  <div className="hoverAvatarImage">
                    <div className="imageIcon__tweetBtn">
                      <label
                        htmlFor="profileImage"
                        className="profileImageIcon"
                      >
                        {isLoading ? (
                          <LockReset className="photoIcon photoIconDisabled" />
                        ) : (
                          <CenterFocusWeak className="photoIcon" />
                        )}
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        className="imageInput"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>

                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedinUser[0]?.name
                        ? loggedinUser[0]?.name
                        : user && user.displayName}
                    </h3>

                    <p className="usernameSection">@{username}</p>
                  </div>

                  <EditProfile user={user} loggedinUser={loggedinUser} />
                </div>

                <div className="infoContainer">
                  {loggedinUser[0]?.bio ? (
                    <p className="bio">{loggedinUser[0]?.bio}</p>
                  ) : (
                    ""
                  )}

                  <div className="locationAndLink">
                    {loggedinUser[0]?.location ? (
                      <p className="subInfo">
                        <MyLocation /> {loggedinUser[0]?.location}
                      </p>
                    ) : (
                      ""
                    )}

                    {loggedinUser[0]?.website ? (
                      <Link
                        to={loggedinUser[0]?.website}
                        className="subInfo link"
                      >
                        <AddLink />

                        {loggedinUser[0]?.website}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <h4 className="tweetsText">Tweets</h4>

                <hr />

                <div>
                  {post?.map((p, index) => (
                    // <ProfilePost postData={p} key={index} />
                    <Post key={p._id} p={p} />
                  ))}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainProfile;

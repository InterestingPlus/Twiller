import React, { useState } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Divider from "@mui/material/Divider";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./Sidebar.scss";
import CustomLink from "./CustomLink";
import SidebarOption from "./SidebarOption";
import { useNavigate } from "react-router-dom";

import useLoggedinUser from "../../hooks/useLoggedinUser";

const Sidebar = ({ handleLogout, user }) => {
  const [anchorE1, setAnchorE1] = useState(null);
  const openmenu = Boolean(anchorE1);
  const [loggedinUser] = useLoggedinUser();
  // const loggedinUser = [];

  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };
  const result = user?.email?.split("@")[0];

  return (
    <div className="sidebar">
      <div className="sidebar__navigation">
        <TwitterIcon className="sidebar__twitterIcon" />

        <CustomLink to="/home/feed">
          <SidebarOption Icon={HomeIcon} text="Home" />
        </CustomLink>

        <CustomLink to="/home/explore">
          <SidebarOption Icon={SearchIcon} text="Explore" />
        </CustomLink>

        <CustomLink to="/home/notification">
          <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        </CustomLink>

        <CustomLink to="/home/messages">
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
        </CustomLink>

        <CustomLink to="/home/bookmarks">
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        </CustomLink>

        <CustomLink to="/home/lists">
          <SidebarOption Icon={ListAltIcon} text="Lists" />
        </CustomLink>

        <CustomLink to="/home/profile">
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        </CustomLink>

        <CustomLink to="/home/more">
          <SidebarOption Icon={MoreIcon} text="More" />
        </CustomLink>

        <Button variant="outlined" className="sidebar__tweet" fullWidth>
          Tweet
        </Button>
      </div>

      <div className="profile__info">
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openmenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-valuetext={openmenu ? "true" : undefined}
          onClick={handleClick}
          className="moreIcon"
        >
          <div className="user__wrapper">
            <Avatar
              src={
                loggedinUser[0]?.profileImage
                  ? loggedinUser[0]?.profileImage
                  : user && user.photoURL
                // : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
            />

            <div className="user__info">
              <h4>
                {loggedinUser[0]?.name
                  ? loggedinUser[0]?.name
                  : user && user.displayName}
              </h4>

              <h5>@{result}</h5>
            </div>
          </div>

          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorE1}
          open={openmenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem
            className="profile__info1"
            onClick={() => {
              navigate("/home/profile");
            }}
          >
            <Avatar
              src={
                loggedinUser[0]?.profileImage
                  ? loggedinUser[0]?.profileImage
                  : user && user.photoURL
                // : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
            />

            <div
              className="user__info subUser__info"
              style={{ display: "flex" }}
            >
              <div style={{ marginLeft: ".6rem" }}>
                <h4 style={{ fontWeight: 800, fontSize: "1rem" }}>
                  {loggedinUser[0]?.name
                    ? loggedinUser[0]?.name
                    : user && user.displayName}
                </h4>
                <h5
                  style={{
                    fontSize: "0.87rem",
                  }}
                >
                  @{result}
                </h5>
              </div>

              <ListItemIcon className="done__icon" color="blue">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>Add an Existing Account</MenuItem>
          <MenuItem onClick={handleLogout}> Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;

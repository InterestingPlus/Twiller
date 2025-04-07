import React, { useState } from "react";
import "./EditProfile.scss";

import { Button, Box, IconButton, TextField, Modal } from "@mui/material";
import { Close, ChevronRight } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgColor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function EditChild({ dob, setDob }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="birthdate-section" onClick={handleOpen}>
        <span className="text">Edit</span>
      </div>

      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className="text">
            <h2>Edit date of birth</h2>

            <p>
              This can only be Changed a few times
              <br />
              Make sure you enter the age of the <br />
              person using Account.
            </p>

            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <button className="e-button" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

const EditProfile = ({ user, loggedinUser }) => {
  const [name, setName] = useState(
    loggedinUser[0]?.displayName ? loggedinUser[0]?.displayName : ""
  );
  const [bio, setBio] = useState(
    loggedinUser[0]?.bio ? loggedinUser[0]?.bio : ""
  );
  const [location, setLocation] = useState(
    loggedinUser[0]?.location ? loggedinUser[0]?.location : ""
  );
  const [website, setWebsite] = useState(
    loggedinUser[0]?.website ? loggedinUser[0]?.website : ""
  );
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState(
    loggedinUser[0]?.dob ? loggedinUser[0]?.dob : ""
  );

  const handleSave = () => {
    const editInfo = {
      name,
      bio,
      location,
      website,
      dob,
    };

    fetch(`${window.getBackendServer()}/userupdate/${user?.email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log("Profile Updated! ", data));
  };

  return (
    <div className="editProfileBtn">
      <Button onClick={() => setOpen(true)}>Edit Profile</Button>

      <Modal
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box style={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>

            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>

          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              defaultValue={
                loggedinUser[0]?.displayName ? loggedinUser[0]?.displayName : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={loggedinUser[0]?.bio ? loggedinUser[0]?.bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={
                loggedinUser[0]?.location ? loggedinUser[0]?.location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={
                loggedinUser[0]?.website ? loggedinUser[0]?.website : ""
              }
            />
          </form>

          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} />
          </div>

          <div className="last-section">
            {loggedinUser[0]?.dob ? (
              <h2>{loggedinUser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your Date of Birth"}</h2>
            )}

            <div className="last-btn"></div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfile;

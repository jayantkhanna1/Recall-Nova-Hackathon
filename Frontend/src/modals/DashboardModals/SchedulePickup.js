import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { getUserStats } from "../../services/Dashboard/User";
import { getAreas, requestPickup } from "../../services/Dashboard/Pickup";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 2,
  width: "600px",
  p: 3,
};
const SchedulePickup = ({ open, handleClose }) => {
  const [showCalender, setshowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matchedDate, setmatchedDate] = useState();
  const [, setData] = useState();
  const [, setData2] = useState();
  const user = localStorage.getItem("userData");
  const userObj = JSON.parse(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStatsResponse = await getUserStats();
        setData(userStatsResponse);
        console.log("User Stats:", userStatsResponse.user);

        const areasResponse = await getAreas();
        setData2(areasResponse);
        console.log("Areas:", areasResponse.areas);

        // Log the date for the matching zone
        const matchingZone = areasResponse.areas.find(
          (area) => area.area === userStatsResponse.user.area
        );
        if (matchingZone) {
          setmatchedDate(matchingZone.date);
          console.log("Matching Zone:", matchingZone);
          console.log("Date:", matchingZone.date);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handlePickupSubmit = async () => {
    const payload = {
      date: moment(selectedDate).format("DD-MM-YYYY"),
      private_key: userObj.private_key,
      pickup_size: 23,
    };
    const response = await requestPickup(payload);
    console.log(response);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="dashboard-row-1-card | card-white modal-card">
            <p>Your Pickups</p>
            <div className="dashboard-grid-user-header | header-dasboard">
              Your Pickup is scheduled for
            </div>
            <div className="pickup-time">
              <div className="pickup-time-header">
                ⏱️  {moment(matchedDate).format("MMMM Do YYYY")}
              </div>
              <div className="dashboard-grid-schedule-btns">
                <button
                  className="secondary"
                  onClick={() => {
                    setshowCalender(!showCalender);
                  }}
                >
                  Change Date
                </button>
                <button
                  onClick={() => {
                    if (showCalender) {
                      // setOpen(true);
                    } else {
                      setSelectedDate(matchedDate);
                      handlePickupSubmit();
                    }
                  }}
                >
                  Confirm Pickup
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SchedulePickup;

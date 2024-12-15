import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  outline: "none",
  // width: window.innerWidth > 600 ? "40%" : "90%",
  width: "85%",

  p: 1.4,
  // height: "70vh",
  height: window.innerWidth > 700 ? "unset" : "70vh",
  overflowY: "scroll",
};
const PrincipleModal = ({ open, handleClose, data }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="principle-modal">
            <div className="principle-modal-img">
              <img src={data?.Bg} alt="" />
            </div>
            <div className="principle-modal-text">
              <div className="principle-modal-header">{data?.title}</div>
              <div
                className="principle-modal-desc"
                dangerouslySetInnerHTML={{ __html: data?.desc }}
              ></div>
              <div className="principle-modal-list">
                <ul>
                  {data?.lists?.map((item, index) => (
                    <li key={index}>
                      <span>{item.title} : </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PrincipleModal;

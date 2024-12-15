import React,{useState,useEffect} from "react";
import Box from "@mui/material/Box"; 
import Modal from "@mui/material/Modal"; 
import { recallHistory } from "../../services/Dashboard/User";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    borderRadius: 2,
    width: window.innerWidth > 600 ? "600px" : "80%",
    p: window.innerWidth > 600 ? 4 : 2,
};
const RecallHistory = ({ open, handleClose }) => { 
    const [history, setHistory] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await recallHistory();
                setHistory(response2?.history);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
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
                            Recall History
                        </div>
                        <div className="logs-data">
                            {history?.map((log, index) => {
                                return (
                                    <div className="log-flex">
                                        
                                        <p>{log.log}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default RecallHistory;

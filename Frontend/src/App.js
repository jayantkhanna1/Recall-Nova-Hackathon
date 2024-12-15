import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./routes/routes";
// import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import SideBarWidth from "./components/SideBar/SideBarWidth";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="sidebar-flex">
        <SideBar />
        <SideBarWidth />
        <Navigation />
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

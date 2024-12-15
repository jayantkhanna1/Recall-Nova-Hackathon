import React from "react";
import DashboardIcons from "../../assets/DashboardIcons";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
const Locations = () => {
  return (
    <>
    <div className="mobile-nav">
      <MobileNavbar />
    </div>
    <div className="dashboard">
       
      <div className="new-dashboard-grid">
        <div className="analytics-header profile-page-header">
          <div className="analytics-header-heading">
            <img src={DashboardIcons.Back} alt="" />
            <h1>Locations Map 🌏</h1>
          </div>
          <p>Find the nearest bin location to you</p>
        </div>
        <div className="location-map">
          <img src={DashboardIcons.Location} alt="" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Locations;

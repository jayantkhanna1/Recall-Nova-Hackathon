import React from "react";
import DashboardIcons from "../../assets/DashboardIcons";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
const Contact = () => {
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
              <h1>Contact Us ☎️</h1>
            </div>
            <p>
              Need any assistance or have any queries related to recycling or
              our services? Contact us and our team will be more than happy to
              help you out!
            </p>
          </div>
          <div className="contact-us-flex">
            <div className="contact-us-left">
              <div className="input">
                <p>What’s your name?</p>
                <input placeholder="Your Name" type="text" />
              </div>
              <div className="input">
                <p>What’s your email?</p>
                <input placeholder="Your Email" type="text" />
              </div>
              <div className="input">
                <p>What’s your message?</p>
                <textarea placeholder="Your Message" type="text" />
              </div>
              <div className="send-btn">
                <button>Send Message</button>
              </div>
            </div>
            <div className="contact-us-right-img">
              <img src={DashboardIcons.Contact} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

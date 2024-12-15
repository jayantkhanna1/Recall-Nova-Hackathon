import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import { scroller } from "react-scroll";
const Privacy = () => {
  useEffect(() => {
    document.title = "Recall | Privacy Policy";
    return () => {
      document.title = "Recall | Recycling Revolutionized";
    };
  }, []);
  const handleClick = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      offset: -100,
      duration: 1200,
    });
  };
  return (
    <div className="terms-page">
      <div className="laptop-nav">
        <Navbar handleClick={handleClick} />
      </div>
      <div className="mobile-nav">
        <MobileNavbar />
      </div>
      <div className="terms-page-header">
        <h1>Privacy Policy</h1>
      </div>
      <div className="terms-page-content">
        <p>
          At Recall UAE, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, disclose, and protect the
          information you provide to us through our website and mobile
          application (collectively referred to as the "App").
          <br />
          <br />
          By accessing or using our App, you agree to the terms outlined in this
          Privacy Policy.
          <br />
          <br />
          <strong>1. Information We Collect :</strong>
          <br />
          <br />
          <strong> 1.1 Personal Information : </strong> When you use our App, we
          may collect personal information that you provide voluntarily, such as
          your name, email address, phone number, and location. This information
          is used to provide you with the services and features of the App and
          to improve your experience.
          <br />
          <br />
          <strong>1.2 Usage Information :</strong>We may collect information
          about how you use the App, including your interactions, preferences,
          and navigation patterns. This information helps us understand how the
          App is used and enables us to enhance its functionality.
          <br />
          <br />
          <strong> 1.3 Device Information : </strong>We may collect information
          about the device you use to access the App, including its unique
          device identifier, operating system, browser type, and IP address.
          This information is used for analytics, troubleshooting, and security
          purposes.
          <br />
          <br />
          <strong>2. How We Use Your Information :</strong>
          <br />
          <br />
          <strong>2.1 Providing Services: </strong> We use your personal
          information to provide you with the services and features of the App,
          including processing your recycling requests, sending notifications,
          and facilitating communication with recycling centers.
          <br />
          <br />
          <strong> 2.2 Improving the App: </strong> We use collected data to
          analyze usage patterns, identify areas for improvement, and enhance
          the functionality of the App.
          <br />
          <br />
          <strong>2.3 Communication: </strong> We may use your contact
          information to send you updates, newsletters, promotional materials,
          and important notices related to the App. You can opt-out of receiving
          such communications at any time.
          <br />
          <br />
          <strong>2.4 Legal and Security: </strong> We may use your information
          to comply with legal obligations, resolve disputes, and enforce our
          terms and conditions. Additionally, we use security measures to
          protect your information from unauthorized access and misuse.
          <br />
          <br />
          <strong>3. Sharing of Information :</strong>
          <br />
          <br />
          <strong> 3.1 Third Parties:</strong> We may share your personal
          information with third-party service providers, such as recycling
          centers, payment processors, and analytics providers, to enable the
          functioning of the App and its services.
          <br />
          <br />
          <strong>3.2 Legal Requirements:</strong> We may disclose your
          information if required by law or if we believe that such disclosure
          is necessary to protect our rights, comply with a court order, or
          ensure the safety of users.
          <br />
          <br />
          <strong>3.3 Aggregated Data:</strong> We may share aggregated and
          de-identified data for analytical purposes, research, and reporting.
          <br />
          <br />
          <strong>4. Your Choices</strong>
          <br />
          <br />
          <strong>4.1 Access and Correction:</strong> You can access and update
          your personal information through your account settings in the App.
          <br />
          <br />
          <strong>4.2 Opt-out:</strong> You can choose to opt-out of receiving
          promotional communications from us by following the instructions
          provided in our communications. <br />
          <br />
          <strong>5. Data Security</strong>
          <br />
          <br />
          We take reasonable measures to safeguard your personal information
          from unauthorized access, loss, and misuse. However, no method of
          transmission over the internet or electronic storage is entirely
          secure, and we cannot guarantee its absolute security.
          <br />
          <br />
          <strong> 6. Children's Privacy :</strong>
          The App is not intended for use by children under the age of 13. We do
          not knowingly collect personal information from individuals under 13
          years of age. If you are a parent or guardian and believe we may have
          collected information from your child, please contact us to have it
          removed.
          <br />
          <br />
          <strong>7. Changes to this Privacy Policy :</strong>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices and services. We will notify you of any significant
          changes by posting a prominent notice on our website or through the
          App.
          <br />
          <br />
          <strong>8. Contact Us</strong>
          If you have any questions or concerns regarding these Terms, please
          contact us at{" "}
          <a
            href="
            mailto:info@recalluae.com
          "
          >
            info@recalluae.com
          </a>
          <br />
          <br />
          By using the Recall UAE website and mobile application, you
          acknowledge that you have read and understood this Privacy Policy and
          agree to its terms.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;

import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { scroller } from "react-scroll";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
const Terms = () => {
  useEffect(() => {
    document.title = "Recall | Terms of Use"; // Set the new title
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
        <h1>Terms of Use</h1>
      </div>
      <div className="terms-page-content">
        <p>
          Thank you for visiting Recalluae.com, operated by Recall UAE
          ("Company," "we," "us," or "our").
          <br /> <br />
          By accessing or using our Website, you agree to comply with and be
          bound by the following Terms of Use ("Terms"). Please read these Terms
          carefully before using the Website. If you do not agree with these
          Terms, please do not use the Website.
          <br />
          <br />
          <strong>1. Acceptance of Terms :</strong>
          By accessing or using the Website, you agree to these Terms and any
          additional terms and conditions that we may provide on the Website
          from time to time. These Terms constitute a legally binding agreement
          between you and the Company.
          <br />
          <br />
          <strong>2. Use of the Website :</strong> <br /> <br />
          <strong> a. Authorized Use: </strong>The Website is intended for
          personal, non-commercial use only. You agree not to use the Website
          for any illegal or unauthorized purposes.
          <br />
          <br />
          <strong> b. Content: </strong>You may use the Website to access
          information and materials related to recycling and environmental
          conservation. All content, including text, images, graphics, videos,
          and other materials, are protected by copyright and other intellectual
          property laws.
          <br />
          <br />
          <strong> c. User Conduct:</strong> You agree not to engage in any
          conduct that could disrupt, harm, or interfere with the functioning of
          the Website or infringe upon the rights of other users.
          <br />
          <br />
          <strong>3. User Accounts</strong>
          <br />
          <br />
          <strong> a. Registration: </strong> Some features of the Website may
          require you to create a user account. You agree to provide accurate
          and complete information when registering, and to update your
          information as necessary.
          <br />
          <br />
          <strong> b. Account Security:</strong> You are responsible for
          maintaining the confidentiality of your account information and for
          all activities that occur under your account. Notify us immediately if
          you suspect any unauthorized access to your account.
          <br />
          <br />
          <strong>4. Privacy</strong>
          Your use of the Website is also subject to our Privacy Policy, which
          can be found [here](link to privacy policy). By using the Website, you
          consent to the practices described in the Privacy Policy.
          <br />
          <br />
          <strong>5. Intellectual Property</strong>
          <br /> <br />
          <strong> a. Ownership:</strong> The Company retains all rights, title,
          and interest in and to the Website, including all content and
          intellectual property associated with it.
          <br /> <br />
          <strong> b. Use Limitations:</strong> You may not reproduce,
          distribute, modify, create derivative works of, publicly display, or
          perform any content from the Website without our prior written
          consent.
          <br />
          <br />
          <strong>6. Disclaimer of Warranties</strong>
          The Website is provided "as is" and "as available." We make no
          warranties, either express or implied, regarding the accuracy,
          completeness, reliability, or suitability of the content on the
          Website.
          <br />
          <br />
          <strong>7. Limitation of Liability</strong>
          To the fullest extent permitted by applicable law, the Company shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or in connection with your use of the
          Website.
          <br />
          <br />
          <strong>9. Termination</strong>
          We reserve the right to terminate or suspend your access to the
          Website without notice if you violate these Terms or engage in any
          inappropriate conduct.
          <br />
          <br />
          <strong>10. Governing Law</strong>
          These Terms are governed by and construed in accordance with the laws
          of UAE , without regard to its conflict of law principles.
          <br />
          <br />
          <strong>11. Contact Us</strong>
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
          By using the Website, you acknowledge that you have read, understood,
          and agree to these Terms of Use.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;

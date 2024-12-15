import React, { useEffect, useState } from "react";
import LandingPageImages from "../../assets/LandingPageImages";

import { useNavigate } from "react-router-dom";
import "./landing.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import PrincipleModal from "../../modals/LandingPageModals/PrincipleModal/PrincipleModal";
import Faq from "../../components/LandingPageComponents/Faq";
import NotifyModal from "../../modals/LandingPageModals/NotifyModal";
import AppDownload from "../../assets/brand/AppDownload.webp";
import DashboardIcons from "../../assets/DashboardIcons";

const LandingPage = () => {
  const navigate = useNavigate();
  const items = ["One", "Can", "at a", "time"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isVisible && currentIndex < items.length) {
      const timeoutId = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1000); // 1000ms = 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, currentIndex, items.length]);

  // const visibleImages = [
  //   LandingPageImages.Can1,
  //   LandingPageImages.Can2,
  //   LandingPageImages.Can3,
  //   LandingPageImages.Can4,
  // ].slice(0, currentIndex);

  const priceTable = [
    {
      id: 1,
      popular: false,
      title: "Individual",
      price: "$1",
      duration: "one time",
      description:
        "Designed with the user’s convenience in mind, this scheme includes:",
      features: [
        {
          available: true,
          text: "Access to recall app",
        },
        {
          available: true,
          text: "Smart bin facility",
        },
        {
          available: true,
          text: "Recall points",
        },
        {
          available: true,
          text: "Integration with delivery partners",
        },
        {
          available: true,
          text: "Exclusive recall merchandise",
        },
      ],
      path: "/signup/individual",
    },
    {
      id: 2,
      path: "/signup/business",
      title: "Business",
      popular: true,
      price: "$1",
      duration: "one time",
      description: "Plan specially made for responsible businesses",
      features: [
        {
          available: true,
          text: "Free consultation",
        },
        {
          available: true,
          text: "Relationship manager",
        },
        {
          available: true,
          text: "Custom bin at site",
        },
        {
          available: true,
          text: "Scheduled pickup",
        },
        {
          available: true,
          text: "Access to corporate web store",
        },
      ],
    },
    {
      id: 3,
      path: "/ecommerce",
      link: "https://store.recalluae.com/",
      title: "Guest Users",
      popular: false,
      price: "$1",
      duration: "one time",
      description:
        "Join  as a guest user to access Recall store,this plan includes:",
      features: [
        {
          available: true,
          text: "Access to Recall store",
        },
        {
          available: false,
          text: "Recall Dashboard",
        },
        {
          available: false,
          text: "Free consultation",
        },
        {
          available: false,
          text: "Recall points",
        },
        {
          available: false,
          text: "Exclusive recall merchandise",
        },
      ],
    },
  ];
  const principles = [
    {
      img: LandingPageImages.Principle1,
      Bg: LandingPageImages.Principle1Bg,
      title: "Achieving Sustainability through Efficiency.       ",
      desc: "When it comes to saving our planet, we need to act fast and act smart. Some actions can have a greater impact than others. <br/> That’s why at Recall, we decided to focus on the use and re-use of Aluminium first. Here’s why :  ",
      lists: [
        {
          title: "Infinite Recyclability",
          text: "Unlike plastics, which tend to degrade in quality with each recycling cycle, aluminum can be recycled over and over without losing its inherent properties. This means that the same aluminum can be repurposed into new products without any significant loss of quality, reducing the demand for virgin aluminum production, which is an energy-intensive process.",
        },
        {
          title: "Greater Energy Savings",
          text: "Greater Energy Savings : Recycling an aluminium can requires only 5% of the energy required to make new one from scratch. That’s 95% energy savings! This reduction in energy consumption translates to fewer greenhouse gas emissions and a lighter carbon footprint.",
        },
        {
          title: "Reduced Waste",
          text: "Compared to plastics, aluminum recycling produces less waste. Plastics, especially single-use plastics, pose significant challenges in terms of disposal and recycling due to their complex composition. Aluminum, on the other hand, can be easily sorted and recycled, diverting valuable materials from landfills and incinerators.           ",
        },
        {
          title: "Long-lasting Products",
          text: "Aluminum is known for its durability and resistance to corrosion. This quality ensures that products made from recycled aluminum have a longer lifespan, reducing the need for replacements and conserving resources in the long run.",
        },
      ],
    },
    {
      img: LandingPageImages.Principle2,
      Bg: LandingPageImages.Principle2Bg,
      title: "Turning Eco-responsibility into a lifestyle choice       ",
      desc: "Eco-friendly practices should be more than just a fleeting trend or an occasional endeavour. Ecoresponsibility needs to be ingrained into our daily lives as a steadfast lifestyle choice and part of our culture. <br/> Recall consciously works to ensure that the activities involved are fun, easily accessible and rewarding. By doing this, we aim to persuade people into gradually adopting recycling and responsible use into their daily lives.<br/> When ecoresponsibility becomes an intrinsic part of our lives, its effects extend beyond individual actions. Friends, family, and acquaintances are influenced by our choices, leading to a ripple effect that gradually expands the circle of eco-conscious individuals. This collective impact holds the potential to drive societal change and influence policy decisions.",
    },
    {
      img: LandingPageImages.Principle3,
      Bg: LandingPageImages.Principle3Bg,
      title: "Collaborating towards a Greener Planet       ",
      desc: "We believe that the only way to achieve true sustainability is through collaboration.<br/> The involvement of people, businesses and governments working together towards this common goal, can create a significant impact and is, in fact, the only way to ensure consistent and sustained improvement towards our endeavors to safeguard our planet.<br/><br/>  Involving local businesses from various industries allows for us to close loops in the supply change and transition towards a more circular economy.<br/><br/> Recall aims to facilitate this collaboration by providing a great platform for individuals and businesses to interact, access sustainable products, gain awareness and share their impact.   ",
    },
  ];
  const cardData = [
    {
      id: 1,
      title: "1. Map",
      description: " Locate our smart bins on the map",
      image: LandingPageImages.Howto1,
    },
    {
      id: 2,
      title: "2. Tap",
      description: "Tap your phone of the bin to unlock the bin",
      image: LandingPageImages.Howto2,
    },
    {
      id: 3,
      title: "3. Drop",
      description: "Drop your cans and earn points instantly",
      image: LandingPageImages.Howto3,
    },
    {
      id: 4,
      title: "4. Shop",
      description:
        "Use your rewards points to buy cool stuff from the Recall store",
      image: LandingPageImages.Howto4,
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [shownNotifyModal, setShowNotifyModal] = useState(false);
  const [sendPrincipal, setSendPrincipal] = useState();
  const handleClick = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      offset: -100,
      duration: 1200,
    });
  };
  // const [count, setCount] = useState(0);
  // const [timePeriod, setTimePeriod] = useState("month");

  // const handleTimePeriodChange = (period) => {
  //   setTimePeriod(period);
  // };

  // useEffect(() => {
  //   const startOfMonth = new Date();
  //   startOfMonth.setDate(1); // Set the date to the 1st day of the current month
  //   startOfMonth.setHours(0, 0, 0, 0); // Set time to midnight

  //   const startOfDay = new Date();
  //   startOfDay.setHours(0, 0, 0, 0); // Set time to midnight

  //   const updateCount = () => {
  //     const now = new Date();
  //     let millisecondsElapsed;

  //     if (timePeriod === 'month') {
  //       millisecondsElapsed = now - startOfMonth;
  //     } else if (timePeriod === 'year') {
  //       const startOfYear = new Date(now.getFullYear(), 0, 1);
  //       millisecondsElapsed = now - startOfYear;
  //     } else if (timePeriod === 'today') {
  //       millisecondsElapsed = now - startOfDay;
  //     }

  //     const secondsElapsed = Math.floor(millisecondsElapsed / 1000);
  //     const cansConsumed = secondsElapsed * 6700; // 6700 cans per second
  //     setCount(cansConsumed);
  //   };

  //   updateCount(); // Initial update
  //   const interval = setInterval(updateCount, 1000); // Update every second

  //   return () => {
  //     clearInterval(interval); // Cleanup on unmount
  //   };
  // }, [timePeriod]);

  // cansPerDay = 6700;
  // secondsInADay = 86400; // 24 hours * 60 minutes * 60 seconds
  // secondsPassedToday = (new Date() - new Date().setHours(0, 0, 0, 0)) / 1000; // Number of seconds passed today
  // startingCount = Math.floor(secondsPassedToday) * cansPerDay; 
  
  return (
    <div className="recall-landing-page">
      <PrincipleModal
        open={showModal}
        data={sendPrincipal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
      <NotifyModal
        open={shownNotifyModal}
        handleClose={() => {
          setShowNotifyModal(false);
        }}
      />
      <div className="laptop-nav">
        <Navbar handleClick={handleClick} />
      </div>
      <div className="mobile-nav">
        <MobileNavbar />
      </div>
      <div id="home" className="recall-landing-page-section-1">
        <div className="recall-landing-page-section-1-text">
          <h1 className="recall-landing-page-section-1-text-large">
            The smarter way to an eco-responsible lifestyle
          </h1>
          <p className="recall-landing-page-section-1-text-medium">
            Revolutionizing Recycling: Embrace the Future of Sustainable
            Aluminium Can Disposal with Our Smart Solutions!
          </p>
          <div className="recall-landing-page-section-1-text-buttons">
            <img
              onClick={() => {
                setShowNotifyModal(true);
              }}
              src={LandingPageImages.AppStore}
              alt=""
            />
            <img
              onClick={() => {
                setShowNotifyModal(true);
              }}
              src={LandingPageImages.Google}
              alt=""
            />
          </div>
        </div>
        <div className="recall-landing-page-section-1-image"></div>
        <div className="recall-landing-page-section-1-image | mobile-hero-1">
          {/* <img src={LandingPageImages.BgMobile} alt="" /> */}
        </div>
      </div>
      <div id="whatsrecall" className="recall-landing-page-section-2">
        <div className="recall-landing-page-section-2-img">
          <img src={LandingPageImages.recallBin} alt="" />
        </div>
        <div className="recall-landing-page-section-2-text">
          <div className="recall-landing-page-section-1-text-small">
            What’s Recall
          </div>
          <div className="recall-landing-page-section-1-text-large">
            Recycling was never this fun!
          </div>
          <div className="recall-landing-page-section-1-text-medium">
            At Recall, we believe that saving the planet can be both exciting
            and rewarding. That's why we've crafted an innovative solution that
            can make the world a greener place while adding a dash of fun to
            your everyday routine.
          </div>
          <div className="section-2-lists">
            <div className="section-2-lists-item">
              <img src={LandingPageImages.Check} alt="" />
              <p>
                <span>Easy and Intuitive </span>
                No more complicated recycling processes! Our user-friendly app
                makes recycling a breeze, whether you're a seasoned
                environmentalist or just starting your sustainability journey.
              </p>
            </div>
            <div className="section-2-lists-item">
              <img src={LandingPageImages.Check} alt="" />
              <p>
                <span>Smart Tracking </span>
                Our cutting-edge technology effortlessly tracks your recycling
                activity, giving you real-time insights into your environmental
                impact. Watch your impact grow as you recycle more! You'll be
                amazed at the amount of energy you conserved and the positive
                change you bring to the environment.
              </p>
            </div>
            <div className="section-2-lists-item">
              <img src={LandingPageImages.Check} alt="" />
              <p>
                <span> Incredible Incentives </span>
                Get ready to be surprised! As you recycle, you'll unlock a
                treasure trove of rewards and incentives. From exclusive
                discounts at your favourite outlets to exciting online deals on
                the Recall Store, your recycling efforts will be rewarded with
                delightful perks.
              </p>
            </div>
            <div className="section-2-lists-item">
              <img src={LandingPageImages.Check} alt="" />
              <p>
                <span>Community and Challenges </span>
                Join forces with a community of eco-conscious individuals just
                like you! Earn badges for your achievements and participate in
                recycling challenges that challenge your recycling skills and
                unite you with like-minded friends. Together, we can create a
                greener future!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="howitworks" className="recall-landing-page-section-3">
        <div className="recall-landing-page-section-3-text">
          <div className="recall-landing-page-section-1-text-small">
            The App
          </div>
          <div className="recall-landing-page-section-1-text-large">
            Here’s how Recall App Works
          </div>
        </div>
        <div className="recall-landing-page-section-3-cards">
          {cardData.map((card) => {
            return (
              <>
                <div className="recall-landing-page-section-3-card">
                  <div className="recall-landing-page-section-3-card-img">
                    <img src={card.image} alt="" />
                  </div>
                  <div className="recall-landing-page-section-3-card-text">
                    <div className="recall-landing-page-section-3-card-text-header">
                      {card.title}
                    </div>
                    <div className="recall-landing-page-section-3-card-text-body">
                      {card.description}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div id="ourplans" className="recall-landing-page-section-4">
        <div className="recall-landing-page-section-4-text">
          <div className="recall-landing-page-section-1-text-large">
            Choose the Right Plan for You
          </div>
          <div className="recall-landing-page-section-1-text-medium">
            Compare our plans and choose the one that fits your needs.
          </div>
        </div>
        <div className="price-table">
          {priceTable.map((price, index) => {
            return (
              <div
                className={
                  price.popular ? "popular-price-card price-card" : "price-card"
                }
                key={index}
              >
                {/* {price.popular ? (
                  <div className="popular-tag">MOST POPULAR</div>
                ) : null} */}
                <div className="price-card-header">{price.title}</div>
                <div className="price-card-description">
                  {price.description}
                </div>
                <div className="price-card-features">
                  {price.features.map((feature, featureindex) => {
                    return (
                      <div key={featureindex} className="price-card-feature">
                        <div className="price-card-feature-available">
                          <img
                            src={
                              feature.available
                                ? LandingPageImages.Check
                                : LandingPageImages.Cross
                            }
                            alt=""
                          />
                        </div>
                        {feature.text}
                      </div>
                    );
                  })}
                </div>
                <div className="price-card-btn">
                  <button
                    onClick={() => {
                      if (price.link) {
                        window.open(price.link, "_blank");
                      } else {
                        navigate(price.path);
                      }
                    }}
                  >
                    {price.link ? "Visit Recall Store" : "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="price-table |  price-table-mobile">
          {priceTable.map((price, index) => {
            return (
              <div
                className={
                  price.popular ? "popular-price-card price-card" : "price-card"
                }
                key={index}
              >
                {price.popular ? (
                  <div className="popular-tag">MOST POPULAR</div>
                ) : null}
                <div className="price-card-header">{price.title}</div>
                <div className="price-card-description">
                  {price.description}
                </div>
                <div className="price-card-features">
                  {price.features.map((feature, featureindex) => {
                    return (
                      <div key={featureindex} className="price-card-feature">
                        <div className="price-card-feature-available">
                          <img
                            src={
                              feature.available
                                ? LandingPageImages.Check
                                : LandingPageImages.Cross
                            }
                            alt=""
                          />
                        </div>
                        {feature.text}
                      </div>
                    );
                  })}
                </div>
                <div className="price-card-btn">
                  <button
                    onClick={() => {
                      if (price.link) {
                        window.open(price.link, "_blank");
                      } else {
                        navigate(price.path);
                      }
                    }}
                  >
                    {price.link ? "Visit Recall Store" : "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="purpose" className="recall-landing-page-section-5">
        <div className="recall-landing-page-section-5-text">
          <div className="recall-landing-page-section-1-text-small">
            Why Recall
          </div>
          <div className="recall-landing-page-section-1-text-large">
            Our Core Principles
          </div>
        </div>
        <div className="recall-landing-page-section-5-cards">
          {principles.map((principle, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={() => {
                    setSendPrincipal(principle);
                    setShowModal(true);
                  }}
                  className="recall-landing-page-section-5-card"
                >
                  <div className="recall-landing-page-section-5-card-image">
                    <img src={principle.img} alt="" />
                  </div>
                  <div className="recall-landing-page-section-5-card-text">
                    {principle.title}
                    <img
                      className="arrow"
                      src={LandingPageImages.Arrow}
                      alt=""
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* <div>
        <h1>Live Count of Aluminum Cans Consumed</h1>
        <p>Current count: {count} cans</p>

        <div>
          <button onClick={() => handleTimePeriodChange("month")}>
            For Month
          </button>
          <button onClick={() => handleTimePeriodChange("year")}>
            For Year
          </button>
          <button onClick={() => handleTimePeriodChange("today")}>
            For Today
          </button>
        </div>
      </div> */}
      {/* <>
      <CountUp end={578880000} start={
        //
      } duration={86400} separator="," />
      </> */}
      {/* <div className="recall-landing-page-section-6">
        <div className="recall-landing-page-section-6-left">
          <div className="recall-landing-page-section-6-left-header">
            YES <br /> WE <br /> CAN
          </div>
          <div className="recall-landing-page-section-6-left-body">
            Make a Difference,
          </div> 
        </div>
        <div className="recall-landing-page-section-6-right">
          <div className="recall-landing-page-section-6-right-animation">
            {visibleImages.map((imagePath, index) => (
              <div className="animation-div">
                <motion.img
                  key={index}
                  src={imagePath}
                  alt=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                />
                <div className="text-overlay">{items[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div id="contactus" className="recall-landing-page-section-7">
        <div className="recall-landing-page-section-7-text">
          <div className="recall-landing-page-section-1-text-large">
            Contact Us
          </div>
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
          <div className="contact-right">
            <img src={LandingPageImages.Contact} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="recall-landing-page-section-8">
        <div className="recall-landing-page-section-8-left">
          <img src={LandingPageImages.Device} alt="" />
        </div>
        <div className="recall-landing-page-section-8-right">
          <span>Download</span>
          <h1>
            Join the Recall <br /> Movement: Get the App and Be the Change!
          </h1>

          <div className="recall-landing-page-section-1-text-buttons">
            <img src={LandingPageImages.AppStore} alt="" />
            <img src={LandingPageImages.Google} alt="" />
          </div>
        </div>
      </div> */}

      <div className="recall-uae-new-download">
        <div className="recall-uae-new-download-left">
          <h1>Join the Recall Movement: Get the App and Be the Change!</h1>
          <p>
            Revolutionizing Recycling: Embrace the Future of Sustainable
            Aluminium Can Disposal with Our Smart Solutions!
          </p>
          <div className="cta">
            <img src={DashboardIcons.Play} alt="" />
            Know More About Recall
          </div>
          <div className="download-cta">
            <div className="download-text">Available for download</div>
            <div className="download-cta-buttons">
              <img
                onClick={() => {
                  setShowNotifyModal(true);
                }}
                src={DashboardIcons.Apple2}
                alt=""
              />
              <img
                onClick={() => {
                  setShowNotifyModal(true);
                }}
                src={DashboardIcons.Playstore2}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="recall-uae-new-download-right">
          <img src={AppDownload} alt="" />
        </div>
      </div>
      <div id="faq" className="recall-landing-page-section-7">
        <div className="recall-landing-page-section-7-text">
          <div className="recall-landing-page-section-1-text-large">
            Frequently Asked Questions
          </div>
        </div>
        <Faq />
      </div>
      <Footer handleClick={handleClick} />
    </div>
  );
};

export default LandingPage;

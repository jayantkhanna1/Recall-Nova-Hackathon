import React, { useState, useEffect } from "react";
import LandingPageImages from "../../assets/LandingPageImages";
import { scroller } from "react-scroll";
import { Parallax } from "react-parallax";
import Navbar from "../../components/Navbar/Navbar";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import LandingPageComponents from "../../components/LandingPageComponents";

const LandingPage = () => {
  const navigate = useNavigate();
  const [, setShowContent] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".recall-animated-new");
      const containerPosition = container.getBoundingClientRect();
      if (
        containerPosition.top < window.innerHeight &&
        containerPosition.bottom >= 0
      ) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      offset: -100,
      duration: 1200,
    });
  };

  const cardData = [
    {
      id: 1,
      title: "Locate",
      description: "Find a smart bin near you",
      image: LandingPageImages.Howto1,
    },
    {
      id: 2,
      title: "Scan",
      description: "Scan the barcode on your can",
      image: LandingPageImages.Howto2,
    },
    {
      id: 3,
      title: "Drop",
      description: "Drop your cans in the bin and earn instant points",
      image: LandingPageImages.Howto3,
    },
    {
      id: 4,
      title: "Shop",
      description: "Use your points to buy cools stuff on the Recall Store",
      image: LandingPageImages.Howto3,
    },
  ];
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
      path: "/signup",
    },
    {
      id: 2,
      path: "/signup-business",
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
      title: "Guest Users",
      popular: false,
      price: "$1",
      duration: "one time",
      description: "Join  as a guest user to access Recall store",
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
      title: "Aluminium cans are infinitely recyclable",
      text: "Aluminium can do not lose their quality while recycling, making them a valuable and Aluminium cans sustainable commodity",
    },
    {
      img: LandingPageImages.Principle2,
      title: "Greener Planet",
      text: "Recycling a can only take 5% of the energy required to make a new one! Thats 95% energy savings per can!.",
    },
    {
      img: LandingPageImages.Principle3,
      title: "A collective movement",
      text: "Think about the massive impact we can make by doing just this simple task! Lets ensure NO aluminium goes to our landfills in the UAE and show the world we can make a difference. BECAUSE WE CAN!",
    },
  ];

  const [, setHoveredCard] = useState(null);
  return (
    <>
      <Navbar handleClick={handleClick} />

      <div className="home-page-wrap">
        <div className="home-page-first-section">
          <div className="home-page-first">
            <video autoPlay={true}>
              <source src={LandingPageImages.Video} type="video/mp4"></source>
            </video>
            <div className="home-page-first-layer"></div>
          </div>
          <div className="home-page-first-content">
            <h1>
              Cans to Coins: Recycling Aluminum,
              <br /> the Rewarding Way!
            </h1>
            <div className="landing-download-button">
              <button>
                Download Our App <img src={LandingPageImages.Download} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="recall-animated-new">
          <Parallax
            bgImage={LandingPageImages.ParallaxHand}
            strength={200}
            style={{ width: "100%", height: "800px" }}
          >
            <div style={{ height: "700px" }}>
              <div className="recall-animated-content">
                <h1>why Recall?</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Nunc libero amet in at
                  lacus leo dolor. Pulvinar suscipit porttitor sapien dictumst
                  est. Leo interdum in orci suspendisse arcu eget pellentesque
                  neque.
                </p>
              </div>
            </div>
          </Parallax>
        </div>
        <div id="how-to-container" className="how-recall-works">
          <p>The App</p>
          <div className="header">Here’s how Recall App works</div>
          <div className="recall-app-cards">
            {cardData.map((card) => {
              return (
                <>
                  <div
                    className="recall-app-card"
                    key={card.id}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <img src={card.image} alt="" />
                    <div className="recall-card-text">
                      <h2>{card.title}</h2>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="recall-price-chart">
          <div className="header">
            Choose the Right <span> Plan for You</span>
          </div>
          <div className="subtitle">
            Recall works differently for individuals and businesses. For the
            best user experience, choose the program that fits your needs.
          </div>
          <div className="price-table">
            {priceTable.map((price, index) => {
              return (
                <div
                  className={
                    price.popular
                      ? "popular-price-card price-card"
                      : "price-card"
                  }
                  key={index}
                >
                  {price.popular ? (
                    <div className="popular-tag">MOST POPULAR</div>
                  ) : null}
                  <div className="price-card-header">{price.title}</div>
                  <div className="price-card-price">
                    {price.price} <span>/{price.duration}</span>
                  </div>
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
                        navigate(price.path);
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="principles-container" className="our-priniciples">
          <p>Our Principles</p>
          <div className="header">Why we Beilieve we can make a difference</div>
          <div className="principles-cards">
            {principles.map((principle, index) => {
              return (
                <div
                  key={index}
                  className={`principles-card ${
                    activeCard === index ? "active-principle-card" : ""
                  }`}
                  onMouseEnter={() => {
                    setActiveCard(index);
                  }}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="principles-card-img">
                    <img src={principle.img} alt="" />
                  </div>
                  {activeCard === index && (
                    <div className="principle-card-text">{principle.text}</div>
                  )}
                  <p>{principle.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="impact-section">
          <div className="big-heading">
            Yes We <br /> Can
          </div>
          <div className="impact-type-writter">
            <p>Make a Difference, One Can at a time</p>
            <p>
              <Typewriter
                options={{
                  strings: ["ONE CAN AT A TIME."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </p>
          </div>

          <div className="impact-img">
            <img src={LandingPageImages.Impact} alt="" />
          </div>
        </div>
        <LandingPageComponents.CircleAnimation />
        <div id="contact-us-container" className="contact-us">
          <div className="header">Contact Us</div>
          <div className="subtitle">
            Need any assistance or have any queries related to recycling or our
            services? Contact us and our team will be more than happy to help
            you out!
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
            <div className="contact-us-right"></div>
          </div>
        </div>
        <div className="download-our-app">
          <div className="download-our-app-image">
            <img src={LandingPageImages.Device} alt="" />
          </div>
          <div className="download-our-app-text">
            <div className="header">
              Download the App and <br /> be part of the revolution!
            </div>
            <div className="download-links">
              <a href className="download-link">
                <img src={LandingPageImages.AppStore} alt="" />
              </a>
              <a href className="download-link">
                <img src={LandingPageImages.Google} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import Wave from "react-wavify";
import { WhatsappShareButton, TelegramShareButton } from "react-share";
import { getUserStats } from "../../services/Dashboard/User";
import { getAreas } from "../../services/Dashboard/Pickup";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import RecallHistory from "../../modals/DashboardModals/RecallHistory";
import SchedulePickup from "../../modals/DashboardModals/SchedulePickup";
import DashboardIcons from "../../assets/DashboardIcons";
import RecallBadge from "../../modals/DashboardModals/RecallBadge";

const Dashboard = () => {
  const options2 = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const series2 = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  const shareUrl = window.location.href;
  const promoText = `I hope this message finds you well. I wanted to share something incredible with you that I've recently discovered – Recall, the Ultimate Recycling App! ♻️🌍

    Recall has completely changed the way I approach recycling, and I thought you might be interested too. It's more than just an app; it's a community of like-minded individuals striving to make a positive impact on the environment.
    
    With Recall, you can effortlessly track your recycling progress, set goals, and receive personalized tips to recycle more effectively. It's incredibly user-friendly and has made recycling a fun and rewarding experience for me.
    You can download the Recall app from [App Store/Play Store] or visit their website at [Website Link] for more information.`;
  const [data, setData] = useState();
  const [, setData2] = useState();
  const [, setmatchedDate] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStatsResponse = await getUserStats();
        if (userStatsResponse.message === "No such user exists") {
          localStorage.removeItem("userData");
          window.location.reload();
        }
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

  const [showRecallHistory, setshowRecallHistory] = useState(false);
  const [showSchedulePickup, setshowSchedulePickup] = useState(false);
  const [showBadges, setshowBadges] = useState(false);
  return (
    <>
      <div className="mobile-nav">
        <MobileNavbar />
      </div>
      <div className="dashboard">
        {/* <MobileNavbar /> */}

        <RecallBadge
          open={showBadges}
          handleClose={() => {
            setshowBadges(false);
          }}
        />
        <RecallHistory
          open={showRecallHistory}
          handleClose={() => {
            setshowRecallHistory(false);
          }}
        />
        <SchedulePickup
          open={showSchedulePickup}
          handleClose={() => {
            setshowSchedulePickup(false);
          }}
        />
        <div className="new-dashboard-grid">
          <div className="dashboard-row-1 | card-white">
            <div className="dashboard-row-1-card">
              <p>Your Stats</p>
              <div className="dashboard-grid-user-header | header-dasboard">
                {data?.user.name} 👋
              </div>
              <div className="dashbaord-stats-circles">
                <div className="dashbaord-stats-circles-data">
                  <div className="dashbaord-stats-circles-data-top">
                    <CountUp end={data?.user_stats.cans_recycled} />
                  </div>
                  <div className="dashbaord-stats-circles-data-bottom">
                    Recall <br />
                    Points
                  </div>
                  <div className="dashbaord-stats-circles-icon">💰</div>
                </div>
                <div
                  onClick={() => {
                    window.open("https://store.recalluae.com", "_blank");
                  }}
                  className="dashbaord-stats-circles-data"
                >
                  <div className="dashbaord-stats-circles-data-top">
                    <img src={DashboardIcons.Cart} alt="" />
                  </div>
                  <div className="dashbaord-stats-circles-data-bottom">
                    Redeem <br />
                    Points
                  </div>
                  <div className="dashbaord-stats-circles-icon">🌿</div>
                </div>
                <div
                  onClick={() => {
                    setshowBadges(true);
                  }}
                  className="dashbaord-stats-circles-data"
                >
                  <div className="dashbaord-stats-circles-data-top">
                    <img src={DashboardIcons.Recall} alt="" />
                  </div>
                  <div className="dashbaord-stats-circles-data-bottom">
                    Recall <br />
                    Badge
                  </div>
                  <div className="dashbaord-stats-circles-icon">
                    <img src={DashboardIcons.Recallbadge} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-row-1-card-2">
              <div className="dashboard-row-1-card | card-white top-card">
                <div className="share-flex">
                  <div className="share-flex-text">
                    <p>Your Pickup</p>
                    <div className="dashboard-grid-user-header | header-dasboard">
                      Your Pickup is scheduled for
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setshowSchedulePickup(true);
                    }}
                    className="share-flex-right-box"
                  >
                    <div className="share-flex-right-box-date">24</div>
                    <div className="share-flex-right-box-month">July</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-row-1-card | card-white top-card">
                <div className="share-flex">
                  <div className="share-flex-text">
                    <p>Recall History</p>
                    <div className="dashboard-grid-user-header | header-dasboard">
                      Recall History
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setshowRecallHistory(true);
                    }}
                    className="share-flex-right-box"
                  >
                    <img src={DashboardIcons.History} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-row-1">
            <div className="dashboard-row-1-card | card-light-blue | card-0-padding">
              <div className="new-energy-card-header">
                <div className="new-energy-card-header-text">
                  <div className="analytics-card-header | header-dasboard">
                    Energy Saved ⚡️
                  </div>
                  <div className="energy-saved-info">
                    <div className="energy-parameters">
                      <div className="energy-parameters-text">
                        <img src={DashboardIcons.Electricity} alt="" />
                        <h1>
                          {(data?.user_stats.cans_recycled * 66.7).toFixed(2)}
                          kWh
                        </h1>
                        <p>total electricity</p>
                      </div>
                      <div className="energy-parameters-text">
                        <img src={DashboardIcons.Co2} alt="" />
                        <h1>
                          {(data?.user_stats.cans_recycled * 14.99).toFixed(2)}
                          kg
                        </h1>
                        <p>carbon emission</p>
                      </div>
                      <div className="energy-parameters-text">
                        <img src={DashboardIcons.Bulb} alt="" />
                        <h1>
                          {(data?.user_stats.cans_recycled * 15).toFixed(0)}W
                        </h1>
                        <p>LED</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="react-wave">
                  <Wave
                    fill="#89cff0"
                    paused={false}
                    options={{
                      height: 20,
                      amplitude: window.innerWidth > 600 ? 49 : 20,
                      speed: 0.15,
                      points: 3,
                    }}
                  />
                </div>
              </div>
              <div className="new-energy-card-icons">
                <div className="new-energy-card-icon">
                  <img src={DashboardIcons.Energy1} alt="" />
                  <p>Environment</p>
                </div>
                <div className="new-energy-card-icon">
                  <img src={DashboardIcons.Energy2} alt="" />
                  <p>Recycle</p>
                </div>
                <div className="new-energy-card-icon">
                  <img src={DashboardIcons.Energy3} alt="" />
                  <p>Sustainabilty</p>
                </div>
              </div>
            </div>
            <div className="dashboard-row-1-card-2">
              <div className="dashboard-row-1-card | card-white | chart-card">
                <p>Your Analytics</p>
                <div className="dashboard-grid-user-header | header-dasboard">
                  Recall Analytics
                </div>
                <div className="chart-analytics">
                  <ReactApexChart
                    options={options2}
                    series={series2}
                    type="area"
                    height={350}
                  />
                </div>
              </div>
              <div className="dashboard-row-1-card | card-white share-card">
                <div className="share-flex">
                  <div className="share-flex-text">
                    <p>SHARE ABOUT US</p>
                    <div className="dashboard-grid-user-header | header-dasboard">
                      Share
                    </div>
                  </div>
                  <div className="share-flex-items">
                    <WhatsappShareButton url={shareUrl} title={promoText}>
                      <img src={DashboardIcons.Whatsapp} alt="" />
                    </WhatsappShareButton>
                    <TelegramShareButton url={shareUrl} title={promoText}>
                      <img src={DashboardIcons.Telegram} alt="" />
                    </TelegramShareButton>
                    <img src={DashboardIcons.Others} alt="" />
                    <img src={DashboardIcons.Copy} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

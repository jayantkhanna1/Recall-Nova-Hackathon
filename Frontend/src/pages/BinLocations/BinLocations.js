import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import customMap from "./customMap.json";
import { scroller } from "react-scroll";
import { usePosition } from "use-position";
import Navbar from "../../components/Navbar/Navbar";
import LandingPageImages from "../../assets/LandingPageImages";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import DashboardIcons from "../../assets/DashboardIcons";
// import DashboardIcons from "../../assets/DashboardIcons";
const BinLocations = () => {
  const mapStyles = {
    width: "100%",
    height: "100vh",
  };
  const defaultCenter = {
    lat: 24.9621862282924,
    lng: 55.1600287902201,
  };
  const { latitude, longitude, error } = usePosition();

  if (error) {
    console.error("Error getting geolocation:", error);
  }

  const center =latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

  const markerLocations = [
    { lat: 24.9611862282924, lng: 55.1500287902201 },
    { lat: 25.0789191048745, lng: 55.1232627477984 },
    { lat: 25.1267700742756, lng: 55.1222510775418 },
    { lat: 25.1959600080512, lng: 55.2777116260371 },
    { lat: 25.1161820046623, lng: 55.2029928664733 },
    { lat: 25.1916658773878, lng: 55.2753654222708 },
    { lat: 25.1141252569921, lng: 55.1386907453432 },
    { lat: 25.0643096905497, lng: 55.1468568634062 },
    { lat: 25.1659749392824, lng: 55.2081071847286 },
    { lat: 25.0768815138985, lng: 55.1314141928845 },
    { lat: 25.2072118060714, lng: 55.2622982258451 },

    { lat: 24.9199771826074, lng: 55.0087692821915 },
    { lat: 25.2172195679999, lng: 55.2797524163755 },
    { lat: 24.9822140369419, lng: 55.1723670188692 },
    { lat: 25.0445498795039, lng: 55.1207132883287 },
    { lat: 25.0472200941108, lng: 55.2355372290937 },
    { lat: 25.0685814935615, lng: 55.3062339819944 },

    { lat: 25.1669378630306, lng: 55.4042864154526 },
    { lat: 25.22178945959, lng: 55.3522588234135 },
    { lat: 25.2024828973687, lng: 55.3418846832615 },
    { lat: 25.2165457035777, lng: 55.4078314667393 },
    { lat: 25.1271563487343, lng: 55.3973146578084 },
    { lat: 25.1283572627344, lng: 55.4212035804699 },
  ];
  const handleClick = (section) => {
    scroller.scrollTo(section, {
      smooth: true,
      offset: -100,
      duration: 1200,
    });
  };

  useEffect(() => {
    document.title = "Recall Bins Near You"; // Set the new title
    return () => {
      document.title = "Recall | Recycling Revolutionized";
    };
  }, []);

  const [nearestMarkers, setNearestMarkers] = useState([]);

  const [markerDetails, setMarkerDetails] = useState([]);

  useEffect(() => {
    // Calculate distances and find the nearest markers
    const distances = markerLocations.map((location) => {
      const lat1 = latitude || defaultCenter.lat;
      const lon1 = longitude || defaultCenter.lng;
      const lat2 = location.lat;
      const lon2 = location.lng;

      // Calculate distance using Haversine formula
      const radLat1 = (Math.PI * lat1) / 180;
      const radLat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radTheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radLat1) * Math.sin(radLat2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515; // Distance in miles (you can change it to kilometers if needed)

      return { location, distance: dist };
    });

    // Sort the distances array by distance in ascending order
    distances.sort((a, b) => a.distance - b.distance);

    // Get the top nearest markers (e.g., top 5)
    const topNearestMarkers = distances
      .slice(0, 5)
      .map((item) => item.location);

    setNearestMarkers(topNearestMarkers);

    // Fetch details for the top nearest markers
    const fetchMarkerDetails = async () => {
      const details = [];

      for (const marker of topNearestMarkers) {
        // Use Google Maps API to fetch details for each marker
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=AIzaSyDITy2QJp4holPEU6hV017HVFmDKB-I69U`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const result = data.results[0];
          console.log(result);
          const name = result.formatted_address;
          const streetViewResponse = await fetch(
            `https://maps.googleapis.com/maps/api/streetview?location=${marker.lat},${marker.lng}&size=400x200&key=AIzaSyDITy2QJp4holPEU6hV017HVFmDKB-I69U`
          );

          details.push({
            name,
            location: marker,
            image: streetViewResponse.url,
          });
        }
      }

      setMarkerDetails(details);
    };

    fetchMarkerDetails();
  }, []);

  const [clickedMarker, setClickedMarker] = useState(null);

  // Function to handle marker click
  const handleMarkerClick = (location) => {
    setClickedMarker(location);
  };

  console.log(nearestMarkers);
  console.log(markerDetails);
  return (
    <>
      <div className="laptop-nav">
        <Navbar handleClick={handleClick} />
      </div>
      <div className="mobile-nav">
        <MobileNavbar />
      </div>
      <div className="map-wrapper">
        <LoadScript googleMapsApiKey="AIzaSyDITy2QJp4holPEU6hV017HVFmDKB-I69U">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={center}
            // center={defaultCenter}
            options={{ styles: customMap }} // Apply the custom style
          >
            {markerLocations.map((location, index) => (
              <Marker
                key={index}
                onClick={() => handleMarkerClick(location)}
                position={location}
                // You can customize marker options here
                // For example: icon, animation, etc.
                icon={DashboardIcons.recallPin}
                animation={2}
              ></Marker>
            ))}
            {defaultCenter && (
              <Marker
                position={center}
                // You can customize this marker as needed
                // For example: icon, animation, etc.
                icon={DashboardIcons.CurrentLoc}
                animation={2}
              ></Marker>
            )}
          </GoogleMap>
        </LoadScript>
        <div className="map-bottom-component">
          <div className="map-bottom-component-wrap">
            {/* {clickedMarker && (
              <div>
                <p>{clickedMarker.lat}</p>
                <p>{clickedMarker.lng}</p>
              </div>
            )} */}

            <h1>Recall Bins Near Your</h1>
            <div className="bins-items">
              {markerDetails.map((item, index) => {
                return (
                  <div className="bin-item">
                    <div className="bin-item-left">
                      <img src={LandingPageImages.BinImage} alt="" />
                    </div>
                    <div className="bin-item-right">
                      <div className="location-name">
                        {item.name.substring(0, 40)}
                        {item.name.length > 40 ? " ..." : ""}
                      </div>
                      <div className="location-stat">
                        <div className="location-stat-item">
                          <span>Distance</span>
                          <p>3 km</p>
                        </div>
                        <div className="location-stat-item">
                          <span>Duration</span>
                          <p>10 min</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="bin-item">
                <div className="bin-item-left">
                  <img src={LandingPageImages.BinImage} alt="" />
                </div>
                <div className="bin-item-right">
                  <div className="location-name">
                    112 Rajpur Nagar , Dehradun Uttrakhand
                  </div>
                  <div className="location-stat">
                    <div className="location-stat-item">
                      <span>Distance</span>
                      <p>8.45 km</p>
                    </div>
                    <div className="location-stat-item">
                      <span>Duration</span>
                      <p>43 min</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bin-item">
                <div className="bin-item-left">
                  <img src={LandingPageImages.BinImage} alt="" />
                </div>
                <div className="bin-item-right">
                  <div className="location-name">
                    112 Rajpur Nagar , Dehradun Uttrakhand
                  </div>
                  <div className="location-stat">
                    <div className="location-stat-item">
                      <span>Distance</span>
                      <p>8.45 km</p>
                    </div>
                    <div className="location-stat-item">
                      <span>Duration</span>
                      <p>43 min</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bin-item">
                <div className="bin-item-left">
                  <img src={LandingPageImages.BinImage} alt="" />
                </div>
                <div className="bin-item-right">
                  <div className="location-name">
                    112 Rajpur Nagar , Dehradun Uttrakhand
                  </div>
                  <div className="location-stat">
                    <div className="location-stat-item">
                      <span>Distance</span>
                      <p>8.45 km</p>
                    </div>
                    <div className="location-stat-item">
                      <span>Duration</span>
                      <p>43 min</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bin-item">
                <div className="bin-item-left">
                  <img src={LandingPageImages.BinImage} alt="" />
                </div>
                <div className="bin-item-right">
                  <div className="location-name">
                    112 Rajpur Nagar , Dehradun Uttrakhand
                  </div>
                  <div className="location-stat">
                    <div className="location-stat-item">
                      <span>Distance</span>
                      <p>8.45 km</p>
                    </div>
                    <div className="location-stat-item">
                      <span>Duration</span>
                      <p>43 min</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BinLocations;

import React, { useEffect, useRef, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import wayPointsContext from "../context/wayPointsContext";
import shortestPathContext from "../context/shortestPathContext";
import styled from "styled-components";

const StyledDiv=styled.div`
.leaflet-control-container .leaflet-right
{
  max-height: calc(100vh - 120px) !important;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;

}
`
const RouteMap = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const { waypoints } = useContext(wayPointsContext);
  const { shortestPath, setShortestPath } = useContext(shortestPathContext);
console.log(waypoints);
  console.log(shortestPath);
  const defaultIcon = new L.icon({
    iconUrl: require("../../node_modules/leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -2],
  });
  useEffect(() => {
    // Initialize Leaflet map
    const leafletMap = L.map(mapContainerRef.current).setView(
      [20.5937, 78.9629],
      5
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(leafletMap);
    setMap(leafletMap);

    // Adjust map size when the window is resized
    const resizeMap = () => {
      leafletMap.invalidateSize();
    };
    window.addEventListener("resize", resizeMap);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", resizeMap);
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    const temp = map;
    if (temp)
      temp.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          temp.removeLayer(layer);
        }
      });
    if (map && waypoints.length > 0) {
      waypoints.forEach((ele) => {
        L.marker([ele[1], ele[2]], { icon: defaultIcon }).addTo(temp);
      });
      setMap(temp);
    }
  }, [waypoints]);

  console.log(waypoints);
  console.log(shortestPath);

  useEffect(() => {
    if (shortestPath.length !== 0) {
      let ways = [];
      for (let i = 0; i < shortestPath.length; i++) {
        ways.push(
          L.latLng(
            waypoints[shortestPath[i] - 1][1],
            waypoints[shortestPath[i] - 1][2]
          )
        );
      }
      setMap((prevMap) => {
        L.Routing.control({
          waypoints: ways,
          router: L.Routing.osrmv1({
            serviceUrl: "http://router.project-osrm.org/route/v1",
          }),
        }).addTo(prevMap);
    
        return prevMap;
      });
    }
  }, [shortestPath]);

  return (
    <StyledDiv
    key={mapContainerRef}
      className="container-fluid d-flex"
      ref={mapContainerRef}
      style={{
        width: "100%",
        border: "1px solid #ccc",
        boxShadow: "0 0 4px #ccc, 0 0 8px #ccc, 0 0 12px #ccc, 0 0 16px #ccc",
        bordeRadius: "4px",
      }}
    ></StyledDiv>
  );
};

export default RouteMap;

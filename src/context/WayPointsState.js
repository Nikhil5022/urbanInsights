import React, { useState } from "react";
import WayPointsContext from "./wayPointsContext";
const WayPointsState = (props) => {
  const initialWayPoints = [];
  const [waypoints, setWaypoints] = useState(initialWayPoints);
  const addWayPoint = (waypoint) => {
    let flag = false;
    for (let i = 0; i < waypoints.length; i++) {
      if (
        waypoints[i][0] === waypoint[0][0] &&
        waypoints[i][1] === waypoint[0][1] &&
        waypoints[i][2] === waypoint[0][2]
      ) {
        flag = true;
        break;
      }
    }
    if (!flag) setWaypoints(waypoints.concat(waypoint));
  };
  const deleteWayPoint = (waypoint) => {
    setWaypoints(
      waypoints.filter((item) => {
        return ( waypoint[0].formatted !== item[0]) })
    );
  };
  console.log(waypoints);
  return (
    <WayPointsContext.Provider
      value={{ waypoints, setWaypoints, addWayPoint, deleteWayPoint }}
    >
      {props.children}
    </WayPointsContext.Provider>
  );
};

export default WayPointsState;

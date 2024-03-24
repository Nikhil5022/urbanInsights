import React, { useEffect, useContext, useState, useRef } from "react";
import wayPointsContext from "../context/wayPointsContext";
import shortestPathContext from "../context/shortestPathContext";
import { Button } from "@mui/material";
const ShortestRoute = () => {
  const { waypoints, setWaypoints } = useContext(wayPointsContext);
  const { shortestPath, setShortestPath } = useContext(shortestPathContext);
  const [disabledValue, setDisabledValue] = useState("");
  const ref = useRef(null);
  // useEffect(() => {
  //   if (dist != null) {
  //     TSP();
  //   }
  // }, [dist]);
  //Traveling Sales Person Problem
  const TSP = (dist) => {
    let MAX = 1e9;
    let distance = dist.distances;
    distance.splice(0, 0, new Array(distance[0].length + 1).fill(0));
    for (let i = 1; i < distance.length; i++) {
      distance[i].splice(0, 0, 0);
    }
    let n = distance.length - 1;
    let memo = new Array(n + 1);
    for (let i = 0; i < memo.length; i++) {
      memo[i] = new Array(1 << (n + 1)).fill(0);
    }
    function findSmallestPath(i, mask) {
      if (mask == ((1 << i) | 3)) {
        return [distance[1][i], [1, i, 1]];
      }
      if (memo[i][mask] != 0) {
        return memo[i][mask];
      }
      let res = [MAX, []];
      for (let j = 1; j <= n; j++) {
        if (mask & (1 << j) && j != i && j != 1) {
          let [cost, path] = findSmallestPath(j, mask & ~(1 << i));
          if (cost + distance[j][i] < res[0]) {
            res[0] = cost + distance[j][i];
            res[1] = [1, ...path.slice(1, path.length - 1), i, 1];
          }
        }
      }
      memo[i][mask] = res;
      return res;
    }

    let [cost, path] = [MAX, []];
    for (let i = 1; i <= n; i++) {
      let [currentCost, currentPath] = findSmallestPath(i, (1 << (n + 1)) - 1);
      if (currentCost + distance[i][1] < cost) {
        cost = currentCost + distance[i][1];
        path = currentPath;
      }
    }
    setShortestPath(path);
  };

  const getDistMatrix = (locations) => {
    fetch("https://api.openrouteservice.org/v2/matrix/driving-car", {
      method: "POST",
      headers: {
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        Authorization:
          "5b3ce3597851110001cf6248aa2777bf824141f29998e207835ff4da",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        locations: locations,
        metrics: ["distance"],
        units: "km",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        TSP(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const findRoute = (source) => {
    const lat = Number(source.split(",")[source.split(",").length - 2]);
    const lon = Number(source.split(",")[source.split(",").length - 1]);
    let c = 0;
    let i = source.length - 1;
    while (c != 2) {
      if (source[i] === ",") c += 1;
      i -= 1;
    }
    source = [source.slice(0, i + 1), lat, lon];
    const locations = [];
    const changedwaypoints = [];
    for (let i = 0; i < waypoints.length; i++) {
      if (source[1] === waypoints[i][1] && source[2] === waypoints[i][2]) {
        locations.push([waypoints[i][2], waypoints[i][1]]);
        changedwaypoints.push(waypoints[i]);
        break;
      }
    }
    for (let i = 0; i < waypoints.length; i++) {
      if (!(source[1] === waypoints[i][1] && source[2] === waypoints[i][2])) {
        locations.push([waypoints[i][2], waypoints[i][1]]);
        changedwaypoints.push(waypoints[i]);
      }
    }
    setWaypoints(changedwaypoints);
    getDistMatrix(locations);
  };



  return (
    <>
    {waypoints.length>0&&
      <div
        className="container-flex d-flex flex-column justify-content-center"
        style={{ width: "100%", height: "100vh" }}
        key={waypoints.length}
      >
        <div
          className="container-fluid d-flex flex-column justify-content-center"
          style={{ height: "250px", width: "500px" }}
        >
            <select className="form-select" size="10" aria-label="" ref={ref}
             onChange={(e)=>{setDisabledValue(e.target.value.length>0)}}>
              {waypoints.map((ele) => {
                return (
                  <option key={ele[0] + ele[1]} value={ele}>
                    {ele[0]}
                  </option>
                );
              })}
            </select>
            <Button variant="contained"
             className="text-bg-default bg-opacity-0 conatiner-flex my-5"
              onClick={() => {
                findRoute(ref.current.value);
            }}
            disabled={!disabledValue}
            >
            Click here to find shortest path
            </Button>
        </div>
      </div>}
    </>
  );
};
export default ShortestRoute;

import React from "react";
function About() {
  return (
    <div
      className="container text-center text-bg-secondary row row-cols-1 my-10"
      style={{
        margin: "auto auto",
        color: "white",
        opacity: "1",
        borderRadius: "45px",
        marginTop:"88px",
      }}
    >
      <div className="col my-3" style={{ opacity: "1" }}>
        <h3>
          <strong>
            This is a comprehensive and user-friendly travel platform using MERN
            Stack, that can act as a valuable resource for anyone planning a
            trip.
          </strong>
        </h3>
      </div>
      <div className="col my-3">
        <h3>
          <strong>
            Implemented the Traveling Salesman Problem (TSP) algorithm,
            leveraging dynamic programming techniques, to find the optimal route
            for visiting multiple destinations with the shortest total distance.
          </strong>
        </h3>
      </div>
    </div>
  );
}
export default About;

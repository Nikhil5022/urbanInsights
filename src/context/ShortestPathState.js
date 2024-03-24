import React, { useState } from "react";
import shortestPathContext from "./shortestPathContext";
const ShortestPathState = (props) => {
  const initialShortestPath = [];
  const [shortestPath, setShortestPath] = useState(initialShortestPath);
  return (
    <shortestPathContext.Provider value={{ shortestPath, setShortestPath }}>
      {props.children}
    </shortestPathContext.Provider>
  );
};

export default ShortestPathState;

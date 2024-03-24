import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import WayPointsState from "./context/WayPointsState";
import ShortestPathState from "./context/ShortestPathState";
import AppRoutes from "./routes/AppRoutes.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div
      className="container-fluid"
      style={{
        // backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Travel-Images-For-Desktop.jpg')`,
        margin: "0",
        padding: "0",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
    >
      <WayPointsState>
        <ShortestPathState>
          <Router>
            <NavBar />
            <ToastContainer />
            <AppRoutes />
          </Router>
        </ShortestPathState>
      </WayPointsState>
    </div>
  );
}

export default App;

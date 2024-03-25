import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLogged = localStorage.getItem("userLogged");
    if (userLogged) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-900 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Render "Urban Insights" only if menu is not open */}
        {!menuOpen && <div className="text-lg font-bold">Urban Insights</div>}
        <div className={`${menuOpen ? 'flex flex-col' : 'hidden'} md:flex space-x-7 m-3 transition-all duration-300`}>
          <a href="/home" className="nav-link">Home</a>
          
          {isLoggedIn ? (
            <>
              <a href="/restaurants" className="nav-link">Restaurants</a>
              <a href="/dashboard" className="nav-link">Find Places</a>
              <a href="/home" className="nav-link" 
                onClick={() => {
                  
                  toast.success("Logged out successfully!");
                  // Redirect to home page
                  setTimeout(() => {
                    localStorage.removeItem("userLogged");
                    window.location.href = "/home";
                  })
                
                }}
              >Logout</a>
              <a href="/myReservations">My Reservations</a>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link">Login</a>
            </>
          )}
          <a href="/contactus" className="nav-link">Contact Us</a>
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NavBar;

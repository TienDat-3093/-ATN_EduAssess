import { NavLink, useNavigate } from "react-router-dom";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";


import {
  fetchLogout,
  fetchGetUser,
  fetchRefreshAccess,
} from "../services/UserServices";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const navigate = useNavigate();
  console.log('token',token)
  console.log('tokenExpiration',tokenExpiration)
  const isTokenExpiringSoon = (beforeTime = 60) => {
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    console.log('decodedToken',decodedToken)
    const currentTime = Date.now() / 1000; // Chuyển đổi sang giây
    return decodedToken.exp - currentTime < beforeTime;
  };

  const refreshToken = async () => {
    if (isTokenExpiringSoon()) {
      try {
        const response = await fetchRefreshAccess(token);
        const newToken = response.data.access_token;
        localStorage.setItem("token", newToken);
        console.log("refresh", response.data.access_token);
      } catch (err) {
        console.log("Failed to fetch refreshToken", err);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    const loggedStatus = localStorage.getItem("isLoggedIn");
    if (loggedStatus === "true") {
      setIsLoggedIn(true);
    }

    const handleGetUser = async () => {
      if (token) {
        try {
          const response = await fetchGetUser(token);
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      }
    };

    handleGetUser();

    const interval = setInterval(() => {
      refreshToken();
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");

    if (token) {
      try {
        const response = await fetchLogout(token);
        setUser(null);
        console.log("logout successful:", response.data);
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      console.log("no token");
    }
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-while" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span>EduAssess</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item " >
                <NavLink to="/" className="nav-link text-dark" style={{ fontSize: '18px', }} >
                  Home
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/about" className="nav-link text-dark" style={{ fontSize: '18px', }} >
                  About
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink to="/exams" className="nav-link text-dark " style={{ fontSize: '18px', }} >
                  Test
                </NavLink>
              </li>
              
              {isLoggedIn && (
                <li className="nav-item ">
                  <NavLink to="/dashboard" className="nav-link text-dark" style={{ fontSize: '18px', }}>
                    DashBoard
                  </NavLink>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <Dropdown className="ml-auto">
                <Dropdown.Toggle
                  as="div"
                  className="nav"
                  id="dropdown-custom-components"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="user-img"
                      style={{
                        backgroundImage:
                          user && user.image
                            ? `url("http://localhost:8000/${user.image}")`
                            : "url(../../images/avatar.png)",
                        width: "40px",
                        height: "40px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/logout" onClick={handleLogout}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </nav>
      {/* END nav */}
      {/* Banner */}
      {isLoggedIn ? <Banner2/> : <Banner1 onLoginSuccess={handleLogin} />}
      {/* EndBanner */}
    </>
  );
}

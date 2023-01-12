import React from "react";
import "../MainLayout.css";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="mainlayout-header">
      <div className="wrap-header">
        <nav>
          <Button
            id="home"
            style={useLocation().pathname === "/" ? {} : { color: "#acacac" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            id="pow"
            style={
              useLocation().pathname === "/pow" ? {} : { color: "#acacac" }
            }
            onClick={() => navigate("/pow")}
          >
            PoW_Simulator
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Header;

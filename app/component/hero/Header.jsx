import React from "react";

function Header() {
  return (
    <div className="scarcity-banner animate-pulse">
      <div
        className="flex justify-center items-center"
        style={{ gap: "1rem", flexWrap: "wrap" }}
      >
        <div className="scarcity-item">
          <i data-lucide="flame" style={{ color: "#fbbf24" }}></i>
          <span
            style={{
              color: "#fbbf24",
              fontWeight: "bold",
              fontSize: "1.125rem",
            }}
            id="spots-left"
          >
            23
          </span>
          <span>spots left!</span>
        </div>
        <div className="scarcity-item">
          <i data-lucide="clock" className="animate-spin"></i>
          <span>Early bird expires: </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
            id="countdown"
          >
            04:23:17
          </span>
        </div>
        <div className="scarcity-item">
          <i data-lucide="dollar-sign" style={{ color: "#fbbf24" }}></i>
          <span>Price increases </span>
          <span style={{ color: "#fbbf24", fontWeight: "bold" }}>$300</span>
          <span>in 2 days</span>
        </div>
      </div>
    </div>
  );
}

export default Header;

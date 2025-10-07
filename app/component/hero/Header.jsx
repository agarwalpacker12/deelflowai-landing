'use client';
import React, { useEffect, useState } from "react";

function Header() {
  const [countdownTime, setCountdownTime] = useState(4 * 3600 + 23 * 60 + 17);
  const [spots, setSpots] = useState(23);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      // Random decreases for psychological effect
      if (Math.random() < 0.08) {
        setSpots((prev) => Math.max(1, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
            {spots}
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
            {timeString}
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

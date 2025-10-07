'use client';
import React, { useEffect, useState } from "react";

function Banner() {
  const [countdownTime, setCountdownTime] = useState(4 * 3600 + 23 * 60 + 17);
  const [spots, setSpots] = useState(23);
  const [stats, setStats] = useState({
    dealsProcessed: 0,
    avgProfit: 0,
    timeToClose: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      if (Math.random() < 0.08) {
        setSpots((prev) => Math.max(1, prev - 1));
      }
    }, 1000);

    // Animate stats
    const statsConfig = [
      { key: 'dealsProcessed', target: 2.3 },
      { key: 'avgProfit', target: 28.5 },
      { key: 'timeToClose', target: 2.3 },
      { key: 'successRate', target: 94.2 },
    ];

    statsConfig.forEach((stat) => {
      let current = 0;
      const increment = stat.target / 100;

      const counter = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(counter);
        }

        setStats((prev) => ({
          ...prev,
          [stat.key]: current,
        }));
      }, 20);
    });

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-form');
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div
          className="text-center"
          style={{ position: "relative", zIndex: 10 }}
        >
          {/* Main Headline */}
          <h1 className="hero-title">
            Generate
            <span className="gradient-text animate-pulse">$50K+ Monthly</span>
            <br />
            <span style={{ fontSize: "0.8em" }}>
              With AI-Powered Real Estate Wholesaling
            </span>
          </h1>

          {/* Enhanced Subheadline */}
          <p className="hero-subtitle">
            Join
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
              47,000+
            </span>
            successful wholesalers using our revolutionary AI platform to close
            deals
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
              10x faster
            </span>
            with
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
              94% accuracy
            </span>
            while others struggle with outdated methods
          </p>

          {/* Authority Badges */}
          <div className="authority-grid">
            <div className="authority-badge">
              <div
                className="flex items-center justify-center"
                style={{ gap: "0.5rem" }}
              >
                <i
                  data-lucide="check-circle"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#10b981",
                  }}
                ></i>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Featured in Forbes
                </span>
              </div>
            </div>
            <div className="authority-badge">
              <div
                className="flex items-center justify-center"
                style={{ gap: "0.5rem" }}
              >
                <i
                  data-lucide="trophy"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#fbbf24",
                  }}
                ></i>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Used by Top 1% Investors
                </span>
              </div>
            </div>
            <div className="authority-badge">
              <div
                className="flex items-center justify-center"
                style={{ gap: "0.5rem" }}
              >
                <i
                  data-lucide="dollar-sign"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#10b981",
                  }}
                ></i>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  $2.3B+ Deals Processed
                </span>
              </div>
            </div>
            <div className="authority-badge">
              <div
                className="flex items-center justify-center"
                style={{ gap: "0.5rem" }}
              >
                <i
                  data-lucide="target"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#3b82f6",
                  }}
                ></i>
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  94.2% Success Rate
                </span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="flex items-center justify-center mb-2">
                <i
                  data-lucide="dollar-sign"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "#10b981",
                  }}
                  className="animate-bounce"
                ></i>
              </div>
              <div className="stat-value" style={{ color: "#10b981" }}>
                ${stats.dealsProcessed.toFixed(1)}B
              </div>
              <div className="stat-label">Total Volume Processed</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-center mb-2">
                <i
                  data-lucide="trending-up"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "#fbbf24",
                  }}
                  className="animate-bounce"
                ></i>
              </div>
              <div className="stat-value" style={{ color: "#fbbf24" }}>
                ${stats.avgProfit.toFixed(1)}K
              </div>
              <div className="stat-label">Average Member Profit</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-center mb-2">
                <i
                  data-lucide="clock"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "#3b82f6",
                  }}
                  className="animate-bounce"
                ></i>
              </div>
              <div className="stat-value" style={{ color: "#3b82f6" }}>
                {stats.timeToClose.toFixed(1)}
              </div>
              <div className="stat-label">Days Average Close</div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-center mb-2">
                <i
                  data-lucide="brain"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "#7c3aed",
                  }}
                  className="animate-bounce"
                ></i>
              </div>
              <div className="stat-value" style={{ color: "#f5f4f7" }}>
                {stats.successRate.toFixed(1)}%
              </div>
              <div className="stat-label">AI Accuracy Rate</div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{ marginBottom: "1.5rem" }}>
            <button className="cta-button" onClick={() => scrollToSignup()}>
              <span style={{ position: "relative", zIndex: 10 }}>
                Claim Your Spot Now - Limited Access
              </span>
            </button>
          </div>

          <div
            style={{
              color: "#fbbf24",
              fontWeight: 600,
              fontSize: "1.125rem",
            }}
            className="animate-pulse"
          >
            ⚠️ Only
            <span
              style={{ fontSize: "1.25rem", fontWeight: "bold" }}
              id="hero-spots-left"
            >
              {spots}
            </span>
            spots remaining • Price increases in
            <span style={{ fontFamily: "monospace" }} id="hero-countdown">
              {timeString}
            </span>
          </div>

          <div
            className="flex items-center justify-center"
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            <span className="flex items-center" style={{ gap: "0.5rem" }}>
              <i
                data-lucide="shield"
                style={{ width: "1.25rem", height: "1.25rem" }}
              ></i>
              100% Money-Back Guarantee
            </span>
            <span className="flex items-center" style={{ gap: "0.5rem" }}>
              <i
                data-lucide="refresh-cw"
                style={{ width: "1.25rem", height: "1.25rem" }}
              ></i>
              Cancel Anytime
            </span>
            <span className="flex items-center" style={{ gap: "0.5rem" }}>
              <i
                data-lucide="check-circle"
                style={{ width: "1.25rem", height: "1.25rem" }}
              ></i>
              No Setup Fees
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

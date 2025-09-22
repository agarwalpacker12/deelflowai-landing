import React from "react";

function LossSection() {
  return (
    <section className="loss-aversion">
      <div
        className="container"
        style={{ position: "relative", zIndex: 10, padding: "2%" }}
      >
        <div className="text-center">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            💸 What You're Losing Every Day You Wait
          </h2>
          <p style={{ fontSize: "1.5rem", marginBottom: "3rem", opacity: 0.9 }}>
            While you're reading this, opportunities are slipping away...
          </p>

          <div className="loss-box">
            <div className="loss-amount animate-pulse">$2,847</div>
            <div className="loss-description">
              Lost every single day you don't have Deelflow AI
            </div>

            <div className="loss-stats">
              <div className="loss-stat">
                <i
                  data-lucide="calendar"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#fbbf24",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div className="loss-stat-value">$19,929</div>
                <div className="loss-stat-label">Weekly Loss</div>
              </div>
              <div className="loss-stat">
                <i
                  data-lucide="trending-up"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#fbbf24",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div className="loss-stat-value">$85,410</div>
                <div className="loss-stat-label">Monthly Loss</div>
              </div>
              <div className="loss-stat">
                <i
                  data-lucide="alert-triangle"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#fbbf24",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div className="loss-stat-value">$1,039,155</div>
                <div className="loss-stat-label">Annual Loss</div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                borderLeft: "4px solid #fbbf24",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  gap: "0.5rem",
                  color: "#fbbf24",
                  marginBottom: "0.5rem",
                }}
              >
                <i
                  data-lucide="alert-triangle"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  className="animate-pulse"
                ></i>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  WARNING:
                </span>
              </div>
              <p style={{ fontSize: "1.125rem" }}>
                Your competitors are using AI to steal deals while you hesitate.
                Every minute costs you
                <strong style={{ color: "#fbbf24" }}>$197</strong> in missed
                opportunities.
              </p>
            </div>
          </div>

          <button
            className="cta-button"
            onClick={() => scrollToSignup()}
            style={{
              background: "linear-gradient(135deg, #059669, #2563eb)",
            }}
          >
            Stop Losing Money - Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default LossSection;

"use client";
import Image from "next/image";
import DealflowScript from "./DealflowScript";
import Link from "next/link";
import Banner from "./propertyList/component/hero/Banner";
import SocialProof from "./propertyList/component/hero/SocialProof";
import LossSection from "./propertyList/component/hero/LossSection";
import Feature from "./propertyList/component/hero/Feature";
import BlockChain from "./propertyList/component/hero/BlockChain";
import Pricing from "./propertyList/component/hero/Pricing";
import Testimonial from "./propertyList/component/hero/Testimonial";

export default function Home() {
  // Close live feed function
  function closeLiveFeed() {
    const liveFeed = document.getElementById("live-feed");
    if (liveFeed) {
      liveFeed.style.transform = "translateX(100%)";
      liveFeed.style.opacity = "0";
      setTimeout(() => {
        liveFeed.style.display = "none";
      }, 300);
    }
  }

  // Close exit popup function
  function closeExitPopup() {
    const exitPopup = document.getElementById("exit-popup");
    if (exitPopup) {
      exitPopup.style.display = "none";
    }
  }

  // Claim discount function
  function claimDiscount() {
    // Redirect to signup or handle discount claim
    window.location.href = "https://apps.deelflowai.com/register";
  }

  // Add this to your init function or after the other global assignments
  if (typeof window !== "undefined") {
    window.closeLiveFeed = closeLiveFeed;
    window.closeExitPopup = closeExitPopup;
    window.claimDiscount = claimDiscount;

    // Show exit popup when user scrolls to top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        const exitPopup = document.getElementById("exit-popup");
        if (exitPopup) {
          exitPopup.style.display = "flex";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  return (
    <>
      {/* Scarcity Banner */}
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

      {/* Header */}

      {/* Hero Section */}
      <Banner />

      {/* Live Activity Feed */}
      <div className="live-feed" id="live-feed">
        <div className="live-feed-header">
          <div className="flex items-center" style={{ gap: "0.5rem" }}>
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                background: "#ef4444",
                borderRadius: "50%",
              }}
              className="animate-pulse"
            ></div>
            <span style={{ fontWeight: 600 }}>🔴 Live Member Activity</span>
          </div>
          {/* Close button */}
          <button
            className="live-feed-close"
            onClick={() => closeLiveFeed()}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              color: "#6b7280",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: 1,
              width: "24px",
              height: "24px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f3f4f6";
              e.target.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "#6b7280";
            }}
          >
            ×
          </button>
        </div>
        <div className="live-feed-content" id="activity-feed"></div>
      </div>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Loss Aversion Section */}
      <LossSection />

      {/* Features Section */}
      <Feature />

      {/* Block chain marketplace section */}
      <BlockChain />

      {/* NEW PRICING SECTION */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Signup Form Section */}
      <section id="signup-form" className="signup">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Ready to Transform Your Business?
            </h2>
            <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
              Join thousands of successful investors already using AI to
              dominate their markets
            </p>

            <div className="signup-benefits">
              <div className="signup-benefit">
                <i
                  data-lucide="clock"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  7-Day
                </div>
                <div style={{ fontSize: "0.875rem" }}>Free Trial</div>
              </div>
              <div className="signup-benefit">
                <i
                  data-lucide="dollar-sign"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  $0
                </div>
                <div style={{ fontSize: "0.875rem" }}>Setup Fees</div>
              </div>
              <div className="signup-benefit">
                <i
                  data-lucide="brain"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    margin: "0 auto 0.5rem",
                    display: "block",
                  }}
                  className="animate-bounce"
                ></i>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  24/7
                </div>
                <div style={{ fontSize: "0.875rem" }}>AI Working</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      <div className="exit-popup" id="exit-popup">
        <div className="exit-popup-content">
          <button className="exit-popup-close" onClick={() => closeExitPopup()}>
            &times;
          </button>

          <div className="text-center">
            <h3>⚠️ WAIT! Don't Miss Out!</h3>
            <p>
              You're about to leave without claiming your
              <strong>67% discount</strong>. Here's an exclusive one-time offer:
            </p>

            <div className="exit-popup-offer">
              <div className="original-price">Was $797/month</div>
              <div className="new-price">Now $197/month</div>
              <div className="offer-text">For the first 100 members only</div>
            </div>

            <button
              className="exit-popup-button"
              onClick={() => claimDiscount()}
            >
              Claim 67% Discount Now
            </button>

            <p className="exit-popup-timer">
              ⏰ This offer expires in <span id="exit-timer">10:00</span>{" "}
              minutes
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <i
                  data-lucide="brain"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    color: "#3b82f6",
                    marginRight: "0.5rem",
                  }}
                ></i>
                <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  Deelflow AI
                </span>
              </div>
              <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
                The world's most advanced AI-powered real estate wholesaling
                platform.
              </p>
              <div className="footer-social">
                <a href="#" className="footer-social-link">
                  f
                </a>
                <a
                  href="#"
                  className="footer-social-link"
                  style={{ background: "#1da1f2" }}
                >
                  t
                </a>
                <a
                  href="#"
                  className="footer-social-link"
                  style={{ background: "#0077b5" }}
                >
                  in
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li>
                  <a href="#">AI Property Analysis</a>
                </li>
                <li>
                  <a href="#">Blockchain Escrow</a>
                </li>
                <li>
                  <a href="#">Voice AI Assistant</a>
                </li>
                <li>
                  <a href="#">Marketing Automation</a>
                </li>
                <li>
                  <a href="#">Real-Time Trading</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Success Stories</a>
                </li>
                <li>
                  <a href="#">Support Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal & Trust</h4>
              <ul>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
                <li>
                  <a href="#">Compliance</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Deelflow AI. All rights reserved.</p>
            <div className="footer-security">
              <i
                data-lucide="lock"
                style={{ width: "1rem", height: "1rem" }}
              ></i>
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </footer>
      <DealflowScript />
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import Navbar from "./component/hero/Navbar";
import Header from "./component/hero/Header";
import Banner from "./component/hero/Banner";
import SocialProof from "./component/hero/SocialProof";
import LossSection from "./component/hero/LossSection";
import Feature from "./component/hero/Feature";
import BlockChain from "./component/hero/BlockChain";
import Pricing from "./component/hero/Pricing";
import Testimonial from "./component/hero/Testimonial";
import Link from "next/link";

export default function Home() {
  const [showExitPopupState, setShowExitPopupState] = useState(false);
  const [exitTimer, setExitTimer] = useState(600); // 10 minutes
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const activities = [
    {
      user: "Alex K.",
      action: "earned $34K assignment fee",
      location: "Phoenix, AZ",
      avatar: "AK",
      bgColor: "#3b82f6",
    },
    {
      user: "Lisa R.",
      action: "AI found perfect buyer match",
      location: "Denver, CO",
      avatar: "LR",
      bgColor: "#10b981",
    },
    {
      user: "David M.",
      action: "completed double close in 18 hours",
      location: "Miami, FL",
      avatar: "DM",
      bgColor: "#f59e0b",
    },
    {
      user: "Emma P.",
      action: "blockchain transaction confirmed",
      location: "Seattle, WA",
      avatar: "EP",
      bgColor: "#8b5cf6",
    },
    {
      user: "Carlos J.",
      action: "closed $52K wholesale deal",
      location: "Las Vegas, NV",
      avatar: "CJ",
      bgColor: "#ef4444",
    },
    {
      user: "Rachel W.",
      action: "found distressed property lead",
      location: "Atlanta, GA",
      avatar: "RW",
      bgColor: "#06b6d4",
    },
    {
      user: "Mike T.",
      action: "automated 15 marketing campaigns",
      location: "Chicago, IL",
      avatar: "MT",
      bgColor: "#84cc16",
    },
    {
      user: "Jennifer L.",
      action: "voice AI scheduled 12 appointments",
      location: "Houston, TX",
      avatar: "JL",
      bgColor: "#ec4899",
    },
  ];

  // Function to check user verification status
  const checkUserAuth = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.is_verified === false || !user.id) {
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute("href"));
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Initialize animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document
      .querySelectorAll(
        ".pricing-card, .feature-card, .comparison-card, .blockchain-card"
      )
      .forEach((el) => {
        observer.observe(el);
      });

    // Live activity feed
    const activityFeed = document.getElementById("activity-feed");
    if (activityFeed) {
      // Add initial activities
      for (let i = 0; i < 3; i++) {
        addActivityItem(activities[i]);
      }

      // Add new activities periodically
      const activityInterval = setInterval(() => {
        const randomActivity =
          activities[Math.floor(Math.random() * activities.length)];
        addActivityItem(randomActivity);
      }, Math.random() * 15000 + 8000);

      return () => {
        clearInterval(activityInterval);
        document.removeEventListener("click", handleAnchorClick);
        observer.disconnect();
      };
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  // Exit intent detection - show popup when scrolling to top
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only trigger when user scrolls to top (scrollY becomes 0)
      if (currentScrollY === 0 && lastScrollY > 0) {
        showExitPopup();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Exit timer
  useEffect(() => {
    if (showExitPopupState) {
      const timer = setInterval(() => {
        setExitTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            closeExitPopup();
            return 600;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showExitPopupState]);

  const addActivityItem = (activity) => {
    const activityFeed = document.getElementById("activity-feed");
    if (!activityFeed) return;

    const existingItems = activityFeed.querySelectorAll(".activity-item");
    if (existingItems.length >= 4) {
      existingItems[existingItems.length - 1].remove();
    }

    const newItem = document.createElement("div");
    newItem.className = "activity-item animate-slideIn";
    newItem.innerHTML = `
      <div class="activity-avatar" style="background: ${activity.bgColor}">
        ${activity.avatar}
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 600; font-size: 0.875rem; color: #111827; margin-bottom: 0.25rem;">
          ${activity.user}
        </div>
        <div style="font-size: 0.75rem; color: #6b7280; line-height: 1.4;">
          ${activity.action}
        </div>
        <div style="font-size: 0.625rem; color: #9ca3af; margin-top: 0.25rem;">
          Just now • ${activity.location}
        </div>
      </div>
    `;

    activityFeed.insertBefore(newItem, activityFeed.firstChild);
  };

  const closeLiveFeed = () => {
    const liveFeed = document.getElementById("live-feed");
    if (liveFeed) {
      liveFeed.style.transform = "translateX(100%)";
      liveFeed.style.opacity = "0";
      setTimeout(() => {
        liveFeed.style.display = "none";
      }, 300);
    }
  };

  const closeExitPopup = () => {
    const exitPopup = document.getElementById("exit-popup");
    if (exitPopup) {
      exitPopup.classList.remove("show");
    }
  };

  const showExitPopup = () => {
    const popup = document.getElementById("exit-popup");
    if (popup) {
      popup.classList.add("show");
    }
  };

  const claimDiscount = () => {
    if (typeof gtag !== "undefined") {
      gtag("event", "claim_discount", {
        discount_amount: 67,
        original_price: 797,
        discounted_price: 197,
      });
    }

    closeExitPopup();

    const signupSection = document.getElementById("signup-form");
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const minutes = Math.floor(exitTimer / 60);
  const seconds = exitTimer % 60;
  const timerString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const closeAuthPopup = () => {
    setShowAuthPopup(false);
  };

  return (
    <>
      {/* Scarcity Banner */}
      <Header />

      {/* Navbar */}
      <Navbar />

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
      <Pricing
        onAuthRequired={() => setShowAuthPopup(true)}
        checkUserAuth={checkUserAuth}
      />

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
              ⏰ This offer expires in{" "}
              <span id="exit-timer">{timerString}</span> minutes
            </p>
          </div>
        </div>
      </div>

      {/* Auth Popup - Sign Up / Sign In */}
      {showAuthPopup && (
        <div className="exit-popup show">
          <div className="exit-popup-content">
            <button className="exit-popup-close" onClick={closeAuthPopup}>
              &times;
            </button>

            <div className="text-center">
              <h3>🔐 Account Verification Required</h3>
              <p>
                Please sign up or sign in to access all features and start your
                journey with DeelFlowAI.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <Link href={"/login"}>
                  <button
                    className="exit-popup-button"
                    style={{ background: "#10b981" }}
                  >
                    Sign In
                  </button>
                </Link>
                <Link href={"/register"}>
                  <button
                    className="exit-popup-button"
                    style={{ background: "#3b82f6" }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <DealflowScript /> */}
    </>
  );
}

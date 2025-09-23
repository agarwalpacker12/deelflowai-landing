import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="header">
      <div className="container">
        <div
          className="flex items-center justify-between"
          style={{ height: "4rem" }}
        >
          {/* Logo */}
          <Link href={"/"}>
            <div className="logo">
              <Image
                src="/assets/logo.jpeg"
                alt="WholesaleAI Logo"
                width="160"
                height="40"
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="desktop-navigation">
            <ul
              className="flex items-center"
              style={{
                gap: "2rem",
                fontSize: "0.875rem",
                color: "#6b7280",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <a
                  href="#about"
                  style={{
                    fontWeight: 500,
                    color: "#6b7280",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#feature"
                  style={{
                    fontWeight: 500,
                    color: "#6b7280",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#marketplace"
                  style={{
                    fontWeight: 500,
                    color: "#6b7280",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  style={{
                    fontWeight: 500,
                    color: "#6b7280",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  Pricing
                </a>
              </li>

              <li>
                <Link
                  href="/propertyList"
                  style={{
                    fontWeight: 500,
                    color: "#6b7280",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  Property List
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div
            className="flex items-center desktop-cta"
            style={{ gap: "1rem" }}
          >
            <a
              href="https://apps.deelflowai.com/register"
              className="gradient-button"
              style={{
                color: "#6b7280",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                transition: "all 0.3s ease",
              }}
            >
              Sign up
            </a>
            <a
              href="https://apps.deelflowai.com/login"
              className="gradient-button"
              style={{
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Sign in
            </a>
          </div>

          {/* Mobile Header Right (Buttons + Menu) */}
          <div className="mobile-header-right">
            {/* Mobile CTA Buttons (visible on tablet/medium screens) */}
            <div className="mobile-cta-buttons">
              <a
                href="https://apps.deelflowai.com/register"
                className="mobile-btn-signup"
              >
                Sign up
              </a>
              <a
                href="https://apps.deelflowai.com/login"
                className="mobile-btn-signin"
              >
                Sign in
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" id="mobile-menu-toggle">
              <svg
                id="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-align-justify-icon lucide-align-justify"
              >
                <path d="M3 12h18" />
                <path d="M3 18h18" />
                <path d="M3 6h18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" id="mobile-menu">
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            <ul>
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#feature">Features</a>
              </li>
              <li>
                <a href="#marketplace">Marketplace</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>

              <li>
                <Link href="/propertyList">Property List</Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu CTA */}
          <div className="mobile-menu-cta">
            <div className="mobile-menu-buttons">
              <a
                href="https://apps.deelflowai.com/register"
                style={{
                  color: "#6b7280",
                  fontWeight: 500,
                  background: "none",
                  border: "1px solid #d1d5db",
                  cursor: "pointer",
                  textDecoration: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  display: "block",
                  flex: 1,
                }}
              >
                Sign up
              </a>
              <a
                href="https://apps.deelflowai.com/login"
                className="gradient-button"
                style={{
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  flex: 1,
                }}
              >
                Sign in
              </a>
            </div>

            {/* Mobile Social Proof */}
            <div className="mobile-social-proof">
              <span className="flex items-center" style={{ gap: "0.25rem" }}>
                <div
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    background: "#10b981",
                    borderRadius: "50%",
                  }}
                  className="animate-pulse"
                ></div>
                <span id="mobile-active-users">2,847</span>
                <span>active</span>
              </span>
              <span>
                <span id="mobile-daily-deals">47</span> deals today
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

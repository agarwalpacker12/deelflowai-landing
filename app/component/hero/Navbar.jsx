"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [activeUsers, setActiveUsers] = useState(3847);
  const [dailyDeals, setDailyDeals] = useState(127);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.15) {
        setActiveUsers((prev) => {
          const newValue = prev + Math.floor(Math.random() * 7) - 3;
          return Math.max(2000, newValue);
        });
      }

      if (Math.random() < 0.12) {
        setDailyDeals((prev) => (Math.random() < 0.7 ? prev + 1 : prev));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Navigation links for home page (anchor links)
  const homeNavLinks = [
    { href: "#about", label: "About us" },
    { href: "#feature", label: "Features" },
    { href: "#marketplace", label: "Marketplace" },
    { href: "#pricing", label: "Pricing" },
    { href: "/propertyList", label: "Search Property" },
    { href: "/sell", label: "Sell" },
  ];

  // Navigation links for other pages (route to home page sections)
  const otherPageNavLinks = [
    { href: "/#about", label: "About us" },
    { href: "/#feature", label: "Features" },
    { href: "/#marketplace", label: "Marketplace" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/propertyList", label: "Search Property" },
    { href: "/sell", label: "Sell" },
  ];

  const navLinks = isHomePage ? homeNavLinks : otherPageNavLinks;

  const renderNavLink = (link) => {
    if (link.href.startsWith("/")) {
      // Internal route
      return (
        <Link
          href={link.href}
          style={{
            fontWeight: 500,
            color: "#6b7280",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
        >
          {link.label}
        </Link>
      );
    } else {
      // Anchor link or external link
      return (
        <a
          href={link.href}
          style={{
            fontWeight: 500,
            color: "#6b7280",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
        >
          {link.label}
        </a>
      );
    }
  };

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
              <img
                src={`${
                  process.env.NEXT_PUBLIC_BASE_PATH || ""
                }/assets/logo.jpeg`}
                alt="logo"
                style={{ width: "200px", height: "40px", objectFit: "contain" }}
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
              {navLinks.map((link, index) => (
                <li key={index}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}

          {isLoggedIn ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={handleSignOut}
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
                // onMouseEnter={(e) => {
                //   e.target.style.background = "#f9fafb";
                // }}
                // onMouseLeave={(e) => {
                //   e.target.style.background = "white";
                // }}
              >
                Sign out
              </button>
              {/* <button
                onClick={toggleDropdown}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#6b7280" }}
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    marginTop: "0.5rem",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    minWidth: "150px",
                    zIndex: 50,
                  }}
                >
                  <Link
                    href="/profile"
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      borderBottom: "1px solid #e5e7eb",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "white";
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.75rem 1rem",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "white";
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )} */}
            </div>
          ) : (
            // <Link href={"/login"}>
            <button
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
              onClick={() => router.push("http://dev.deelflowai.com/login")}
            >
              Sign in
            </button>
            // </Link>
          )}

          {/* Mobile Header Right (Buttons + Menu) */}
          <div className="mobile-header-right">
            {/* Mobile CTA Buttons (visible on tablet/medium screens) */}
            <div className="mobile-cta-buttons">
              {isLoggedIn ? (
                <button
                  className="mobile-btn-signin"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                >
                  Sign out
                </button>
              ) : (
                <button
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
                  onClick={() => router.push("http://dev.deelflowai.com/login")}
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              id="mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
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
                {isMobileMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                    <path d="M3 6h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="mobile-menu"
          id="mobile-menu"
          style={{ display: isMobileMenuOpen ? "block" : "none" }}
        >
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>{renderNavLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu CTA */}
          <div className="mobile-menu-cta">
            <div className="mobile-menu-buttons">
              {isLoggedIn ? (
                <button
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
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                >
                  Sign out
                </button>
              ) : (
                <button
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
                  onClick={() => router.push("http://dev.deelflowai.com/login")}
                >
                  Sign in
                </button>
              )}
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
                <span id="mobile-active-users">
                  {mounted ? activeUsers.toLocaleString() : "3,847"}
                </span>
                <span>active</span>
              </span>
              <span>
                <span id="mobile-daily-deals">
                  {mounted ? dailyDeals : "127"}
                </span>{" "}
                deals today
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

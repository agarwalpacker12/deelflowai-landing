"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activeUsers, setActiveUsers] = useState(3847);
  const [dailyDeals, setDailyDeals] = useState(127);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <a
                href="https://apps.deelflowai.com/register"
                style={{
                  color: "#6b7280",
                  fontWeight: 500,
                  background: "none",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#d1d5db",
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
                <span id="mobile-active-users">
                  {activeUsers.toLocaleString()}
                </span>
                <span>active</span>
              </span>
              <span>
                <span id="mobile-daily-deals">{dailyDeals}</span> deals today
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

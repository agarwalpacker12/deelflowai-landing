import React from "react";

function Footer() {
  return (
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
              <li>
                <a href="/sell">Sell Your House</a>
              </li>
              <li>
                <a href="/buy">Become a Buyer</a>
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
            <i data-lucide="lock" style={{ width: "1rem", height: "1rem" }}></i>
            <span>Secured by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

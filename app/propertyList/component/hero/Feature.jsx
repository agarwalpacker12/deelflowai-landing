import React from "react";

function Feature() {
  return (
    <section className="features" id="feature">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Revolutionary AI-Powered Features</h2>
          <p className="section-subtitle">
            Everything you need to dominate real estate wholesaling
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "2rem", height: "2rem" }}
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                <path d="M19.967 17.484A4 4 0 0 1 18 18" />
              </svg>
            </div>
            <h3 className="feature-title">AI Property Analysis</h3>
            <p className="feature-description">
              Advanced AI analyzes every property with 94.2% accuracy, providing
              instant repair estimates, profit calculations, and risk
              assessments.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Instant repair cost estimation</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Profit potential calculation</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Market comparison analysis</span>
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="m7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="feature-title">Blockchain Escrow</h3>
            <p className="feature-description">
              Secure, instant escrow transactions through blockchain technology.
              No more waiting for traditional escrow companies.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Instant escrow deposits</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Smart contract automation</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Secure fund transfers</span>
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="feature-title">Voice AI Assistant</h3>
            <p className="feature-description">
              AI-powered voice calls that qualify leads, schedule appointments,
              and close deals while you sleep.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Natural conversation flow</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Lead qualification</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Appointment scheduling</span>
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="feature-title">Marketing Automation</h3>
            <p className="feature-description">
              Advanced AI marketing with web scraping, social media monitoring,
              and behavioral targeting.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Automated lead generation</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Multi-channel campaigns</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Behavioral targeting</span>
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
              </svg>
            </div>
            <h3 className="feature-title">Real-Time Trading</h3>
            <p className="feature-description">
              Live marketplace where you can trade properties in real-time with
              instant offers and blockchain settlements.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Live property auctions</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Instant offer submission</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Real-time settlements</span>
              </li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 13c0 5-3.5 7.5-8 7.5s-8-2.5-8-7.5c0-1.3.3-2.5.8-3.5C6 8.5 8 7 12 7s6 1.5 7.2 2.5c.5 1 .8 2.2.8 3.5z" />
                <path d="M12 3 8 7h8l-4-4z" />
              </svg>
            </div>
            <h3 className="feature-title">Compliance Automation</h3>
            <p className="feature-description">
              Automatic compliance checking and document generation for all 50
              states. Never worry about legal issues again.
            </p>
            <ul className="feature-benefits">
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>State-specific compliance</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Auto document generation</span>
              </li>
              <li className="feature-benefit">
                <i
                  data-lucide="check-circle"
                  style={{ width: "1rem", height: "1rem", flexShrink: 0 }}
                ></i>
                <span>Risk assessment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;

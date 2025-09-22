import React from "react";

function SocialProof() {
  return (
    <section className="social-proof">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            See How You Compare to Other Investors
          </h2>
          <p className="section-subtitle">
            While others struggle, our members dominate their markets
          </p>
        </div>

        <div className="comparison-grid">
          <div className="comparison-card">
            <h3 className="comparison-title">Monthly Deals Closed</h3>
            <div className="comparison-values">
              <div className="our-value">
                <div className="our-value-number">12.3</div>
                <div className="our-value-label">Deelflow AI</div>
              </div>
              <div className="vs-text">VS</div>
              <div className="traditional-value">
                <div className="traditional-value-number">2.1</div>
                <div className="traditional-value-label">Traditional</div>
              </div>
            </div>
            <div className="warning-box">
              <p>You're missing 10.2 deals per month = $290K+ annually</p>
            </div>
          </div>

          <div className="comparison-card">
            <h3 className="comparison-title">Average Profit Per Deal</h3>
            <div className="comparison-values">
              <div className="our-value">
                <div className="our-value-number">$28.5K</div>
                <div className="our-value-label">Deelflow AI</div>
              </div>
              <div className="vs-text">VS</div>
              <div className="traditional-value">
                <div className="traditional-value-number">$8.2K</div>
                <div className="traditional-value-label">Traditional</div>
              </div>
            </div>
            <div className="warning-box">
              <p>Every deal you're losing $20,300 in profit</p>
            </div>
          </div>

          <div className="comparison-card">
            <h3 className="comparison-title">Time to Close Deals</h3>
            <div className="comparison-values">
              <div className="our-value">
                <div className="our-value-number">2.3 Days</div>
                <div className="our-value-label">Deelflow AI</div>
              </div>
              <div className="vs-text">VS</div>
              <div className="traditional-value">
                <div className="traditional-value-number">31 Days</div>
                <div className="traditional-value-label">Traditional</div>
              </div>
            </div>
            <div className="warning-box">
              <p>You're wasting 28.7 days per deal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProof;

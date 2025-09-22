import React from "react";

function BlockChain() {
  return (
    <section className="blockchain-marketplace" id="marketplace">
      <div className="container">
        <div className="text-center">
          <h2 className="blockchain-title">Live Blockchain Marketplace</h2>
          <p className="blockchain-subtitle">
            Real-time property exchange with instant escrow and smart contracts
          </p>

          <div className="blockchain-status">
            <div className="status-dot"></div>
            <span>Blockchain Active • 47 Transactions Today</span>
          </div>
        </div>

        <div className="blockchain-grid">
          <div className="blockchain-card">
            <div className="deal-status assignment">Assignment Deal</div>
            <div className="deal-price">$15,000</div>
            <div className="deal-address">123 Oak Street, Dallas TX</div>
            <div className="deal-details">
              <span>Escrow: $5,000 • Closing: 4 days</span>
            </div>
            <div className="deal-progress">
              <div className="progress-bar" style={{ width: "75%" }}></div>
            </div>
            <div className="progress-text">75% Complete</div>
          </div>

          <div className="blockchain-card">
            <div className="deal-status double-close">Double Close</div>
            <div className="deal-price">$32,500</div>
            <div className="deal-address">456 Pine Ave, Austin TX</div>
            <div className="deal-details">
              <span>Funding: Pre-approved • ROI: 127%</span>
            </div>
            <div className="deal-progress">
              <div className="progress-bar" style={{ width: "90%" }}></div>
            </div>
            <div className="progress-text">90% Complete</div>
          </div>

          <div className="blockchain-card">
            <div className="deal-status ai-deal">AI Dealmaking</div>
            <div className="deal-price">$47,000</div>
            <div className="deal-address">789 Elm Dr, Houston TX</div>
            <div className="deal-details">
              <span>Style: $900k • ARV: $365,000</span>
            </div>
            <div className="deal-progress">
              <div className="progress-bar" style={{ width: "45%" }}></div>
            </div>
            <div className="progress-text">45% Complete</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlockChain;

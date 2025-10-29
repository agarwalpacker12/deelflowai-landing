"use client";
import { PaymentAPI } from "../../services/api";
import React, { useEffect, useState } from "react";

function Pricing({ onAuthRequired, checkUserAuth }) {
  const [countdownTime, setCountdownTime] = useState(4 * 3600 + 23 * 60 + 17);
  const [professionalSpots, setProfessionalSpots] = useState(15);
  const [subscriptionPackState, setSubscriptionPackState] = useState([]);

  useEffect(() => {
    const fetchSubscriptionPacks = async () => {
      try {
        const response = await PaymentAPI.getSubscriptionPack();
        if (response.data.status === "success") {
          setSubscriptionPackState(response.data.data.packages || []);
        }
      } catch (err) {
        console.error("Error fetching subscription packs:", err);
      }
    };

    fetchSubscriptionPacks();
  }, []);

  const handlePayment = async (price_id) => {
    // Check user authentication before proceeding
    if (checkUserAuth && !checkUserAuth()) {
      onAuthRequired && onAuthRequired();
      return;
    }

    try {
      const response = await PaymentAPI.createCheckout({
        price_id,
      });
      if (response.data.data.url) {
        window.location.href = response.data.data.url;
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      if (Math.random() < 0.05) {
        setProfessionalSpots((prev) => Math.max(1, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkUser = () => {
    if (checkUserAuth && !checkUserAuth()) {
      onAuthRequired && onAuthRequired();
      return;
    }
  };

  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Choose Your Competitive Advantage</h2>
          <p className="section-subtitle">
            Limited-time pricing for the next{" "}
            <span id="pricing-countdown" className="countdown-text">
              {timeString}
            </span>
          </p>
        </div>

        <div className="pricing-grid">
          {subscriptionPackState.length > 0 ? (
            subscriptionPackState.map((pack, index) => {
              const isProfessional = pack.name === "Professional";
              const isEnterprise = pack.name === "Enterprise";

              return (
                <div
                  key={pack.id}
                  className={`pricing-card ${
                    isProfessional ? "pricing-card-popular" : ""
                  }`}
                >
                  {isProfessional && (
                    <div className="pricing-badge">MOST POPULAR</div>
                  )}

                  <div className="pricing-header">
                    <h3 className="pricing-title">{pack.name}</h3>
                    <div className="pricing-original">
                      ${Math.ceil(pack.amount * 1.5).toLocaleString()}
                    </div>
                    <div className="pricing-price">
                      <span className="pricing-currency">$</span>
                      <span className="pricing-amount">
                        {pack.amount.toLocaleString()}
                      </span>
                      <span className="pricing-period">
                        per {pack.interval}
                      </span>
                    </div>
                  </div>

                  <p className="pricing-features">{pack.description}</p>

                  <button
                    className={`pricing-button ${
                      pack.name === "Starter"
                        ? "pricing-button-starter"
                        : isProfessional
                        ? "pricing-button-popular"
                        : "pricing-button-enterprise"
                    }`}
                    onClick={() =>
                      isEnterprise ? null : handlePayment(pack.price_id)
                    }
                  >
                    {isEnterprise ? "Contact Sales" : "Start Free Trial"}
                  </button>

                  <div
                    className={`pricing-notice ${
                      isProfessional ? "pricing-notice-popular" : ""
                    }`}
                  >
                    {pack.name === "Starter" &&
                      "Price increases to $597 tomorrow"}
                    {isProfessional && (
                      <>
                        Only{" "}
                        <span id="professional-spots">{professionalSpots}</span>{" "}
                        spots left at this price!
                      </>
                    )}
                    {isEnterprise && "🎁 Exclusive - invitation only"}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              {/* Dummy Starter Plan */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Starter</h3>
                  <div className="pricing-original">$997</div>
                  <div className="pricing-price">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">297</span>
                    <span className="pricing-period">per month</span>
                  </div>
                </div>

                <p className="pricing-features">
                  50 AI Lead Analyses/month
                  <br />
                  Basic blockchain escrow
                  <br />
                  Email & SMS automation
                </p>
                <button
                  className="pricing-button pricing-button-starter"
                  // disabled
                  onClick={() => checkUser()}
                >
                  Start Free Trial
                </button>
                <div className="pricing-notice">Loading pricing...</div>
              </div>

              {/* Dummy Professional Plan */}
              <div className="pricing-card pricing-card-popular">
                <div className="pricing-badge">MOST POPULAR</div>
                <div className="pricing-header">
                  <h3 className="pricing-title">Professional</h3>
                  <div className="pricing-original">$2,997</div>
                  <div className="pricing-price">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">797</span>
                    <span className="pricing-period">per month</span>
                  </div>
                </div>

                <p className="pricing-features">
                  Unlimited AI analyses
                  <br />
                  Advanced blockchain features
                  <br />
                  Voice AI agents
                </p>

                <button
                  className="pricing-button pricing-button-popular"
                  // disabled
                  onClick={() => checkUser()}
                >
                  Start Free Trial
                </button>
                <div className="pricing-notice pricing-notice-popular">
                  Loading pricing...
                </div>
              </div>

              {/* Dummy Enterprise Plan */}
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Enterprise</h3>
                  <div className="pricing-original">$4,997</div>
                  <div className="pricing-price">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">1,997</span>
                    <span className="pricing-period">per month</span>
                  </div>
                </div>

                <p className="pricing-features">
                  Everything in Professional
                  <br />
                  Custom AI model training
                  <br />
                  Dedicated success manager
                </p>

                <button
                  className="pricing-button pricing-button-enterprise"
                  // disabled
                  onClick={() => checkUser()}
                >
                  Contact Sales
                </button>
                <div className="pricing-notice">Loading pricing...</div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Pricing;

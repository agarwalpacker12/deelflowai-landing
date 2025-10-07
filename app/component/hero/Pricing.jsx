'use client';
import React, { useEffect, useState } from "react";

function Pricing() {
  const [countdownTime, setCountdownTime] = useState(4 * 3600 + 23 * 60 + 17);
  const [professionalSpots, setProfessionalSpots] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      // Random decreases for professional spots
      if (Math.random() < 0.05) {
        setProfessionalSpots((prev) => Math.max(1, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(countdownTime / 3600);
  const minutes = Math.floor((countdownTime % 3600) / 60);
  const seconds = countdownTime % 60;

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const selectPlan = (planName) => {
    console.log(`Selected plan: ${planName}`);

    if (typeof gtag !== 'undefined') {
      gtag('event', 'select_plan', {
        plan_name: planName,
        value: planName === 'starter' ? 297 : planName === 'professional' ? 797 : 1997,
      });
    }

    const signupSection = document.getElementById('signup-form');
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    const planField = document.getElementById('selected-plan');
    if (planField) {
      planField.value = planName;
    }
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Choose Your Competitive Advantage</h2>
          <p className="section-subtitle">
            Limited-time pricing for the next
            <span id="pricing-countdown" className="countdown-text">
              {timeString}
            </span>
          </p>
        </div>

        <div className="pricing-grid">
          {/* Starter Plan */}
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

            <ul className="pricing-features">
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>50 AI Lead Analyses/month</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Basic blockchain escrow</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Email & SMS automation</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Standard reporting</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Mobile app access</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Email support</span>
              </li>
            </ul>

            <button
              className="pricing-button pricing-button-starter"
              onClick={() => selectPlan('starter')}
            >
              Start Free Trial
            </button>

            <div className="pricing-notice">
              Price increases to $597 tomorrow
            </div>
          </div>

          {/* Professional Plan (Most Popular) */}
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

            <ul className="pricing-features">
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Unlimited AI analyses</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Advanced blockchain features</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Voice AI agents</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Transactional funding access</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Custom marketing funnels</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Priority support</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>White-label options</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>API access</span>
              </li>
            </ul>

            <button
              className="pricing-button pricing-button-popular"
              onClick={() => selectPlan('professional')}
            >
              Start Free Trial
            </button>

            <div className="pricing-notice pricing-notice-popular">
              Only <span id="professional-spots">{professionalSpots}</span> spots left at this
              price!
            </div>
          </div>

          {/* Enterprise Plan */}
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

            <ul className="pricing-features">
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Everything in Professional</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Custom AI model training</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Dedicated success manager</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Custom integrations</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Advanced analytics</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>Team collaboration</span>
              </li>
              <li className="pricing-feature">
                <i data-lucide="check-circle" className="pricing-check"></i>
                <span>99.9% SLA guarantee</span>
              </li>
            </ul>

            <button
              className="pricing-button pricing-button-enterprise"
              onClick={() => selectPlan('enterprise')}
            >
              Contact Sales
            </button>

            <div className="pricing-notice">🎁 Exclusive - invitation only</div>
          </div>
        </div>

        {/* Pricing Guarantees */}
        <div className="pricing-guarantees">
          <div className="pricing-guarantee">
            <i data-lucide="shield-check" className="guarantee-icon"></i>
            <h4>30-Day Money-Back Guarantee</h4>
            <p>
              If you don't close at least one deal in 30 days, get a full refund
            </p>
          </div>
          <div className="pricing-guarantee">
            <i data-lucide="lock" className="guarantee-icon"></i>
            <h4>Price Lock Protection</h4>
            <p>Your rate is locked forever - even as we add new features</p>
          </div>
          <div className="pricing-guarantee">
            <i data-lucide="trending-up" className="guarantee-icon"></i>
            <h4>Success Guarantee</h4>
            <p>
              We guarantee you'll 10x your investment or work with you until you
              do
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

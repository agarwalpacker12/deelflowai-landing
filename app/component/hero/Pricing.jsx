// "use client";
// import { PaymentAPI } from "@/app/services/api";
// import React, { useEffect, useState } from "react";

// function Pricing() {
//   const [countdownTime, setCountdownTime] = useState(4 * 3600 + 23 * 60 + 17);
//   const [professionalSpots, setProfessionalSpots] = useState(15);

//   const [subscriptionPackState, setSubscriptionPackState] = useState();

//   useEffect(() => {
//     const fetchInvitation = async () => {
//       try {
//         const response = await PaymentAPI.getSubscriptionPack();
//         if (response.data.status == "success") {
//           console.log(
//             "subscriptionPackState",
//             JSON.stringify(response.data.data)
//           );
//           setSubscriptionPackState(response?.data?.data?.packages);
//         }
//       } catch (err) {
//         console.error("Error fetching leads:", err);
//       }
//     };

//     fetchInvitation();
//   }, []);

//   const handlePayment = async (id) => {
//     try {
//       const formattedData = {
//         price_id: id,
//       };
//       const response = await PaymentAPI.createCheckout(formattedData);
//       console.log("response", response.data.data);
//       if (response.data.data.redirect_url) {
//         window.location.href = response.data.data.redirect_url;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdownTime((prev) => {
//         if (prev <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });

//       // Random decreases for professional spots
//       if (Math.random() < 0.05) {
//         setProfessionalSpots((prev) => Math.max(1, prev - 1));
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const hours = Math.floor(countdownTime / 3600);
//   const minutes = Math.floor((countdownTime % 3600) / 60);
//   const seconds = countdownTime % 60;

//   const timeString = `${hours.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

//   const selectPlan = (planName) => {
//     console.log(`Selected plan: ${planName}`);

//     if (typeof gtag !== "undefined") {
//       gtag("event", "select_plan", {
//         plan_name: planName,
//         value:
//           planName === "starter"
//             ? 297
//             : planName === "professional"
//             ? 797
//             : 1997,
//       });
//     }

//     const signupSection = document.getElementById("signup-form");
//     if (signupSection) {
//       signupSection.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }

//     const planField = document.getElementById("selected-plan");
//     if (planField) {
//       planField.value = planName;
//     }
//   };

//   return (
//     <section className="pricing" id="pricing">
//       <div className="container">
//         <div className="text-center mb-16">
//           <h2 className="section-title">Choose Your Competitive Advantage</h2>
//           <p className="section-subtitle">
//             Limited-time pricing for the next
//             <span id="pricing-countdown" className="countdown-text">
//               {timeString}
//             </span>
//           </p>
//         </div>

//         <div className="pricing-grid">
//           {/* Starter Plan */}
//           <div className="pricing-card">
//             <div className="pricing-header">
//               <h3 className="pricing-title">Starter</h3>
//               <div className="pricing-original">$997</div>
//               <div className="pricing-price">
//                 <span className="pricing-currency">$</span>
//                 <span className="pricing-amount">297</span>
//                 <span className="pricing-period">per month</span>
//               </div>
//             </div>

//             <ul className="pricing-features">
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>50 AI Lead Analyses/month</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Basic blockchain escrow</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Email & SMS automation</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Standard reporting</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Mobile app access</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Email support</span>
//               </li>
//             </ul>

//             <button
//               className="pricing-button pricing-button-starter"
//               // onClick={() => selectPlan("starter")}
//               onClick={()=>handlePayment()}
//             >
//               Start Free Trial
//             </button>

//             <div className="pricing-notice">
//               Price increases to $597 tomorrow
//             </div>
//           </div>

//           {/* Professional Plan (Most Popular) */}
//           <div className="pricing-card pricing-card-popular">
//             <div className="pricing-badge">MOST POPULAR</div>
//             <div className="pricing-header">
//               <h3 className="pricing-title">Professional</h3>
//               <div className="pricing-original">$2,997</div>
//               <div className="pricing-price">
//                 <span className="pricing-currency">$</span>
//                 <span className="pricing-amount">797</span>
//                 <span className="pricing-period">per month</span>
//               </div>
//             </div>

//             <ul className="pricing-features">
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Unlimited AI analyses</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Advanced blockchain features</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Voice AI agents</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Transactional funding access</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Custom marketing funnels</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Priority support</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>White-label options</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>API access</span>
//               </li>
//             </ul>

//             <button
//               className="pricing-button pricing-button-popular"
//               // onClick={() => selectPlan("professional")}
//               onClick={()=>handlePayment(price_id)}
//             >
//               Start Free Trial
//             </button>

//             <div className="pricing-notice pricing-notice-popular">
//               Only <span id="professional-spots">{professionalSpots}</span>{" "}
//               spots left at this price!
//             </div>
//           </div>

//           {/* Enterprise Plan */}
//           <div className="pricing-card">
//             <div className="pricing-header">
//               <h3 className="pricing-title">Enterprise</h3>
//               <div className="pricing-original">$4,997</div>
//               <div className="pricing-price">
//                 <span className="pricing-currency">$</span>
//                 <span className="pricing-amount">1,997</span>
//                 <span className="pricing-period">per month</span>
//               </div>
//             </div>

//             <ul className="pricing-features">
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Everything in Professional</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Custom AI model training</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Dedicated success manager</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Custom integrations</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Advanced analytics</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>Team collaboration</span>
//               </li>
//               <li className="pricing-feature">
//                 <i data-lucide="check-circle" className="pricing-check"></i>
//                 <span>99.9% SLA guarantee</span>
//               </li>
//             </ul>

//             <button
//               className="pricing-button pricing-button-enterprise"
//               onClick={() => selectPlan("enterprise")}
//             >
//               Contact Sales
//             </button>

//             <div className="pricing-notice">🎁 Exclusive - invitation only</div>
//           </div>
//         </div>

//         {/* Pricing Guarantees */}
//         <div className="pricing-guarantees">
//           <div className="pricing-guarantee">
//             <i data-lucide="shield-check" className="guarantee-icon"></i>
//             <h4>30-Day Money-Back Guarantee</h4>
//             <p>
//               If you don't close at least one deal in 30 days, get a full refund
//             </p>
//           </div>
//           <div className="pricing-guarantee">
//             <i data-lucide="lock" className="guarantee-icon"></i>
//             <h4>Price Lock Protection</h4>
//             <p>Your rate is locked forever - even as we add new features</p>
//           </div>
//           <div className="pricing-guarantee">
//             <i data-lucide="trending-up" className="guarantee-icon"></i>
//             <h4>Success Guarantee</h4>
//             <p>
//               We guarantee you'll 10x your investment or work with you until you
//               do
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Pricing;

"use client";
import { PaymentAPI } from "@/app/services/api";
import React, { useEffect, useState } from "react";

function Pricing() {
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
                  disabled
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
                  disabled
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
                  disabled
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

import React from "react";

function Testimonial() {
  return (
    <section className="testimonials" id="'testimonial">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Real Results from Real Members</h2>
          <p className="section-subtitle">
            These are actual members, not paid actors (verified results)
          </p>
        </div>

        <div className="testimonial-card" id="testimonial-card">
          <div className="text-center mb-8">
            <div className="testimonial-avatar" id="testimonial-avatar">
              JD
            </div>
            <div className="testimonial-revenue" id="testimonial-revenue">
              $180K in 6 months
            </div>
            <div className="testimonial-stars">
              <i
                data-lucide="star"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#fbbf24",
                  fill: "currentColor",
                }}
              ></i>
              <i
                data-lucide="star"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#fbbf24",
                  fill: "currentColor",
                }}
              ></i>
              <i
                data-lucide="star"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#fbbf24",
                  fill: "currentColor",
                }}
              ></i>
              <i
                data-lucide="star"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#fbbf24",
                  fill: "currentColor",
                }}
              ></i>
              <i
                data-lucide="star"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#fbbf24",
                  fill: "currentColor",
                }}
              ></i>
            </div>
          </div>

          <blockquote className="testimonial-quote" id="testimonial-quote">
            "I was skeptical about AI, but Deelflow AI generated $180K in my
            first 6 months. The psychological triggers alone increased my
            conversion rate by 340%. This isn't just software - it's unfair
            advantage."
          </blockquote>

          <div className="text-center mb-8">
            <div className="testimonial-author" id="testimonial-author">
              John Davidson
            </div>
            <div className="testimonial-location" id="testimonial-location">
              Dallas, TX • Real Estate Investor
            </div>
          </div>

          <div className="testimonial-comparison">
            <div className="testimonial-before-after">
              <div className="testimonial-before-label">BEFORE</div>
              <div className="testimonial-before-value" id="testimonial-before">
                2-3 deals/month
              </div>
            </div>
            <i
              data-lucide="arrow-right"
              className="testimonial-arrow"
              style={{ width: "2rem", height: "2rem" }}
            ></i>
            <div className="testimonial-before-after">
              <div className="testimonial-after-label">AFTER</div>
              <div className="testimonial-after-value" id="testimonial-after">
                12-15 deals/month
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="testimonial-nav">
          <button
            className="nav-dot active"
            onClick={() => setTestimonial(0)}
          ></button>
          <button
            className="nav-dot"
            onClick={() => setTestimonial(1)}
          ></button>
          <button
            className="nav-dot"
            onClick={() => setTestimonial(2)}
          ></button>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

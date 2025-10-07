'use client';
import React, { useEffect, useState } from "react";

function Testimonial() {
  const testimonials = [
    {
      avatar: 'JD',
      revenue: '$180K in 6 months',
      author: 'John Davidson',
      location: 'Dallas, TX • Real Estate Investor',
      quote:
        "I was skeptical about AI, but Deelflow AI generated $180K in my first 6 months. The psychological triggers alone increased my conversion rate by 340%. This isn't just software - it's unfair advantage.",
      before: '2-3 deals/month',
      after: '12-15 deals/month',
    },
    {
      avatar: 'SM',
      revenue: '$95K in 4 months',
      author: 'Sarah Martinez',
      location: 'Phoenix, AZ • Real Estate Investor',
      quote:
        "The Voice AI alone has saved me 40+ hours per week. While I'm sleeping, it's qualifying leads and booking appointments. I closed 3 deals last week without making a single phone call myself.",
      before: '1-2 deals/month',
      after: '8-10 deals/month',
    },
    {
      avatar: 'RC',
      revenue: '$340K in 8 months',
      author: 'Robert Chen',
      location: 'Austin, TX • Real Estate Professional',
      quote:
        "The blockchain escrow feature completely eliminated my biggest bottleneck. Deals that used to take 30+ days now close in under a week. My profit per deal increased by 180% thanks to the AI analysis.",
      before: '3-4 deals/month',
      after: '15-18 deals/month',
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[currentTestimonial];

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
              {testimonial.avatar}
            </div>
            <div className="testimonial-revenue" id="testimonial-revenue">
              {testimonial.revenue}
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
            {testimonial.quote}
          </blockquote>

          <div className="text-center mb-8">
            <div className="testimonial-author" id="testimonial-author">
              {testimonial.author}
            </div>
            <div className="testimonial-location" id="testimonial-location">
              {testimonial.location}
            </div>
          </div>

          <div className="testimonial-comparison">
            <div className="testimonial-before-after">
              <div className="testimonial-before-label">BEFORE</div>
              <div className="testimonial-before-value" id="testimonial-before">
                {testimonial.before}
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
                {testimonial.after}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="testimonial-nav">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

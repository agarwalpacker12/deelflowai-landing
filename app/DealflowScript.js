'use client';

import { useEffect } from 'react';

const DealflowScript = () => {
  useEffect(() => {
    // Enhanced Psychological JavaScript with Pricing Features

    // Global variables
    let globalCountdownTime = 4 * 3600 + 23 * 60 + 17; // 4:23:17 in seconds
    let spots = 23;
    let activeUsers = 3847;
    let dailyDeals = 127;
    let professionalSpots = 15;
    let exitIntentShown = false;

    // Testimonials data
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

    let currentTestimonial = 0;

    // Live activity data
    const activities = [
      {
        user: 'Alex K.',
        action: 'earned $34K assignment fee',
        location: 'Phoenix, AZ',
        avatar: 'AK',
        bgColor: '#3b82f6',
      },
      {
        user: 'Lisa R.',
        action: 'AI found perfect buyer match',
        location: 'Denver, CO',
        avatar: 'LR',
        bgColor: '#10b981',
      },
      {
        user: 'David M.',
        action: 'completed double close in 18 hours',
        location: 'Miami, FL',
        avatar: 'DM',
        bgColor: '#f59e0b',
      },
      {
        user: 'Emma P.',
        action: 'blockchain transaction confirmed',
        location: 'Seattle, WA',
        avatar: 'EP',
        bgColor: '#8b5cf6',
      },
      {
        user: 'Carlos J.',
        action: 'closed $52K wholesale deal',
        location: 'Las Vegas, NV',
        avatar: 'CJ',
        bgColor: '#ef4444',
      },
      {
        user: 'Rachel W.',
        action: 'found distressed property lead',
        location: 'Atlanta, GA',
        avatar: 'RW',
        bgColor: '#06b6d4',
      },
      {
        user: 'Mike T.',
        action: 'automated 15 marketing campaigns',
        location: 'Chicago, IL',
        avatar: 'MT',
        bgColor: '#84cc16',
      },
      {
        user: 'Jennifer L.',
        action: 'voice AI scheduled 12 appointments',
        location: 'Houston, TX',
        avatar: 'JL',
        bgColor: '#ec4899',
      },
    ];

    // Live counters and timers
    function updateCountdown() {
      const countdownElements = document.querySelectorAll(
        '#countdown, #hero-countdown, #pricing-countdown'
      );
      const spotsElements = document.querySelectorAll(
        '#spots-left, #hero-spots-left'
      );
      const activeUsersElements = document.querySelectorAll(
        '#active-users, #mobile-active-users'
      );
      const dailyDealsElements = document.querySelectorAll('#mobile-daily-deals');
      const professionalSpotsElement =
        document.getElementById('professional-spots');

      const timer = setInterval(() => {
        globalCountdownTime--;

        // Random decreases for psychological effect
        if (Math.random() < 0.08) {
          spots = Math.max(1, spots - 1);
          spotsElements.forEach((el) => {
            if (el) el.textContent = spots;
          });
        }

        if (Math.random() < 0.05) {
          professionalSpots = Math.max(1, professionalSpots - 1);
          if (professionalSpotsElement) {
            professionalSpotsElement.textContent = professionalSpots;
          }
        }

        if (Math.random() < 0.15) {
          activeUsers += Math.floor(Math.random() * 7) - 3;
          activeUsers = Math.max(2000, activeUsers); // Keep above 2000
          activeUsersElements.forEach((el) => {
            if (el) el.textContent = activeUsers.toLocaleString();
          });
        }

        if (Math.random() < 0.12) {
          dailyDeals += Math.random() < 0.7 ? 1 : 0;
          dailyDealsElements.forEach((el) => {
            if (el) el.textContent = dailyDeals;
          });
        }

        const hours = Math.floor(globalCountdownTime / 3600);
        const minutes = Math.floor((globalCountdownTime % 3600) / 60);
        const seconds = globalCountdownTime % 60;

        const timeString = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        countdownElements.forEach((el) => {
          if (el) el.textContent = timeString;
        });

        if (globalCountdownTime <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    }

    // Animate statistics
    function animateStats() {
      const stats = [
        { id: 'dealsProcessed', target: 2.3, suffix: 'B', prefix: '$' },
        { id: 'avgProfit', target: 28.5, suffix: 'K', prefix: '$' },
        { id: 'timeToClose', target: 2.3, suffix: '', prefix: '' },
        { id: 'successRate', target: 94.2, suffix: '%', prefix: '' },
      ];

      stats.forEach((stat) => {
        const element = document.getElementById(stat.id);
        if (!element) return;

        let current = 0;
        const increment = stat.target / 100;

        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.target) {
            current = stat.target;
            clearInterval(counter);
          }

          let displayValue = current.toFixed(1);
          if (stat.target >= 10) {
            displayValue = Math.floor(current);
          }

          element.textContent =
            (stat.prefix || '') + displayValue + (stat.suffix || '');
        }, 20);
      });
    }

    // Live activity feed updates
    function updateLiveActivity() {
      const activityFeed = document.getElementById('activity-feed');
      if (!activityFeed) return;

      // Initialize with first few activities
      for (let i = 0; i < 3; i++) {
        addActivityItem(activities[i]);
      }

      // Add new activities periodically
      setInterval(() => {
        const randomActivity =
          activities[Math.floor(Math.random() * activities.length)];
        addActivityItem(randomActivity);
      }, Math.random() * 15000 + 8000); // 8-23 seconds
    }

    function addActivityItem(activity) {
      const activityFeed = document.getElementById('activity-feed');
      if (!activityFeed) return;

      // Remove oldest item if we have too many
      const existingItems = activityFeed.querySelectorAll('.activity-item');
      if (existingItems.length >= 4) {
        existingItems[existingItems.length - 1].remove();
      }

      // Create new activity item
      const newItem = document.createElement('div');
      newItem.className = 'activity-item animate-slideIn';
      newItem.innerHTML = `
    <div class="activity-avatar" style="background: ${activity.bgColor}">
      ${activity.avatar}
    </div>
    <div style="flex: 1; min-width: 0;">
      <div style="font-weight: 600; font-size: 0.875rem; color: #111827; margin-bottom: 0.25rem;">
        ${activity.user}
      </div>
      <div style="font-size: 0.75rem; color: #6b7280; line-height: 1.4;">
        ${activity.action}
      </div>
      <div style="font-size: 0.625rem; color: #9ca3af; margin-top: 0.25rem;">
        Just now • ${activity.location}
      </div>
    </div>
  `;

      // Insert at the beginning
      activityFeed.insertBefore(newItem, activityFeed.firstChild);
    }

    // Testimonial management
    function setTestimonial(index) {
      const testimonial = testimonials[index];
      if (!testimonial) return;

      // Update all testimonial elements
      const elements = {
        avatar: document.getElementById('testimonial-avatar'),
        revenue: document.getElementById('testimonial-revenue'),
        quote: document.getElementById('testimonial-quote'),
        author: document.getElementById('testimonial-author'),
        location: document.getElementById('testimonial-location'),
        before: document.getElementById('testimonial-before'),
        after: document.getElementById('testimonial-after'),
      };

      Object.keys(elements).forEach((key) => {
        if (elements[key] && testimonial[key]) {
          elements[key].textContent = testimonial[key];
        }
      });

      // Update navigation dots
      const dots = document.querySelectorAll('.nav-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentTestimonial = index;
    }

    // Auto-rotate testimonials
    function startTestimonialRotation() {
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        setTestimonial(currentTestimonial);
      }, 8000); // Rotate every 8 seconds
    }

    // Pricing plan selection
    function selectPlan(planName) {
      // Track plan selection
      console.log(`Selected plan: ${planName}`);

      // You could integrate with analytics here
      if (typeof gtag !== 'undefined') {
        gtag('event', 'select_plan', {
          plan_name: planName,
          value:
            planName === 'starter' ? 297 : planName === 'professional' ? 797 : 1997,
        });
      }

      // Scroll to signup form or redirect to checkout
      scrollToSignup();

      // Optional: Pre-fill form with plan selection
      const planField = document.getElementById('selected-plan');
      if (planField) {
        planField.value = planName;
      }
    }

    // Smooth scroll to signup
    function scrollToSignup() {
      const signupSection = document.getElementById('signup-form');
      if (signupSection) {
        signupSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }

    // Form submission handler
    function handleFormSubmit() {
      const form = {
        name: document.getElementById('form-name')?.value,
        email: document.getElementById('form-email')?.value,
        phone: document.getElementById('form-phone')?.value,
        experience: document.getElementById('form-experience')?.value,
      };

      // Basic validation
      if (!form.name || !form.email || !form.phone) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      console.log('Form submitted:', form);

      // Here you would typically send to your backend
      // For demo purposes, we'll just show success
      alert(
        "Thank you! We'll be in touch within 24 hours to set up your free trial."
      );

      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          currency: 'USD',
          value: 797,
        });
      }
    }

    // Exit intent detection
    function detectExitIntent() {
      let isExiting = false;

      document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown && !isExiting) {
          isExiting = true;
          exitIntentShown = true;
          showExitPopup();
        }
      });

      document.addEventListener('mouseenter', () => {
        isExiting = false;
      });
    }

    function showExitPopup() {
      const popup = document.getElementById('exit-popup');
      if (popup) {
        popup.classList.add('show');
        startExitTimer();
      }
    }

    function closeExitPopup() {
      const popup = document.getElementById('exit-popup');
      if (popup) {
        popup.classList.remove('show');
      }
    }

    function claimDiscount() {
      // Track discount claim
      if (typeof gtag !== 'undefined') {
        gtag('event', 'claim_discount', {
          discount_amount: 67,
          original_price: 797,
          discounted_price: 197,
        });
      }

      closeExitPopup();
      scrollToSignup();
    }

    function startExitTimer() {
      let timeLeft = 600; // 10 minutes
      const timerElement = document.getElementById('exit-timer');
      if (!timerElement) return;

      const timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, '0')}`;

        if (timeLeft <= 0) {
          clearInterval(timer);
          closeExitPopup();
        }
      }, 1000);
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      const icon = document.getElementById('menu-icon');

      if (menu && icon) {
        const isMenuOpen = menu.style.display === 'block';
        menu.style.display = isMenuOpen ? 'none' : 'block';

        // Toggle between menu and X icon SVG paths
        if (isMenuOpen) {
          // Show menu icon
          icon.innerHTML = `
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      `;
        } else {
          // Show X icon
          icon.innerHTML = `
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      `;
        }
      }
    }

    // Header scroll effect
    function handleScroll() {
      const header = document.querySelector('.header');
      if (!header) return;

      const scrolled = window.scrollY > 50;

      if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        header.style.backdropFilter = 'blur(20px)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'blur(20px)';
      }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        });
      });
    }

    // Initialize entrance animations
    function initAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeIn');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      // Observe pricing cards and other elements
      document
        .querySelectorAll(
          '.pricing-card, .feature-card, .comparison-card, .blockchain-card'
        )
        .forEach((el) => {
          observer.observe(el);
        });
    }

    // Pricing card hover effects
    function initPricingEffects() {
      const pricingCards = document.querySelectorAll('.pricing-card');

      pricingCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          // Add subtle animation to other cards
          pricingCards.forEach((otherCard) => {
            if (otherCard !== card) {
              otherCard.style.opacity = '0.8';
              otherCard.style.transform = 'scale(0.98)';
            }
          });
        });

        card.addEventListener('mouseleave', () => {
          // Reset all cards
          pricingCards.forEach((otherCard) => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = '';
          });
        });
      });
    }

    // Initialize Lucide icons
    function initIcons() {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }

    // Main initialization function
    function init() {
      // Initialize all features
      initIcons();
      updateCountdown();
      updateLiveActivity();
      setTestimonial(0);
      startTestimonialRotation();
      detectExitIntent();
      initSmoothScrolling();
      initAnimations();
      initPricingEffects();

      // Add event listeners
      window.addEventListener('scroll', handleScroll);

      const menuToggle = document.getElementById('mobile-menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
      }

      // Start animations after a delay
      setTimeout(animateStats, 1000);

      console.log('Deelflow AI landing page initialized successfully!');
    }

    // Start initialization
    init();

    // Make functions available globally for inline event handlers
    window.selectPlan = selectPlan;
    window.scrollToSignup = scrollToSignup;
    window.handleFormSubmit = handleFormSubmit;
    window.setTestimonial = setTestimonial;
    window.closeExitPopup = closeExitPopup;
    window.claimDiscount = claimDiscount;
  }, []);

  return null;
};

export default DealflowScript;

"use client";

import React, { useState, useEffect, useReducer } from "react";
import {
  Search,
  Bed,
  Bath,
  Square,
  Heart,
  Filter,
  TrendingUp,
  Building,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Grid,
  Map,
  Bell,
  X,
  Check,
  Zap,
  Shield,
  Clock,
  Activity,
  Trophy,
  Flame,
  Brain,
  Eye,
  Lock,
  Wallet,
} from "lucide-react";
import styles from "./page.module.css";

// Psychological Color Palette from existing project
const colors = {
  trustBlue: "#2563eb",
  urgencyOrange: "#ea580c",
  successGreen: "#16a34a",
  premiumPurple: "#7c3aed",
  warningRed: "#dc2626",
  neutralGray: "#6b7280",
  lightBg: "#f8fafc",
  darkBg: "#0f172a",
  cardBg: "rgba(255, 255, 255, 0.95)",
  glassBg: "rgba(255, 255, 255, 0.1)",
};

// Consistent number formatting to prevent hydration issues
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Filter Reducer for better state management
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROPERTY_TYPE":
      return { ...state, propertyType: action.payload };
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceMin: action.payload.min,
        priceMax: action.payload.max,
      };
    case "SET_BEDS":
      return { ...state, beds: action.payload };
    case "SET_BATHS":
      return { ...state, baths: action.payload };
    case "SET_SQFT_RANGE":
      return {
        ...state,
        sqftMin: action.payload.min,
        sqftMax: action.payload.max,
      };
    case "SET_AMENITIES":
      return { ...state, amenities: action.payload };
    case "RESET_FILTERS":
      return {
        propertyType: "all",
        priceMin: "",
        priceMax: "",
        beds: "any",
        baths: "any",
        sqftMin: "",
        sqftMax: "",
        yearBuilt: "",
        amenities: [],
      };
    default:
      return state;
  }
};

const RealEstatePlatform = () => {
  // Client-side mounting check to prevent hydration issues
  const [mounted, setMounted] = useState(false);

  // State Management with gamification
  const [activeView, setActiveView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showScarcity, setShowScarcity] = useState(true);
  const [liveActivity, setLiveActivity] = useState([]);

  // User with gamification data from existing project
  const [user, setUser] = useState({
    name: "John Smith",
    type: "buyer",
    level: 7,
    points: 2847,
    streakDays: 15,
    walletBalance: 45000,
    savedProperties: [],
    notifications: 5,
    achievements: ["First Deal", "Speed Trader", "Market Expert"],
  });

  // Use reducer for complex filter state
  const [filters, dispatch] = useReducer(filterReducer, {
    propertyType: "all",
    priceMin: "",
    priceMax: "",
    beds: "any",
    baths: "any",
    sqftMin: "",
    sqftMax: "",
    yearBuilt: "",
    amenities: [],
  });

  const [mortgageCalculator, setMortgageCalculator] = useState({
    homePrice: "500000",
    downPayment: "100000",
    interestRate: 6.5,
    loanTerm: 30,
  });

  // Sample Properties with AI Scores from wholesale system
  const [properties] = useState([
    {
      id: "prop-001",
      address: "123 Maple Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      price: 750000,
      type: "Single Family",
      beds: 4,
      baths: 3,
      sqft: 2500,
      yearBuilt: 2018,
      images: ["house1.jpg", "house2.jpg", "house3.jpg"],
      description:
        "Beautiful modern home with ocean views - High AI investment score!",
      aiScore: 92,
      marketValue: 780000,
      rentEstimate: 4500,
      repairEstimate: 15000,
      arv: 850000,
      profitPotential: 75000,
      features: ["Pool", "Garage", "Smart Home", "Solar Panels"],
      virtualTour: true,
      blockchainVerified: true,
      instantBuy: true,
      agent: {
        name: "Sarah Johnson",
        rating: 4.9,
        phone: "555-0123",
        aiResponseTime: "< 1 min",
      },
      status: "For Sale",
      daysOnMarket: 5,
      viewCount: 342,
      savedCount: 28,
      priceHistory: [
        { id: "hist-001", date: "Jan 2024", price: 720000 },
        { id: "hist-002", date: "Jun 2024", price: 750000 },
      ],
      neighborhood: {
        walkScore: 85,
        transitScore: 72,
        crimeRate: "Low",
        schools: "A+",
        avgPrice: "695000",
        appreciationRate: 7.2,
      },
      wholesaleMetrics: {
        assignmentFee: 15000,
        escrowRequired: 5000,
        fundersAvailable: 12,
        estimatedCloseTime: "48 hours",
      },
    },
    {
      id: "prop-002",
      address: "456 Oak Avenue",
      city: "Fort Lauderdale",
      state: "FL",
      zip: "33301",
      price: 450000,
      type: "Condo",
      beds: 2,
      baths: 2,
      sqft: 1200,
      yearBuilt: 2020,
      images: ["condo1.jpg", "condo2.jpg"],
      description:
        "Luxury condo with smart contract ready - Perfect for investors!",
      aiScore: 88,
      marketValue: 460000,
      rentEstimate: 2800,
      repairEstimate: 5000,
      arv: 485000,
      profitPotential: 30000,
      features: ["Gym", "Concierge", "Rooftop Pool", "Blockchain Title"],
      virtualTour: true,
      blockchainVerified: true,
      instantBuy: false,
      agent: {
        name: "Mike Chen",
        rating: 4.7,
        phone: "555-0124",
        aiResponseTime: "< 2 min",
      },
      status: "For Sale",
      daysOnMarket: 12,
      viewCount: 256,
      savedCount: 19,
      priceHistory: [
        { id: "hist-003", date: "Mar 2024", price: 455000 },
        { id: "hist-004", date: "Jul 2024", price: 450000 },
      ],
      neighborhood: {
        walkScore: 92,
        transitScore: 85,
        crimeRate: "Low",
        schools: "A",
        avgPrice: 425000,
        appreciationRate: 6.8,
      },
      wholesaleMetrics: {
        assignmentFee: 10000,
        escrowRequired: 3000,
        fundersAvailable: 8,
        estimatedCloseTime: "72 hours",
      },
    },
    {
      id: "prop-003",
      address: "789 Pine Road",
      city: "Boca Raton",
      state: "FL",
      zip: "33432",
      price: 1200000,
      type: "Single Family",
      beds: 5,
      baths: 4,
      sqft: 3800,
      yearBuilt: 2022,
      images: ["luxury1.jpg", "luxury2.jpg", "luxury3.jpg"],
      description: "Premium estate with blockchain escrow - AI Score 95/100!",
      aiScore: 95,
      marketValue: 1250000,
      rentEstimate: 7500,
      repairEstimate: 0,
      arv: 1350000,
      profitPotential: 125000,
      features: [
        "Beach Access",
        "Wine Cellar",
        "Home Theater",
        "Guest House",
        "Smart Contract",
      ],
      virtualTour: true,
      blockchainVerified: true,
      instantBuy: true,
      agent: {
        name: "Emily Davis",
        rating: 5.0,
        phone: "555-0125",
        aiResponseTime: "Instant",
      },
      status: "Hot Deal",
      daysOnMarket: 2,
      viewCount: 523,
      savedCount: 67,
      priceHistory: [{ id: "hist-005", date: "Aug 2024", price: 1200000 }],
      neighborhood: {
        walkScore: 78,
        transitScore: 65,
        crimeRate: "Very Low",
        schools: "A+",
        avgPrice: "1100000",
        appreciationRate: 8.5,
      },
      wholesaleMetrics: {
        assignmentFee: 25000,
        escrowRequired: 10000,
        fundersAvailable: 20,
        estimatedCloseTime: "24 hours",
      },
    },
  ]);

  // Client mounting effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Live activity feed simulation - fixed for hydration
  useEffect(() => {
    if (!mounted) return;

    const activities = [
      { user: "Alex M.", action: "just viewed", property: "123 Maple Street" },
      {
        user: "Sarah K.",
        action: "deposited escrow on",
        property: "789 Pine Road",
      },
      { user: "Mike T.", action: "closed deal on", property: "456 Oak Avenue" },
      {
        user: "Jennifer L.",
        action: "made offer on",
        property: "123 Maple Street",
      },
    ];

    // Initialize with first activity to avoid empty state hydration mismatch
    setLiveActivity([activities[0]]);

    let activityIndex = 1;
    const interval = setInterval(() => {
      const activity = activities[activityIndex % activities.length];
      setLiveActivity((prev) => [activity, ...prev].slice(0, 3));
      activityIndex++;
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Validate mortgage inputs
  const validateMortgageInput = (field, value) => {
    const numValue = parseFloat(value);

    switch (field) {
      case "homePrice":
        return numValue >= 0 && numValue <= 100000000
          ? numValue
          : mortgageCalculator.homePrice;
      case "downPayment":
        const maxDown = mortgageCalculator.homePrice;
        return numValue >= 0 && numValue <= maxDown
          ? numValue
          : mortgageCalculator.downPayment;
      case "interestRate":
        return numValue >= 0 && numValue <= 30
          ? numValue
          : mortgageCalculator.interestRate;
      case "loanTerm":
        return numValue > 0 && numValue <= 50
          ? numValue
          : mortgageCalculator.loanTerm;
      default:
        return value;
    }
  };

  // Live Activity Feed Component
  const LiveActivityFeed = () => (
    <div className={styles.liveActivityFeed}>
      <div className={styles.liveActivityHeader}>
        <h4 className={styles.liveActivityTitle}>
          <Activity className={styles.activityIcon} />
          Live Activity
        </h4>
        <span className={styles.liveIndicator}></span>
      </div>
      <div className={styles.activityList}>
        {liveActivity.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <span className={styles.activityUser}>{activity.user}</span>{" "}
            {activity.action}{" "}
            <span className={styles.activityProperty}>{activity.property}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced Search Bar with AI
  const SearchBar = () => (
    <div className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <h1 className={styles.searchTitle}>AI-Powered Property Search</h1>
        <p className={styles.searchSubtitle}>
          Find wholesale deals with instant AI analysis and blockchain
          verification
        </p>
        <div className={styles.searchBox}>
          <div className={styles.searchInputContainer}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Enter address, city, ZIP, or MLS#"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <select className={styles.searchSelect}>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Wholesale Deals</option>
              <option>Off-Market</option>
            </select>
            <button className={styles.searchButton}>
              <Brain className={styles.brainIcon} />
              AI Search
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={styles.quickStats}>
          <span className={styles.statItem}>
            <Eye className={styles.statIcon} />
            342 viewing now
          </span>
          <span className={styles.statItem}>
            <TrendingUp className={styles.statIcon} />
            Market up 7.2%
          </span>
          <span className={styles.statItem}>
            <Zap className={styles.statIcon} />
            15 new AI deals today
          </span>
        </div>
      </div>
    </div>
  );

  // Enhanced Filters with AI Options
  const FiltersPanel = () => (
    <div className={styles.filtersPanel}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>
          <Filter className={styles.filterIcon} />
          Smart Filters
        </h3>
        <button
          className={styles.clearButton}
          onClick={() => dispatch({ type: "RESET_FILTERS" })}
        >
          Clear All
        </button>
      </div>

      <div className={styles.filtersGrid}>
        <select
          className={styles.filterSelect}
          value={filters.propertyType}
          onChange={(e) =>
            dispatch({ type: "SET_PROPERTY_TYPE", payload: e.target.value })
          }
        >
          <option value="all">All Types</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
          <option value="wholesale">Wholesale</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className={styles.filterInput}
          value={filters.priceMin}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE_RANGE",
              payload: { min: e.target.value, max: filters.priceMax },
            })
          }
          min="0"
        />

        <input
          type="number"
          placeholder="Max Price"
          className={styles.filterInput}
          value={filters.priceMax}
          onChange={(e) =>
            dispatch({
              type: "SET_PRICE_RANGE",
              payload: { min: filters.priceMin, max: e.target.value },
            })
          }
          min="0"
        />

        <select
          className={styles.filterSelect}
          value={filters.beds}
          onChange={(e) =>
            dispatch({ type: "SET_BEDS", payload: e.target.value })
          }
        >
          <option value="any">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <select
          className={styles.filterSelect}
          value={filters.baths}
          onChange={(e) =>
            dispatch({ type: "SET_BATHS", payload: e.target.value })
          }
        >
          <option value="any">Baths</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
        </select>

        {/* AI Score Filter */}
        <select className={styles.aiScoreFilter}>
          <option>AI Score 80+</option>
          <option>AI Score 90+</option>
          <option>AI Score 95+</option>
        </select>

        <button className={styles.aiFiltersButton}>
          <Brain className={styles.brainIcon} />
          AI Filters
        </button>
      </div>
    </div>
  );

  // Enhanced Property Card with Wholesale Features
  const PropertyCard = ({ property }) => {
    const [saved, setSaved] = useState(false);

    return (
      <div className={styles.propertyCard}>
        {/* Hot Deal Badge */}
        {property.aiScore >= 90 && (
          <div className={styles.hotDealBadge}>🔥 HOT DEAL</div>
        )}

        {/* Blockchain Verified Badge */}
        {property.blockchainVerified && (
          <div className={styles.verifiedBadge}>
            <Shield className={styles.shieldIcon} />
            Verified
          </div>
        )}

        <div className={styles.propertyImageContainer}>
          <div className={styles.propertyImage}>
            {/* <img
              src={`https://via.placeholder.com/800x600?text=${encodeURIComponent(
                property.address
              )}`}
              alt={`Property at ${property.address}`}
              className={styles.propertyImg}
            /> */}
          </div>

          {/* Virtual Tour Badge */}
          {property.virtualTour && (
            <div className={styles.virtualTourBadge}>
              <span className={styles.tourBadge}>
                <Play className={styles.playIcon} />
                3D Tour
              </span>
            </div>
          )}

          {/* Instant Buy Badge */}
          {property.instantBuy && (
            <div className={styles.instantBuyBadge}>
              <span className={styles.instantBadge}>
                <Zap className={styles.zapIcon} />
                Instant Buy
              </span>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
              if (!saved) {
                setUser((prev) => ({ ...prev, points: prev.points + 5 }));
              }
            }}
            className={styles.saveButton}
          >
            <Heart
              className={`${styles.heartIcon} ${
                saved ? styles.heartSaved : ""
              }`}
            />
          </button>
        </div>

        <div className={styles.propertyContent}>
          {/* Price and AI Score */}
          <div className={styles.priceHeader}>
            <div className={styles.propertyPrice}>
              ${formatNumber(property.price)}
            </div>
            <div className={styles.aiScoreContainer}>
              <div
                className={`${styles.aiScoreBadge} ${
                  property.aiScore >= 90
                    ? styles.aiScoreHigh
                    : property.aiScore >= 80
                    ? styles.aiScoreMedium
                    : styles.aiScoreLow
                }`}
              >
                <Brain className={styles.brainIcon} />
                AI: {property.aiScore}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={styles.propertyDetails}>
            <div className={styles.detailItem}>
              <Bed className={styles.detailIcon} />
              <span className={styles.detailText}>{property.beds} bd</span>
            </div>
            <div className={styles.detailItem}>
              <Bath className={styles.detailIcon} />
              <span className={styles.detailText}>{property.baths} ba</span>
            </div>
            <div className={styles.detailItem}>
              <Square className={styles.detailIcon} />
              <span className={styles.detailText}>
                {formatNumber(property.sqft)} sqft
              </span>
            </div>
          </div>

          <div className={styles.propertyAddress}>
            <p className={styles.addressLine1}>{property.address}</p>
            <p className={styles.addressLine2}>
              {property.city}, {property.state} {property.zip}
            </p>
          </div>

          {/* Wholesale Metrics */}
          <div className={styles.wholesaleMetrics}>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>ARV:</span>
              <span className={styles.metricValueGreen}>
                ${formatNumber(property.arv)}
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>Profit Potential:</span>
              <span className={styles.metricValueBlue}>
                ${formatNumber(property.profitPotential)}
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabelWithIcon}>
                <Clock className={styles.clockIcon} />
                Close Time:
              </span>
              <span className={styles.metricValuePurple}>
                {property.wholesaleMetrics.estimatedCloseTime}
              </span>
            </div>
          </div>

          {/* View Stats */}
          <div className={styles.viewStats}>
            <span className={styles.viewStatItem}>
              <Eye className={styles.viewStatIcon} />
              {property.viewCount} views
            </span>
            <span className={styles.viewStatItem}>
              <Heart className={styles.viewStatIcon} />
              {property.savedCount} saved
            </span>
            <span className={styles.viewStatItem}>
              <Users className={styles.viewStatIcon} />
              {property.wholesaleMetrics.fundersAvailable} funders
            </span>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              onClick={() => setSelectedProperty(property)}
              className={styles.viewDetailsButton}
            >
              View Details
            </button>
            {property.instantBuy && (
              <button className={styles.depositButton}>
                <Lock className={styles.lockIcon} />
                Deposit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Property Detail Modal with Wholesale Features
  const PropertyDetailModal = ({ property, onClose }) => {
    const [activeTab, setActiveTab] = useState("overview");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAIChat, setShowAIChat] = useState(false);

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (property) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [property, onClose]);

    if (!property) return null;

    return (
      <div className={styles.modalOverlay} role="dialog" aria-modal="true">
        <div className={styles.modalContainer}>
          <div className={styles.modalBackdrop} onClick={onClose}></div>

          <div className={styles.modalContent}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>{property.address}</h2>
                <div className={styles.modalSubtitle}>
                  {property.blockchainVerified && (
                    <span className={styles.modalBadgeGreen}>
                      <Shield className={styles.shieldIcon} />
                      Blockchain Verified
                    </span>
                  )}
                  <span className={styles.modalBadgePurple}>
                    <Brain className={styles.brainIcon} />
                    AI Score: {property.aiScore}/100
                  </span>
                </div>
              </div>
              <button onClick={onClose} className={styles.modalCloseButton}>
                <X className={styles.closeIcon} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Image Gallery */}
              <div className={styles.imageGallery}>
                <div className={styles.galleryContainer}>
                  {/* <img
                    src={`https://via.placeholder.com/1200x800?text=Property+Image+${
                      currentImageIndex + 1
                    }`}
                    alt={`Property view ${currentImageIndex + 1}`}
                    className={styles.galleryImage}
                  /> */}
                  <button
                    onClick={() =>
                      setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
                    }
                    className={`${styles.galleryButton} ${styles.galleryButtonLeft}`}
                  >
                    <ChevronLeft className={styles.chevronIcon} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(Math.min(2, currentImageIndex + 1))
                    }
                    className={`${styles.galleryButton} ${styles.galleryButtonRight}`}
                  >
                    <ChevronRight className={styles.chevronIcon} />
                  </button>
                </div>
              </div>

              {/* Content Grid */}
              <div className={styles.modalContentGrid}>
                <div className={styles.modalMainContent}>
                  {/* Tabs */}
                  <div className={styles.tabsContainer} role="tablist">
                    {[
                      "overview",
                      "wholesale",
                      "features",
                      "neighborhood",
                      "history",
                    ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.tabButton} ${
                          activeTab === tab ? styles.tabButtonActive : ""
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab === "overview" && (
                    <div className={styles.tabContent}>
                      <div className={styles.descriptionSection}>
                        <h3 className={styles.sectionTitle}>Description</h3>
                        <p className={styles.descriptionText}>
                          {property.description}
                        </p>
                      </div>

                      <div className={styles.overviewGrid}>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewLabel}>
                            Property Type
                          </div>
                          <div className={styles.overviewValue}>
                            {property.type}
                          </div>
                        </div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewLabel}>Year Built</div>
                          <div className={styles.overviewValue}>
                            {property.yearBuilt}
                          </div>
                        </div>
                        <div className={styles.overviewCard}>
                          <div className={styles.overviewLabel}>
                            Days on Market
                          </div>
                          <div className={styles.overviewValue}>
                            {property.daysOnMarket}
                          </div>
                        </div>
                        <div className={styles.aiScoreCard}>
                          <div className={styles.overviewLabel}>
                            AI Investment Score
                          </div>
                          <div className={styles.aiScoreValue}>
                            {property.aiScore}/100
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "wholesale" && (
                    <div className={styles.tabContent}>
                      <h3 className={styles.sectionTitle}>
                        Wholesale Analysis
                      </h3>

                      <div className={styles.dealMetricsCard}>
                        <h4 className={styles.cardTitle}>Deal Metrics</h4>
                        <div className={styles.metricsGrid}>
                          <div>
                            <div className={styles.metricLabel}>
                              Purchase Price
                            </div>
                            <div className={styles.metricPriceValue}>
                              ${formatNumber(property.price)}
                            </div>
                          </div>
                          <div>
                            <div className={styles.metricLabel}>
                              After Repair Value
                            </div>
                            <div className={styles.metricGreenValue}>
                              ${formatNumber(property.arv)}
                            </div>
                          </div>
                          <div>
                            <div className={styles.metricLabel}>
                              Repair Estimate
                            </div>
                            <div className={styles.metricOrangeValue}>
                              ${formatNumber(property.repairEstimate)}
                            </div>
                          </div>
                          <div>
                            <div className={styles.metricLabel}>
                              Profit Potential
                            </div>
                            <div className={styles.metricBlueValue}>
                              ${formatNumber(property.profitPotential)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.transactionCard}>
                        <h4 className={styles.cardTitle}>
                          Transaction Details
                        </h4>
                        <div className={styles.transactionDetails}>
                          <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>
                              Assignment Fee
                            </span>
                            <span className={styles.transactionValue}>
                              $
                              {formatNumber(
                                property.wholesaleMetrics.assignmentFee
                              )}
                            </span>
                          </div>
                          <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>
                              Escrow Required
                            </span>
                            <span className={styles.transactionValue}>
                              $
                              {formatNumber(
                                property.wholesaleMetrics.escrowRequired
                              )}
                            </span>
                          </div>
                          <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>
                              Funders Available
                            </span>
                            <span className={styles.transactionValueGreen}>
                              {property.wholesaleMetrics.fundersAvailable}
                            </span>
                          </div>
                          <div className={styles.transactionRow}>
                            <span className={styles.transactionLabel}>
                              Est. Close Time
                            </span>
                            <span className={styles.transactionValueBlue}>
                              {property.wholesaleMetrics.estimatedCloseTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className={styles.tabContent}>
                      <h3 className={styles.sectionTitle}>Property Features</h3>
                      <div className={styles.featuresGrid}>
                        {property.features.map((feature) => (
                          <div key={feature} className={styles.featureItem}>
                            <Check className={styles.checkIcon} />
                            <span className={styles.featureText}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "neighborhood" && (
                    <div className={styles.tabContent}>
                      <h3 className={styles.sectionTitle}>
                        Neighborhood Stats
                      </h3>
                      <div className={styles.neighborhoodGrid}>
                        <div className={styles.neighborhoodCardBlue}>
                          <div className={styles.neighborhoodLabel}>
                            Walk Score
                          </div>
                          <div className={styles.neighborhoodValueBlue}>
                            {property.neighborhood?.walkScore || "N/A"}
                          </div>
                        </div>
                        <div className={styles.neighborhoodCardGreen}>
                          <div className={styles.neighborhoodLabel}>
                            Transit Score
                          </div>
                          <div className={styles.neighborhoodValueGreen}>
                            {property.neighborhood?.transitScore || "N/A"}
                          </div>
                        </div>
                        <div className={styles.neighborhoodCardPurple}>
                          <div className={styles.neighborhoodLabel}>
                            School Rating
                          </div>
                          <div className={styles.neighborhoodValuePurple}>
                            {property.neighborhood?.schools || "N/A"}
                          </div>
                        </div>
                        <div className={styles.neighborhoodCardOrange}>
                          <div className={styles.neighborhoodLabel}>
                            Appreciation Rate
                          </div>
                          <div className={styles.neighborhoodValueOrange}>
                            {property.neighborhood?.appreciationRate || 0}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div className={styles.tabContent}>
                      <h3 className={styles.sectionTitle}>Price History</h3>
                      <div className={styles.historyList}>
                        {property.priceHistory?.map((record) => (
                          <div key={record.id} className={styles.historyItem}>
                            <span className={styles.historyDate}>
                              {record.date}
                            </span>
                            <span className={styles.historyPrice}>
                              ${formatNumber(record.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className={styles.modalSidebar}>
                  {/* Price Card */}
                  <div className={styles.priceCard}>
                    <div className={styles.priceCardPrice}>
                      ${formatNumber(property.price)}
                    </div>
                    <div className={styles.priceCardDetails}>
                      <div className={styles.priceDetailItem}>
                        <Bed className={styles.priceDetailIcon} />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className={styles.priceDetailItem}>
                        <Bath className={styles.priceDetailIcon} />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className={styles.priceDetailItem}>
                        <Square className={styles.priceDetailIcon} />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={styles.quickActions}>
                      <button className={styles.depositEscrowButton}>
                        <Lock className={styles.lockIcon} />
                        Deposit Escrow
                      </button>
                      <button className={styles.makeOfferButton}>
                        Make Offer
                      </button>
                      <button
                        onClick={() => setShowAIChat(true)}
                        className={styles.aiAssistantButton}
                      >
                        <Brain className={styles.brainIcon} />
                        AI Assistant
                      </button>
                    </div>
                  </div>

                  {/* Agent Card with AI */}
                  <div className={styles.agentCard}>
                    <h4 className={styles.agentCardTitle}>AI-Powered Agent</h4>
                    <div className={styles.agentInfo}>
                      <div className={styles.agentAvatar}>
                        {property.agent?.name?.charAt(0) || "A"}
                      </div>
                      <div>
                        <div className={styles.agentName}>
                          {property.agent?.name || "AI Agent"}
                        </div>
                        <div className={styles.agentRating}>
                          <div className={styles.ratingDisplay}>
                            <Star className={styles.starIcon} />
                            <span className={styles.ratingValue}>
                              {property.agent?.rating || "N/A"}
                            </span>
                          </div>
                          <span className={styles.responseTime}>
                            {property.agent?.aiResponseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.agentActions}>
                      <button className={styles.contactAgentButton}>
                        Contact Agent
                      </button>
                      <button className={styles.scheduleTourButton}>
                        Schedule Tour
                      </button>
                    </div>
                  </div>

                  {/* Virtual Tour */}
                  {property.virtualTour && (
                    <button className={styles.virtualTourButton}>
                      <Play className={styles.playIcon} />
                      Start 3D Virtual Tour
                    </button>
                  )}

                  {/* Funding Options */}
                  <div className={styles.fundingCard}>
                    <h4 className={styles.fundingTitle}>Instant Funding</h4>
                    <div className={styles.fundingDetails}>
                      <div className={styles.fundingRow}>
                        <span className={styles.fundingLabel}>
                          Funders Available
                        </span>
                        <span className={styles.fundingValueGreen}>
                          {property.wholesaleMetrics.fundersAvailable}
                        </span>
                      </div>
                      <div className={styles.fundingRow}>
                        <span className={styles.fundingLabel}>Best Rate</span>
                        <span className={styles.fundingValue}>
                          8.5% + 2 pts
                        </span>
                      </div>
                      <button className={styles.getFundingButton}>
                        Get Funding Quotes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Assistant */}
        {showAIChat && (
          <div className={styles.aiChatContainer}>
            <div className={styles.aiChatHeader}>
              <div className={styles.aiChatTitle}>
                <Brain className={styles.brainIcon} />
                <span>AI Property Assistant</span>
              </div>
              <button onClick={() => setShowAIChat(false)}>
                <X className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.aiChatBody}>
              <div className={styles.aiChatMessages}>
                <div className={styles.aiMessage}>
                  <p className={styles.aiMessageText}>
                    Hi! I've analyzed this property. With an AI score of{" "}
                    {property.aiScore}, this property shows excellent investment
                    potential. The estimated profit of $
                    {formatNumber(property.profitPotential)} makes it a strong
                    wholesale opportunity.
                  </p>
                </div>
                <div className={styles.aiMessage}>
                  <p className={styles.aiMessageText}>
                    Based on market data, I recommend moving quickly. Properties
                    with similar metrics typically close within{" "}
                    {property.wholesaleMetrics.estimatedCloseTime}. Would you
                    like to deposit escrow now?
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.aiChatFooter}>
              <div className={styles.aiChatInputContainer}>
                <input
                  type="text"
                  placeholder="Ask about this property..."
                  className={styles.aiChatInput}
                />
                <button className={styles.aiChatSendButton}>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Mortgage Calculator
  const MortgageCalculatorView = () => {
    const calculateMonthlyPayment = () => {
      const principal =
        mortgageCalculator.homePrice - mortgageCalculator.downPayment;

      if (principal <= 0) return 0;
      if (mortgageCalculator.interestRate === 0) {
        return principal / (mortgageCalculator.loanTerm * 12);
      }

      const monthlyRate = mortgageCalculator.interestRate / 100 / 12;
      const numPayments = mortgageCalculator.loanTerm * 12;

      const monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

      return isNaN(monthlyPayment) ? 0 : monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();
    const totalInterest =
      monthlyPayment * mortgageCalculator.loanTerm * 12 -
      (mortgageCalculator.homePrice - mortgageCalculator.downPayment);

    return (
      <div className={styles.mortgageCalculatorView}>
        <div className={styles.calculatorContainer}>
          <div className={styles.calculatorHeader}>
            <h2 className={styles.calculatorTitle}>
              AI-Powered Mortgage Calculator
            </h2>
            <p className={styles.calculatorSubtitle}>
              Get instant approval with blockchain verification
            </p>
          </div>

          <div className={styles.calculatorGrid}>
            <div className={styles.calculatorForm}>
              <h3 className={styles.formTitle}>Loan Details</h3>

              <div className={styles.formFields}>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Home Price</label>
                  <div className={styles.currencyInput}>
                    <span className={styles.currencySymbol}>$</span>
                    <input
                      type="number"
                      value={mortgageCalculator.homePrice}
                      onChange={(e) => {
                        const validated = validateMortgageInput(
                          "homePrice",
                          e.target.value
                        );
                        setMortgageCalculator({
                          ...mortgageCalculator,
                          homePrice: validated,
                        });
                      }}
                      className={styles.currencyField}
                      min="0"
                      max="100000000"
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Down Payment</label>
                  <div className={styles.currencyInput}>
                    <span className={styles.currencySymbol}>$</span>
                    <input
                      type="number"
                      value={mortgageCalculator.downPayment}
                      onChange={(e) => {
                        const validated = validateMortgageInput(
                          "downPayment",
                          e.target.value
                        );
                        setMortgageCalculator({
                          ...mortgageCalculator,
                          downPayment: validated,
                        });
                      }}
                      className={styles.currencyField}
                      min="0"
                      max={mortgageCalculator.homePrice}
                    />
                  </div>
                  <div className={styles.fieldHelper}>
                    {mortgageCalculator.homePrice > 0
                      ? `${(
                          (mortgageCalculator.downPayment /
                            mortgageCalculator.homePrice) *
                          100
                        ).toFixed(1)}% down`
                      : "0% down"}
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Interest Rate</label>
                  <div className={styles.percentageInput}>
                    <input
                      type="number"
                      step="0.1"
                      value={mortgageCalculator.interestRate}
                      onChange={(e) => {
                        const validated = validateMortgageInput(
                          "interestRate",
                          e.target.value
                        );
                        setMortgageCalculator({
                          ...mortgageCalculator,
                          interestRate: validated,
                        });
                      }}
                      className={styles.percentageField}
                      min="0"
                      max="30"
                    />
                    <span className={styles.percentageSymbol}>%</span>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Loan Term</label>
                  <select
                    value={mortgageCalculator.loanTerm}
                    onChange={(e) =>
                      setMortgageCalculator({
                        ...mortgageCalculator,
                        loanTerm: parseInt(e.target.value),
                      })
                    }
                    className={styles.selectField}
                  >
                    <option value="15">15 years</option>
                    <option value="30">30 years</option>
                  </select>
                </div>

                {/* AI Recommendation */}
                <div className={styles.aiRecommendationCard}>
                  <div className={styles.aiRecommendationHeader}>
                    <Brain className={styles.brainIcon} />
                    <span className={styles.aiRecommendationTitle}>
                      AI Recommendation
                    </span>
                  </div>
                  <p className={styles.aiRecommendationText}>
                    Based on your profile, you qualify for our premium rate of
                    5.9%. This could save you $
                    {formatNumber(Math.round(monthlyPayment * 0.1))}/month!
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.calculatorResults}>
              <h3 className={styles.resultsTitle}>Monthly Payment Breakdown</h3>

              <div className={styles.monthlyPaymentDisplay}>
                <div className={styles.paymentAmount}>
                  ${formatNumber(Math.round(monthlyPayment))}
                </div>
                <div className={styles.paymentPeriod}>per month</div>
              </div>

              <div className={styles.paymentBreakdown}>
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Principal & Interest
                  </span>
                  <span className={styles.breakdownValue}>
                    ${monthlyPayment.toFixed(0)}
                  </span>
                </div>
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Property Tax (est.)
                  </span>
                  <span className={styles.breakdownValue}>
                    ${Math.round((mortgageCalculator.homePrice * 0.01) / 12)}
                  </span>
                </div>
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>
                    Homeowners Insurance
                  </span>
                  <span className={styles.breakdownValue}>$150</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>HOA Fees</span>
                  <span className={styles.breakdownValue}>$100</span>
                </div>
                <div className={styles.totalRow}>
                  <div className={styles.totalBreakdownRow}>
                    <span className={styles.totalLabel}>Total Monthly</span>
                    <span className={styles.totalValue}>
                      $
                      {formatNumber(
                        Math.round(
                          monthlyPayment +
                            (mortgageCalculator.homePrice * 0.01) / 12 +
                            150 +
                            100
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.interestCard}>
                <div className={styles.interestLabel}>Total Interest Paid</div>
                <div className={styles.interestValue}>
                  $
                  {formatNumber(
                    Math.round(totalInterest > 0 ? totalInterest : 0)
                  )}
                </div>
              </div>

              {/* Get Instant Approval Button */}
              <button className={styles.instantApprovalButton}>
                <Zap className={styles.zapIcon} />
                Get Instant Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Dashboard View
  const DashboardView = () => (
    <div>
      <SearchBar />
      <FiltersPanel />

      {/* View Toggle */}
      <div className={styles.viewToggleSection}>
        <div className={styles.viewToggleContainer}>
          <div className={styles.resultsCount}>
            {properties.length} properties found
          </div>
          <div className={styles.viewToggleButtons}>
            <button
              onClick={() => setViewMode("grid")}
              className={`${styles.viewToggleButton} ${
                viewMode === "grid" ? styles.viewToggleButtonActive : ""
              }`}
              aria-label="Grid view"
            >
              <Grid className={styles.viewToggleIcon} />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`${styles.viewToggleButton} ${
                viewMode === "map" ? styles.viewToggleButtonActive : ""
              }`}
              aria-label="Map view"
            >
              <Map className={styles.viewToggleIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {viewMode === "grid" ? (
        <div className={styles.propertiesGrid}>
          <div className={styles.propertiesContainer}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.mapView}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapContent}>
              <Map className={styles.mapIcon} />
              <p className={styles.mapText}>Interactive Map View</p>
              <p className={styles.mapSubtext}>Map integration would go here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.app}>
      {/* {showScarcity && <ScarcityBanner />} */}
      {/* <Header /> */}

      {activeView === "dashboard" || activeView === "buy" ? (
        <DashboardView />
      ) : null}
      {activeView === "mortgage" && <MortgageCalculatorView />}

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Live Activity Feed */}
      {mounted && liveActivity.length > 0 && <LiveActivityFeed />}
    </div>
  );
};

export default RealEstatePlatform;

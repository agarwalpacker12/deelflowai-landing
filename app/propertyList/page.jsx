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
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Grid,
  Map,
  X,
  Check,
  Zap,
  Shield,
  Clock,
  Activity,
  Brain,
  Eye,
  Lock,
} from "lucide-react";
import styles from "./page.module.css";
import PropertyCard from "./component/PropertyCard";
import PropertyDetailModal from "./component/PropertyDetailModal";
import MortgageCalculatorView from "./component/MortgageCalculatorView";
import LiveActivityFeed from "./component/LiveActivityFeed";

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
              <PropertyCard
                key={property.id}
                property={property}
                setSelectedProperty={setSelectedProperty}
                setUser={setUser}
              />
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
      {activeView === "mortgage" && (
        <MortgageCalculatorView
          mortgageCalculator={mortgageCalculator}
          setMortgageCalculator={setMortgageCalculator}
        />
      )}

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Live Activity Feed */}
      {mounted && liveActivity.length > 0 && (
        <LiveActivityFeed liveActivity={liveActivity} />
      )}
    </div>
  );
};

export default RealEstatePlatform;

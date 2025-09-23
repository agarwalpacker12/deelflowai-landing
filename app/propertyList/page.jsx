"use client";

import React, { useState, useReducer } from "react";
import styles from "./page.module.css";
import {
  Search,
  Bed,
  Bath,
  Square,
  Heart,
  Filter,
  Building,
  Play,
  Grid,
  Map,
  User,
  Bell,
  Zap,
} from "lucide-react";

// Filter Reducer
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

// Components

const SearchBar = ({ searchQuery, setSearchQuery, styles }) => (
  <div className={styles.searchSection}>
    <div className={styles.searchContainer}>
      <h1 className={styles.searchTitle}>Find Your Dream Home</h1>
      <div className={styles.searchBox}>
        <div className={styles.searchInputGroup}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Enter address, city, or ZIP"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search location"
            />
          </div>
          <select className={styles.searchSelect} aria-label="Property status">
            <option>For Sale</option>
            <option>For Rent</option>
            <option>Sold</option>
          </select>
          <button
            className={styles.searchButton}
            aria-label="Search properties"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
);

const PropertyCard = ({ property, styles, setSelectedProperty }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.propertyCard}>
      <div className={styles.propertyImageContainer}>
        <img
          src={`https://via.placeholder.com/800x600?text=${encodeURIComponent(
            property.address
          )}`}
          alt={`Property at ${property.address}`}
          className={styles.propertyImage}
        />

        <div className={styles.statusBadge}>{property.status}</div>

        {property.virtualTour && (
          <div className={styles.virtualTourBadge}>
            <Play className={styles.virtualTourIcon} />
            3D Tour
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className={styles.saveButton}
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          <Heart
            className={`${styles.saveIcon} ${
              saved ? styles.saveIconActive : ""
            }`}
          />
        </button>
      </div>

      <div className={styles.propertyDetails}>
        <div className={styles.propertyHeader}>
          <div className={styles.propertyPrice}>
            ${property.price.toLocaleString()}
          </div>
          <div className={styles.aiScore}>
            <Zap className={styles.aiScoreIcon} />
            <span>AI: {property.aiScore}</span>
          </div>
        </div>

        <div className={styles.propertyFeatures}>
          <div className={styles.feature}>
            <Bed className={styles.featureIcon} />
            <span>{property.beds} bd</span>
          </div>
          <div className={styles.feature}>
            <Bath className={styles.featureIcon} />
            <span>{property.baths} ba</span>
          </div>
          <div className={styles.feature}>
            <Square className={styles.featureIcon} />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className={styles.propertyAddress}>
          <p className={styles.addressStreet}>{property.address}</p>
          <p className={styles.addressCity}>
            {property.city}, {property.state} {property.zip}
          </p>
        </div>

        <div className={styles.marketInsights}>
          <div className={styles.insightRow}>
            <span>Est. Value:</span>
            <span className={styles.insightValue}>
              ${property.marketValue.toLocaleString()}
            </span>
          </div>
          <div className={styles.insightRow}>
            <span>Rent Est:</span>
            <span className={styles.insightValue}>
              ${property.rentEstimate}/mo
            </span>
          </div>
        </div>

        <button
          onClick={() => setSelectedProperty(property)}
          className={styles.viewDetailsButton}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Main Page Component
export default function PropertiesPage() {
  const [activeView, setActiveView] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [user] = useState({
    name: "John Smith",
    type: "buyer",
    savedProperties: [],
    notifications: 5,
  });

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

  // Sample properties data
  const [properties] = useState([
    {
      id: "prop-001",
      address: "123 Maple Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      price: "7,50,000",
      type: "Single Family",
      beds: 4,
      baths: 3,
      sqft: 2500,
      yearBuilt: 2018,
      description: "Beautiful modern home with ocean views",
      aiScore: 92,
      marketValue: "780000",
      rentEstimate: "4500",
      features: ["Pool", "Garage", "Smart Home", "Solar Panels"],
      virtualTour: true,
      agent: { name: "Sarah Johnson", rating: 4.9, phone: "555-0123" },
      status: "For Sale",
      daysOnMarket: 5,
    },
    {
      id: "prop-002",
      address: "456 Oak Avenue",
      city: "Fort Lauderdale",
      state: "FL",
      zip: "33301",
      price: "450000",
      type: "Condo",
      beds: 2,
      baths: 2,
      sqft: 1200,
      yearBuilt: 2020,
      description: "Luxury condo in downtown with city views",
      aiScore: 88,
      marketValue: "460000",
      rentEstimate: "2800",
      features: ["Gym", "Concierge", "Rooftop Pool"],
      virtualTour: true,
      agent: { name: "Mike Chen", rating: 4.7, phone: "555-0124" },
      status: "For Sale",
      daysOnMarket: 12,
    },
    {
      id: "prop-003",
      address: "789 Pine Road",
      city: "Boca Raton",
      state: "FL",
      zip: "33432",
      price: "1,200,000",
      type: "Single Family",
      beds: 5,
      baths: 4,
      sqft: 3800,
      yearBuilt: 2022,
      description: "Stunning luxury estate with private beach access",
      aiScore: 95,
      marketValue: "1250000",
      rentEstimate: "7500",
      features: ["Beach Access", "Wine Cellar", "Home Theater", "Guest House"],
      virtualTour: true,
      agent: { name: "Emily Davis", rating: 5.0, phone: "555-0125" },
      status: "For Sale",
      daysOnMarket: 2,
    },
  ]);

  return (
    <div className={styles.container}>
      {/* <Header
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        styles={styles}
      /> */}

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        styles={styles}
      />

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <h3 className={styles.filtersTitle}>Filters</h3>
          <button
            className={styles.clearFiltersButton}
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

          <button className={styles.moreFiltersButton}>
            <Filter className={styles.filterIcon} />
            More Filters
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className={styles.viewToggleSection}>
        <div className={styles.propertyCount}>
          {properties.length} properties found
        </div>
        <div className={styles.viewToggleButtons}>
          <button
            onClick={() => setViewMode("grid")}
            className={`${styles.viewToggleButton} ${
              viewMode === "grid" ? styles.viewToggleButtonActive : ""
            }`}
          >
            <Grid className={styles.viewToggleIcon} />
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`${styles.viewToggleButton} ${
              viewMode === "map" ? styles.viewToggleButtonActive : ""
            }`}
          >
            <Map className={styles.viewToggleIcon} />
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      {viewMode === "grid" ? (
        <div className={styles.propertiesSection}>
          <div className={styles.propertiesGrid}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                styles={styles}
                setSelectedProperty={setSelectedProperty}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.mapView}>
          <Map className={styles.mapPlaceholderIcon} />
          <p>Interactive Map View</p>
          <p className={styles.mapPlaceholderText}>
            Map integration would go here
          </p>
        </div>
      )}
    </div>
  );
}

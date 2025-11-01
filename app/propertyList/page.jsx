"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { propertiesAPI } from "../services/api"; // Add your API import here

const PropertyList = () => {
  const [filters, setFilters] = useState({
    type: "All Type",
    minPrice: "",
    maxPrice: "",
    beds: "Beds",
    baths: "Baths",
    location: "All Zone 50+",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    has_next: false,
    has_prev: false,
  });
  const [error, setError] = useState(null);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: pagination.page,
          limit: pagination.limit,
          // Add other filter params as needed
          search: searchQuery,
          property_type: filters.type !== "All Type" ? filters.type : undefined,
          min_price: filters.minPrice || undefined,
          max_price: filters.maxPrice || undefined,
          bedrooms:
            filters.beds !== "Beds" ? filters.beds.replace("+", "") : undefined,
          bathrooms:
            filters.baths !== "Baths"
              ? filters.baths.replace("+", "")
              : undefined,
        };

        // Remove undefined values
        Object.keys(params).forEach(
          (key) => params[key] === undefined && delete params[key]
        );

        const response = await propertiesAPI.getCombinedProperties(params);

        if (response.data.status === "success") {
          // debugger;
          setProperties(response.data.data.properties);
          setPagination({
            total: response.data?.data?.total,
            page: response.data?.data?.page,
            limit: response.data?.data?.limit,
            has_next: response.data?.data?.has_next,
            has_prev: response.data?.data?.has_prev,
          });
        } else {
          setError("Failed to fetch properties");
        }
      } catch (err) {
        setError("Error loading properties: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [pagination.page, pagination.limit]); // Re-fetch when pagination changes

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== "") {
        setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on search
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Generate display properties for UI
  const getPropertyDisplayData = (property) => {
    const tags = [];
    const now = new Date();
    const createdAt = new Date(property.created_at);
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    // Add tags based on property data
    if (daysDiff <= 1) tags.push("HOT DEAL");
    if (property.status === "active") tags.push("Verified");
    if (property.images && property.images.length > 0) tags.push("3D Tour");
    if (!tags.includes("3D Tour")) tags.push("3D Tour"); // Default for demo

    // Generate sample profit metrics (you can replace with real calculations)
    const profitPotential = property.arv
      ? `${property.arv.toLocaleString()}`
      : `${Math.floor(property.purchase_price * 1.2).toLocaleString()}`;

    const cashFlow =
      property.purchase_price > 500000
        ? `${Math.floor(property.purchase_price * 0.005).toLocaleString()}`
        : "";

    const closeTime =
      property.status === "pending"
        ? `${24 + Math.floor(Math.random() * 48)} hours`
        : "";

    return {
      ...property,
      tags,
      verified: property.status === "active",
      profitPotential,
      cashFlow,
      closeTime,
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>AI-Powered Property Search</h1>
          <p className={styles.subtitle}>
            Find wholesale deals with instant AI analysis and blockchain
            verification
          </p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <div className={styles.searchInput}>
              <input
                type="text"
                placeholder="Enter address, city, ZIP, or MLS#"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchField}
              />
            </div>
            <select className={styles.searchSelect}>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <button className={styles.searchButton} onClick={handleSearch}>
              <span>🔍</span> Search
            </button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <span>🏠 342 viewing now</span>
            <span>📊 Marked up / 2%</span>
            <span>🕒 15 new AI Deals today</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>🔧 Smart Filters</span>
            <button className={styles.clearAll}>Clear All</button>
          </div>

          <div className={styles.filters}>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className={styles.filterSelect}
            >
              <option>All Type</option>
              <option>Single Family</option>
              <option>Condo</option>
              <option>Townhouse</option>
            </select>

            <input
              type="text"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className={styles.filterInput}
            />

            <input
              type="text"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className={styles.filterInput}
            />

            <select
              value={filters.beds}
              onChange={(e) => handleFilterChange("beds", e.target.value)}
              className={styles.filterSelect}
            >
              <option>Beds</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>

            <select
              value={filters.baths}
              onChange={(e) => handleFilterChange("baths", e.target.value)}
              className={styles.filterSelect}
            >
              <option>Baths</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className={styles.filterSelect}
            >
              <option>All Zone 50+</option>
              <option>Zone A</option>
              <option>Zone B</option>
              <option>Zone C</option>
            </select>

            <button className={styles.filterButton}>🔧 All Filters</button>
          </div>

          {/* View Toggle */}
          <div className={styles.viewToggle}>
            <span>{pagination.total} properties found</span>
            <div className={styles.toggleButtons}>
              <button
                className={`${styles.toggleBtn} ${
                  viewMode === "grid" ? styles.active : ""
                }`}
                onClick={() => setViewMode("grid")}
              >
                ⊞
              </button>
              <button
                className={`${styles.toggleBtn} ${
                  viewMode === "list" ? styles.active : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className={styles.propertyGrid}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading properties...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>❌ {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : properties.length === 0 ? (
          <div className={styles.noResults}>
            <p>No properties found matching your criteria.</p>
            <button
              onClick={() => {
                setFilters({
                  type: "All Type",
                  minPrice: "",
                  maxPrice: "",
                  beds: "Beds",
                  baths: "Baths",
                  location: "All Zone 50+",
                });
                setSearchQuery("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          properties.map((property) => {
            const displayProperty = getPropertyDisplayData(property);
            return (
              <div key={property.id} className={styles.propertyCard}>
                <div className={styles.imageContainer}>
                  <img
                    src="/api/placeholder/300/200"
                    alt={property.street_address}
                    className={styles.propertyImage}
                  />
                  <div className={styles.badges}>
                    {displayProperty.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`${styles.badge} ${
                          tag === "HOT DEAL"
                            ? styles.hotDeal
                            : tag === "Verified"
                            ? styles.verified
                            : styles.tour
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className={styles.favoriteBtn}>♡</button>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      {formatPrice(property.purchase_price)}
                    </span>
                    <span className={styles.aiScore}>
                      🤖 AI: {Math.floor(Math.random() * 20) + 80}
                    </span>
                  </div>

                  <div className={styles.details}>
                    <span>{property.bedrooms} 🛏️</span>
                    <span>{property.bathrooms} 🚿</span>
                    <span>{formatNumber(property.square_feet)} sqft</span>
                  </div>

                  <div className={styles.address}>
                    {property.street_address}
                    {property.unit_apt && ` ${property.unit_apt}`}
                  </div>
                  <div className={styles.location}>
                    {property.city}, {property.state} {property.zip_code}
                  </div>

                  <div className={styles.metrics}>
                    {displayProperty.profitPotential && (
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>
                          Profit Potential:
                        </span>
                        <span className={styles.metricValue}>
                          {displayProperty.profitPotential}
                        </span>
                      </div>
                    )}
                    {displayProperty.cashFlow && (
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>
                          💵 Cash Flow Term:
                        </span>
                        <span className={styles.metricValue}>
                          {displayProperty.cashFlow}
                        </span>
                      </div>
                    )}
                    {displayProperty.closeTime && (
                      <div className={styles.metric}>
                        <span className={styles.metricValue}>
                          {displayProperty.closeTime}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.actions}>
                    <button className={styles.viewDetailsBtn}>
                      View Details
                    </button>
                    <button className={styles.depositBtn}>💳 Deposit</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && properties.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span>
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} properties
            </span>
          </div>
          <div className={styles.paginationControls}>
            <button
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={!pagination.has_prev}
              className={styles.paginationBtn}
            >
              ← Previous
            </button>
            <span className={styles.pageInfo}>Page {pagination.page}</span>
            <button
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={!pagination.has_next}
              className={styles.paginationBtn}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

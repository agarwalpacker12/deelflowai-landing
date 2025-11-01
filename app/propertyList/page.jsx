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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

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
        console.log(response.data.data.properties);

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

  const handleViewDetails = (property) => {
    setSelectedProperty(getPropertyDisplayData(property));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
    setShowMap(false);
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
                    <button
                      className={styles.viewDetailsBtn}
                      onClick={() => handleViewDetails(property)}
                    >
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

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              ×
            </button>

            <div className={styles.modalBody}>
              {/* Left Column - Media Section */}
              <div className={styles.modalMediaSection}>
                <div className={styles.mediaContainer}>
                  <div className={styles.mediaHeader}>
                    <div className={styles.mediaNav}>
                      <button
                        className={`${styles.mediaTab} ${
                          !showMap ? styles.activeMediaTab : ""
                        }`}
                        onClick={() => setShowMap(false)}
                      >
                        <span className={styles.tabIcon}>📸</span>
                        <span>Photos</span>
                        <span className={styles.tabBadge}>12</span>
                      </button>
                      <button
                        className={`${styles.mediaTab} ${
                          showMap ? styles.activeMediaTab : ""
                        }`}
                        onClick={() => setShowMap(true)}
                      >
                        <span className={styles.tabIcon}>🗺️</span>
                        <span>Map View</span>
                      </button>
                    </div>
                    <div className={styles.viewToggle360}>
                      <button className={styles.view360Btn}>
                        <span>🔄</span> 360° Tour
                      </button>
                    </div>
                  </div>

                  <div className={styles.mediaContent}>
                    {!showMap ? (
                      <div className={styles.imageGallery}>
                        <div className={styles.mainImage}>
                          <img
                            src="/api/placeholder/600/400"
                            alt={selectedProperty.street_address}
                            className={styles.galleryMainImage}
                          />
                          <div className={styles.imageOverlay}>
                            <div className={styles.imageBadges}>
                              {selectedProperty.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className={`${styles.overlayBadge} ${
                                    tag === "HOT DEAL"
                                      ? styles.hotDealBadge
                                      : tag === "Verified"
                                      ? styles.verifiedBadge
                                      : styles.tourBadge
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className={styles.imageActions}>
                              <button className={styles.favoriteOverlayBtn}>
                                ♡
                              </button>
                              <button className={styles.shareBtn}>📤</button>
                            </div>
                          </div>
                        </div>
                        <div className={styles.thumbnailRow}>
                          {[1, 2, 3, 4].map((thumb, index) => (
                            <div key={index} className={styles.thumbnail}>
                              <img
                                src={`/api/placeholder/120/80`}
                                alt={`View ${thumb}`}
                              />
                              {index === 3 && (
                                <div className={styles.morePhotos}>+8</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.mapContainer}>
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ border: 0, borderRadius: "12px" }}
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                            `${selectedProperty.street_address}, ${selectedProperty.city}, ${selectedProperty.state} ${selectedProperty.zip_code}`
                          )}`}
                          title="Property Location Map"
                        ></iframe>
                        <div className={styles.mapOverlay}>
                          <button className={styles.walkScoreBtn}>
                            🚶 Walk Score: 85
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Property Information */}
              <div className={styles.modalInfoSection}>
                {/* Property Header */}
                <div className={styles.propertyHeader}>
                  <div className={styles.priceSection}>
                    <div className={styles.mainPrice}>
                      {formatPrice(selectedProperty.purchase_price)}
                    </div>
                    <div className={styles.priceSubtext}>
                      $
                      {Math.round(
                        selectedProperty.purchase_price /
                          selectedProperty.square_feet
                      )}
                      /sqft
                    </div>
                    <div className="flex ">
                      <div className={styles.statusSection}>
                        <div className={styles.aiScoreChip}>
                          <span className={styles.aiIcon}>🤖</span>
                          <div className={styles.scoreText}>
                            <span className={styles.scoreLabel}>AI Score</span>
                            <span className={styles.scoreValue}>
                              {Math.floor(Math.random() * 20) + 80}/100
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className={`${styles.statusChip} ${
                              selectedProperty.status === "active"
                                ? styles.statusActive
                                : styles.statusPending
                            }`}
                          >
                            {selectedProperty.status === "active"
                              ? "✅ Available"
                              : "⏸️ Pending"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Address */}
                <div className={styles.addressSection}>
                  <h2 className={styles.propertyAddress}>
                    {selectedProperty.street_address}
                    {selectedProperty.unit_apt &&
                      ` ${selectedProperty.unit_apt}`}
                  </h2>
                  <div className={styles.locationDetails}>
                    <span className={styles.cityState}>
                      {selectedProperty.city}, {selectedProperty.state}{" "}
                      {selectedProperty.zip_code}
                    </span>
                    {selectedProperty.county && (
                      <span className={styles.county}>
                        • {selectedProperty.county}
                      </span>
                    )}
                  </div>
                  <div className={styles.propertyMeta}>
                    <span>ID: {selectedProperty.source_id}</span>
                    <span>•</span>
                    <span>Source: {selectedProperty.source}</span>
                    <span>•</span>
                    <span>
                      Listed{" "}
                      {Math.floor(
                        (new Date() - new Date(selectedProperty.created_at)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </span>
                  </div>
                </div>

                {/* Property Details Grid */}
                <div className={styles.detailsGrid}>
                  <div className={styles.detailCard}>
                    <div className={styles.detailIcon}>🛏️</div>
                    <div className={styles.detailContent}>
                      <span className={styles.detailValue}>
                        {selectedProperty.bedrooms}
                      </span>
                      <span className={styles.detailLabel}>Bedrooms</span>
                    </div>
                  </div>
                  <div className={styles.detailCard}>
                    <div className={styles.detailIcon}>🛁</div>
                    <div className={styles.detailContent}>
                      <span className={styles.detailValue}>
                        {selectedProperty.bathrooms}
                      </span>
                      <span className={styles.detailLabel}>Bathrooms</span>
                    </div>
                  </div>
                  <div className={styles.detailCard}>
                    <div className={styles.detailIcon}>📐</div>
                    <div className={styles.detailContent}>
                      <span className={styles.detailValue}>
                        {formatNumber(selectedProperty.square_feet)}
                      </span>
                      <span className={styles.detailLabel}>Sq Ft</span>
                    </div>
                  </div>
                  <div className={styles.detailCard}>
                    <div className={styles.detailIcon}>🏠</div>
                    <div className={styles.detailContent}>
                      <span className={styles.detailValue}>
                        {selectedProperty.property_type?.replace("_", " ")}
                      </span>
                      <span className={styles.detailLabel}>Property Type</span>
                    </div>
                  </div>
                  {selectedProperty.lot_size && (
                    <div className={styles.detailCard}>
                      <div className={styles.detailIcon}>🌿</div>
                      <div className={styles.detailContent}>
                        <span className={styles.detailValue}>
                          {selectedProperty.lot_size}
                        </span>
                        <span className={styles.detailLabel}>Acres</span>
                      </div>
                    </div>
                  )}
                  {selectedProperty.year_built && (
                    <div className={styles.detailCard}>
                      <div className={styles.detailIcon}>📅</div>
                      <div className={styles.detailContent}>
                        <span className={styles.detailValue}>
                          {selectedProperty.year_built}
                        </span>
                        <span className={styles.detailLabel}>Year Built</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions Card */}
                <div className={styles.quickActionsCard}>
                  <div className={styles.propertyQuickStats}>
                    <span className={styles.quickStat}>Est. Profit: $45K</span>
                    <span className={styles.quickStat}>ROI: 22%</span>
                    <span className={styles.quickStat}>Cap Rate: 8.5%</span>
                  </div>

                  <button className={styles.depositEscrowBtn}>
                    🔒 Deposit Escrow
                  </button>

                  <button className={styles.makeOfferBtn}>Make Offer</button>

                  <button className={styles.aiAssistantBtn}>
                    🤖 AI Assistant
                  </button>
                </div>

                {/* Instant Funding Section */}
                <div className={styles.instantFundingSection}>
                  <h3 className={styles.fundingSectionTitle}>
                    Instant Funding
                  </h3>

                  <div className={styles.fundingCard}>
                    <div className={styles.fundingStats}>
                      <div className={styles.fundingStatItem}>
                        <span className={styles.fundingStatLabel}>
                          Funders Available
                        </span>
                        <span className={styles.fundingStatValue}>8</span>
                      </div>
                      <div className={styles.fundingStatItem}>
                        <span className={styles.fundingStatLabel}>
                          Best Rate
                        </span>
                        <span className={styles.fundingStatValue}>
                          8.5% + 2 pts
                        </span>
                      </div>
                    </div>

                    <button className={styles.getFundingQuotesBtn}>
                      Get Funding Quotes
                    </button>
                  </div>
                </div>

                {/* AI-Powered Agent Section */}
                <div className={styles.agentSection}>
                  <h3 className={styles.agentSectionTitle}>AI-Powered Agent</h3>

                  <div className={styles.agentCard}>
                    <div className={styles.agentInfo}>
                      <div className={styles.agentAvatar}>M</div>
                      <div className={styles.agentDetails}>
                        <div className={styles.agentName}>Mike Chen</div>
                        <div className={styles.agentRating}>⭐ 4.7 • 2 min</div>
                      </div>
                    </div>

                    <button className={styles.contactAgentBtn}>
                      Contact Agent
                    </button>

                    <button className={styles.scheduleTourBtn}>
                      Schedule Tour
                    </button>
                  </div>
                </div>

                {/* Investment Metrics */}
                <div className={styles.metricsSection}>
                  <h3 className={styles.sectionTitle}>Investment Analysis</h3>
                  <div className={styles.metricsGrid}>
                    <div className={styles.metricItem}>
                      <span className={styles.metricIcon}>💰</span>
                      <div className={styles.metricDetails}>
                        <span className={styles.metricLabel}>
                          Purchase Price
                        </span>
                        <span className={styles.metricValue}>
                          {formatPrice(selectedProperty.purchase_price)}
                        </span>
                      </div>
                    </div>
                    {selectedProperty.arv && (
                      <div className={styles.metricItem}>
                        <span className={styles.metricIcon}>📊</span>
                        <div className={styles.metricDetails}>
                          <span className={styles.metricLabel}>ARV</span>
                          <span className={styles.metricValue}>
                            {formatPrice(selectedProperty.arv)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className={styles.metricItem}>
                      <span className={styles.metricIcon}>💎</span>
                      <div className={styles.metricDetails}>
                        <span className={styles.metricLabel}>
                          Profit Potential
                        </span>
                        <span
                          className={`${styles.metricValue} ${styles.profitValue}`}
                        >
                          $
                          {Math.floor(
                            selectedProperty.purchase_price * 0.15
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricIcon}>⏱️</span>
                      <div className={styles.metricDetails}>
                        <span className={styles.metricLabel}>
                          Est. Close Time
                        </span>
                        <span className={styles.metricValue}>
                          {selectedProperty.status === "pending"
                            ? "24-48 hours"
                            : "3-5 days"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className={styles.timelineSection}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineIcon}>📅</span>
                    <div className={styles.timelineDetails}>
                      <span className={styles.timelineLabel}>Listed</span>
                      <span className={styles.timelineValue}>
                        {new Date(
                          selectedProperty.created_at
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineIcon}>🔄</span>
                    <div className={styles.timelineDetails}>
                      <span className={styles.timelineLabel}>Last Updated</span>
                      <span className={styles.timelineValue}>
                        {new Date(
                          selectedProperty.updated_at
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

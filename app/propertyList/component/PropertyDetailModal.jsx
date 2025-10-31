"use client";

import React, { useState, useEffect } from "react";
import {
  Bed,
  Bath,
  Square,
  Heart,
  Users,
  Play,
  Zap,
  Shield,
  Clock,
  Brain,
  Eye,
  Lock,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import styles from "../page.module.css";

const PropertyDetailModal = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAIChat, setShowAIChat] = useState(false);

  // Consistent number formatting to prevent hydration issues
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
                    <h3 className={styles.sectionTitle}>Wholesale Analysis</h3>

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
                      <h4 className={styles.cardTitle}>Transaction Details</h4>
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
                          <span className={styles.featureText}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "neighborhood" && (
                  <div className={styles.tabContent}>
                    <h3 className={styles.sectionTitle}>Neighborhood Stats</h3>
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
                      <span className={styles.fundingValue}>8.5% + 2 pts</span>
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
                  {property.wholesaleMetrics.estimatedCloseTime}. Would you like
                  to deposit escrow now?
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

export default PropertyDetailModal;

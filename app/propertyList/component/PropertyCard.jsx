"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import styles from "../page.module.css";

const PropertyCard = ({ property, setSelectedProperty, setUser }) => {
  const [saved, setSaved] = useState(false);

  // Consistent number formatting to prevent hydration issues
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
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
            className={`${styles.heartIcon} ${saved ? styles.heartSaved : ""}`}
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
export default PropertyCard;

"use client";

import React, { useState } from "react";
import styles from "../page.module.css";
import { Activity } from "lucide-react";

// Live Activity Feed Component
const LiveActivityFeed = ({ liveActivity }) => (
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

export default LiveActivityFeed;

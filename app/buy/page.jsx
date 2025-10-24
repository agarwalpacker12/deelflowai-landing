"use client";

import { useState, useEffect } from "react";

const BuyerForms = () => {
  const [activeForm, setActiveForm] = useState("none"); // 'seller', 'buyer', 'none'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Information
    name: "",
    email: "",
    phone: "",
    preferredContact: "phone",

    // Seller specific
    isOwner: "",
    isInvestor: "",

    // Property Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    condition: "",
    askingPrice: "",
    mortgageBalance: "",
    timeline: "",
    reasonForSelling: "",

    // Buyer specific
    investmentExperience: "",
    preferredAreas: "",
    budget: "",
    propertyTypes: [],
    investmentStrategy: "",
    financingType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)",
    },
    heroSection: {
      padding: "4rem 1rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    heroContent: {
      textAlign: "center",
      marginBottom: "4rem",
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1.5rem",
      lineHeight: "1.2",
    },
    highlight: {
      color: "#2563eb",
    },
    heroDescription: {
      fontSize: "1.25rem",
      color: "#6b7280",
      maxWidth: "800px",
      margin: "0 auto 2rem",
      lineHeight: "1.6",
    },
    formSelectionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "2rem",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    selectionCard: {
      background: "white",
      borderRadius: "1rem",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      padding: "2rem",
      transition: "all 0.3s ease",
      border: "1px solid #f3f4f6",
    },
    cardHeader: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    cardIcon: {
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
    },
    sellIcon: {
      background: "#dcfce7",
      color: "#16a34a",
    },
    buyIcon: {
      background: "#dbeafe",
      color: "#2563eb",
    },
    cardTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    cardSubtitle: {
      color: "#6b7280",
      fontSize: "1rem",
    },
    cardBenefits: {
      marginBottom: "2rem",
    },
    benefit: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
    },
    checkIcon: {
      color: "#16a34a",
      flexShrink: 0,
    },
    benefitText: {
      color: "#374151",
      fontSize: "0.95rem",
    },
    cardButton: {
      width: "100%",
      padding: "1rem 1.5rem",
      borderRadius: "0.75rem",
      fontWeight: "700",
      fontSize: "1.125rem",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    sellButton: {
      background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
    },
    buyButton: {
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    },
    trustIndicators: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "2rem",
      maxWidth: "800px",
      margin: "4rem auto 0",
      textAlign: "center",
    },
    trustItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
    },
    trustItemText: {
      fontSize: "0.875rem",
      color: "#6b7280",
      fontWeight: "500",
    },
    formContainer: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)",
      padding: "2rem 1rem",
    },
    formWrapper: {
      maxWidth: "800px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    formHeader: {
      background: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    formTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    formSubtitle: {
      color: "#6b7280",
      fontSize: "1rem",
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "#6b7280",
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      transition: "color 0.2s ease",
    },
    progressContainer: {
      background: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    progressStep: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#6b7280",
    },
    progressStepActive: {
      color: "#2563eb",
    },
    stepNumber: {
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #d1d5db",
      fontWeight: "600",
      fontSize: "0.875rem",
    },
    stepNumberActive: {
      background: "#2563eb",
      borderColor: "#2563eb",
      color: "white",
    },
    stepLabel: {
      fontWeight: "500",
      fontSize: "0.875rem",
    },
    progressLine: {
      width: "4rem",
      height: "2px",
      background: "#d1d5db",
      transition: "background 0.3s ease",
    },
    progressLineActive: {
      background: "#2563eb",
    },
    formContent: {
      background: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
    },
    step: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    stepTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    inputWrapper: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
      pointerEvents: "none",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    inputWithIcon: {
      paddingLeft: "2.5rem",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    radioGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginTop: "0.5rem",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.95rem",
      color: "#374151",
      cursor: "pointer",
    },
    checkboxGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "0.75rem",
      marginTop: "0.5rem",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "0.875rem",
    },
    sectionDivider: {
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e5e7eb",
    },
    transitionMessage: {
      background: "#eff6ff",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      marginTop: "2rem",
    },
    transitionText: {
      fontWeight: "500",
      color: "#1e40af",
      marginBottom: "0.5rem",
    },
    securityNote: {
      fontSize: "0.75rem",
      color: "#2563eb",
    },
    reviewSection: {
      background: "#f9fafb",
      padding: "1.5rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
    },
    reviewTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    reviewGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
    },
    reviewItem: {
      fontSize: "0.875rem",
      color: "#374151",
    },
    nextStepsSection: {
      background: "#eff6ff",
      padding: "1.5rem",
      borderRadius: "0.5rem",
    },
    nextStepsTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    nextStepsList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    nextStepItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      color: "#1e40af",
    },
    navigationButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e5e7eb",
    },
    prevButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      border: "1px solid #d1d5db",
      color: "#374151",
      background: "white",
      borderRadius: "0.5rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    nextButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 2rem",
      border: "none",
      color: "white",
      background: "#2563eb",
      borderRadius: "0.5rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginLeft: "auto",
    },
    nextButtonDisabled: {
      background: "#d1d5db",
      color: "#9ca3af",
      cursor: "not-allowed",
    },
    submitButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 2rem",
      border: "none",
      color: "white",
      background: "#16a34a",
      borderRadius: "0.5rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginLeft: "auto",
    },
    submitButtonSubmitting: {
      background: "#9ca3af",
      cursor: "not-allowed",
    },
    spinner: {
      width: "1rem",
      height: "1rem",
      border: "2px solid #ffffff",
      borderTop: "2px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    modalOverlay: {
      position: "fixed",
      inset: "0",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "50",
    },
    successModal: {
      background: "white",
      borderRadius: "1rem",
      padding: "2rem",
      maxWidth: "400px",
      margin: "1rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
    },
    successIcon: {
      width: "4rem",
      height: "4rem",
      background: "#dcfce7",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
      color: "#16a34a",
    },
    successTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    successMessage: {
      color: "#6b7280",
      marginBottom: "1.5rem",
      lineHeight: "1.5",
    },
    successButton: {
      width: "100%",
      background: "#2563eb",
      color: "white",
      padding: "0.75rem",
      border: "none",
      borderRadius: "0.5rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s ease",
    },
  };

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage?.getItem(`${activeForm}FormData`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [activeForm]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        `${activeForm}FormData`,
        JSON.stringify(updatedData)
      );
    }
  };

  const handleArrayChange = (field, value, checked) => {
    const currentArray = formData[field] || [];
    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);

    handleInputChange(field, updatedArray);
  };

  const validateStep = (step) => {
    if (activeForm === "seller") {
      switch (step) {
        case 1:
          return (
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.isOwner &&
            formData.isInvestor
          );
        case 2:
          return (
            formData.address &&
            formData.city &&
            formData.state &&
            formData.propertyType &&
            formData.bedrooms &&
            formData.bathrooms
          );
        default:
          return true;
      }
    } else if (activeForm === "buyer") {
      switch (step) {
        case 1:
          return (
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.investmentExperience
          );
        case 2:
          return (
            formData.budget &&
            formData.preferredAreas &&
            formData.propertyTypes.length > 0
          );
        default:
          return true;
      }
    }
    return false;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      const leadData = {
        ...formData,
        leadType: activeForm,
        source: "website_form",
        status: "new",
        aiScore: null,
        submittedAt: new Date().toISOString(),
      };

      // API call would go here
      console.log("Submitting lead:", leadData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(`${activeForm}FormData`);
      }
      setFormData({});
      setShowSuccessModal(true);
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startForm = (type) => {
    setActiveForm(type);
    setCurrentStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredContact: "phone",
      isOwner: "",
      isInvestor: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      yearBuilt: "",
      condition: "",
      askingPrice: "",
      mortgageBalance: "",
      timeline: "",
      reasonForSelling: "",
      investmentExperience: "",
      preferredAreas: "",
      budget: "",
      propertyTypes: [],
      investmentStrategy: "",
      financingType: "",
    });
  };

  const resetForm = () => {
    setActiveForm("none");
    setCurrentStep(1);
    setFormData({});
  };

  if (activeForm === "none") {
    return (
      <div style={styles.container}>
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              {/* Get Your Property <span style={styles.highlight}>Evaluated</span>{" "}
              Today */}
              Join our Expanding List of Buyers and Receive the{" "}
              <span style={styles.highlight}> Best Value</span> in the Next
              Purchase
            </h1>
            <p style={styles.heroDescription}>
              Whether you're looking to sell quickly or find your next
              investment property, our AI-powered platform connects motivated
              sellers with qualified investors in real-time.
            </p>
          </div>

          <div style={styles.formSelectionGrid}>
            {/* Sell Your House Card */}

            {/* Find Investment Properties Card */}
            <div style={styles.selectionCard}>
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIcon, ...styles.buyIcon }}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                  </svg>
                </div>
                <h2 style={styles.cardTitle}>Find Properties</h2>
                <p style={styles.cardSubtitle}>
                  Discover profitable investment opportunities
                </p>
              </div>

              <div style={styles.cardBenefits}>
                <div style={styles.benefit}>
                  <svg
                    style={styles.checkIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <span style={styles.benefitText}>
                    AI-curated investment deals
                  </span>
                </div>
                <div style={styles.benefit}>
                  <svg
                    style={styles.checkIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <span style={styles.benefitText}>
                    Below-market properties
                  </span>
                </div>
                <div style={styles.benefit}>
                  <svg
                    style={styles.checkIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <span style={styles.benefitText}>
                    Instant profit analysis
                  </span>
                </div>
                <div style={styles.benefit}>
                  <svg
                    style={styles.checkIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <span style={styles.benefitText}>
                    Blockchain-secured transactions
                  </span>
                </div>
              </div>

              <button
                onClick={() => startForm("buyer")}
                style={{ ...styles.cardButton, ...styles.buyButton }}
              >
                Find Properties
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div style={styles.trustIndicators}>
            <div style={styles.trustItem}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#2563eb" }}
              >
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                <path d="M13 12h3" />
                <path d="M11 12H8" />
              </svg>
              <p style={styles.trustItemText}>Secure & Private</p>
            </div>
            <div style={styles.trustItem}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#16a34a" }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <p style={styles.trustItemText}>24hr Response</p>
            </div>
            <div style={styles.trustItem}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#7c3aed" }}
              >
                <polygon points="12,2 15,8.5 22,9.5 17,14.5 18,21.5 12,18.5 6,21.5 7,14.5 2,9.5 9,8.5" />
              </svg>
              <p style={styles.trustItemText}>A+ Rated</p>
            </div>
            <div style={styles.trustItem}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "#f59e0b" }}
              >
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
              </svg>
              <p style={styles.trustItemText}>AI Powered</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.formContainer}>
      <div style={styles.formWrapper}>
        {/* Header */}
        <div style={styles.formHeader}>
          <div>
            <h1 style={styles.formTitle}>
              {activeForm === "seller"
                ? "Submit Your Property for a Quick Evaluation"
                : "Find Your Next Investment Property"}
            </h1>
          </div>
          <button onClick={resetForm} style={styles.closeButton}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div style={styles.progressContainer}>
          <div
            style={
              currentStep >= 1
                ? { ...styles.progressStep, ...styles.progressStepActive }
                : styles.progressStep
            }
          >
            <div
              style={
                currentStep >= 1
                  ? { ...styles.stepNumber, ...styles.stepNumberActive }
                  : styles.stepNumber
              }
            >
              1
            </div>
            <span style={styles.stepLabel}>Contact Information</span>
          </div>
          <div
            style={
              currentStep >= 2
                ? { ...styles.progressLine, ...styles.progressLineActive }
                : styles.progressLine
            }
          ></div>
          <div
            style={
              currentStep >= 2
                ? { ...styles.progressStep, ...styles.progressStepActive }
                : styles.progressStep
            }
          >
            <div
              style={
                currentStep >= 2
                  ? { ...styles.stepNumber, ...styles.stepNumberActive }
                  : styles.stepNumber
              }
            >
              2
            </div>
            <span style={styles.stepLabel}>
              {activeForm === "seller"
                ? "Property Details"
                : "Investment Preferences"}
            </span>
          </div>
          <div
            style={
              currentStep >= 3
                ? { ...styles.progressLine, ...styles.progressLineActive }
                : styles.progressLine
            }
          ></div>
          <div
            style={
              currentStep >= 3
                ? { ...styles.progressStep, ...styles.progressStepActive }
                : styles.progressStep
            }
          >
            <div
              style={
                currentStep >= 3
                  ? { ...styles.stepNumber, ...styles.stepNumberActive }
                  : styles.stepNumber
              }
            >
              3
            </div>
            <span style={styles.stepLabel}>Review & Submit</span>
          </div>
        </div>

        {/* Form Content */}
        <div style={styles.formContent}>
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div style={styles.step}>
              <h2 style={styles.stepTitle}>
                Please share your contact information
              </h2>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <div style={styles.inputWrapper}>
                    <svg
                      style={styles.inputIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      style={{ ...styles.input, ...styles.inputWithIcon }}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <div style={styles.inputWrapper}>
                    <svg
                      style={styles.inputIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      style={{ ...styles.input, ...styles.inputWithIcon }}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <div style={styles.inputWrapper}>
                    <svg
                      style={styles.inputIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      style={{ ...styles.input, ...styles.inputWithIcon }}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Preferred Contact Method</label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) =>
                      handleInputChange("preferredContact", e.target.value)
                    }
                    style={styles.select}
                  >
                    <option value="phone">Phone Call</option>
                    <option value="email">Email</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
              </div>

              {/* Seller-specific questions */}
              {activeForm === "seller" && (
                <div style={styles.sectionDivider}>
                  <div style={styles.formGrid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>
                        Are you the owner of the property? *
                      </label>
                      <div style={styles.radioGroup}>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="isOwner"
                            value="yes"
                            checked={formData.isOwner === "yes"}
                            onChange={(e) =>
                              handleInputChange("isOwner", e.target.value)
                            }
                          />
                          Yes, I own the property
                        </label>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="isOwner"
                            value="no"
                            checked={formData.isOwner === "no"}
                            onChange={(e) =>
                              handleInputChange("isOwner", e.target.value)
                            }
                          />
                          No, I'm representing the owner
                        </label>
                      </div>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Are you an investor? *</label>
                      <div style={styles.radioGroup}>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="isInvestor"
                            value="yes"
                            checked={formData.isInvestor === "yes"}
                            onChange={(e) =>
                              handleInputChange("isInvestor", e.target.value)
                            }
                          />
                          Yes, I'm an investor
                        </label>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="isInvestor"
                            value="no"
                            checked={formData.isInvestor === "no"}
                            onChange={(e) =>
                              handleInputChange("isInvestor", e.target.value)
                            }
                          />
                          No, I'm a homeowner
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Buyer-specific questions */}
              {activeForm === "buyer" && (
                <div style={styles.sectionDivider}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Investment Experience *</label>
                    <select
                      value={formData.investmentExperience}
                      onChange={(e) =>
                        handleInputChange(
                          "investmentExperience",
                          e.target.value
                        )
                      }
                      style={styles.select}
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">
                        New to Real Estate Investing
                      </option>
                      <option value="some">Some Experience (1-5 deals)</option>
                      <option value="experienced">
                        Experienced (5+ deals)
                      </option>
                      <option value="professional">
                        Professional Investor
                      </option>
                    </select>
                  </div>
                </div>
              )}

              <div style={styles.transitionMessage}>
                <p style={styles.transitionText}>
                  Now that we have covered this bit, let's move on to tell us
                  about your{" "}
                  {activeForm === "seller"
                    ? "property"
                    : "investment preferences"}
                  :
                </p>
                <p style={styles.securityNote}>
                  All information is kept strictly confidential and secure.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Investment Preferences (Buyer) */}
          {currentStep === 2 && activeForm === "buyer" && (
            <div style={styles.step}>
              <h2 style={styles.stepTitle}>
                Tell us about your investment preferences
              </h2>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Investment Budget *</label>
                  <div style={styles.inputWrapper}>
                    <svg
                      style={styles.inputIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      style={{ ...styles.select, ...styles.inputWithIcon }}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-200k">$100K - $200K</option>
                      <option value="200k-300k">$200K - $300K</option>
                      <option value="300k-500k">$300K - $500K</option>
                      <option value="500k+">$500K+</option>
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Preferred Investment Areas *
                  </label>
                  <input
                    type="text"
                    value={formData.preferredAreas}
                    onChange={(e) =>
                      handleInputChange("preferredAreas", e.target.value)
                    }
                    style={styles.input}
                    placeholder="Dallas, Austin, Houston"
                  />
                </div>

                <div style={{ ...styles.inputGroup, ...styles.fullWidth }}>
                  <label style={styles.label}>
                    Property Types of Interest * (Select all that apply)
                  </label>
                  <div style={styles.checkboxGrid}>
                    {[
                      "Single Family Homes",
                      "Multi-Family Properties",
                      "Townhouses",
                      "Condominiums",
                      "Commercial Properties",
                      "Fix & Flip Opportunities",
                    ].map((type) => (
                      <label key={type} style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.propertyTypes.includes(type)}
                          onChange={(e) =>
                            handleArrayChange(
                              "propertyTypes",
                              type,
                              e.target.checked
                            )
                          }
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Investment Strategy</label>
                  <select
                    value={formData.investmentStrategy}
                    onChange={(e) =>
                      handleInputChange("investmentStrategy", e.target.value)
                    }
                    style={styles.select}
                  >
                    <option value="">Select Strategy</option>
                    <option value="flip">Fix & Flip</option>
                    <option value="rental">Buy & Hold Rental</option>
                    <option value="wholesale">Wholesaling</option>
                    <option value="brrrr">BRRRR Strategy</option>
                    <option value="commercial">Commercial Investment</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Financing Type</label>
                  <select
                    value={formData.financingType}
                    onChange={(e) =>
                      handleInputChange("financingType", e.target.value)
                    }
                    style={styles.select}
                  >
                    <option value="">Select Financing</option>
                    <option value="cash">Cash Purchase</option>
                    <option value="conventional">Conventional Loan</option>
                    <option value="hard-money">Hard Money Loan</option>
                    <option value="portfolio">Portfolio Lender</option>
                    <option value="seller-financing">Seller Financing</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div style={styles.step}>
              <h2 style={styles.stepTitle}>Review Your Information</h2>

              <div style={styles.reviewSection}>
                <h3 style={styles.reviewTitle}>Contact Information</h3>
                <div style={styles.reviewGrid}>
                  <p style={styles.reviewItem}>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p style={styles.reviewItem}>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p style={styles.reviewItem}>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p style={styles.reviewItem}>
                    <strong>Preferred Contact:</strong>{" "}
                    {formData.preferredContact}
                  </p>
                </div>

                {activeForm === "seller" && (
                  <>
                    <h3 style={styles.reviewTitle}>Property Information</h3>
                    <div style={styles.reviewGrid}>
                      <p style={styles.reviewItem}>
                        <strong>Address:</strong> {formData.address},{" "}
                        {formData.city}, {formData.state}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Property Type:</strong> {formData.propertyType}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Bedrooms:</strong> {formData.bedrooms}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Bathrooms:</strong> {formData.bathrooms}
                      </p>
                      {formData.squareFeet && (
                        <p style={styles.reviewItem}>
                          <strong>Square Feet:</strong> {formData.squareFeet}
                        </p>
                      )}
                      {formData.timeline && (
                        <p style={styles.reviewItem}>
                          <strong>Timeline:</strong> {formData.timeline}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {activeForm === "buyer" && (
                  <>
                    <h3 style={styles.reviewTitle}>Investment Preferences</h3>
                    <div style={styles.reviewGrid}>
                      <p style={styles.reviewItem}>
                        <strong>Budget:</strong> {formData.budget}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Preferred Areas:</strong>{" "}
                        {formData.preferredAreas}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Property Types:</strong>{" "}
                        {formData.propertyTypes.join(", ")}
                      </p>
                      <p style={styles.reviewItem}>
                        <strong>Investment Experience:</strong>{" "}
                        {formData.investmentExperience}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div style={styles.nextStepsSection}>
                <h3 style={styles.nextStepsTitle}>What Happens Next?</h3>
                <div style={styles.nextStepsList}>
                  <div style={styles.nextStepItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                    <span>
                      Our AI will analyze your submission within 24 hours
                    </span>
                  </div>
                  <div style={styles.nextStepItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                    <span>
                      You'll receive a detailed evaluation via your preferred
                      contact method
                    </span>
                  </div>
                  <div style={styles.nextStepItem}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                    <span>
                      {activeForm === "seller"
                        ? "We'll present you with a fair cash offer if your property qualifies"
                        : "We'll send you curated investment opportunities matching your criteria"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={styles.navigationButtons}>
            {currentStep > 1 && (
              <button onClick={prevStep} style={styles.prevButton}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12,19 5,12 12,5" />
                </svg>
                Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                style={
                  !validateStep(currentStep)
                    ? { ...styles.nextButton, ...styles.nextButtonDisabled }
                    : styles.nextButton
                }
              >
                Next Step
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </button>
            ) : (
              <button
                onClick={submitForm}
                disabled={isSubmitting}
                style={
                  isSubmitting
                    ? {
                        ...styles.submitButton,
                        ...styles.submitButtonSubmitting,
                      }
                    : styles.submitButton
                }
              >
                {isSubmitting ? (
                  <>
                    <div style={styles.spinner}></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit My Information
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.successModal}>
            <div style={styles.successIcon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <h3 style={styles.successTitle}>Thank You!</h3>
            <p style={styles.successMessage}>
              Your{" "}
              {activeForm === "seller" ? "property" : "investment preferences"}{" "}
              information has been submitted successfully. Our AI is already
              analyzing your submission and you'll receive a detailed evaluation
              within 24 hours.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                resetForm();
              }}
              style={styles.successButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerForms;

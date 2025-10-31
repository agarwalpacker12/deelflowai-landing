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

const MortgageCalculatorView = ({
  mortgageCalculator,
  setMortgageCalculator,
}) => {
  // Consistent number formatting to prevent hydration issues
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

export default MortgageCalculatorView;

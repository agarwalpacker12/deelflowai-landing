"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError, selectAuth } from "../store/slices/authSlice";
import LoadingSpinner from "../component/UI/LoadingSpinner";
import Header from "../component/hero/Header";
import Navbar from "../component/hero/Navbar";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [orgLoading, setOrgLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, router, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        setOrgLoading(true);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setOrgLoading(false);
    }
  };

  return (
    <>
      {/* Header and Navbar from home page */}
      <Header />
      <Navbar />

      {/* Login Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding & Info */}
              <div className="hidden lg:block">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                      Welcome Back to{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        DeelFlow AI
                      </span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      Sign in to continue generating $50K+ monthly with
                      AI-powered real estate wholesaling
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          AI-Powered Analysis
                        </h3>
                        <p className="text-gray-600">
                          Instant property valuations and market insights
                          powered by advanced AI
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          Blockchain Security
                        </h3>
                        <p className="text-gray-600">
                          Secure transactions with cutting-edge blockchain
                          technology
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          24/7 Automation
                        </h3>
                        <p className="text-gray-600">
                          Your AI assistant works around the clock to find deals
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        2.3K+
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Active Users
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        $50K+
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Avg Monthly
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        94%
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 lg:p-10">
                  <div className="mb-8">
                    <div
                      className="flex items-center justify-center"
                      style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Sign In
                      </h2>
                    </div>

                    <div
                      className="flex items-center justify-center"
                      style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                    >
                      <p className="text-gray-600">
                        Welcome back! Please enter your details.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="you@example.com"
                        style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                      />

                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-700 mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                          //   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pr-12"
                          placeholder="Enter your password"
                          style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      {formErrors.password && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {formErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div
                        className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2"
                        style={{ marginTop: "10px" }}
                      >
                        <span className="text-red-500 mt-0.5">⚠</span>
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{ padding: "0.75rem 1rem", marginTop: "1rem" }} // py-3 px-4
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={loading || orgLoading}
                    >
                      {loading || orgLoading ? (
                        <>
                          <LoadingSpinner />
                          <span className="text-white">
                            {loading ? "Signing in..." : "Loading..."}
                          </span>
                        </>
                      ) : (
                        <span className="text-white">Sign in</span>
                      )}
                    </button>
                  </form>

                  {/* Sign Up Link */}
                  <p
                    className="text-center text-gray-600 "
                    style={{ marginTop: "10px" }}
                  >
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Sign up for free
                    </Link>
                  </p>
                  <div
                    className="flex items-center justify-center"
                    style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                  >
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Forgot password?
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;

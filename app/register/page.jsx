"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import Header from "../component/hero/Header";
import Navbar from "../component/hero/Navbar";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  organization: yup.object().shape({
    name: yup.string().required("Organization name is required"),
    subscription_status: yup
      .string()
      .required("Subscription status is required"),
  }),
});

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      role: "superadmin",
      level: 1,
      points: 0,
      is_verified: false,
      is_active: true,
      stripe_customer_id: "",
      password: "",
      organization: {
        name: "",
        slug: "",
        subscription_status: "new",
      },
    },
  });

  const onSubmit = async (data) => {
    const createSlug = (name) => {
      return name.replace(/\s+/g, "_");
    };

    const submitData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      role: "staff",
      is_verified: false,
      is_active: true,
      password: data.password,
      organization: {
        name: data.organization.name,
        slug: createSlug(data.organization.name),
        subscription_status: "new",
      },
    };

    setLoading(true);
    setServerError(null);
    try {
      const response = await authAPI.register(submitData);
      console.log("Registration response:", response);

      // Check if registration was successful
      if (response.data.status === "success") {
        // Redirect to login page
        router.push("/login");
      } else {
        setServerError(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      setServerError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header and Navbar from home page */}
      <Header />
      <Navbar />

      {/* Register Section */}
      <section
        className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
        style={{ padding: "2%" }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding & Info */}
              <div className="hidden lg:block">
                <div className="space-y-8">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                      Join{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        DeelFlow AI
                      </span>
                    </h1>
                    <p className="text-xl text-gray-600">
                      Start generating $50K+ monthly with AI-powered real estate
                      wholesaling
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          Get Started in Minutes
                        </h3>
                        <p className="text-gray-600">
                          Quick setup with AI guidance to get you closing deals
                          fast
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          7-Day Free Trial
                        </h3>
                        <p className="text-gray-600">
                          Try all features risk-free with no credit card
                          required
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
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          Expert Support
                        </h3>
                        <p className="text-gray-600">
                          Dedicated support team to help you succeed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          No credit card required
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Cancel anytime
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 lg:p-10 ">
                  {/* max-h-[80vh] overflow-y-auto */}

                  <div className="mb-8">
                    <div
                      className="flex items-center justify-center"
                      //   style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                      </h2>
                    </div>

                    {/* <div
                      className="flex items-center justify-center"
                      style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                    >
                      <p className="text-gray-600">
                        Get started with your free trial today
                      </p>
                    </div> */}
                  </div>

                  <form
                    className="space-y-5"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          {...register("first_name")}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                          placeholder="First name"
                          autoComplete="given-name"
                          style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                        />
                        {errors.first_name && (
                          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <span>⚠</span> {errors.first_name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...register("last_name")}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                          placeholder="Last name"
                          autoComplete="family-name"
                          style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                        />
                        {errors.last_name && (
                          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <span>⚠</span> {errors.last_name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Organization Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        {...register("organization.name")}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="Your company name"
                        autoComplete="organization"
                        style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                      />
                      {errors.organization?.name && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {errors.organization.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="you@example.com"
                        autoComplete="email"
                        style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                        style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none pr-12"
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          style={{ padding: "0.75rem 1rem" }} // py-3 px-4
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <span>⚠</span> {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <div
                        className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2"
                        style={{ marginTop: "10px" }}
                      >
                        <span className="text-red-500 mt-0.5">⚠</span>
                        <p className="text-red-700 text-sm">{serverError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{ padding: "0.75rem 1rem", marginTop: "1rem" }} // py-3 px-4
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    {/* Terms */}
                    <p
                      className="text-xs text-gray-500 text-center"
                      style={{ marginTop: "1rem" }}
                    >
                      By creating an account, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;

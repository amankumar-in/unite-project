"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Mock ticket data - this would come from Strapi CMS in production
const tickets = [
  {
    id: "full-pass",
    name: "Full Event Pass",
    price: 350,
    currency: "USD",
    description:
      "Complete access to all events, workshops, and networking sessions for all three days.",
  },
  {
    id: "business-pass",
    name: "Business Pass",
    price: 250,
    currency: "USD",
    description:
      "Focused on business connections and investment opportunities.",
  },
  {
    id: "expo-pass",
    name: "Expo Only Pass",
    price: 100,
    currency: "USD",
    description:
      "Access to the exhibition area to meet businesses and view investment projects.",
  },
  {
    id: "vip-pass",
    name: "VIP Pass",
    price: 500,
    currency: "USD",
    description:
      "Premium experience with exclusive access to VIP events and high-level networking.",
  },
];

export default function TicketPurchasePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    country: "",
    phoneNumber: "",
    dietaryRequirements: "",
    specialRequirements: "",
    agreeTerms: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState({});

  // Find the selected ticket based on URL parameter
  useEffect(() => {
    const ticketType = searchParams.get("type");
    if (ticketType) {
      const ticket = tickets.find((t) => t.id === ticketType);
      if (ticket) {
        setSelectedTicket(ticket);
      } else {
        // If invalid ticket ID, redirect back to tickets page
        router.push("/tickets");
      }
    }
  }, [searchParams, router]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle quantity changes
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return selectedTicket ? selectedTicket.price * quantity : 0;
  };

  // Validate the current step
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.company) newErrors.company = "Company is required";
      if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "Phone number is required";
    }

    if (currentStep === 3) {
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate API call to payment gateway
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 2000);
  };

  // Render the step indicator
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep >= 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            1
          </div>
          <div
            className={`h-1 w-16 ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep >= 2
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
          <div
            className={`h-1 w-16 ${
              currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center ${
              currentStep >= 3
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>
    );
  };

  // Render selected ticket details
  const renderTicketDetails = () => {
    if (!selectedTicket) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Selection</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="font-bold text-gray-800">{selectedTicket.name}</p>
            <p className="text-gray-600">{selectedTicket.description}</p>
          </div>
          <div className="mt-4 md:mt-0 font-bold text-gray-800">
            ${selectedTicket.price} {selectedTicket.currency}
          </div>
        </div>
      </div>
    );
  };

  // Render step 1: Select ticket quantity
  const renderStep1 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Select Quantity
        </h2>

        {renderTicketDetails()}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <label htmlFor="quantity" className="font-bold text-gray-800">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
              >
                -
              </button>
              <span className="bg-white text-gray-800 font-bold py-2 px-4 border-t border-b border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">Total:</span>
            <span className="font-bold text-xl text-gray-800">
              ${calculateTotal()} {selectedTicket?.currency}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render step 2: Attendee information
  const renderStep2 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Attendee Information
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-6">
            Please provide the details of the primary attendee. For multiple
            tickets, you will receive instructions to add additional attendee
            information after purchase.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-gray-700 font-medium mb-2"
              >
                Company/Organization *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="block text-gray-700 font-medium mb-2"
              >
                Job Title *
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.jobTitle ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-2"
              >
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="dietaryRequirements"
              className="block text-gray-700 font-medium mb-2"
            >
              Dietary Requirements (if any)
            </label>
            <input
              type="text"
              id="dietaryRequirements"
              name="dietaryRequirements"
              value={formData.dietaryRequirements}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g., Vegetarian, Gluten-free, etc."
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="specialRequirements"
              className="block text-gray-700 font-medium mb-2"
            >
              Special Requirements (if any)
            </label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any accessibility needs or other special requirements"
            />
          </div>
        </div>
      </div>
    );
  };

  // Render step 3: Payment
  const renderStep3 = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">
                {selectedTicket?.name} x {quantity}
              </span>
              <span className="text-gray-800">
                ${selectedTicket?.price * quantity}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>
              ${calculateTotal()} {selectedTicket?.currency}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Payment Method
          </h3>

          <p className="text-gray-600 mb-6">
            For demo purposes, we're simulating the payment process. In a
            production environment, this would integrate with a payment gateway
            like Pesapal.
          </p>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-gray-600 font-medium">
              Supported Payment Methods:
            </span>
            <div className="flex space-x-2">
              <div className="bg-gray-100 rounded px-2 py-1 text-gray-700 text-sm">
                Visa
              </div>
              <div className="bg-gray-100 rounded px-2 py-1 text-gray-700 text-sm">
                Mastercard
              </div>
              <div className="bg-gray-100 rounded px-2 py-1 text-gray-700 text-sm">
                Mobile Money
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 mr-2"
              />
              <span className="text-gray-600 text-sm">
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="text-blue-600 hover:underline"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                of UNITE 2025. I understand that my personal information will be
                processed as described in the Privacy Policy.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render confirmation page after successful purchase
  const renderConfirmation = () => {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 text-green-800 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Your payment has been processed successfully. You will receive a
          confirmation email with your e-ticket shortly.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Order Details
          </h3>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Ticket Type:</span>
            <span className="text-gray-800 font-medium">
              {selectedTicket?.name}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Quantity:</span>
            <span className="text-gray-800 font-medium">{quantity}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total:</span>
            <span className="text-gray-800 font-medium">
              ${calculateTotal()} {selectedTicket?.currency}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="text-gray-800 font-medium">
              UNT-{Math.floor(Math.random() * 10000)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          If you have any questions about your order or need assistance, please
          don't hesitate to contact our support team.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Return to Homepage
          </Link>

          <Link
            href="/events"
            className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold border border-gray-300 py-3 px-6 rounded-lg transition duration-300"
          >
            View Event Schedule
          </Link>
        </div>
      </div>
    );
  };

  // Render the current step
  const renderCurrentStep = () => {
    if (isComplete) {
      return renderConfirmation();
    }

    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  // If no ticket is selected and not on confirmation page, show loading until redirected
  if (!selectedTicket && !isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Purchase Tickets
          </h1>
          <p className="text-xl">UNITE 2025 - August 15-17, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!isComplete && renderStepIndicator()}

            {renderCurrentStep()}

            {!isComplete && (
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Back
                  </button>
                ) : (
                  <Link
                    href="/tickets"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Cancel
                  </Link>
                )}

                <button
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>{currentStep < 3 ? "Continue" : "Complete Purchase"}</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

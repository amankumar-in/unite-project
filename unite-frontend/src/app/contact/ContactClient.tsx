"use client";

import { useState } from "react";
import Link from "next/link";

// Form initial state
const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
  inquiryType: "general",
  agreeTerms: false,
};

export default function ContactClient() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(initialFormState);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with the UNITE 2025 team
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Contact Information
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            Phone
                          </h3>
                          <p className="text-gray-600">+256 700 123 456</p>
                          <p className="text-gray-600">+256 312 345 678</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            Email
                          </h3>
                          <p className="text-gray-600">info@uniteexpo.ug</p>
                          <p className="text-gray-600">support@uniteexpo.ug</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            Address
                          </h3>
                          <address className="not-italic text-gray-600">
                            <p>Uganda Investment Authority</p>
                            <p>Plot 22B, Lumumba Avenue</p>
                            <p>Kampala, Uganda</p>
                          </address>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Social Media
                    </h2>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href="#"
                        className="bg-[#1da1f2] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                        aria-label="Twitter"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        className="bg-[#0077b5] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                        aria-label="LinkedIn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        className="bg-[#3b5998] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                        aria-label="Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        className="bg-[#c13584] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                        aria-label="Instagram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>

                      <a
                        href="#"
                        className="bg-[#ff0000] text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90"
                        aria-label="YouTube"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Office Hours
                    </h2>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday:</span>
                        <span className="text-gray-800 font-medium">
                          8:30 AM - 5:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday:</span>
                        <span className="text-gray-800 font-medium">
                          9:00 AM - 1:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday:</span>
                        <span className="text-gray-800 font-medium">
                          Closed
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600 mr-3 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-600 text-sm">
                          Please note that our office hours may be different
                          during public holidays. It's always best to call ahead
                          if you're planning to visit us in person.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                {isSubmitted ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
                      Message Sent Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. A member of our team will get
                      back to you shortly, usually within 24-48 business hours.
                    </p>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Send Us a Message
                      </h2>

                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label
                              htmlFor="fullName"
                              className="block text-gray-700 font-medium mb-2"
                            >
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border ${
                                errors.fullName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              placeholder="Your full name"
                            />
                            {errors.fullName && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.fullName}
                              </p>
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
                                errors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              placeholder="your.email@example.com"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-gray-700 font-medium mb-2"
                            >
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="+256 7XX XXX XXX"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="organization"
                              className="block text-gray-700 font-medium mb-2"
                            >
                              Organization/Company (Optional)
                            </label>
                            <input
                              type="text"
                              id="organization"
                              name="organization"
                              value={formData.organization}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Your organization name"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="inquiryType"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Inquiry Type
                          </label>
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="exhibitor">
                              Exhibitor Information
                            </option>
                            <option value="sponsor">
                              Sponsorship Opportunities
                            </option>
                            <option value="speaker">Speaker Inquiry</option>
                            <option value="media">Media/Press</option>
                            <option value="tickets">
                              Tickets & Registration
                            </option>
                          </select>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="subject"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Subject *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border ${
                              errors.subject
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="What is your message about?"
                          />
                          {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.subject}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="message"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            className={`w-full px-4 py-2 border ${
                              errors.message
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Please provide details about your inquiry..."
                          ></textarea>
                          {errors.message && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
                              onChange={handleInputChange}
                              className="mt-1 mr-2"
                            />
                            <span className="text-gray-600 text-sm">
                              I agree that my submitted data is being collected
                              and stored. For more information, please refer to
                              our{" "}
                              <Link
                                href="/privacy-policy"
                                className="text-blue-600 hover:underline"
                              >
                                Privacy Policy
                              </Link>
                              .
                            </span>
                          </label>
                          {errors.agreeTerms && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.agreeTerms}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center w-full md:w-auto"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* FAQ */}
                <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                      <details className="border border-gray-200 rounded-lg overflow-hidden">
                        <summary className="px-6 py-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-50">
                          How can I register for UNITE 2025?
                        </summary>
                        <div className="px-6 py-4 border-t border-gray-200">
                          <p className="text-gray-600">
                            You can register for UNITE 2025 through our website
                            by visiting the Tickets page. There, you can select
                            your preferred ticket type and complete the
                            registration process online.
                          </p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg overflow-hidden">
                        <summary className="px-6 py-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-50">
                          How can my company exhibit at UNITE 2025?
                        </summary>
                        <div className="px-6 py-4 border-t border-gray-200">
                          <p className="text-gray-600">
                            To exhibit at UNITE 2025, please contact our
                            exhibitions team through this contact form (select
                            "Exhibitor Information" as the inquiry type) or
                            email us directly at exhibitors@uniteexpo.ug. We'll
                            provide you with information on available booth
                            options, pricing, and the application process.
                          </p>
                        </div>
                      </details>

                      <details className="border border-gray-200 rounded-lg overflow-hidden">
                        <summary className="px-6 py-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-50">
                          How can I become a speaker at UNITE 2025?
                        </summary>
                        <div className="px-6 py-4 border-t border-gray-200">
                          <p className="text-gray-600">
                            If you're interested in speaking at UNITE 2025,
                            please submit your proposal through this contact
                            form (select "Speaker Inquiry" as the inquiry type)
                            or email us at speakers@uniteexpo.ug. Please include
                            information about your expertise, proposed topic,
                            and relevant experience in your message.
                          </p>
                        </div>
                      </details>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        href="/about/faq"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        View All FAQs
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

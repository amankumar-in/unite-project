"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface FAQCategory {
  id: number;
  Name: string;
  identifier: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface FAQ {
  id: number;
  Question: string;
  Answer: string;
  Category: FAQCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function FAQPage() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch FAQ categories
        const categoriesResponse = await fetchAPI("/faq-categories");
        console.log("Categories response:", categoriesResponse);

        if (categoriesResponse && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
          // Set the first category as active if available
          if (categoriesResponse.data.length > 0) {
            setActiveCategory(categoriesResponse.data[0].identifier);
          }
        }

        // Fetch FAQs with category relations
        const faqsResponse = await fetchAPI("/faqs?populate=*");
        console.log("FAQs response:", faqsResponse);

        if (faqsResponse && faqsResponse.data) {
          setFaqs(faqsResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching FAQ data:", err);
        setError("Failed to load FAQ data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (faqId: number) => {
    if (openFaqs.includes(faqId)) {
      setOpenFaqs(openFaqs.filter((id) => id !== faqId));
    } else {
      setOpenFaqs([...openFaqs, faqId]);
    }
  };

  const getFilteredFaqs = () => {
    if (!activeCategory) return [];

    return faqs.filter((faq) => {
      if (faq.Category) {
        return faq.Category.identifier === activeCategory;
      }
      return false;
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Everything you need to know about UNITE Expo 2025
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="text-green-200 hover:text-white inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to About
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading FAQs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <svg
                  className="w-8 h-8 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-gray-900">
                Error Loading FAQs
              </p>
              <p className="mt-2 text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Category Navigation */}
              <div className="lg:col-span-3">
                <div className="sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    FAQ Categories
                  </h2>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.identifier)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          activeCategory === category.identifier
                            ? "bg-green-100 text-green-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {category.Name}
                        {activeCategory === category.identifier && (
                          <svg
                            className="ml-2 h-5 w-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-8 p-4 bg-green-50 rounded-lg">
                    <h3 className="text-sm font-medium text-green-800">
                      Can't find an answer?
                    </h3>
                    <p className="mt-2 text-sm text-green-700">
                      Contact our team with your specific questions.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/contact"
                        className="text-sm font-medium text-green-600 hover:text-green-500"
                      >
                        Contact Us <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="mt-8 lg:mt-0 lg:col-span-9">
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {categories.find(
                        (cat) => cat.identifier === activeCategory
                      )?.Name || "FAQs"}
                    </h2>
                  </div>
                  <div className="px-6 py-5">
                    {getFilteredFaqs().length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No FAQs found in this category.
                      </p>
                    ) : (
                      <dl className="space-y-6 divide-y divide-gray-200">
                        {getFilteredFaqs().map((faq) => (
                          <div key={faq.id} className="pt-6">
                            <dt className="text-lg">
                              <button
                                onClick={() => toggleFaq(faq.id)}
                                className="text-left w-full flex justify-between items-start text-gray-900"
                              >
                                <span className="font-medium">
                                  {faq.Question}
                                </span>
                                <span className="ml-6 h-7 flex items-center">
                                  {openFaqs.includes(faq.id) ? (
                                    <svg
                                      className="h-5 w-5 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="h-5 w-5 text-green-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </span>
                              </button>
                            </dt>
                            <dd
                              className={`mt-2 pr-12 ${
                                openFaqs.includes(faq.id) ? "block" : "hidden"
                              }`}
                            >
                              <div
                                className="text-base text-gray-600"
                                dangerouslySetInnerHTML={{ __html: faq.Answer }}
                              />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Still have questions?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                If you couldn't find the answer to your question, our team is
                here to help. Feel free to contact us and we'll get back to you
                as soon as possible.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Contact Us
                </Link>
                <Link
                  href="/tickets"
                  className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Register for UNITE Expo
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Common Support Channels
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-900">
                      Email Support
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      info@uniteexpo.org
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Response time: 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-900">
                      Phone Support
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      +256 700 000 000
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Monday-Friday, 9:00 AM - 5:00 PM EAT
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-base font-medium text-gray-900">
                      Live Chat
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Available on our website
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Monday-Friday, 9:00 AM - 5:00 PM EAT
                    </p>
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

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
    <main className="bg-white dark:bg-gray-900">
      <HeroSection />
      <FAQContentSection
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredFaqs={getFilteredFaqs()}
        openFaqs={openFaqs}
        toggleFaq={toggleFaq}
        loading={loading}
        error={error}
      />
      <SupportSection />
    </main>
  );
}

// -------------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/3">
            <div className="flex items-center mb-6">
              <Link
                href="/about"
                className="flex items-center text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
            <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to know about UNITE 2025
            </p>
          </div>
          <div className="md:w-1/3 bg-black text-white dark:bg-white dark:text-black p-8 border border-gray-200 dark:border-gray-600">
            <div className="relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/tickets"
                    className="flex items-center group text-white dark:text-black hover:text-yellow-500 dark:hover:text-yellow-500"
                  >
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3 flex-shrink-0 group-hover:bg-white dark:group-hover:bg-black"></span>
                    <span>Ticket Information</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/venue"
                    className="flex items-center group text-white dark:text-black hover:text-yellow-500 dark:hover:text-yellow-500"
                  >
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3 flex-shrink-0 group-hover:bg-white dark:group-hover:bg-black"></span>
                    <span>Venue & Accommodation</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center group text-white dark:text-black hover:text-yellow-500 dark:hover:text-yellow-500"
                  >
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3 flex-shrink-0 group-hover:bg-white dark:group-hover:bg-black"></span>
                    <span>Contact Support</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center group text-white dark:text-black hover:text-yellow-500 dark:hover:text-yellow-500"
                  >
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3 flex-shrink-0 group-hover:bg-white dark:group-hover:bg-black"></span>
                    <span>About UNITE</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// FAQ Content Section
// -------------------------------------------------------------------
function FAQContentSection({
  categories,
  activeCategory,
  setActiveCategory,
  filteredFaqs,
  openFaqs,
  toggleFaq,
  loading,
  error,
}: {
  categories: FAQCategory[];
  activeCategory: string;
  setActiveCategory: (identifier: string) => void;
  filteredFaqs: FAQ[];
  openFaqs: number[];
  toggleFaq: (id: number) => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Category Navigation */}
          <div className="lg:w-1/3">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                FAQ Categories
              </h2>

              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.identifier)}
                    className={`w-full flex items-center justify-between p-3 border ${
                      activeCategory === category.identifier
                        ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-500"
                    }`}
                  >
                    <span>{category.Name}</span>
                    {activeCategory === category.identifier && (
                      <span className="h-4 w-4 bg-yellow-500"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Can't find an answer?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contact our team with your specific questions.
                </p>
                <Button variant="primary" buttonType="outline" href="/contact">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:w-2/3">
            {loading ? (
              <div className="flex justify-center items-center py-16 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                <div className="inline-block h-8 w-8 animate-spin border-2 border-solid border-yellow-500 border-r-transparent"></div>
                <p className="ml-4 text-gray-600 dark:text-gray-300">
                  Loading FAQs...
                </p>
              </div>
            ) : error ? (
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-500"
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
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Error Loading FAQs
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                <div className="border-b border-gray-200 dark:border-gray-600 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.find((cat) => cat.identifier === activeCategory)
                      ?.Name || "FAQs"}
                  </h2>
                </div>
                <div className="p-6">
                  {filteredFaqs.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">
                      No FAQs found in this category.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {filteredFaqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 dark:border-gray-600"
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className="text-left w-full flex justify-between items-center p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
                          >
                            <span className="font-bold">{faq.Question}</span>
                            <span className="ml-6 h-8 w-8 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                              {openFaqs.includes(faq.id) ? "−" : "+"}
                            </span>
                          </button>

                          {openFaqs.includes(faq.id) && (
                            <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                              <div
                                className="text-gray-600 dark:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: faq.Answer }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Support Section
// -------------------------------------------------------------------
function SupportSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              If you couldn't find the answer to your question, our team is here
              to help. Feel free to contact us and we'll get back to you as soon
              as possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Contact Us
              </Button>
              <Button
                variant="dark"
                buttonType="outline"
                size="lg"
                href="/tickets"
                className="dark:border-white dark:text-white"
              >
                Register for UNITE 2025
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-600 bg-black text-white dark:bg-white dark:text-black p-8">
            <div className="relative mb-6">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
              <h3 className="text-2xl font-bold">Support Channels</h3>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    className="h-5 w-5"
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
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Support</h4>
                  <p className="text-lg">info@uniteexpo.org</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">
                    Response time: 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    className="h-5 w-5"
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
                <div>
                  <h4 className="text-lg font-bold mb-1">Phone Support</h4>
                  <p className="text-lg">+256 700 000 000</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">
                    Monday-Friday, 9:00 AM - 5:00 PM EAT
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    className="h-5 w-5"
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
                <div>
                  <h4 className="text-lg font-bold mb-1">Live Chat</h4>
                  <p className="text-lg">Available on our website</p>
                  <p className="text-sm text-gray-300 dark:text-gray-600">
                    Monday-Friday, 9:00 AM - 5:00 PM EAT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

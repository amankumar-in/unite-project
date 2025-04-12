"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface Speaker {
  id: number;
  Name: string;
  Slug: string;
  Title: string;
  Organization: string;
  ShortBio: string;
  Bio: string;
  Featured: boolean;
  ProfileImage?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  LinkedIn?: string;
  Twitter?: string;
  Website?: string;
  events?: Array<{
    id: number;
    Title: string;
    Slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetchAPI("/speakers?populate=*");
        console.log("Speakers response:", response);

        if (response && response.data) {
          setSpeakers(response.data);
          setFilteredSpeakers(response.data);
        } else {
          setError("Failed to retrieve speakers data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setError("Failed to load speakers. Please try again later.");
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  // Filter speakers based on featured status and search term
  useEffect(() => {
    let filtered = speakers;

    // Filter by featured status if showFeaturedOnly is true
    if (showFeaturedOnly) {
      filtered = filtered.filter((speaker) => speaker.Featured);
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (speaker) =>
          speaker.Name.toLowerCase().includes(term) ||
          speaker.Title.toLowerCase().includes(term) ||
          speaker.Organization.toLowerCase().includes(term) ||
          speaker.ShortBio.toLowerCase().includes(term)
      );
    }

    setFilteredSpeakers(filtered);
  }, [showFeaturedOnly, searchTerm, speakers]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Meet Our Speakers
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Industry leaders and experts bringing valuable insights to UNITE
              Expo 2025
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="w-full md:w-64">
              <label htmlFor="search" className="sr-only">
                Search speakers
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Search speakers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Featured Only Toggle */}
            <div className="flex items-center">
              <input
                id="featured-only"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              />
              <label
                htmlFor="featured-only"
                className="ml-2 block text-sm text-gray-700"
              >
                Featured speakers only
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading speakers...</p>
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
                Error Loading Speakers
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
            <>
              {filteredSpeakers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    No speakers found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSpeakers.map((speaker) => (
                    <Link href={`/speakers/${speaker.Slug}`} key={speaker.id}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        {/* Speaker Image */}
                        <div className="relative pt-[100%] bg-gray-200">
                          {speaker.ProfileImage ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                              alt={speaker.Name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-600 text-white text-4xl font-bold">
                              {speaker.Name.charAt(0)}
                            </div>
                          )}

                          {/* Featured Badge */}
                          {speaker.Featured && (
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Speaker Info */}
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {speaker.Name}
                          </h3>
                          <p className="text-green-600 mb-1">{speaker.Title}</p>
                          <p className="text-gray-500 text-sm mb-4">
                            {speaker.Organization}
                          </p>

                          <p className="text-gray-600 mb-4 flex-grow">
                            {speaker.ShortBio}
                          </p>

                          {/* Event Count */}
                          {speaker.events && speaker.events.length > 0 && (
                            <div className="text-sm text-gray-500 mt-auto">
                              Speaking at {speaker.events.length}{" "}
                              {speaker.events.length === 1 ? "event" : "events"}
                            </div>
                          )}

                          <div className="mt-4">
                            <span className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                              View Profile
                              <svg
                                className="ml-1 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Become a Speaker CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-xl p-8 md:p-12">
            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Interested in Speaking?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Share your expertise and insights with international investors
                  and business leaders at Uganda's premier investment expo.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Speaker Benefits:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Showcase your thought leadership</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Connect with industry leaders and decision-makers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Gain exposure for your organization</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Contribute to Uganda's economic growth narrative
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 md:mt-0 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Apply to Speak
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

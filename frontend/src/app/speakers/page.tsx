"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

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
        const response = await fetchAPI("/speakers?populate=*&sort[0]=SortOrder:asc&sort[1]=Name:asc");
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
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Meet Our Speakers
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Industry leaders and experts bringing valuable insights to UNITE
                Expo 2025
              </p>
              <Button variant="primary" href="/contact">
                Apply to Speak
              </Button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-8 bg-black text-white dark:bg-white dark:text-black relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h2 className="text-2xl font-bold mb-4">Key Topics</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Investment Opportunities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Market Development</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Industry Innovations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Policy & Regulation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Find Speakers
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Search by name, title, organization, or expertise
              </p>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-yellow-500"
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
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 focus:ring-0"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                />
                <label
                  htmlFor="featured-only"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Featured speakers only
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Distinguished Speakers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Learn from industry leaders, policymakers, and innovators at the
              forefront of Uganda's economic transformation
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 border border-gray-200 dark:border-gray-600">
              <div className="mb-6">
                <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Loading speakers...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500">
                  <svg
                    className="w-6 h-6 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Error Loading Speakers
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
            <>
              {filteredSpeakers.length === 0 ? (
                <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    No Speakers Found
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    No speakers match your current search criteria.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchTerm("");
                      setShowFeaturedOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSpeakers.map((speaker) => (
                    <Link
                      href={`/speakers/${speaker.Slug}`}
                      key={speaker.id}
                      className="group"
                    >
                      <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 h-full flex flex-col hover:border-yellow-500 transition-colors">
                        {/* Speaker Image */}
                        <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 relative">
                          {speaker.ProfileImage ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                              alt={speaker.Name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black dark:bg-white">
                              <span className="text-white dark:text-black text-6xl font-bold">
                                {speaker.Name.charAt(0)}
                              </span>
                            </div>
                          )}

                          {/* Featured indicator */}
                          {speaker.Featured && (
                            <div className="absolute top-0 right-0 p-4">
                              <Chip variant="primary" size="sm">
                                Featured
                              </Chip>
                            </div>
                          )}
                        </div>

                        {/* Speaker Info */}
                        <div className="p-6 flex-grow flex flex-col">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                            {speaker.Name}
                          </h3>
                          <p className="text-yellow-500 mb-1">
                            {speaker.Title}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {speaker.Organization}
                          </p>

                          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {speaker.ShortBio.length > 150
                              ? `${speaker.ShortBio.substring(0, 150)}...`
                              : speaker.ShortBio}
                          </p>

                          {/* Event Count */}
                          {speaker.events && speaker.events.length > 0 && (
                            <div className="mt-auto mb-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                              Speaking at {speaker.events.length}{" "}
                              {speaker.events.length === 1 ? "event" : "events"}
                            </div>
                          )}

                          <div className="flex justify-end">
                            <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                              View Profile
                              <svg
                                className="ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
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
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500"></div>
                <h3 className="text-2xl font-bold mb-4">Speaker Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mt-2 mr-3"></span>
                    <span>Showcase your thought leadership</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mt-2 mr-3"></span>
                    <span>Connect with industry leaders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mt-2 mr-3"></span>
                    <span>Gain exposure for your organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mt-2 mr-3"></span>
                    <span>Contribute to Uganda's economic growth</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Interested in Speaking?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Share your expertise and insights with international investors
                and business leaders at Uganda's premier investment expo. We're
                looking for speakers with experience in key sectors including
                agriculture, energy, technology, manufacturing, and finance.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Speaker applications for UNITE Expo 2025 are now open. The
                deadline for submissions is December 15, 2024. Our committee
                reviews all applications and will respond within two weeks of
                submission.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/contact">
                  Apply to Speak
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/events"
                  className="dark:border-white dark:text-white"
                >
                  View Event Program
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

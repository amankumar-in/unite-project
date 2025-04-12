"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface Venue {
  id: number;
  Name: string;
  Slug: string;
  Description: any[];
  Address: string;
  City: string;
  Country: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  MapEmbedURL?: string;
  MainVenue: boolean;
  MainImage?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
    };
  };
  events?: any[];
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetchAPI("/venues?populate=*");

        if (response && response.data) {
          setVenues(response.data);
        } else {
          setError("Failed to retrieve venues data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError("Failed to load venues. Please try again later.");
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Venue Information
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Explore the locations for UNITE Expo 2025 events
            </p>
          </div>
        </div>
      </section>

      {/* Venues List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading venues...</p>
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
                Error Loading Venues
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
              {venues.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No venues found.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Main Venue */}
                  {venues.filter((venue) => venue.MainVenue).length > 0 && (
                    <div className="mb-16">
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Main Venue
                      </h2>
                      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                        {venues
                          .filter((venue) => venue.MainVenue)
                          .map((venue) => (
                            <Link
                              href={`/venue/${venue.Slug}`}
                              key={venue.Slug}
                            >
                              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                {/* Venue Image */}
                                <div className="relative h-72 bg-gray-200">
                                  {venue.MainImage ? (
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                                      alt={venue.Name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-green-50">
                                      <span className="text-green-700 font-medium">
                                        {venue.Name}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {venue.Name}
                                  </h3>

                                  {/* Venue Details */}
                                  <div className="mb-4">
                                    <div className="flex items-start text-gray-600 mb-1">
                                      <svg
                                        className="h-5 w-5 mt-0.5 mr-2 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      <span className="text-sm">
                                        {venue.City}, {venue.Country}
                                      </span>
                                    </div>

                                    {venue.events &&
                                      venue.events.length > 0 && (
                                        <div className="flex items-start text-gray-600">
                                          <svg
                                            className="h-5 w-5 mt-0.5 mr-2 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                          </svg>
                                          <span className="text-sm">
                                            Hosting {venue.events.length}{" "}
                                            {venue.events.length === 1
                                              ? "event"
                                              : "events"}
                                          </span>
                                        </div>
                                      )}
                                  </div>

                                  <div className="mt-auto">
                                    <span className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                                      View Details
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
                    </div>
                  )}

                  {/* Other Venues */}
                  {venues.filter((venue) => !venue.MainVenue).length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Additional Venues
                      </h2>
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {venues
                          .filter((venue) => !venue.MainVenue)
                          .map((venue) => (
                            <Link
                              href={`/venue/${venue.Slug}`}
                              key={venue.Slug}
                            >
                              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                                {/* Venue Image */}
                                <div className="relative h-48 bg-gray-200">
                                  {venue.MainImage ? (
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                                      alt={venue.Name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-green-50">
                                      <span className="text-green-700 font-medium">
                                        {venue.Name}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {venue.Name}
                                  </h3>

                                  {/* Venue Details */}
                                  <div className="mb-4">
                                    <div className="flex items-start text-gray-600 mb-1">
                                      <svg
                                        className="h-5 w-5 mt-0.5 mr-2 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                      </svg>
                                      <span className="text-sm">
                                        {venue.City}, {venue.Country}
                                      </span>
                                    </div>

                                    {venue.events &&
                                      venue.events.length > 0 && (
                                        <div className="flex items-start text-gray-600">
                                          <svg
                                            className="h-5 w-5 mt-0.5 mr-2 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                          </svg>
                                          <span className="text-sm">
                                            Hosting {venue.events.length}{" "}
                                            {venue.events.length === 1
                                              ? "event"
                                              : "events"}
                                          </span>
                                        </div>
                                      )}
                                  </div>

                                  <div className="mt-auto">
                                    <span className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                                      View Details
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
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Info CTA */}
      <section className="py-12 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Need More Information?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Contact our team for details about venue facilities, accessibility,
            or other questions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-white text-green-700 hover:bg-green-50"
          >
            Contact Us
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
      </section>
    </div>
  );
}

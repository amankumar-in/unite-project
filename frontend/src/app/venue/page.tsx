"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

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
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Venue Information
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore the locations for UNITE Expo 2025 events across Kampala
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/events">
                  Browse Events
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/contact"
                  className="dark:border-white dark:text-white"
                >
                  Venue Inquiries
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-8 bg-black text-white dark:bg-white dark:text-black relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h2 className="text-2xl font-bold mb-4">Key Information</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Multiple Event Locations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Accessible Facilities</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Centrally Located</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Modern Conference Equipment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues List */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
              <div className="mb-6">
                <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Loading venues...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
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
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Error Loading Venues
              </h2>
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
              {venues.length === 0 ? (
                <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    No Venues Found
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Venue information will be added soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Main Venue */}
                  {venues.filter((venue) => venue.MainVenue).length > 0 && (
                    <div>
                      <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
                      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        Main Venue
                      </h2>
                      <div className="grid gap-8 grid-cols-1">
                        {venues
                          .filter((venue) => venue.MainVenue)
                          .map((venue) => (
                            <Link
                              href={`/venue/${venue.Slug}`}
                              key={venue.Slug}
                              className="group block"
                            >
                              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                                  {/* Venue Image */}
                                  <div className="md:col-span-5 relative">
                                    {venue.MainImage ? (
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                                        alt={venue.Name}
                                        className="w-full h-60 md:h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-60 md:h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                        <span className="text-gray-400 text-xl">
                                          {venue.Name}
                                        </span>
                                      </div>
                                    )}
                                    {/* Visual elements */}
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-500"></div>
                                  </div>

                                  {/* Card Body */}
                                  <div className="md:col-span-7 p-8 flex flex-col">
                                    <div className="mb-3">
                                      <Chip variant="primary" size="md">
                                        Main Venue
                                      </Chip>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                                      {venue.Name}
                                    </h3>

                                    {/* Venue Details */}
                                    <div className="mb-6 space-y-3">
                                      <div className="flex items-start text-gray-600 dark:text-gray-300">
                                        <svg
                                          className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                                        <div>
                                          {venue.Address && (
                                            <p>{venue.Address}</p>
                                          )}
                                          <p>
                                            {venue.City}, {venue.Country}
                                          </p>
                                        </div>
                                      </div>

                                      {venue.events &&
                                        venue.events.length > 0 && (
                                          <div className="flex items-start text-gray-600 dark:text-gray-300">
                                            <svg
                                              className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                                            <span>
                                              Hosting {venue.events.length}{" "}
                                              {venue.events.length === 1
                                                ? "event"
                                                : "events"}
                                            </span>
                                          </div>
                                        )}

                                      {venue.Phone && (
                                        <div className="flex items-start text-gray-600 dark:text-gray-300">
                                          <svg
                                            className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                                          <span>{venue.Phone}</span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="mt-auto flex justify-end">
                                      <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                                        View Venue Details
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
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Venues */}
                  {venues.filter((venue) => !venue.MainVenue).length > 0 && (
                    <div>
                      <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        Additional Venues
                      </h2>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {venues
                          .filter((venue) => !venue.MainVenue)
                          .map((venue) => (
                            <Link
                              href={`/venue/${venue.Slug}`}
                              key={venue.Slug}
                              className="group block"
                            >
                              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors h-full flex flex-col">
                                {/* Venue Image */}
                                <div className="relative aspect-[4/3] w-full">
                                  {venue.MainImage ? (
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                                      alt={venue.Name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                      <span className="text-gray-400 text-xl">
                                        {venue.Name}
                                      </span>
                                    </div>
                                  )}
                                  {/* Visual element */}
                                  <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex flex-col flex-grow">
                                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                                    {venue.Name}
                                  </h3>

                                  {/* Venue Details */}
                                  <div className="mb-4 flex-grow">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                                      <svg
                                        className="h-5 w-5 mr-3 text-yellow-500"
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
                                      <span>
                                        {venue.City}, {venue.Country}
                                      </span>
                                    </div>

                                    {venue.events &&
                                      venue.events.length > 0 && (
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                          <svg
                                            className="h-5 w-5 mr-3 text-yellow-500"
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
                                          <span>
                                            Hosting {venue.events.length}{" "}
                                            {venue.events.length === 1
                                              ? "event"
                                              : "events"}
                                          </span>
                                        </div>
                                      )}
                                  </div>

                                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                                      View Details
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
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Transportation Information */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Transportation Information
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                UNITE Expo 2025 venues are easily accessible through various
                transportation options. Our partner hotels also offer shuttle
                services for registered attendees.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                      01
                    </span>
                    Airport Transfers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Special rates available from Entebbe International Airport
                    to official venue hotels for international delegates.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                      02
                    </span>
                    Shuttle Service
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complimentary shuttle buses run between official partner
                    hotels and venue locations during event days.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                      03
                    </span>
                    Local Transport
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Information on local taxis, ride-sharing services, and
                    public transportation options will be provided.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                    <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                      04
                    </span>
                    Parking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Limited parking available at venue locations. Advanced
                    reservation recommended for vehicle access.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-6">Need Assistance?</h3>
                <p className="mb-6">
                  Our dedicated team can help with transportation arrangements,
                  accessibility requirements, or any venue-specific queries for
                  your UNITE Expo experience.
                </p>
                <Button
                  variant="light"
                  buttonType="outline"
                  href="/contact"
                  className="border-white text-white dark:border-black dark:text-black"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500 mx-auto"></span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Accommodation Options
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            UNITE Expo 2025 has partnered with premium hotels in Kampala to
            offer special rates for event attendees. Book early to secure your
            preferred accommodation.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            View Partner Hotels
          </Button>
        </div>
      </section>
    </main>
  );
}

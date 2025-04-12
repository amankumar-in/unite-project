"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Category: string;
  FeaturedEvent: boolean;
  MaxAttendees?: number;
  Image?: {
    id: number;
    url: string;
    width: number;
    height: number;
    alternativeText?: string | null;
    formats?: {
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Conference",
    "Workshop",
    "Networking",
    "Exhibition",
    "Panel",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchAPI("/events?populate=*");
        console.log("Events response:", response);

        if (response && response.data) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.Category === activeCategory)
      );
    }
  }, [activeCategory, events]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              UNITE Expo 2025 Events
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Explore conferences, workshops, panels, and networking
              opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
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
                Error Loading Events
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
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    No events found in this category.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <Link href={`/events/${event.Slug}`} key={event.id}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        {/* Event Image */}
                        <div className="relative h-48 bg-gray-200">
                          {event.Image ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                              alt={event.Image.alternativeText || event.Title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-green-50">
                              <span className="text-green-700 font-medium">
                                UNITE Expo 2025
                              </span>
                            </div>
                          )}

                          {/* Overlay category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {event.Category}
                            </span>
                          </div>

                          {event.FeaturedEvent && (
                            <div className="absolute top-4 right-4">
                              <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {event.Title}
                          </h3>

                          {/* Event Details */}
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
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm">
                                {formatDate(event.StartDate)}
                              </span>
                            </div>

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
                                {event.Location}
                                {event.RoomNumber &&
                                  ` - Room ${event.RoomNumber}`}
                              </span>
                            </div>

                            {event.MaxAttendees && (
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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                                <span className="text-sm">
                                  Capacity: {event.MaxAttendees} attendees
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-gray-600 mb-4">
                            {event.ShortDescription}
                          </p>

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
              )}
            </>
          )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-12 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Join Us?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Secure your spot at UNITE Expo 2025 and connect with industry
            leaders, investors, and innovators from around the world.
          </p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-white text-green-700 hover:bg-green-50"
          >
            Get Your Tickets
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

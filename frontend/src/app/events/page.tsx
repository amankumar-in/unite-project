"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
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
        events.filter((event) => event.Enumeration === activeCategory)
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
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Programme Events
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore conferences, workshops, panels, and networking
                opportunities at UNITE Expo 2025
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/tickets">
                  Register Now
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/contact"
                  className="dark:border-white dark:text-white"
                >
                  Become a Speaker
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-8 bg-black text-white dark:bg-white dark:text-black relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h2 className="text-2xl font-bold mb-4">July 7-14, 2025</h2>
                <p className="mb-4">Kampala International Conference Centre</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>300+ Sessions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>50+ International Speakers</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>5 Specialized Tracks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Event Categories
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Filter events by type
              </p>
            </div>
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 font-medium mr-0 border border-gray-200 dark:border-gray-600 ${
                    activeCategory === category
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Discover the highlights of UNITE Expo 2025, from keynote
              presentations to specialized workshops
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 border border-gray-200 dark:border-gray-600">
              <div className="mb-6">
                <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Loading events...
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
                Error Loading Events
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
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    No Events Found
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    There are currently no events in the {activeCategory}{" "}
                    category.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setActiveCategory("All")}
                  >
                    View All Events
                  </Button>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <Link
                      href={`/events/${event.Slug}`}
                      key={event.id}
                      className="group"
                    >
                      <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 h-full flex flex-col">
                        {/* Event Image */}
                        <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700 relative">
                          {event.Image ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                              alt={event.Image.alternativeText || event.Title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-xl">
                                UNITE 2025
                              </span>
                            </div>
                          )}

                          {/* Category indicator - top left */}
                          <div className="absolute top-0 left-0 p-4">
                            <Chip variant="primary" size="sm">
                              {event.Enumeration}
                            </Chip>
                          </div>

                          {/* Featured indicator - top right */}
                          {event.FeaturedEvent && (
                            <div className="absolute top-0 right-0 p-4">
                              <Chip variant="black" size="sm">
                                Featured
                              </Chip>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                            {event.Title}
                          </h3>

                          {/* Event Details */}
                          <div className="mb-4">
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
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm">
                                {formatDate(event.StartDate)}
                              </span>
                            </div>

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
                              <span className="text-sm">
                                {event.Location}
                                {event.RoomNumber &&
                                  ` - Room ${event.RoomNumber}`}
                              </span>
                            </div>

                            {event.MaxAttendees && (
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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </svg>
                                <span className="text-sm">
                                  Capacity: {event.MaxAttendees} attendees
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                            {event.ShortDescription.length > 150
                              ? `${event.ShortDescription.substring(0, 150)}...`
                              : event.ShortDescription}
                          </p>

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
              )}
            </>
          )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500"></div>
                <h3 className="text-2xl font-bold mb-4">Key Dates</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Early Bird Registration: Until April 30, 2025</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Speaker Submissions: February 15, 2025</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Exhibition Setup: July 6, 2025</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Ready to Connect with Global Leaders?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Secure your spot at UNITE Expo 2025 and join industry leaders,
                investors, and innovators from around the world. Early bird
                registration is now open with special rates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/tickets">
                  Register Now
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/events/schedule"
                  className="dark:border-white dark:text-white"
                >
                  View Full Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

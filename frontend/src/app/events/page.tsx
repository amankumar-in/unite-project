"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

// Updated interface to match actual API response
interface Event {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Date: string;
  Location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchAPI("/events");
        console.log("Events response:", response);

        if (response && response.data) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date provided";

    // Simple conversion without try/catch to avoid unused variable issues
    return dateString ? new Date(dateString).toLocaleString() : dateString;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              UNITE Events Schedule
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Discover the full range of events, presentations, and networking
              opportunities at UNITE Expo 2025
            </p>
          </div>
        </div>
      </section>

      {/* Event Filters (future implementation) */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm font-medium">View:</span>
              <button className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-md">
                All Events
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md">
                By Day
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md">
                By Category
              </button>
            </div>
            <div className="mt-2 sm:mt-0">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
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
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                <svg
                  className="w-8 h-8 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-gray-900">
                No Events Found
              </p>
              <p className="mt-2 text-gray-600">
                Check back later for updates to our event schedule.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-sm text-green-600 font-semibold mb-1">
                      {formatDate(event.Date)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.Name}
                    </h3>
                    <div className="flex items-start mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
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
                      <span className="text-gray-600">
                        {event.Location || "Location TBA"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {event.Description && event.Description.length > 150
                        ? `${event.Description.substring(0, 150)}...`
                        : event.Description || "No description available"}
                    </p>
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5"
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Daily Schedule Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Daily Schedule Overview
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Plan your visit to make the most of UNITE Expo 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Day 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Day 1
                </span>
                <h3 className="mt-2 text-lg font-bold">May 15, 2025</h3>
                <p className="text-gray-500">Opening Day</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    9:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Registration Opens
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    10:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Opening Ceremony
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    12:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Exhibition Opens
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    2:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Keynote Address
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    4:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Panel Discussion
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    6:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Welcome Reception
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  href="/events/schedule/day-1"
                  className="text-green-600 text-sm font-medium hover:text-green-700"
                >
                  View Full Day 1 Schedule
                </Link>
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Day 2
                </span>
                <h3 className="mt-2 text-lg font-bold">May 16, 2025</h3>
                <p className="text-gray-500">Sector Focus Day</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    9:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Exhibition Opens
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    10:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Sector Workshops
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    12:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Business Lunch
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    2:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Investment Forum
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    4:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Pitch Competition
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    7:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Networking Dinner
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  href="/events/schedule/day-2"
                  className="text-green-600 text-sm font-medium hover:text-green-700"
                >
                  View Full Day 2 Schedule
                </Link>
              </div>
            </div>

            {/* Day 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Day 3
                </span>
                <h3 className="mt-2 text-lg font-bold">May 17, 2025</h3>
                <p className="text-gray-500">Partnership Day</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    9:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Exhibition Opens
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    10:00 AM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      B2B Matchmaking
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    12:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Regional Showcase
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    2:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Expert Roundtables
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    4:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Closing Ceremony
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 w-20">
                    7:00 PM
                  </span>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-900">
                      Gala Dinner
                    </span>
                  </div>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  href="/events/schedule/day-3"
                  className="text-green-600 text-sm font-medium hover:text-green-700"
                >
                  View Full Day 3 Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center text-white">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Secure Your Spot at UNITE Expo 2025
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Don't miss this opportunity to be part of Uganda's premier
                investment and trade event.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/tickets"
                  className="inline-block bg-white px-5 py-3 text-base font-medium text-green-700 shadow-md rounded-md hover:bg-gray-50"
                >
                  Register Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border border-white px-5 py-3 text-base font-medium text-white rounded-md hover:bg-green-800"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

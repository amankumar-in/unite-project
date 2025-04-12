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
  ProfileImage?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
}

interface Sponsor {
  id: number;
  Name: string;
  Slug: string;
  Tier: "Platinum" | "Gold" | "Silver";
  Description: string;
  Website?: string;
  Featured: boolean;
  Logo?: {
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
}

interface RichTextNode {
  type: string;
  level?: number;
  children: {
    text: string;
    type?: string;
  }[];
}

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  Description: RichTextNode[];
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  MaxAttendees?: number;
  Image?: {
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
  speakers: Speaker[];
  sponsors: Sponsor[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Using slug to fetch the event with all relations
        const response = await fetchAPI(
          `/events?filters[Slug][$eq]=${params.slug}&populate=*`
        );

        if (response && response.data && response.data.length > 0) {
          setEvent(response.data[0]);
        } else {
          setError("Event not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventData();
  }, [params.slug]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time with 12-hour clock
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time duration
  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If on the same day, just show time range
    if (start.toDateString() === end.toDateString()) {
      return `${formatTime(startDate)} - ${formatTime(endDate)}`;
    }

    // Different days, show full range
    return `${formatDate(startDate)} ${formatTime(startDate)} - ${formatDate(
      endDate
    )} ${formatTime(endDate)}`;
  };

  // Render rich text content
  const renderRichText = (content: RichTextNode[]) => {
    if (!content || !Array.isArray(content)) return "No description available";

    return content.map((block, blockIndex) => {
      if (block.type === "paragraph") {
        return (
          <p key={blockIndex} className="mb-4">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      } else if (block.type === "heading") {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={blockIndex} className="font-bold mt-6 mb-3">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </HeadingTag>
        );
      }
      // Add more cases for different block types if needed
      return null;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
            <svg
              className="w-6 h-6 text-red-600"
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't find the event you're looking for."}
          </p>
          <Link
            href="/events"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/events"
          className="text-green-600 hover:text-green-700 inline-flex items-center text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Events
        </Link>
      </div>

      {/* Event Image with Overlay - Full Width */}
      <div className="relative w-full">
        <div className="w-full">
          <div className="relative h-[400px] md:h-[500px] w-full">
            {event.Image ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                alt={event.Image.alternativeText || event.Title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-semibold">
                  UNITE Expo 2025
                </span>
              </div>
            )}

            {/* Overlay with gradient and event info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                    {event.Enumeration}
                  </span>
                  {event.FeaturedEvent && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  {event.Title}
                </h1>
                <p className="text-lg text-gray-200 mb-6 max-w-3xl">
                  {event.ShortDescription.length > 140
                    ? `${event.ShortDescription.substring(0, 140)}...`
                    : event.ShortDescription}
                </p>

                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 text-white">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <svg
                      className="h-5 w-5 mr-2 text-green-400"
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
                    <span>{formatDate(event.StartDate)}</span>
                  </div>

                  <div className="flex items-center mb-2 sm:mb-0">
                    <svg
                      className="h-5 w-5 mr-2 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {formatDuration(event.StartDate, event.EndDate)}
                    </span>
                  </div>

                  <div className="flex items-center mb-2 sm:mb-0">
                    <svg
                      className="h-5 w-5 mr-2 text-green-400"
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
                      {event.Location}
                      {event.RoomNumber && ` • Room ${event.RoomNumber}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Event Details & Sponsors */}
          <div className="lg:col-span-2">
            {/* Event Sponsors - Display at top if available */}
            {event.sponsors && event.sponsors.length > 0 && (
              <div className="mb-10 bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Event Sponsors
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {event.sponsors.map((sponsor) => (
                    <Link
                      href={`/sponsors/${sponsor.Slug}`}
                      key={sponsor.id}
                      className="group flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 w-20 h-20 bg-white rounded-full p-1 flex items-center justify-center shadow-sm mb-3">
                        {sponsor.Logo ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                            alt={sponsor.Name}
                            className="max-w-full max-h-full object-contain rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-bold">
                            {sponsor.Name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 line-clamp-2">
                          {sponsor.Name}
                        </h3>
                        <span
                          className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                            sponsor.Tier === "Platinum"
                              ? "bg-purple-100 text-purple-800"
                              : sponsor.Tier === "Gold"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {sponsor.Tier}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Event Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg
                  className="h-6 w-6 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About This Event
              </h2>
              <div className="prose prose-green max-w-none">
                {renderRichText(event.Description)}
              </div>
            </div>

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg
                    className="h-6 w-6 mr-2 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Speakers
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <Link href={`/speakers/${speaker.Slug}`} key={speaker.id}>
                      <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0 mr-4">
                          {speaker.ProfileImage ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                              alt={speaker.Name}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold">
                              {speaker.Name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {speaker.Name}
                          </h3>
                          <p className="text-green-600">{speaker.Title}</p>
                          <p className="text-gray-500 text-sm">
                            {speaker.Organization}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Event Info Card */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Event Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Date & Time
                    </h4>
                    <p className="mt-1 text-gray-900">
                      {formatDate(event.StartDate)}
                    </p>
                    <p className="text-gray-900">
                      {formatDuration(event.StartDate, event.EndDate)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Location
                    </h4>
                    <p className="mt-1 text-gray-900">{event.Location}</p>
                    {event.RoomNumber && (
                      <p className="text-gray-900">Room {event.RoomNumber}</p>
                    )}
                  </div>

                  {event.MaxAttendees && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Capacity
                      </h4>
                      <p className="mt-1 text-gray-900">
                        {event.MaxAttendees} attendees
                      </p>
                    </div>
                  )}

                  {event.sponsors && event.sponsors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Sponsored By
                      </h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {event.sponsors.map((sponsor) => (
                          <Link
                            key={sponsor.id}
                            href={`/sponsors/${sponsor.Slug}`}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                          >
                            {sponsor.Name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <Link
                  href="/tickets"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Register for This Event
                </Link>

                <button
                  type="button"
                  className="mt-3 w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => {
                    // Add calendar functionality here
                    alert("Add to calendar feature coming soon!");
                  }}
                >
                  <svg
                    className="mr-2 h-5 w-5 text-gray-400"
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
                  Add to Calendar
                </button>
              </div>

              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Share This Event
                </h3>
                <div className="flex space-x-4">
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Share via Email"
                  >
                    <svg
                      className="h-6 w-6"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Events Section */}
      <section className="bg-gray-50 py-12 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore More Events
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Discover other exciting opportunities at UNITE Expo 2025
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Events
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
      </section>
    </div>
  );
}

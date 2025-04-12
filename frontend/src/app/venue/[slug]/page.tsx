"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

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
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  MaxAttendees?: number;
  Image?: {
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

interface Venue {
  id: number;
  Name: string;
  Slug: string;
  Description: RichTextNode[];
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
  events?: Event[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function VenueDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [eventImages, setEventImages] = useState<{ [slug: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        // Using slug to fetch the venue with all related data
        const response = await fetchAPI(
          `/venues?filters[Slug][$eq]=${params.slug}&populate=*`
        );

        if (response && response.data && response.data.length > 0) {
          setVenue(response.data[0]);

          // If venue has events, fetch their images
          if (response.data[0].events && response.data[0].events.length > 0) {
            const eventSlugs = response.data[0].events.map(
              (event: any) => event.Slug
            );

            // Fetch events with their images
            for (const slug of eventSlugs) {
              try {
                const eventResponse = await fetchAPI(
                  `/events?filters[Slug][$eq]=${slug}&populate=Image`
                );

                if (
                  eventResponse &&
                  eventResponse.data &&
                  eventResponse.data.length > 0 &&
                  eventResponse.data[0].Image
                ) {
                  setEventImages((prev) => ({
                    ...prev,
                    [slug]: eventResponse.data[0].Image.url,
                  }));
                }
              } catch (eventErr) {
                console.error(`Error fetching event ${slug} image:`, eventErr);
              }
            }
          }
        } else {
          setError("Venue not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching venue details:", err);
        setError("Failed to load venue details. Please try again later.");
        setLoading(false);
      }
    };

    fetchVenueData();
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

  // Format time for display
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <p className="mt-2 text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !venue) {
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
            Venue Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't find the venue you're looking for."}
          </p>
          <Link
            href="/venue"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Back to Venues
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
          href="/venue"
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
          Back to Venues
        </Link>
      </div>

      {/* Venue Image with Overlay - Full Width */}
      <div className="relative w-full">
        <div className="w-full">
          <div className="relative h-[400px] md:h-[500px] w-full">
            {venue.MainImage ? (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                alt={venue.Name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-semibold">
                  {venue.Name}
                </span>
              </div>
            )}

            {/* Overlay with gradient and venue info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
              <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                    Venue
                  </span>
                  {venue.MainVenue && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white">
                      Main Venue
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  {venue.Name}
                </h1>

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

                  {venue.events && venue.events.length > 0 && (
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
                      <span>
                        Hosting {venue.events.length}{" "}
                        {venue.events.length === 1 ? "Event" : "Events"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Venue Details & Events */}
          <div className="lg:col-span-2">
            {/* Venue Description */}
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
                About This Venue
              </h2>
              <div className="prose prose-green max-w-none">
                {renderRichText(venue.Description)}
              </div>
            </div>

            {/* Google Maps Embed */}
            {venue.MapEmbedURL && (
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Location Map
                </h2>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <div
                    dangerouslySetInnerHTML={{ __html: venue.MapEmbedURL }}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Venue Events Section */}
            {venue.events && venue.events.length > 0 && (
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Events at This Venue
                </h2>
                <div className="space-y-6">
                  {venue.events.map((event) => (
                    <Link
                      href={`/events/${event.Slug}`}
                      key={event.id}
                      className="block group"
                    >
                      <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {/* Event Image */}
                        <div className="md:w-1/3 lg:w-1/4 bg-gray-100 relative">
                          {eventImages[event.Slug] ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${
                                eventImages[event.Slug]
                              }`}
                              alt={event.Title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 md:h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400 text-lg font-semibold">
                                UNITE 2025
                              </span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                              {event.Enumeration}
                            </span>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                              {event.Title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {event.ShortDescription}
                            </p>
                          </div>

                          <div className="mt-auto">
                            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                              <div className="flex items-center">
                                <svg
                                  className="h-4 w-4 mr-1 text-green-500"
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
                                  {formatDate(event.StartDate)},{" "}
                                  {formatTime(event.StartDate)}
                                </span>
                              </div>

                              {event.RoomNumber && (
                                <div className="flex items-center">
                                  <svg
                                    className="h-4 w-4 mr-1 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                  </svg>
                                  <span>Room {event.RoomNumber}</span>
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex justify-end">
                              <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-700">
                                View Event Details
                                <svg
                                  className="ml-1 h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
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
          </div>

          {/* Right Column - Venue Info Card */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Venue Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address
                    </h4>
                    <p className="mt-1 text-gray-900">{venue.Address}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Location
                    </h4>
                    <p className="mt-1 text-gray-900">
                      {venue.City}, {venue.Country}
                    </p>
                  </div>

                  {venue.Phone && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Phone
                      </h4>
                      <p className="mt-1 text-gray-900">
                        <a
                          href={`tel:${venue.Phone}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          {venue.Phone}
                        </a>
                      </p>
                    </div>
                  )}

                  {venue.Email && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Email
                      </h4>
                      <p className="mt-1 text-gray-900">
                        <a
                          href={`mailto:${venue.Email}`}
                          className="text-green-600 hover:text-green-700"
                        >
                          {venue.Email}
                        </a>
                      </p>
                    </div>
                  )}

                  {venue.Website && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Website
                      </h4>
                      <p className="mt-1 text-gray-900">
                        <a
                          href={
                            venue.Website.startsWith("http")
                              ? venue.Website
                              : `https://${venue.Website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700"
                        >
                          {venue.Website}
                        </a>
                      </p>
                    </div>
                  )}

                  {venue.events && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Events
                      </h4>
                      <p className="mt-1 text-gray-900">
                        Hosting {venue.events.length || 0}{" "}
                        {(venue.events.length || 0) === 1 ? "Event" : "Events"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <Link
                  href="/tickets"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Browse Events at This Venue
                </Link>

                <Link
                  href="/contact"
                  className="mt-3 w-full flex justify-center items-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  Contact for Inquiries
                </Link>
              </div>

              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Share This Venue
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

      {/* Related Venues Section */}
      <section className="bg-gray-50 py-12 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore Other Venues
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Discover all locations for UNITE Expo 2025
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/venue"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Venues
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

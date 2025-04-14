"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

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
          <p key={blockIndex} className="mb-4 text-gray-600 dark:text-gray-300">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      } else if (block.type === "heading") {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={blockIndex}
            className="font-bold mt-6 mb-3 text-gray-900 dark:text-white"
          >
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
      <div className="flex justify-center items-center min-h-[60vh] bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-10 w-10 border-2 border-yellow-500 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading venue details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !venue) {
    return (
      <main className="bg-white dark:bg-gray-900 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="bg-black dark:bg-white w-16 h-16 mx-auto flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white dark:text-black"
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Venue Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "We couldn't find the venue you're looking for."}
          </p>
          <Button variant="primary" href="/venue">
            Back to Venues
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/venue"
          className="flex items-center text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
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

      {/* Venue Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16">
            {/* Venue Image */}
            <div className="lg:col-span-6 xl:col-span-5 relative">
              <div className="relative h-full w-full bg-gray-100 dark:bg-gray-700 min-h-[300px]">
                {venue.MainImage ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${venue.MainImage.url}`}
                    alt={venue.Name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                    <span className="text-gray-500 dark:text-gray-400 text-2xl font-semibold">
                      {venue.Name}
                    </span>
                  </div>
                )}
                {/* Geometric accents */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-600"></div>
              </div>
            </div>

            {/* Venue Info */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Chip variant="primary" size="md">
                  Venue
                </Chip>
                {venue.MainVenue && (
                  <Chip variant="black" size="md">
                    Main Venue
                  </Chip>
                )}
              </div>

              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {venue.Name}
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-start text-gray-600 dark:text-gray-300">
                  <svg
                    className="h-6 w-6 mt-0.5 mr-3 text-yellow-500"
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
                    {venue.Address && <p>{venue.Address}</p>}
                    <p>
                      {venue.City}, {venue.Country}
                    </p>
                  </div>
                </div>

                {venue.events && venue.events.length > 0 && (
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-6 w-6 mt-0.5 mr-3 text-yellow-500"
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

                {venue.Phone && (
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-6 w-6 mt-0.5 mr-3 text-yellow-500"
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

                {venue.Email && (
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-6 w-6 mt-0.5 mr-3 text-yellow-500"
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
                    <a
                      href={`mailto:${venue.Email}`}
                      className="hover:text-yellow-500"
                    >
                      {venue.Email}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                {venue.Website && (
                  <Button
                    variant="primary"
                    href={
                      venue.Website.startsWith("http")
                        ? venue.Website
                        : `https://${venue.Website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </Button>
                )}
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/contact"
                  className="dark:border-white dark:text-white"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Venue Description & Events */}
            <div className="lg:col-span-2">
              {/* Venue Description */}
              <div className="mb-16">
                <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  About This Venue
                </h2>
                <div className="space-y-4">
                  {renderRichText(venue.Description)}
                </div>
              </div>

              {/* Google Maps Embed */}
              {venue.MapEmbedURL && (
                <div className="mb-16">
                  <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Location Map
                  </h2>
                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                    <div
                      dangerouslySetInnerHTML={{ __html: venue.MapEmbedURL }}
                      className="w-full h-[400px]"
                    />
                  </div>
                </div>
              )}

              {/* Venue Events */}
              {venue.events && venue.events.length > 0 && (
                <div className="mt-16">
                  <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Events at This Venue
                  </h2>
                  <div className="space-y-6">
                    {venue.events.map((event) => (
                      <Link
                        href={`/events/${event.Slug}`}
                        key={event.id}
                        className="group block"
                      >
                        <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                            {/* Event Image */}
                            <div className="md:col-span-4 lg:col-span-3 relative">
                              <div className="aspect-[4/3] w-full">
                                {eventImages[event.Slug] ? (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${
                                      eventImages[event.Slug]
                                    }`}
                                    alt={event.Title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    <span className="text-gray-400 text-xl">
                                      UNITE 2025
                                    </span>
                                  </div>
                                )}
                                {/* Top right accent */}
                                <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500"></div>
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="md:col-span-8 lg:col-span-9 p-6 flex flex-col">
                              <div className="mb-3">
                                <Chip variant="primary" size="sm">
                                  {event.Enumeration}
                                </Chip>
                                {event.FeaturedEvent && (
                                  <Chip
                                    variant="black"
                                    size="sm"
                                    className="ml-2"
                                  >
                                    Featured
                                  </Chip>
                                )}
                              </div>
                              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                                {event.Title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {event.ShortDescription.length > 120
                                  ? `${event.ShortDescription.substring(
                                      0,
                                      120
                                    )}...`
                                  : event.ShortDescription}
                              </p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mt-auto">
                                <div className="flex items-center">
                                  <svg
                                    className="h-5 w-5 mr-2 text-yellow-500"
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
                                      className="h-5 w-5 mr-2 text-yellow-500"
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
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              {/* Venue Info Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 mb-8">
                <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Quick Info
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Type
                      </dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        {venue.MainVenue ? "Main Venue" : "Secondary Venue"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        City
                      </dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        {venue.City}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Country
                      </dt>
                      <dd className="mt-1 text-gray-900 dark:text-white">
                        {venue.Country}
                      </dd>
                    </div>
                    {venue.events && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Events
                        </dt>
                        <dd className="mt-1 text-gray-900 dark:text-white">
                          {venue.events.length || 0}{" "}
                          {(venue.events.length || 0) === 1
                            ? "Event"
                            : "Events"}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="p-6">
                  <Button
                    variant="primary"
                    href="/events"
                    className="w-full mb-3"
                  >
                    Browse Events
                  </Button>
                  <Button
                    variant="dark"
                    buttonType="outline"
                    href="/contact"
                    className="w-full dark:border-white dark:text-white"
                  >
                    Contact for Inquiries
                  </Button>
                </div>
              </div>

              {/* Facility Features */}
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative mb-8">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-6">Venue Facilities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <span>
                      {venue.MainVenue
                        ? "Main conference halls and exhibition spaces"
                        : "Meeting rooms and specialized facilities"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <span>High-speed WiFi throughout the venue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <span>Modern audio-visual equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <span>Accessibility features for all attendees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <span>On-site catering and refreshments</span>
                  </li>
                </ul>
              </div>

              {/* Share Venue */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Share This Venue
                </h3>
                <div className="flex space-x-6">
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                    className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                    className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                  <button
                    className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
                    aria-label="Share via LinkedIn"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Information */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Getting to {venue.Name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                  01
                </span>
                From Airport
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {venue.City === "Kampala"
                  ? "30-45 minutes from Entebbe International Airport via dedicated shuttle or taxi"
                  : "Available via connecting transport from closest major airport"}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                  02
                </span>
                Public Transport
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accessible via local transport options with dedicated drop-off
                points for UNITE attendees
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                <span className="bg-yellow-500 text-black h-8 w-8 inline-flex items-center justify-center mr-3">
                  03
                </span>
                Shuttle Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complimentary shuttle service available from official partner
                hotels throughout event days
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
                {venue.MainVenue
                  ? "Limited on-site parking available. Advance reservation recommended"
                  : "Parking facilities available nearby with reserved spaces for UNITE attendees"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Venues CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600 mx-auto"></span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Explore All UNITE Expo 2025 Venues
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            UNITE Expo 2025 will take place across multiple premier venues in{" "}
            {venue.City}. Discover all locations and plan your attendance
            accordingly.
          </p>
          <Button variant="primary" size="lg" href="/venue">
            View All Venues
          </Button>
        </div>
      </section>
    </main>
  );
}

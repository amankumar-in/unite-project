"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  Enumeration: string;
  StartDate: string;
  EndDate: string;
  Location: string;
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
  events?: Event[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function SponsorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [eventImages, setEventImages] = useState<{ [slug: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        // Using slug to fetch the sponsor with proper populate
        const response = await fetchAPI(
          `/sponsors?filters[Slug][$eq]=${params.slug}&populate=*`
        );

        if (response && response.data && response.data.length > 0) {
          setSponsor(response.data[0]);

          // If sponsor has events, fetch their images
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
          setError("Sponsor not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsor details:", err);
        setError("Failed to load sponsor details. Please try again later.");
        setLoading(false);
      }
    };

    fetchSponsorData();
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading sponsor details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !sponsor) {
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
            Sponsor Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't find the sponsor you're looking for."}
          </p>
          <Link
            href="/sponsors"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Back to Sponsors
          </Link>
        </div>
      </div>
    );
  }

  // Set tier color
  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return {
          bg: "bg-purple-100",
          text: "text-purple-800",
          border: "border-purple-200",
          accent: "bg-purple-600",
          light: "bg-purple-50",
        };
      case "Gold":
        return {
          bg: "bg-amber-100",
          text: "text-amber-800",
          border: "border-amber-200",
          accent: "bg-amber-500",
          light: "bg-amber-50",
        };
      case "Silver":
        return {
          bg: "bg-slate-100",
          text: "text-slate-800",
          border: "border-slate-200",
          accent: "bg-slate-500",
          light: "bg-slate-50",
        };
      default:
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
          accent: "bg-green-600",
          light: "bg-green-50",
        };
    }
  };

  const tierColor = getTierColor(sponsor.Tier);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section with logo and title */}
      <div
        className={`${tierColor.light} pt-8 pb-12 border-b ${tierColor.border}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div
                className={`absolute inset-0 -m-2 rounded-full ${tierColor.bg} blur-sm opacity-60`}
              ></div>
              <div className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-40 h-40 flex items-center justify-center">
                {sponsor.Logo ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                    alt={sponsor.Name}
                    className="max-h-32 max-w-32 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className =
                          "h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold";
                        fallback.textContent = sponsor.Name.substring(0, 2);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold">
                    {sponsor.Name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Sponsor Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {sponsor.Name}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${tierColor.bg} ${tierColor.text}`}
                  >
                    {sponsor.Tier} Sponsor
                  </span>
                  {sponsor.Featured && (
                    <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Description Preview */}
              <p className="text-gray-600 mt-2 mb-4 max-w-3xl">
                {sponsor.Description.length > 140
                  ? `${sponsor.Description.substring(0, 140)}...`
                  : sponsor.Description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                {sponsor.Website && (
                  <a
                    href={
                      sponsor.Website.startsWith("http")
                        ? sponsor.Website
                        : `https://${sponsor.Website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${tierColor.accent} hover:opacity-90 transition-opacity`}
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                      />
                    </svg>
                    Visit Website
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4 mr-2"
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
                  Contact
                </Link>

                <Link
                  href="/sponsors"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  All Sponsors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sponsored Events */}
          <div className="lg:col-span-2">
            {/* Sponsored Events Section */}
            {sponsor.events && sponsor.events.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
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
                    Sponsored Events
                  </h2>
                  <span
                    className={`px-3 py-1 ${tierColor.bg} ${tierColor.text} rounded-full text-sm font-medium`}
                  >
                    {sponsor.events.length}{" "}
                    {sponsor.events.length === 1 ? "Event" : "Events"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {sponsor.events.map((event) => (
                    <Link
                      href={`/events/${event.Slug}`}
                      key={event.id}
                      className="block group"
                    >
                      <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {/* Event Image - Using image from the additional query */}
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
                                <span>{formatDate(event.StartDate)}</span>
                              </div>

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
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span className="line-clamp-1">
                                  {event.Location}
                                </span>
                              </div>
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
            ) : (
              <div
                className={`p-8 rounded-lg border ${tierColor.border} text-center`}
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No Events
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This sponsor isn't associated with any specific events yet.
                </p>
              </div>
            )}

            {/* About Section */}
            <div className={`mt-12 p-8 rounded-lg border ${tierColor.border}`}>
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
                About {sponsor.Name}
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>{sponsor.Description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sponsor Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tier Card */}
            <div
              className={`rounded-lg border ${tierColor.border} overflow-hidden`}
            >
              <div className={`p-4 ${tierColor.bg}`}>
                <div className="text-center">
                  <span className={`text-xl font-bold ${tierColor.text}`}>
                    {sponsor.Tier} Sponsor
                  </span>
                  <p className="text-xs text-gray-600 mt-1">UNITE Expo 2025</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600">
                  {sponsor.Tier === "Platinum" &&
                    "Platinum sponsors receive maximum visibility and premium placement throughout the event, including prominent logo placement, speaking opportunities, and exclusive networking access."}
                  {sponsor.Tier === "Gold" &&
                    "Gold sponsors enjoy high visibility with logo placement on key materials, exhibition space, and special recognition during the event."}
                  {sponsor.Tier === "Silver" &&
                    "Silver sponsors receive brand exposure through logo placement on event materials and website recognition."}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">
                  Quick Information
                </h3>
              </div>

              <div className="p-5 space-y-4">
                {sponsor.Website && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Website
                    </h4>
                    <a
                      href={
                        sponsor.Website.startsWith("http")
                          ? sponsor.Website
                          : `https://${sponsor.Website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-words"
                    >
                      {sponsor.Website}
                    </a>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Sponsor Since
                  </h4>
                  <p className="text-gray-900">
                    {formatDate(sponsor.createdAt)}
                  </p>
                </div>

                {sponsor.events && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Sponsoring
                    </h4>
                    <p className="text-gray-900">
                      {sponsor.events.length || 0}{" "}
                      {(sponsor.events.length || 0) === 1 ? "Event" : "Events"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Become a Sponsor */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Become a Sponsor
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join leading organizations in supporting UNITE Expo 2025 and
                  gain visibility for your brand.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 text-sm font-medium transition-colors"
                >
                  Request Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

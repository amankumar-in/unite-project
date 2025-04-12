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
    id: number;
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
  sponsoredEvents?: Event[];
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const response = await fetchAPI(
          `/sponsors?filters[Slug][$eq]=${params.slug}&populate=*`
        );

        if (response && response.data && response.data.length > 0) {
          setSponsor(response.data[0]);
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
        };
      case "Gold":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
        };
      case "Silver":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
        };
      default:
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
        };
    }
  };

  const tierColor = getTierColor(sponsor.Tier);

  return (
    <div className="bg-white">
      {/* Compact Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link
          href="/sponsors"
          className="text-green-600 hover:text-green-700 inline-flex items-center text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Sponsors
        </Link>
      </div>

      {/* Sponsor Header - More Compact */}
      <div className={`border-b ${tierColor.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-40 h-40 flex items-center justify-center">
              {sponsor.Logo ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                  alt={sponsor.Name}
                  className="max-h-32 max-w-32 object-contain"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold">
                  {sponsor.Name.substring(0, 2)}
                </div>
              )}
            </div>

            {/* Sponsor Info - Better aligned */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {sponsor.Name}
                </h1>
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

              {/* Description Preview */}
              <p className="text-gray-600 text-sm mt-1 mb-3 line-clamp-2 max-w-2xl">
                {sponsor.Description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                {sponsor.Website && (
                  <a
                    href={
                      sponsor.Website.startsWith("http")
                        ? sponsor.Website
                        : `https://${sponsor.Website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-green-600 text-green-600 hover:bg-green-50 rounded-md text-sm font-medium transition-colors"
                  >
                    <svg
                      className="h-4 w-4 mr-1.5"
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
                    Website
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors"
                >
                  <svg
                    className="h-4 w-4 mr-1.5"
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

                {/* Sponsored Events Count Badge */}
                {sponsor.sponsoredEvents &&
                  sponsor.sponsoredEvents.length > 0 && (
                    <div
                      className={`inline-flex items-center px-3 py-1.5 ${tierColor.bg} ${tierColor.text} rounded-md text-sm font-medium`}
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
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
                      Sponsoring {sponsor.sponsoredEvents.length}{" "}
                      {sponsor.sponsoredEvents.length === 1
                        ? "Event"
                        : "Events"}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Streamlined */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* About Section - Left Column */}
          <div className="lg:col-span-8">
            {/* About */}
            <div className={`p-6 rounded-lg border ${tierColor.border} mb-8`}>
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                About {sponsor.Name}
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>{sponsor.Description}</p>
              </div>
            </div>

            {/* Sponsored Events Section - More compact design */}
            {sponsor.sponsoredEvents && sponsor.sponsoredEvents.length > 0 && (
              <div>
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Sponsored Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sponsor.sponsoredEvents.map((event) => (
                    <Link href={`/events/${event.Slug}`} key={event.id}>
                      <div className="block h-full hover:bg-gray-50 transition-colors duration-200 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4">
                          {/* Event Header */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                                {event.Title}
                              </h3>
                            </div>
                            <div className="shrink-0 ml-2 bg-gray-100 rounded text-center p-1 w-10">
                              <p className="text-xs font-medium text-gray-500">
                                {new Date(event.StartDate).toLocaleDateString(
                                  undefined,
                                  { month: "short" }
                                )}
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {new Date(event.StartDate).getDate()}
                              </p>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="space-y-1 mb-2">
                            <div className="flex items-center text-xs text-gray-600">
                              <svg
                                className="h-3 w-3 mr-1 text-green-500"
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
                            <div className="flex items-center text-xs text-gray-600">
                              <svg
                                className="h-3 w-3 mr-1 text-green-500"
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
                              <span>{formatDate(event.StartDate)}</span>
                            </div>
                          </div>

                          {/* Event Description */}
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {event.ShortDescription}
                          </p>

                          {/* Event Footer */}
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              {event.Enumeration}
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              View Details →
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

          {/* Right Column - Tier info & CTA */}
          <div className="lg:col-span-4">
            {/* Sponsorship Tier Card */}
            <div
              className={`rounded-lg border ${tierColor.border} overflow-hidden mb-6`}
            >
              <div className={`p-4 ${tierColor.bg}`}>
                <div className="text-center">
                  <span className={`text-xl font-bold ${tierColor.text}`}>
                    {sponsor.Tier} Sponsor
                  </span>
                  <p className="text-xs text-gray-600 mt-1">UNITE Expo 2025</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  {sponsor.Tier === "Platinum" &&
                    "Platinum sponsors receive maximum visibility and premium placement throughout the event, including prominent logo placement, speaking opportunities, and exclusive networking access."}
                  {sponsor.Tier === "Gold" &&
                    "Gold sponsors enjoy high visibility with logo placement on key materials, exhibition space, and special recognition during the event."}
                  {sponsor.Tier === "Silver" &&
                    "Silver sponsors receive brand exposure through logo placement on event materials and website recognition."}
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-base font-bold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {sponsor.Website && (
                    <a
                      href={
                        sponsor.Website.startsWith("http")
                          ? sponsor.Website
                          : `https://${sponsor.Website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 text-sm font-medium transition-colors"
                    >
                      Visit Official Website
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className={`block w-full text-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                      sponsor.Website
                        ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                        : "border-transparent text-white bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </div>

            {/* Become a Sponsor Card */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Become a Sponsor
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join leading organizations in supporting UNITE Expo 2025 and
                  gain visibility for your brand.
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center px-3 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 text-sm font-medium transition-colors"
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

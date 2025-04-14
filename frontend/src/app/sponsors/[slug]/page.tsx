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
      <div className="flex justify-center items-center min-h-[60vh] bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-10 w-10 border-2 border-yellow-500 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading sponsor details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !sponsor) {
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
            Sponsor Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "We couldn't find the sponsor you're looking for."}
          </p>
          <Button variant="primary" href="/sponsors">
            Back to Sponsors
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
          href="/sponsors"
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
          Back to Sponsors
        </Link>
      </div>

      {/* Sponsor Header Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sponsor Logo */}
            <div className="lg:col-span-3">
              <div className="relative">
                <div className="aspect-square w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                  {sponsor.Logo ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                      alt={sponsor.Name}
                      className="max-h-32 max-w-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-4xl font-bold">
                      {sponsor.Name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                {/* Accent elements */}
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-blue-600"></div>
              </div>
            </div>

            {/* Sponsor Details */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                <Chip 
                  variant={
                    sponsor.Tier === "Platinum" 
                      ? "primary" 
                      : sponsor.Tier === "Gold" 
                      ? "secondary" 
                      : "outline"
                  } 
                  size="md"
                >
                  {sponsor.Tier} Partner
                </Chip>
                {sponsor.Featured && (
                  <Chip variant="black" size="md">
                    Featured
                  </Chip>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {sponsor.Name}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {sponsor.Description.length > 200
                  ? `${sponsor.Description.substring(0, 200)}...`
                  : sponsor.Description}
              </p>

              <div className="flex flex-wrap gap-4">
                {sponsor.Website && (
                  <Button 
                    variant="primary" 
                    href={sponsor.Website.startsWith("http")
                      ? sponsor.Website
                      : `https://${sponsor.Website}`
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
                  Contact Partner
                </Button>
              </div>
            </div>

            {/* Sponsorship Stats */}
            <div className="lg:col-span-3">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-4">Partner Info</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-bold">Partnership Level</p>
                      <p className="text-sm">{sponsor.Tier} Partner</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-bold">Joined</p>
                      <p className="text-sm">{formatDate(sponsor.createdAt)}</p>
                    </div>
                  </li>
                  {sponsor.events && (
                    <li className="flex items-start">
                      <span className="w-4 h-4 inline-block bg-yellow-500 mt-1 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="font-bold">Supporting</p>
                        <p className="text-sm">
                          {sponsor.events.length}{" "}
                          {sponsor.events.length === 1 ? "Event" : "Events"}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - About & Vision */}
            <div className="lg:col-span-2">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                About {sponsor.Name}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-6">
                {/* Split the description into paragraphs for better readability */}
                {sponsor.Description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Partnership Benefits Section */}
              <div className="mt-16">
                <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Partnership Benefits
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span className="text-blue-600 text-4xl font-bold block mb-3">
                        01
                      </span>
                      Brand Visibility
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Tier === "Platinum"
                        ? "Premium logo placement across all event materials, digital platforms, and venue signage with maximum exposure."
                        : sponsor.Tier === "Gold"
                        ? "Prominent logo placement across select event materials, digital platforms, and venue signage."
                        : "Logo placement on event website and select digital materials."}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span className="text-blue-600 text-4xl font-bold block mb-3">
                        02
                      </span>
                      Event Engagement
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Tier === "Platinum"
                        ? "Keynote speaking opportunity, premium exhibition space, and exclusive networking events with VIP attendees."
                        : sponsor.Tier === "Gold"
                        ? "Panel participation opportunity, standard exhibition space, and access to networking events."
                        : "Exhibition space and standard networking opportunities."}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span className="text-blue-600 text-4xl font-bold block mb-3">
                        03
                      </span>
                      Digital Presence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Tier === "Platinum"
                        ? "Featured content on event website, social media spotlight, and inclusion in all email communications."
                        : sponsor.Tier === "Gold"
                        ? "Company profile on event website, social media mentions, and inclusion in select email communications."
                        : "Basic company listing on event website."}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span className="text-blue-600 text-4xl font-bold block mb-3">
                        04
                      </span>
                      Access & Insights
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Tier === "Platinum"
                        ? "VIP access to all event areas, complimentary tickets for clients, and post-event data insights package."
                        : sponsor.Tier === "Gold"
                        ? "Premium access to main event areas, select complimentary tickets, and basic post-event metrics."
                        : "Standard event access and limited complimentary tickets."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sponsored Events & CTA */}
            <div className="lg:col-span-1">
              {/* Sponsored Events */}
              {sponsor.events && sponsor.events.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 mb-8">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Sponsored Events
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Name} is supporting the following events at UNITE Expo 2025:
                    </p>
                  </div>
                  <div className="p-0">
                    <ul>
                      {sponsor.events.map((event, index) => (
                        <li 
                          key={event.id} 
                          className={index !== sponsor.events!.length - 1 ? "border-b border-gray-200 dark:border-gray-600" : ""}
                        >
                          <Link
                            href={`/events/${event.Slug}`}
                            className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors mb-2">
                                  {event.Title}
                                </h4>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                                  <svg
                                    className="h-4 w-4 mr-2 text-yellow-500"
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
                                  {formatDate(event.StartDate)}
                                </div>
                                <Chip variant="primary" size="sm">
                                  {event.Enumeration}
                                </Chip>
                              </div>
                              <svg
                                className="h-5 w-5 text-gray-400 group-hover:text-yellow-500 transition-colors mt-1"
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
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-6 mb-8">
                  <div className="mb-4">
                    <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 flex items-center justify-center mb-4">
                      <svg
                        className="h-6 w-6"
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      No Events Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {sponsor.Name} hasn't been linked to any specific events yet.
                    </p>
                  </div>
                </div>
              )}

              {/* Become a Sponsor CTA */}
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500"></div>
                <h3 className="text-2xl font-bold mb-4">Join as a Partner</h3>
                <p className="mb-6">
                  Become a UNITE Expo 2025 partner and connect your brand with Uganda's premier investment and trade exhibition.
                </p>
                <Button 
                  variant="light" 
                  buttonType="outline" 
                  href="/contact" 
                  className="border-white text-white dark:border-black dark:text-black"
                >
                  Sponsorship Inquiries
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers CTA */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Partnership Opportunities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                UNITE Expo 2025 offers various partnership levels designed to meet different marketing objectives and budgets. Each tier provides a unique set of benefits and exposure opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/sponsors">
                  View All Partners
                </Button>
                <Button 
                  variant="dark" 
                  buttonType="outline" 
                  href="/contact"
                  className="dark:border-white dark:text-white"
                >
                  Partnership Inquiry
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 flex flex-col items-center">
                  <div className="bg-yellow-500 h-8 w-full mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Platinum
                  </h3>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Premium visibility & engagement
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 flex flex-col items-center">
                  <div className="bg-gray-200 dark:bg-gray-600 h-8 w-full mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Gold
                  </h3>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Enhanced presence
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 flex flex-col items-center">
                  <div className="bg-gray-400 dark:bg-gray-500 h-8 w-full mb-4"></div>
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Silver
                  </h3>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Targeted exposure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
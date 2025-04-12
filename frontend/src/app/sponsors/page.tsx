"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

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
  sponsoredEvents?: Array<{
    id: number;
    Title: string;
    Slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<string>("All");

  const tiers = ["All", "Platinum", "Gold", "Silver"];

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        console.log("Sponsors response:", response);

        if (response && response.data) {
          setSponsors(response.data);
          setFilteredSponsors(response.data);
        } else {
          setError("Failed to retrieve sponsors data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setError("Failed to load sponsors. Please try again later.");
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // Filter sponsors based on tier
  useEffect(() => {
    if (activeTier === "All") {
      setFilteredSponsors(sponsors);
    } else {
      setFilteredSponsors(
        sponsors.filter((sponsor) => sponsor.Tier === activeTier)
      );
    }
  }, [activeTier, sponsors]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Our Sponsors
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Meet the organizations making UNITE Expo 2025 possible
            </p>
          </div>
        </div>
      </section>

      {/* Tier Filters */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeTier === tier
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transition-colors`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Platinum Sponsors - Bigger Display */}
      {(activeTier === "All" || activeTier === "Platinum") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Platinum") && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Platinum Sponsors
              </h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Platinum")
                  .map((sponsor) => (
                    <Link href={`/sponsors/${sponsor.Slug}`} key={sponsor.id}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 h-full flex flex-col">
                        {/* Logo */}
                        <div className="p-8 flex justify-center items-center bg-gray-50 border-b border-gray-200">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-32 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-32 w-full flex items-center justify-center bg-gray-100 text-gray-500 text-xl font-semibold">
                              {sponsor.Name}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">
                              {sponsor.Name}
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Platinum
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                            {sponsor.Description}
                          </p>

                          {sponsor.sponsoredEvents &&
                            sponsor.sponsoredEvents.length > 0 && (
                              <p className="text-sm text-gray-500 mt-auto">
                                Sponsoring {sponsor.sponsoredEvents.length}{" "}
                                {sponsor.sponsoredEvents.length === 1
                                  ? "event"
                                  : "events"}
                              </p>
                            )}

                          <div className="mt-4">
                            <span className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700">
                              View Sponsor
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
            </div>
          </section>
        )}

      {/* Gold Sponsors */}
      {(activeTier === "All" || activeTier === "Gold") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Gold") && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Gold Sponsors
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Gold")
                  .map((sponsor) => (
                    <Link href={`/sponsors/${sponsor.Slug}`} key={sponsor.id}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 h-full flex flex-col">
                        {/* Logo */}
                        <div className="p-6 flex justify-center items-center bg-gray-50 border-b border-gray-200">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-24 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-24 w-full flex items-center justify-center bg-gray-100 text-gray-500 text-lg font-semibold">
                              {sponsor.Name}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-gray-900">
                              {sponsor.Name}
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Gold
                            </span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                            {sponsor.Description}
                          </p>

                          <div className="mt-3">
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
            </div>
          </section>
        )}

      {/* Silver Sponsors */}
      {(activeTier === "All" || activeTier === "Silver") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Silver") && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Silver Sponsors
              </h2>

              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Silver")
                  .map((sponsor) => (
                    <Link href={`/sponsors/${sponsor.Slug}`} key={sponsor.id}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 h-full flex flex-col">
                        {/* Logo */}
                        <div className="p-4 flex justify-center items-center bg-gray-50 border-b border-gray-200">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-16 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-16 w-full flex items-center justify-center bg-gray-100 text-gray-500 text-base font-semibold">
                              {sponsor.Name}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 text-center">
                          <h3 className="text-sm font-bold text-gray-900 mb-1">
                            {sponsor.Name}
                          </h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Silver
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading sponsors...</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-20">
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
            Error Loading Sponsors
          </p>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredSponsors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">
            No sponsors found for the selected tier.
          </p>
        </div>
      )}

      {/* Become a Sponsor CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-xl p-8 md:p-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Become a Sponsor
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Showcase your brand to international investors and gain
                  visibility in Uganda's growing market. Multiple sponsorship
                  packages are available to fit your objectives.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Sponsorship Benefits:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Brand visibility at Uganda's premier investment event
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Access to key decision-makers and investors</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Marketing exposure before, during, and after the event
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Opportunity to present your products and services
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Request Sponsorship Information
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
          </div>
        </div>
      </section>
    </div>
  );
}

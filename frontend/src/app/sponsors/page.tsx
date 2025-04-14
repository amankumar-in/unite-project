"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

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

  // Get counts by tier
  const platinumCount = sponsors.filter((s) => s.Tier === "Platinum").length;
  const goldCount = sponsors.filter((s) => s.Tier === "Gold").length;
  const silverCount = sponsors.filter((s) => s.Tier === "Silver").length;

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Sponsors
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Meet the organizations supporting Uganda's economic growth
                through UNITE Expo 2025
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/contact">
                  Sponsorship Enquiries
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="#partners"
                  className="dark:border-white dark:text-white"
                >
                  View Partnership Information
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-8 bg-black text-white dark:bg-white dark:text-black relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h2 className="text-2xl font-bold mb-4">Sponsor Overview</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Platinum Partners: {platinumCount}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Gold Partners: {goldCount}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Silver Partners: {silverCount}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>Total Organizations: {sponsors.length}</span>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sponsorship Tiers
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Filter sponsors by their partnership level
              </p>
            </div>

            <div className="flex flex-wrap">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`px-4 py-2 font-medium mr-0 border border-gray-200 dark:border-gray-600 ${
                    activeTier === tier
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
          <div className="mb-6">
            <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading sponsors...
          </p>
        </div>
      )}

      {error && !loading && (
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
            Error Loading Sponsors
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && filteredSponsors.length === 0 && (
        <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            No Sponsors Found
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No sponsors are currently available in the {activeTier} tier.
          </p>
          <Button variant="primary" onClick={() => setActiveTier("All")}>
            View All Sponsors
          </Button>
        </div>
      )}

      {/* Platinum Sponsors - Bigger Display */}
      {!loading &&
        !error &&
        (activeTier === "All" || activeTier === "Platinum") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Platinum") && (
          <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Platinum Partners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
                Our Platinum partners are instrumental in making UNITE Expo 2025
                a landmark event for Uganda's economic development
              </p>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Platinum")
                  .map((sponsor) => (
                    <Link
                      href={`/sponsors/${sponsor.Slug}`}
                      key={sponsor.id}
                      className="group"
                    >
                      <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 h-full flex flex-col hover:border-yellow-500 transition-colors">
                        {/* Logo */}
                        <div className="p-8 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-32 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-32 w-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-xl font-semibold">
                              {sponsor.Name}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                              {sponsor.Name}
                            </h3>
                            <Chip variant="primary" size="sm">
                              Platinum
                            </Chip>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {sponsor.Description.length > 150
                              ? `${sponsor.Description.substring(0, 150)}...`
                              : sponsor.Description}
                          </p>

                          {sponsor.sponsoredEvents &&
                            sponsor.sponsoredEvents.length > 0 && (
                              <div className="mt-auto mb-4 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                                Sponsoring {sponsor.sponsoredEvents.length}{" "}
                                {sponsor.sponsoredEvents.length === 1
                                  ? "event"
                                  : "events"}
                              </div>
                            )}

                          <div className="flex justify-end">
                            <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                              View Partner
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
            </div>
          </section>
        )}

      {/* Gold Sponsors */}
      {!loading &&
        !error &&
        (activeTier === "All" || activeTier === "Gold") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Gold") && (
          <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Gold Partners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
                Gold partners provide significant support for Uganda's
                investment promotion activities
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Gold")
                  .map((sponsor) => (
                    <Link
                      href={`/sponsors/${sponsor.Slug}`}
                      key={sponsor.id}
                      className="group"
                    >
                      <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 h-full flex flex-col hover:border-yellow-500 transition-colors">
                        {/* Logo */}
                        <div className="p-6 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-24 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-24 w-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-lg font-semibold">
                              {sponsor.Name}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                              {sponsor.Name}
                            </h3>
                            <Chip variant="secondary" size="sm">
                              Gold
                            </Chip>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">
                            {sponsor.Description.length > 100
                              ? `${sponsor.Description.substring(0, 100)}...`
                              : sponsor.Description}
                          </p>

                          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
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
            </div>
          </section>
        )}

      {/* Silver Sponsors */}
      {!loading &&
        !error &&
        (activeTier === "All" || activeTier === "Silver") &&
        filteredSponsors.some((sponsor) => sponsor.Tier === "Silver") && (
          <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Silver Partners
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
                Silver partners contribute to the success of UNITE Expo 2025 and
                Uganda's economic development
              </p>

              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {filteredSponsors
                  .filter((sponsor) => sponsor.Tier === "Silver")
                  .map((sponsor) => (
                    <Link
                      href={`/sponsors/${sponsor.Slug}`}
                      key={sponsor.id}
                      className="group"
                    >
                      <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 h-full hover:border-yellow-500 transition-colors">
                        {/* Logo */}
                        <div className="p-4 h-24 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                          {sponsor.Logo ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                              alt={sponsor.Name}
                              className="max-h-16 max-w-full object-contain"
                            />
                          ) : (
                            <div className="h-16 w-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black text-base font-semibold">
                              {sponsor.Name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 text-center">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors mb-1">
                            {sponsor.Name}
                          </h3>
                          <Chip variant="outline" size="sm">
                            Silver
                          </Chip>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}

      {/* Public-Private Partnership Section */}
      <section
        id="partners"
        className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Public-Private Partnership
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  The UNITE Expo 2025 represents a strategic public-private
                  partnership designed to accelerate Uganda's economic
                  development through increased investment, knowledge transfer,
                  and market access.
                </p>
                <p>
                  This collaboration brings together government institutions,
                  international development partners, and private sector
                  organizations to create a comprehensive platform for economic
                  engagement.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Partnership Framework
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      Government Commitment
                    </h4>
                    <p>
                      The Government of Uganda, through its relevant ministries
                      and agencies, provides policy direction, regulatory
                      framework, and institutional support to ensure the success
                      of the Expo.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      Private Sector Engagement
                    </h4>
                    <p>
                      Private organizations contribute financial resources,
                      technical expertise, and market connections to enhance the
                      Expo's impact and reach.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      International Cooperation
                    </h4>
                    <p>
                      Development partners and international organizations
                      provide technical assistance, capacity building, and
                      international networking opportunities.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      Community Inclusion
                    </h4>
                    <p>
                      Local communities and civil society organizations ensure
                      that development initiatives are inclusive, sustainable,
                      and aligned with the needs of Ugandans.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-6">Economic Impact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-4 h-4 bg-yellow-500 inline-block mt-1 mr-3"></span>
                    <div>
                      <p className="font-bold">$5 Billion</p>
                      <p className="text-sm">Investment target by 2026</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 bg-yellow-500 inline-block mt-1 mr-3"></span>
                    <div>
                      <p className="font-bold">50,000+</p>
                      <p className="text-sm">New jobs to be created</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 bg-yellow-500 inline-block mt-1 mr-3"></span>
                    <div>
                      <p className="font-bold">30%</p>
                      <p className="text-sm">Increase in export volumes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-4 h-4 bg-yellow-500 inline-block mt-1 mr-3"></span>
                    <div>
                      <p className="font-bold">500+</p>
                      <p className="text-sm">International business linkages</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Strategic Focus Areas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
            The UNITE Expo 2025 focuses on key sectors that represent Uganda's
            greatest investment potential and strategic development priorities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
              <div className="text-yellow-500 mb-4">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Agriculture & Agro-processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leveraging Uganda's fertile land and favorable climate to
                develop commercial farming, value addition, and food security
                initiatives.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
              <div className="text-yellow-500 mb-4">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Energy & Minerals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Harnessing Uganda's substantial energy resources including
                hydropower, oil and gas, and renewable energy potential.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
              <div className="text-yellow-500 mb-4">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Manufacturing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building industrial capacity through light manufacturing,
                textiles, pharmaceuticals, and value-added processing.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
              <div className="text-yellow-500 mb-4">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Infrastructure
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Developing critical infrastructure including transportation,
                logistics, real estate, and urban development projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Information CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Partner with UNITE Expo 2025
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join other forward-thinking organizations in supporting Uganda's
                premier investment and trade exhibition. As a sponsor, your
                organization will be recognized as a key contributor to Uganda's
                economic development while gaining visibility with international
                investors, government leaders, and industry stakeholders.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                For detailed information about partnership opportunities, please
                contact the UNITE Expo Secretariat. Our team will provide
                comprehensive information about the available partnership
                packages, benefits, and the application process.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <Button variant="primary" href="/contact">
                Contact Sponsorship Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

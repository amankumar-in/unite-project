"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

// -------------------------------------------------------------------
// Type Definitions
// -------------------------------------------------------------------

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  Image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Speaker {
  id: number;
  Name: string;
  Slug: string;
  Title: string;
  Organization: string;
  ShortBio: string;
  Featured: boolean;
  ProfileImage?: {
    url: string;
  };
}

interface Sponsor {
  id: number;
  Name: string;
  Slug: string;
  Tier: "Platinum" | "Gold" | "Silver";
  Featured: boolean;
  Logo?: {
    url: string;
  };
}

// -------------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------------

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// -------------------------------------------------------------------
// Section Components
// -------------------------------------------------------------------

const HeroSection = () => (
  <section className="relative">
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background using CSS instead of Next.js Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/kampala-skyline.jpg')",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        ></div>
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center bg-blue-600 px-4 py-2 mb-6">
            <span className="text-sm text-white uppercase tracking-wider font-medium">
              July 7-14, 2025 • Kampala, Uganda
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            UGANDA NEXT INVESTMENT & TRADE EXPO
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Connect with East Africa's fastest growing economy and explore $1
            billion+ in investment opportunities
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/tickets">
              Get Tickets
            </Button>
            <Button
              variant="light"
              buttonType="outline"
              size="lg"
              href="/about"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const KeyMetricsSection = () => (
  <section className="bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="flex flex-col justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl md:text-5xl font-bold mr-3">
              $2.9B
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            FDI in 2023
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            79% surge making Uganda Africa's top FDI destination
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl md:text-5xl font-bold mr-3">
              300M+
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            Regional Market
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            Access to East African Community and COMESA markets
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl md:text-5xl font-bold mr-3">
              10.8%
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            Projected Growth
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            IMF forecast for 2025/26 with new oil production
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl md:text-5xl font-bold mr-3">
              50+
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            Participating Countries
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            International delegations and investors joining UNITE 2025
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutExpoSection = () => (
  <section className="py-16 md:py-24 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            About UNITE 2025
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            UNITE (Uganda Next - Investment & Trade Expo) 2025 is the premier
            platform connecting international investors with Uganda's growing
            economy. This week-long expo serves as the official platform for
            regional economic cooperation and investment promotion.
          </p>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            With high-level support from the government and private sector,
            UNITE 2025 convenes business leaders, innovators, and policymakers
            from around the globe to explore opportunities across Uganda's
            rapidly growing economy.
          </p>
          <Button variant="primary" buttonType="outline" href="/about">
            Learn More
          </Button>
        </div>
        <div className="relative">
          <div
            className="aspect-video bg-cover bg-center relative border border-gray-200 dark:border-gray-700"
            style={{ backgroundImage: "url('/images/conference-hall.jpg')" }}
          ></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 -z-10"></div>
        </div>
      </div>
    </div>
  </section>
);

// New FeaturedSpeakersSection (added between AboutExpoSection and WhyUgandaSection)
interface FeaturedSpeakersProps {
  speakers: Speaker[];
  loading: boolean;
}

const FeaturedSpeakersSection = ({
  speakers,
  loading,
}: FeaturedSpeakersProps) => (
  <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Distinguished Speakers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Meet the industry leaders and experts at UNITE Expo 2025
          </p>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/speakers"
          className="mt-4 md:mt-0"
        >
          View All Speakers
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 animate-pulse h-80 border border-gray-200 dark:border-gray-600"
            ></div>
          ))}
        </div>
      ) : speakers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Speaker announcements coming soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <Link
              href={`/speakers/${speaker.Slug}`}
              key={speaker.id}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 h-full">
                <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 relative">
                  {speaker.ProfileImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                      alt={speaker.Name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl font-bold">
                        {speaker.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {speaker.Organization && (
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-1 px-3">
                      <div className="text-xs uppercase tracking-wider truncate">
                        {speaker.Organization}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-white">
                    {speaker.Name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {speaker.Title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

// New Banner Section with gradient background
const BannerSection = () => (
  <section className="w-full border-b border-gray-200 dark:border-gray-700">
    <div
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #004aad 0%, #cb6ce6 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="/events/uganda-s-journey-to-the-digital-age">
          <img
            src="/images/banner-1.svg"
            alt="Banner"
            className="w-full h-auto block"
          />
        </a>
      </div>
    </div>
  </section>
);

// 4 card grid section with image and text - 4 in 1 row
const WhyUgandaSection = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block mb-3 h-1 w-16 bg-blue-600 mx-auto"></span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Why Uganda?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Uganda offers compelling advantages for international investors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-8">
          <span className="inline-block bg-yellow-500 px-3 py-1 text-black text-sm uppercase tracking-wider mb-4">
            Strategic Location
          </span>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Gateway to East Africa
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Uganda offers strategic access to the East African Community (EAC),
            a regional common market of over 300 million consumers through
            harmonized trade policies and strategic trade corridors.
          </p>
          <div
            className="aspect-video bg-cover bg-center mt-6"
            style={{ backgroundImage: "url('/images/east-africa-map.jpg')" }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-8">
          <span className="inline-block bg-yellow-500 px-3 py-1 text-black text-sm uppercase tracking-wider mb-4">
            Robust Growth
          </span>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Economic Powerhouse
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            One of Africa's fastest-growing economies with consistent 5% annual
            growth. The IMF projects 10.8% GDP growth in 2025/26 with new oil
            production beginning. FDI inflows surged 79% to $2.9 billion in
            2023.
          </p>
          <div
            className="aspect-video bg-cover bg-center mt-6"
            style={{
              backgroundImage: "url('/images/economic-powerhouse.jpeg')",
            }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-8">
          <span className="inline-block bg-yellow-500 px-3 py-1 text-black text-sm uppercase tracking-wider mb-4">
            Natural Resources
          </span>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Resource Rich
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Uganda has 6.5 billion barrels in oil reserves set to begin
            production by 2025. It's the world's 8th largest coffee producer
            (2nd in Africa) and a leading exporter of tea, fish, and other
            commodities.
          </p>
          <div
            className="aspect-video bg-cover bg-center mt-6"
            style={{ backgroundImage: "url('/images/natural-resources.jpg')" }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-8">
          <span className="inline-block bg-yellow-500 px-3 py-1 text-black text-sm uppercase tracking-wider mb-4">
            Investment Climate
          </span>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Investor-Friendly Policies
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A One-Stop Center provides quick services: investment licensing (24
            hours), business registration (4 hours). Generous incentives include
            a 10-year tax holiday for strategic-sector investments.
          </p>
          <div
            className="aspect-video bg-cover bg-center mt-6"
            style={{ backgroundImage: "url('/images/business-meeting.jpg')" }}
          ></div>
        </div>
      </div>
    </div>
  </section>
);

// Image background CTA - Call to action section
const FullWidthBannerSection = () => (
  <section className="relative py-24">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/uganda-landscape.jpg')" }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>
    </div>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Uganda's Journey to A Digital Age
      </h2>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        UNITE 2025 is part of Uganda's broader strategy to attract $5 billion in
        foreign direct investment by 2026, diversify the economy, and create
        sustainable jobs for its growing population.
      </p>
      <Button variant="primary" size="lg" href="/tickets">
        Register For UNITE
      </Button>
    </div>
  </section>
);

// 4 card grid section with image and text
const StrategicSectorsSection = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Strategic Investment Sectors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Discover high-potential sectors driving Uganda's economic
            transformation
          </p>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/about"
          className="mt-4 md:mt-0"
        >
          Explore All Sectors
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coffee & Agriculture Sector */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div
              className="aspect-square md:col-span-2 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/coffee-beans.jpg')",
              }}
            ></div>
            <div className="p-6 md:col-span-3">
              <span className="text-yellow-500 text-3xl font-bold block mb-3">
                01
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Coffee & Agriculture
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Uganda is the world's 8th largest coffee producer and 2nd in
                Africa. Opportunities include value-added processing, commercial
                farming, and agro-exports with $1.5B+ annual agricultural
                exports.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    World's 8th largest coffee producer
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    30% of national GDP from agriculture
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Energy & Oil Sector */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="p-6 md:col-span-3">
              <span className="text-yellow-500 text-3xl font-bold block mb-3">
                02
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Energy & Oil
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With 6.5 billion barrels in oil reserves and production
                beginning in 2025, Uganda's energy sector will drive
                double-digit economic growth with $15B+ in energy sector
                investments underway.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    6.5 billion barrels of oil reserves
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    East African Crude Oil Pipeline development
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="aspect-square md:col-span-2 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/oil-production.jpg')" }}
            ></div>
          </div>
        </div>

        {/* Technology & Innovation Sector */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div
              className="aspect-square md:col-span-2 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/technology-hub.jpg')" }}
            ></div>
            <div className="p-6 md:col-span-3">
              <span className="text-yellow-500 text-3xl font-bold block mb-3">
                03
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Technology & Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Uganda's emerging tech ecosystem is fueled by one of the world's
                youngest populations, with a median age of just 16.7 years.
                Opportunities in tech hubs, BPO, software development, and
                digital infrastructure.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Vibrant startup and innovation hubs
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Rapidly growing middle class
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tourism & Hospitality Sector */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="p-6 md:col-span-3">
              <span className="text-yellow-500 text-3xl font-bold block mb-3">
                04
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Tourism & Hospitality
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Home to exceptional biodiversity and natural attractions, Uganda
                offers significant opportunities in eco-tourism, luxury
                accommodation, adventure tourism, and cultural tourism
                investments.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    World-renowned wildlife and natural beauty
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 bg-blue-600 mt-0.5 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    Growing international tourism interest
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="aspect-square md:col-span-2 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/tourism-wildlife.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MiddleCTASection = () => (
  <section className="bg-blue-600 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
        Early Bird Registration Now Open
      </h2>
      <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
        Secure your place at East Africa's premier investment summit with early
        bird rates available until December 31, 2024
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="primary" size="lg" href="/tickets">
          Get Tickets
        </Button>
        <Button variant="light" buttonType="outline" size="lg" href="/contact">
          Contact Us
        </Button>
      </div>
    </div>
  </section>
);

const ImageGallerySection = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block mb-3 h-1 w-16 bg-yellow-500 mx-auto"></span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Discover Uganda
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A land of opportunity and natural beauty
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div
          className="aspect-square bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kampala-skyline.jpg')" }}
        ></div>
        <div
          className="aspect-square col-span-2 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/coffee-beans.jpg')" }}
        ></div>
        <div
          className="aspect-square bg-cover bg-center"
          style={{ backgroundImage: "url('/images/technology-hub.jpg')" }}
        ></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="aspect-square bg-cover bg-center"
          style={{ backgroundImage: "url('/images/oil-production.jpg')" }}
        ></div>
        <div
          className="aspect-square bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/economic-powerhouse.jpg')",
          }}
        ></div>
        <div
          className="aspect-square col-span-2 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/natural-resources.jpg')" }}
        ></div>
      </div>
    </div>
  </section>
);

// Image Slider Section
const ImageSliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: "url('/images/slider-conference.jpg')",
      title: "High-Level Networking",
      description:
        "Connect with government officials, industry leaders, and international investors",
    },
    {
      image: "url('/images/slider-agriculture.jpg')",
      title: "Agricultural Innovation",
      description:
        "Explore opportunities in coffee processing, commercial farming, and agro-exports",
    },
    {
      image: "url('/images/slider-energy.jpg')",
      title: "Energy Revolution",
      description:
        "Be part of Uganda's energy transformation with 6.5 billion barrels of oil reserves",
    },
    {
      image: "url('/images/slider-technology.jpg')",
      title: "Tech & Innovation",
      description:
        "Invest in East Africa's emerging technology hub and vibrant startup ecosystem",
    },
    {
      image: "url('/images/slider-infra.webp')",
      title: "Infrastructure Development",
      description:
        "Participate in building Uganda's growing transportation and urban infrastructure",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Key Focus Areas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Seven days of investment opportunities, knowledge sharing, and
            meaningful connections
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div
                      className="aspect-[4/3] bg-cover bg-center"
                      style={{ backgroundImage: slide.image }}
                    ></div>
                    <div className="p-8">
                      <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        {slide.title}
                      </h3>
                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        {slide.description}
                      </p>
                      <Button variant="primary" href="/about">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 w-12 h-12 flex items-center justify-center"
            aria-label="Next slide"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="mt-6 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 ${
                  currentSlide === index
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Image and paragraph - Gateway to East Africa
const TopicSection1 = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Africa's Next Economic Powerhouse
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              Uganda is one of Africa's fastest-growing economies, maintaining a
              consistent annual growth rate of around 5%, despite global
              economic challenges.
            </p>
            <p className="text-lg">
              This growth is set to accelerate dramatically, with the IMF
              projecting a 10.8% GDP growth in FY2025/26 as oil production
              begins. Uganda's Vision 2040 agenda targets transformative growth
              to reach middle-income status.
            </p>
            <p className="text-lg">
              In 2023, FDI inflows surged 79% to $2.9 billion, a testament to
              investor confidence in Uganda's economic future and business
              environment.
            </p>
          </div>
          <div className="mt-8">
            <Button variant="primary" href="/about">
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            className="aspect-[4/3] bg-cover bg-center border border-gray-200 dark:border-gray-700"
            style={{ backgroundImage: "url('/images/uganda-economy.jpg')" }}
          ></div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-500 -z-10"></div>
        </div>
      </div>
    </div>
  </section>
);

// Image and paragraph - Gateway to East Africa
const TopicSection2 = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div
            className="aspect-[4/3] bg-cover bg-center border border-gray-200 dark:border-gray-700"
            style={{ backgroundImage: "url('/images/strategic-location.jpg')" }}
          ></div>
          <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-600 -z-10"></div>
        </div>
        <div className="order-1 md:order-2">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Gateway to East Africa
          </h2>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              Uganda offers strategic access to the East African Community
              (EAC), a regional common market of over 300 million consumers with
              harmonized trade policies.
            </p>
            <p className="text-lg">
              Through Uganda, businesses tap into a broad East and Central
              African market (including COMESA) with strategic trade corridors
              and growing cross-border infrastructure.
            </p>
            <p className="text-lg">
              The country's political stability and pro-business reforms make it
              an ideal base for companies seeking regional expansion in East
              Africa, with Uganda consistently recognized as a top investment
              destination in the region.
            </p>
          </div>
          <div className="mt-8">
            <Button variant="primary" href="/about">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Program highlights - Events grid section
const EventsGridSection = ({ events }: { events: Event[] }) => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Program Highlights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Explore key events during UNITE Expo 2025
          </p>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/events"
          className="mt-4 md:mt-0"
        >
          View All Events
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.length === 0
          ? // Fallback content for when API data isn't loaded
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-600 relative flex items-center justify-center">
                  <span className="text-gray-400">Event Image</span>
                  <div className="absolute top-0 left-0 p-4">
                    <div className="bg-blue-600 px-3 py-1 text-xs uppercase tracking-wider text-white">
                      Day {index + 1}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                    {
                      [
                        "Opening Ceremony",
                        "Investment Forums",
                        "B2B Matchmaking",
                        "Sector Workshops",
                        "Site Visits",
                        "Networking Gala",
                        "Innovation Showcase",
                        "Closing Event",
                      ][index]
                    }
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>July {7 + index}, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Kampala Conference Centre</span>
                  </div>
                </div>
              </div>
            ))
          : // Display actual API data
            events.slice(0, 8).map((event) => (
              <Link
                href={`/events/${event.Slug}`}
                key={event.id}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 group"
              >
                <div className="aspect-[4/3] relative">
                  {event.Image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                      alt={event.Image.alternativeText || event.Title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-400">UNITE 2025</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 p-4">
                    <div className="bg-blue-600 px-3 py-1 text-xs uppercase tracking-wider text-white">
                      {event.Enumeration}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {event.Title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(event.StartDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.Location}</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  </section>
);

// Sponsors grid section
const SponsorsGridSection = ({ sponsors }: { sponsors: Sponsor[] }) => (
  <section className="py-16 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block mb-3 h-1 w-16 bg-yellow-500 mx-auto"></span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          UNITE 2025 Sponsors
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          UNITE Expo 2025 is supported by leading organizations committed to
          Uganda's economic growth
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sponsors.length === 0
          ? // Fallback content for when API data isn't loaded
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center"
              >
                <div className="h-24 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">
                    Partner Logo
                  </span>
                </div>
              </div>
            ))
          : // Display actual API data
            sponsors.slice(0, 8).map((sponsor) => (
              <div
                key={sponsor.id}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600"
              >
                <div className="h-24 w-full flex items-center justify-center">
                  {sponsor.Logo ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                      alt={sponsor.Name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        {sponsor.Name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {sponsor.Name}
                  </div>
                  <div className="mt-1">
                    <Chip
                      variant={
                        sponsor.Tier === "Platinum"
                          ? "primary"
                          : sponsor.Tier === "Gold"
                          ? "secondary"
                          : "danger"
                      }
                      size="sm"
                    >
                      {sponsor.Tier} Sponsor
                    </Chip>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="primary" buttonType="outline" href="/sponsors">
          View All Partners
        </Button>
      </div>
    </div>
  </section>
);

const ExhibitorCTASection = () => (
  <section className="py-16 bg-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become an Exhibitor
          </h2>
          <p className="text-xl mb-8">
            Join over 300 exhibitors connecting with 20,000+ attendees and
            international investors at UNITE Expo 2025.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            Exhibit Your Business
          </Button>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-8">
          <h3 className="text-2xl font-bold mb-6">Exhibitor Benefits</h3>
          <ul className="space-y-4">
            <li className="flex">
              <div className="h-6 w-6 bg-yellow-500 flex-shrink-0 mr-4"></div>
              <span>Direct access to qualified international investors</span>
            </li>
            <li className="flex">
              <div className="h-6 w-6 bg-yellow-500 flex-shrink-0 mr-4"></div>
              <span>Structured B2B matchmaking with potential partners</span>
            </li>
            <li className="flex">
              <div className="h-6 w-6 bg-yellow-500 flex-shrink-0 mr-4"></div>
              <span>Presentation opportunities in sector-specific forums</span>
            </li>
            <li className="flex">
              <div className="h-6 w-6 bg-yellow-500 flex-shrink-0 mr-4"></div>
              <span>Media exposure and investment facilitation support</span>
            </li>
          </ul>
          <div className="mt-8 p-4 bg-gray-800 text-center">
            <p className="font-bold mb-2">Standard Booth (3m x 3m)</p>
            <p className="text-2xl font-bold text-yellow-500">$1,200</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactFormSection = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <div className="space-y-8">
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-600 flex items-center justify-center mr-6">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  General Inquiries: info@uniteexpo.org
                  <br />
                  Exhibitor Support: exhibitors@uniteexpo.org
                  <br />
                  Media Inquiries: media@uniteexpo.org
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-600 flex items-center justify-center mr-6">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Secretariat: +256 417 700 000
                  <br />
                  International Desk: +256 417 700 001
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-600 flex items-center justify-center mr-6">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  UNITE Expo Secretariat
                  <br />
                  Uganda Investment Authority Building
                  <br />
                  Plot 22B, Lumumba Avenue
                  <br />
                  Kampala, Uganda
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 dark:bg-gray-700 p-8 border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Organization Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Inquiry Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  <option>General Inquiry</option>
                  <option>Exhibitor Information</option>
                  <option>Speaker Opportunity</option>
                  <option>Sponsorship</option>
                  <option>Media & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <Button variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SubscribeSection = () => (
  <section className="py-12 bg-blue-600 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <h2 className="text-2xl font-bold mb-2">
            Stay Updated on UNITE Expo 2025
          </h2>
          <p className="text-white text-opacity-80">
            Subscribe to receive news, program updates, and investment
            opportunities
          </p>
        </div>
        <div className="md:col-span-4">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
            />
            <Button variant="primary">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// -------------------------------------------------------------------
// Main HomePage Component
// -------------------------------------------------------------------

export default function HomePage() {
  // State for API data
  const [events, setEvents] = useState<Event[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]); // New state for speakers
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState({
    events: true,
    speakers: true, // New loading state for speakers
    sponsors: true,
  });

  // Fetch events - using actual endpoint from original code
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchAPI(
          "/events?populate=*&sort=StartDate:asc&pagination[limit]=8"
        );
        if (response && response.data) {
          setEvents(response.data);
        }
        setLoading((prev) => ({ ...prev, events: false }));
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading((prev) => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  // New effect for fetching featured speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetchAPI(
          "/speakers?filters[Featured][$eq]=true&populate=*&pagination[limit]=8"
        );
        if (response && response.data) {
          setSpeakers(response.data);
        }
        setLoading((prev) => ({ ...prev, speakers: false }));
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setLoading((prev) => ({ ...prev, speakers: false }));
      }
    };
    fetchSpeakers();
  }, []);

  // Fetch sponsors - using actual endpoint from original code
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        if (response && response.data) {
          setSponsors(response.data);
        }
        setLoading((prev) => ({ ...prev, sponsors: false }));
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setLoading((prev) => ({ ...prev, sponsors: false }));
      }
    };
    fetchSponsors();
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900">
      <HeroSection />
      <KeyMetricsSection />
      <AboutExpoSection />
      {/* New FeaturedSpeakersSection added here */}
      <FeaturedSpeakersSection speakers={speakers} loading={loading.speakers} />
      <BannerSection />
      <WhyUgandaSection />
      <FullWidthBannerSection />
      <EventsGridSection events={events} />
      <StrategicSectorsSection />
      <MiddleCTASection />
      <SponsorsGridSection sponsors={sponsors} />
      {/* hiding below image gallery */}
      {/* <ImageGallerySection /> */}
      <TopicSection1 />
      <ImageSliderSection />
      <TopicSection2 />

      <ExhibitorCTASection />
      <ContactFormSection />
      <SubscribeSection />
    </main>
  );
}

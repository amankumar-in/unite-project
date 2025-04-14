"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";

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
  <section className="relative bg-white dark:bg-gray-900">
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background image with demo path to public/next.svg */}
      <div className="absolute inset-0">
        <Image
          src="/next.svg"
          alt="Background image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center bg-blue-600 px-4 py-2 mb-6">
            <span className="text-sm text-white uppercase tracking-wider font-medium">
              July 7-14, 2025 • Kampala, Uganda
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            UGANDA NEXT INVESTMENT & TRADE EXPO
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            The official platform for regional economic cooperation and
            investment promotion
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/tickets">
              Register Now
            </Button>
            <Button
              variant="light"
              buttonType="outline"
              size="lg"
              href="/about"
            >
              Program Details
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
              $35B
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            GDP (2023)
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            Uganda's growing economy with 5.3% annual growth rate
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
              50+
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            Participating Countries
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            International delegations and trade representatives
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl md:text-5xl font-bold mr-3">
              300+
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300 mt-2">
            Exhibition Booths
          </div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">
            Showcasing public and private sector organizations
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Why UNITE Expo 2025?
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Uganda Next - Investment & Trade Expo (UNITE) 2025 is the premier
            platform connecting international investors with Uganda's growing
            economy.
          </p>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            Located in the heart of East Africa, Uganda offers strategic access
            to a market of over 300 million people, abundant natural resources,
            and one of the world's youngest populations.
          </p>
          <Button variant="primary" buttonType="outline" href="/about">
            More About UNITE
          </Button>
        </div>
        <div className="col-span-12 md:col-span-7">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <span className="text-yellow-500 text-4xl font-bold block mb-3">
                01
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Strategic Location
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gateway to East Africa with access to multiple regional markets
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <span className="text-yellow-500 text-4xl font-bold block mb-3">
                02
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Young Population
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Median age of 16.7 years with a rapidly growing middle class
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <span className="text-yellow-500 text-4xl font-bold block mb-3">
                03
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Natural Resources
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Abundant agricultural land, minerals, and energy potential
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <span className="text-yellow-500 text-4xl font-bold block mb-3">
                04
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Tech Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Emerging technology hub with growing startup ecosystem
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const InvestmentMetricsSection = () => (
  <section className="bg-white dark:bg-gray-800 py-16 border-t border-b border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Investment Opportunities
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            UNITE Expo 2025 showcases diverse investment opportunities across
            Uganda's most promising sectors, connecting you directly with key
            stakeholders.
          </p>
          <Button variant="primary" buttonType="outline" href="/contact">
            Become an Exhibitor
          </Button>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 relative">
              <div className="absolute top-0 right-0 h-12 w-12 bg-yellow-500"></div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                120+
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Franchise Opportunities
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 relative">
              <div className="absolute top-0 right-0 h-12 w-12 bg-gray-900"></div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                80+
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Funding Partnerships
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 relative">
              <div className="absolute top-0 right-0 h-12 w-12 bg-yellow-500"></div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                200+
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Supplier Connections
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 relative">
              <div className="absolute top-0 right-0 h-12 w-12 bg-gray-900"></div>
              <div className="text-3xl font-bold mb-1 text-gray-900 dark:text-white">
                50+
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
                Joint Ventures
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const GovernmentPartnersSection = () => (
  <section className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Organizing Partners
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          UNITE Expo 2025 is organized by the following governmental bodies and
          agencies
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 h-20 w-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-400 text-xs">Ministry Logo</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white">
            Ministry of Trade, Industry and Cooperatives
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 h-20 w-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-400 text-xs">UIA Logo</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white">
            Uganda Investment Authority
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 h-20 w-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-400 text-xs">UNBS Logo</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white">
            Uganda National Bureau of Standards
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-24 flex items-center justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 h-20 w-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <span className="text-gray-400 text-xs">PSFU Logo</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white">
            Private Sector Foundation Uganda
          </h3>
        </div>
      </div>
    </div>
  </section>
);

interface FeaturedEventsProps {
  events: Event[];
  loading: boolean;
}

const FeaturedEventsSection = ({ events, loading }: FeaturedEventsProps) => (
  <section className="py-16 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Programme Highlights
          </h2>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/events"
          className="mt-4 md:mt-0"
        >
          View Complete Schedule
        </Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 animate-pulse h-96 border border-gray-200 dark:border-gray-600"
            ></div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Programme details will be announced soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              href={`/events/${event.Slug}`}
              key={event.id}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 h-full flex flex-col">
                <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-600">
                  {event.Image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                      alt={event.Image.alternativeText || event.Title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-xl">UNITE 2025</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 p-4">
                    <span className="bg-blue-600 px-3 py-1 text-xs uppercase tracking-wider text-white">
                      {event.Enumeration}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
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
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {formatDate(event.StartDate)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-white">
                    {event.Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {event.ShortDescription.length > 120
                      ? `${event.ShortDescription.substring(0, 120)}...`
                      : event.ShortDescription}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

interface FeaturedSpeakersProps {
  speakers: Speaker[];
  loading: boolean;
}

const FeaturedSpeakersSection = ({
  speakers,
  loading,
}: FeaturedSpeakersProps) => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Distinguished Speakers
          </h2>
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

const CTASection = () => (
  <section className="bg-gray-900 py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
        Join Us at UNITE Expo 2025
      </h2>
      <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-300">
        Be part of Uganda's premier investment and trade exhibition. Connect
        with international investors, discover opportunities, and showcase your
        business.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="primary" size="lg" href="/tickets">
          Get Your Tickets
        </Button>
        <Button variant="light" buttonType="outline" size="lg" href="/contact">
          Exhibit Your Business
        </Button>
      </div>
    </div>
  </section>
);

const RegistrationSection = () => (
  <section className="bg-gray-900 py-16 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-10 md:mb-0 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Registration Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-5 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-white">
                Delegate Registration
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Early Bird: $150 (Until December 31, 2024)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Standard: $250 (January - February 2025)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Late Registration: $350 (March 2025)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-5 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-white">
                Exhibitor Registration
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Standard Booth (3m x 3m): $1,200</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Premium Booth (6m x 3m): $2,000</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Includes 2 exhibitor passes per booth</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-gray-300">
            All registrations include access to conference sessions, exhibition
            area, networking events, and official documentation. Special rates
            are available for government delegations, NGOs, and academic
            institutions.
          </p>
        </div>
        <div className="md:w-1/3 bg-white dark:bg-gray-700 p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Register Your Interest
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Organization
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Interested in
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                <option>Attending as a delegate</option>
                <option>Exhibiting</option>
                <option>Speaking opportunity</option>
                <option>Media partnership</option>
                <option>Sponsorship</option>
              </select>
            </div>
            <Button variant="primary" className="w-full">
              Register Interest
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const ContactSubscribeSection = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Contact Information
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                <svg
                  className="h-5 w-5 text-white"
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  General Inquiries: info@uniteexpo.org
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Media Inquiries: media@uniteexpo.org
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Exhibitor Support: exhibitors@uniteexpo.org
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                <svg
                  className="h-5 w-5 text-white"
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Secretariat: +256 417 700 000
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  International Desk: +256 417 700 001
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
                <svg
                  className="h-5 w-5 text-white"
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Office Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  UNITE Expo Secretariat
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Uganda Investment Authority Building
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Plot 22B, Lumumba Avenue
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Kampala, Uganda
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Stay Informed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Subscribe to receive updates about UNITE Expo 2025, including
            programme announcements, speaker confirmations, and important
            deadlines.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Organization
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                placeholder="Organization name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Areas of Interest
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Agriculture
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Technology
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Manufacturing
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Energy
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Tourism
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Infrastructure
                  </span>
                </label>
              </div>
            </div>
            <Button variant="primary" className="w-full">
              Subscribe to Updates
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By subscribing, you consent to receive communications about UNITE
            Expo 2025. You can unsubscribe at any time. View our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const PracticalInformationSection = () => (
  <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Visitor Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Essential information for international delegates attending UNITE Expo
          2025
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-start mb-4">
            <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Visa Requirements
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Most visitors require a visa to enter Uganda. E-visas can be
            obtained online through the official immigration portal. UNITE
            delegates qualify for expedited processing.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Visa Information →
          </a>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-start mb-4">
            <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Health Requirements
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Yellow fever vaccination is required for entry. Health insurance
            covering international travel is recommended for all delegates.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Health Advisory →
          </a>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-start mb-4">
            <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
              <svg
                className="h-5 w-5 text-white"
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Transportation
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Entebbe International Airport is the main gateway. Airport transfers
            will be provided for registered delegates. Local transport options
            include taxi services and special shuttle buses.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Transport Information →
          </a>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-start mb-4">
            <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Accommodation
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Special rates are available at partner hotels near the venue. Early
            booking is recommended as availability may be limited.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Hotel Information →
          </a>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-8 border border-gray-200 dark:border-gray-600">
        <div className="flex items-start mb-6">
          <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mr-4">
            <svg
              className="h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Delegate Information Pack
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Download our comprehensive guide for international delegates, covering
          all aspects of your visit to Uganda including cultural norms, business
          etiquette, currency information, and emergency contacts.
        </p>
        <Button variant="primary" buttonType="outline">
          Download Information Pack
        </Button>
      </div>
    </div>
  </section>
);

// -------------------------------------------------------------------
// Main HomePage Component
// -------------------------------------------------------------------

export default function HomePage() {
  // State for dynamic data
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [featuredSpeakers, setFeaturedSpeakers] = useState<Speaker[]>([]);
  const [sponsors, setSponsors] = useState<{
    platinum: Sponsor[];
    gold: Sponsor[];
    silver: Sponsor[];
  }>({
    platinum: [],
    gold: [],
    silver: [],
  });
  const [loading, setLoading] = useState({
    events: true,
    speakers: true,
    sponsors: true,
  });

  // Fetch featured events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchAPI(
          "/events?filters[FeaturedEvent][$eq]=true&populate=*&sort=StartDate:asc&pagination[limit]=3"
        );
        if (response && response.data) {
          setFeaturedEvents(response.data);
        }
        setLoading((prev) => ({ ...prev, events: false }));
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading((prev) => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  // Fetch featured speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetchAPI(
          "/speakers?filters[Featured][$eq]=true&populate=*&pagination[limit]=4"
        );
        if (response && response.data) {
          setFeaturedSpeakers(response.data);
        }
        setLoading((prev) => ({ ...prev, speakers: false }));
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setLoading((prev) => ({ ...prev, speakers: false }));
      }
    };
    fetchSpeakers();
  }, []);

  // Fetch sponsors
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        if (response && response.data) {
          const platinumSponsors = response.data.filter(
            (sponsor: Sponsor) => sponsor.Tier === "Platinum"
          );
          const goldSponsors = response.data.filter(
            (sponsor: Sponsor) => sponsor.Tier === "Gold"
          );
          const silverSponsors = response.data.filter(
            (sponsor: Sponsor) => sponsor.Tier === "Silver"
          );
          setSponsors({
            platinum: platinumSponsors,
            gold: goldSponsors,
            silver: silverSponsors,
          });
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
    <main className="bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <KeyMetricsSection />
      <AboutSection />
      <InvestmentMetricsSection />
      <GovernmentPartnersSection />
      <FeaturedEventsSection events={featuredEvents} loading={loading.events} />
      <FeaturedSpeakersSection
        speakers={featuredSpeakers}
        loading={loading.speakers}
      />
      <CTASection />
      <RegistrationSection />
      <ContactSubscribeSection />
      <PracticalInformationSection />
    </main>
  );
}

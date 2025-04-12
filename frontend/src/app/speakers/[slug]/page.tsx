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
  Location: string;
  RoomNumber?: string;
  StartDate: string;
  EndDate: string;
  FeaturedEvent: boolean;
}

interface Speaker {
  id: number;
  Name: string;
  Slug: string;
  Title: string;
  Organization: string;
  ShortBio: string;
  Bio: string;
  Featured: boolean;
  ProfileImage?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  LinkedIn?: string;
  Twitter?: string;
  Website?: string;
  events?: Event[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function SpeakerDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        // Using slug to fetch the speaker
        const response = await fetchAPI(
          `/speakers?filters[Slug][$eq]=${params.slug}&populate=*`
        );
        console.log("Speaker detail response:", response);

        if (response && response.data && response.data.length > 0) {
          setSpeaker(response.data[0]);
        } else {
          setError("Speaker not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching speaker details:", err);
        setError("Failed to load speaker details. Please try again later.");
        setLoading(false);
      }
    };

    fetchSpeakerData();
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
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading speaker profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !speaker) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Speaker Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find the speaker you're looking for."}
          </p>
          <Link
            href="/speakers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Back to Speakers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/speakers"
          className="text-green-600 hover:text-green-700 inline-flex items-center text-sm font-medium"
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
          Back to Speakers
        </Link>
      </div>

      {/* Speaker Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Speaker Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0 md:mr-8">
                {speaker.ProfileImage ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                    alt={speaker.Name}
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="h-40 w-40 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl">
                    {speaker.Name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Speaker Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {speaker.Name}
                  </h1>
                  {speaker.Featured && (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-xl text-green-100 mb-2">{speaker.Title}</p>
                <p className="text-green-200">{speaker.Organization}</p>

                {/* Social Links */}
                <div className="mt-4 flex justify-center md:justify-start space-x-4">
                  {speaker.LinkedIn && (
                    <a
                      href={
                        speaker.LinkedIn.startsWith("http")
                          ? speaker.LinkedIn
                          : `https://${speaker.LinkedIn}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-200 hover:text-white transition-colors"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}

                  {speaker.Twitter && (
                    <a
                      href={
                        speaker.Twitter.startsWith("http")
                          ? speaker.Twitter
                          : `https://${speaker.Twitter}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-200 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}

                  {speaker.Website && (
                    <a
                      href={
                        speaker.Website.startsWith("http")
                          ? speaker.Website
                          : `https://${speaker.Website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-200 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Website</span>
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
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Event Count Badge */}
            {speaker.events && speaker.events.length > 0 && (
              <div className="mt-8 md:mt-0 text-center md:text-right">
                <div className="inline-block bg-green-800 bg-opacity-50 rounded-lg px-4 py-2">
                  <p className="text-sm text-green-200">Speaking at</p>
                  <p className="text-2xl font-bold">
                    {speaker.events.length}{" "}
                    {speaker.events.length === 1 ? "Event" : "Events"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Bio */}
          <div className="lg:col-span-2">
            {/* Speaker Bio */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About {speaker.Name}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{speaker.Bio || speaker.ShortBio}</p>
              </div>
            </div>

            {/* Speaker's Events Section */}
            {speaker.events && speaker.events.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Speaking At
                </h2>
                <div className="space-y-6">
                  {speaker.events.map((event) => (
                    <Link href={`/events/${event.Slug}`} key={event.id}>
                      <div className="block hover:bg-gray-50 transition-colors duration-200 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6">
                          {/* Event Title and Badges */}
                          <div className="flex flex-wrap items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {event.Title}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {event.Enumeration}
                                </span>
                                {event.FeaturedEvent && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Event Date */}
                            <div className="shrink-0 text-center bg-gray-100 rounded-lg p-2 ml-4 mt-1 hidden sm:block">
                              <p className="text-xs font-medium text-gray-500 uppercase">
                                {new Date(event.StartDate).toLocaleDateString(
                                  undefined,
                                  { month: "short" }
                                )}
                              </p>
                              <p className="text-lg font-bold text-gray-800">
                                {new Date(event.StartDate).getDate()}
                              </p>
                            </div>
                          </div>

                          {/* Event Time and Location */}
                          <div className="mt-2 mb-4 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="flex-shrink-0 h-4 w-4 mr-2 text-green-500"
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
                                {formatDate(event.StartDate)},{" "}
                                {formatTime(event.StartDate)}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                              <svg
                                className="flex-shrink-0 h-4 w-4 mr-2 text-green-500"
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
                                {event.RoomNumber &&
                                  ` • Room ${event.RoomNumber}`}
                              </span>
                            </div>
                          </div>

                          {/* Event Description */}
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {event.ShortDescription}
                          </p>

                          {/* Event Link */}
                          <div className="flex justify-end">
                            <span className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                              View Event Details
                              <svg
                                className="ml-1 h-5 w-5"
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
            )}
          </div>

          {/* Right Column - Contact & Additional Info */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contact {speaker.Name}
                </h3>

                <p className="text-gray-600 mb-6">
                  Interested in connecting with {speaker.Name.split(" ")[0]}?
                  You can reach out via social media or contact our team for
                  introduction opportunities.
                </p>

                <Link
                  href="/contact"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Contact Our Team
                </Link>
              </div>

              {/* Speaker Details */}
              {(speaker.Organization || speaker.Title) && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Professional Details
                  </h3>

                  <div className="space-y-3">
                    {speaker.Title && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Position
                        </h4>
                        <p className="mt-1 text-gray-900">{speaker.Title}</p>
                      </div>
                    )}

                    {speaker.Organization && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Organization
                        </h4>
                        <p className="mt-1 text-gray-900">
                          {speaker.Organization}
                        </p>
                      </div>
                    )}

                    {(speaker.LinkedIn ||
                      speaker.Twitter ||
                      speaker.Website) && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Connect
                        </h4>
                        <div className="mt-2 flex space-x-4">
                          {speaker.LinkedIn && (
                            <a
                              href={
                                speaker.LinkedIn.startsWith("http")
                                  ? speaker.LinkedIn
                                  : `https://${speaker.LinkedIn}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <span className="sr-only">LinkedIn</span>
                              <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </a>
                          )}

                          {speaker.Twitter && (
                            <a
                              href={
                                speaker.Twitter.startsWith("http")
                                  ? speaker.Twitter
                                  : `https://${speaker.Twitter}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          )}

                          {speaker.Website && (
                            <a
                              href={
                                speaker.Website.startsWith("http")
                                  ? speaker.Website
                                  : `https://${speaker.Website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <span className="sr-only">Website</span>
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
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Share Profile */}
              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Share Profile
                </h3>
                <div className="flex space-x-4">
                  <button
                    className="text-gray-400 hover:text-gray-500 transition-colors"
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
                    className="text-gray-400 hover:text-gray-500 transition-colors"
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
                    className="text-gray-400 hover:text-gray-500 transition-colors"
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

      {/* Explore More Speakers CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore More Speakers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover other industry experts at UNITE Expo 2025
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/speakers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              View All Speakers
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

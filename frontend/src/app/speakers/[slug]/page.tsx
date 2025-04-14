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
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-10 w-10 border-2 border-yellow-500 border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading speaker profile...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !speaker) {
    return (
      <main className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
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
            Speaker Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "We couldn't find the speaker you're looking for."}
          </p>
          <Button variant="primary" href="/speakers">
            Back to Speakers
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
          href="/speakers"
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
          Back to Speakers
        </Link>
      </div>

      {/* Speaker Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Speaker Image */}
            <div className="md:col-span-3 lg:col-span-2">
              <div className="relative">
                <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700">
                  {speaker.ProfileImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                      alt={speaker.Name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black dark:bg-white">
                      <span className="text-white dark:text-black text-6xl font-bold">
                        {speaker.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-blue-600"></div>
              </div>
            </div>

            {/* Speaker Info */}
            <div className="md:col-span-9 lg:col-span-7">
              <div className="mb-6">
                <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  {speaker.Name}
                </h1>

                <div className="flex items-center mb-4">
                  {speaker.Featured && (
                    <Chip variant="primary" size="md" className="mr-2">
                      Featured
                    </Chip>
                  )}
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {speaker.Title}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {speaker.Organization}
                </p>

                {/* Social Links */}
                <div className="flex space-x-6">
                  {speaker.LinkedIn && (
                    <a
                      href={
                        speaker.LinkedIn.startsWith("http")
                          ? speaker.LinkedIn
                          : `https://${speaker.LinkedIn}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
                      aria-label="LinkedIn"
                    >
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
                      className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
                      aria-label="Twitter"
                    >
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
                      className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
                      aria-label="Website"
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
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Event Count */}
            <div className="md:col-span-12 lg:col-span-3">
              {speaker.events && speaker.events.length > 0 && (
                <div className="bg-black text-white dark:bg-white dark:text-black p-6 relative">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
                  <h3 className="text-xl font-bold mb-4">Speaking Events</h3>
                  <div className="text-3xl font-bold mb-2">
                    {speaker.events.length}
                  </div>
                  <p>
                    {speaker.events.length === 1
                      ? "Scheduled session"
                      : "Scheduled sessions"}
                  </p>
                  <Button
                    variant="light"
                    buttonType="outline"
                    href="#events"
                    className="mt-4 border-white text-white dark:border-black dark:text-black"
                  >
                    View Schedule
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Bio */}
            <div className="lg:col-span-2">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                About {speaker.Name}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>{speaker.Bio || speaker.ShortBio}</p>
              </div>
            </div>

            {/* Right Column - Contact & Details */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Contact {speaker.Name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Interested in connecting with {speaker.Name.split(" ")[0]}?
                    You can reach out via social media or contact our team for
                    introduction opportunities.
                  </p>

                  <Button variant="primary" href="/contact" className="w-full">
                    Contact Our Team
                  </Button>
                </div>

                {/* Speaker Details */}
                {(speaker.Organization || speaker.Title) && (
                  <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Professional Details
                    </h3>

                    <div className="space-y-4">
                      {speaker.Title && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Position
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {speaker.Title}
                          </p>
                        </div>
                      )}

                      {speaker.Organization && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Organization
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {speaker.Organization}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Share Profile */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Share Profile
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
        </div>
      </section>

      {/* Speaker's Events Section */}
      {speaker.events && speaker.events.length > 0 && (
        <section
          id="events"
          className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Speaking Sessions
            </h2>
            <div className="space-y-8">
              {speaker.events.map((event) => (
                <Link
                  href={`/events/${event.Slug}`}
                  key={event.id}
                  className="group block"
                >
                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Event Date Block */}
                        <div className="md:col-span-2 lg:col-span-1">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600">
                            <div className="text-center">
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                                {new Date(event.StartDate).toLocaleDateString(
                                  undefined,
                                  { month: "short" }
                                )}
                              </p>
                              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {new Date(event.StartDate).getDate()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="md:col-span-10 lg:col-span-11">
                          <div className="flex flex-wrap items-start justify-between">
                            <div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Chip variant="primary" size="sm">
                                  {event.Enumeration}
                                </Chip>
                                {event.FeaturedEvent && (
                                  <Chip variant="accent" size="sm">
                                    Featured
                                  </Chip>
                                )}
                              </div>

                              <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                                {event.Title}
                              </h3>
                            </div>
                          </div>

                          {/* Event Time and Location */}
                          <div className="mb-4 space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <svg
                                className="h-5 w-5 mr-3 text-yellow-500"
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

                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <svg
                                className="h-5 w-5 mr-3 text-yellow-500"
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
                                  ` - Room ${event.RoomNumber}`}
                              </span>
                            </div>
                          </div>

                          {/* Event Description */}
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {event.ShortDescription.length > 200
                              ? `${event.ShortDescription.substring(0, 200)}...`
                              : event.ShortDescription}
                          </p>

                          {/* View Details Link */}
                          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                              View Event Details
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore More Speakers CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Explore More Speakers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Discover other industry experts and thought leaders who will be
                sharing their insights at UNITE Expo 2025. Our diverse lineup of
                speakers represents various sectors including agriculture,
                energy, manufacturing, technology, finance, and more.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <Button variant="primary" href="/speakers">
                View All Speakers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

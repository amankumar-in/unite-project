"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

interface Speaker {
  id: number;
  Name: string;
  Slug: string;
  Title: string;
  Organization: string;
  ShortBio: string;
  ProfileImage?: {
    url: string;
    formats?: {
      thumbnail?: {
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
}

interface RichTextNode {
  type: string;
  level?: number;
  children: {
    text: string;
    type?: string;
  }[];
}

interface Venue {
  id: number;
  Name: string;
  Slug: string;
  Description?: RichTextNode[];
  Address?: string;
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
}

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  Description: RichTextNode[];
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  MaxAttendees?: number;
  Image?: {
    url: string;
    width: number;
    height: number;
    alternativeText?: string | null;
    formats?: {
      small?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
  };
  speakers: Speaker[];
  sponsors: Sponsor[];
  venue?: Venue;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [sponsorLogos, setSponsorLogos] = useState<{ [slug: string]: string }>(
    {}
  );
  const [venueImage, setVenueImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Using slug to fetch the event with all related data
        const response = await fetchAPI(
          `/events?filters[Slug][$eq]=${params.slug}&populate=*`
        );

        if (response && response.data && response.data.length > 0) {
          setEvent(response.data[0]);

          // If event has sponsors, fetch their logos
          if (
            response.data[0].sponsors &&
            response.data[0].sponsors.length > 0
          ) {
            const sponsorSlugs = response.data[0].sponsors.map(
              (sponsor: any) => sponsor.Slug
            );

            // Fetch sponsors with their logos
            for (const slug of sponsorSlugs) {
              try {
                const sponsorResponse = await fetchAPI(
                  `/sponsors?filters[Slug][$eq]=${slug}&populate=Logo`
                );

                if (
                  sponsorResponse &&
                  sponsorResponse.data &&
                  sponsorResponse.data.length > 0 &&
                  sponsorResponse.data[0].Logo
                ) {
                  setSponsorLogos((prev) => ({
                    ...prev,
                    [slug]: sponsorResponse.data[0].Logo.url,
                  }));
                }
              } catch (sponsorErr) {
                console.error(
                  `Error fetching sponsor ${slug} logo:`,
                  sponsorErr
                );
              }
            }
          }

          // If event has a venue, fetch the venue image
          if (response.data[0].venue && response.data[0].venue.Slug) {
            try {
              const venueResponse = await fetchAPI(
                `/venues?filters[Slug][$eq]=${response.data[0].venue.Slug}&populate=MainImage`
              );

              if (
                venueResponse &&
                venueResponse.data &&
                venueResponse.data.length > 0 &&
                venueResponse.data[0].MainImage
              ) {
                setVenueImage(venueResponse.data[0].MainImage.url);
              }
            } catch (venueErr) {
              console.error("Error fetching venue image:", venueErr);
            }
          }
        } else {
          setError("Event not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventData();
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

  // Format time with 12-hour clock
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format time duration
  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If on the same day, just show time range
    if (start.toDateString() === end.toDateString()) {
      return `${formatTime(startDate)} - ${formatTime(endDate)}`;
    }

    // Different days, show full range
    return `${formatDate(startDate)} ${formatTime(startDate)} - ${formatDate(
      endDate
    )} ${formatTime(endDate)}`;
  };

  // Render rich text content
  const renderRichText = (content: RichTextNode[]) => {
    if (!content || !Array.isArray(content)) return "No description available";

    return content.map((block, blockIndex) => {
      if (block.type === "paragraph") {
        return (
          <p key={blockIndex} className="mb-4">
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      } else if (block.type === "heading") {
        const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={blockIndex} className="font-bold mt-6 mb-3">
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
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
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
            Event Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "We couldn't find the event you're looking for."}
          </p>
          <Button variant="primary" href="/events">
            Back to Events
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
          href="/events"
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
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="mb-6">
                <Chip variant="primary" size="md">
                  {event.Enumeration}
                </Chip>
                {event.FeaturedEvent && (
                  <Chip variant="accent" size="md" className="ml-2">
                    Featured
                  </Chip>
                )}
              </div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {event.Title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {event.ShortDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start">
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
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Date
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {formatDate(event.StartDate)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Time
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {formatDuration(event.StartDate, event.EndDate)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
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
                    <div className="font-bold text-gray-900 dark:text-white">
                      Location
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {event.venue ? event.venue.Name : event.Location}
                      {event.RoomNumber && ` • Room ${event.RoomNumber}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/tickets">
                  Register Now
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  className="dark:border-white dark:text-white"
                  onClick={() => {
                    // Add calendar functionality here
                    alert("Add to calendar feature coming soon!");
                  }}
                >
                  <svg
                    className="mr-2 h-5 w-5"
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
                  Add to Calendar
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full">
                {event.Image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                    alt={event.Image.alternativeText || event.Title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-xl">UNITE 2025</span>
                  </div>
                )}

                {/* Geometric accent elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Event Sponsors
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {event.sponsors.map((sponsor) => (
                <Link
                  href={`/sponsors/${sponsor.Slug}`}
                  key={sponsor.id}
                  className="group block"
                >
                  <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 hover:border-yellow-500 transition-colors h-full flex flex-col items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 h-20 w-full flex items-center justify-center mb-4">
                      {sponsor.Logo ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                          alt={sponsor.Name}
                          className="max-h-16 max-w-full object-contain"
                        />
                      ) : sponsorLogos[sponsor.Slug] ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${
                            sponsorLogos[sponsor.Slug]
                          }`}
                          alt={sponsor.Name}
                          className="max-h-16 max-w-full object-contain"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 text-xl font-bold">
                            {sponsor.Name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors">
                      {sponsor.Name}
                    </h3>

                    <Chip
                      variant={
                        sponsor.Tier === "Platinum"
                          ? "primary"
                          : sponsor.Tier === "Gold"
                          ? "secondary"
                          : "outline"
                      }
                      size="sm"
                      className="mt-2"
                    >
                      {sponsor.Tier}
                    </Chip>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Event Description & Speakers */}
            <div className="lg:col-span-2">
              {/* Event Description */}
              <div className="mb-12">
                <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  About This Event
                </h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4">
                  {renderRichText(event.Description)}
                </div>
              </div>

              {/* Speakers Section */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                  <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Speakers
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {event.speakers.map((speaker) => (
                      <Link
                        href={`/speakers/${speaker.Slug}`}
                        key={speaker.id}
                        className="group"
                      >
                        <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-yellow-500 transition-colors">
                          <div className="flex p-6">
                            <div className="flex-shrink-0 mr-4">
                              {speaker.ProfileImage ? (
                                <div className="h-20 w-20 bg-gray-100 dark:bg-gray-600">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                                    alt={speaker.Name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-20 w-20 bg-yellow-500 flex items-center justify-center text-black text-xl font-bold">
                                  {speaker.Name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors mb-1">
                                {speaker.Name}
                              </h3>
                              <p className="text-yellow-500">{speaker.Title}</p>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {speaker.Organization}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Venue Information */}
            <div className="lg:col-span-1">
              {/* Venue Information */}
              {event.venue && (
                <div className="mb-12">
                  <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Venue
                  </h2>

                  {/* Venue Image */}
                  <div className="relative mb-6">
                    <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700">
                      {venueImage ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${venueImage}`}
                          alt={event.venue.Name}
                          className="w-full h-full object-cover"
                        />
                      ) : event.venue.MainImage ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${event.venue.MainImage.url}`}
                          alt={event.venue.Name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xl">
                            {event.venue.Name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {event.venue.Name}
                  </h3>

                  <div className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                        {event.venue.Address && <p>{event.venue.Address}</p>}
                        <p>
                          {event.venue.City}, {event.venue.Country}
                        </p>
                      </div>
                    </div>

                    {event.RoomNumber && (
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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

                    {event.venue.Phone && (
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                        <a
                          href={`tel:${event.venue.Phone}`}
                          className="text-yellow-500 hover:text-yellow-400"
                        >
                          {event.venue.Phone}
                        </a>
                      </div>
                    )}

                    {event.venue.Website && (
                      <div className="flex items-start">
                        <svg
                          className="h-5 w-5 mt-0.5 mr-3 text-yellow-500"
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
                        <a
                          href={
                            event.venue.Website.startsWith("http")
                              ? event.venue.Website
                              : `https://${event.venue.Website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-500 hover:text-yellow-400"
                        >
                          {event.venue.Website}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="dark"
                    buttonType="outline"
                    href={`/venue/${event.venue.Slug}`}
                    className="w-full dark:border-white dark:text-white"
                  >
                    View Venue Details
                  </Button>

                  {event.venue.MapEmbedURL && (
                    <div className="mt-6 border border-gray-200 dark:border-gray-600 overflow-hidden">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: event.venue.MapEmbedURL,
                        }}
                        className="w-full h-32"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Share Event */}
              <div className="border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Share This Event
                </h3>
                <div className="flex space-x-6">
                  <button
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
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
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500"
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

      {/* Related Events CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-4">UNITE Expo 2025</h3>
                <p className="mb-6">July 7-14, 2025</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>300+ Exhibition Booths</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>50+ Speakers</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>100+ Educational Sessions</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Explore More Events
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Discover other exciting opportunities at UNITE Expo 2025. From
                industry-specific forums to networking sessions, there's
                something for every business professional interested in the
                Ugandan market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/events">
                  View All Events
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/tickets"
                  className="dark:border-white dark:text-white"
                >
                  Get Your Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

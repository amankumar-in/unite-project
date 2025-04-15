"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

// ---------------------------
// Type Definitions
// ---------------------------
interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  Image?: {
    id: number;
    url: string;
    alternativeText?: string | null;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
    id: number;
    url: string;
    formats?: { thumbnail?: { url: string } };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ---------------------------
// HomePage Component
// ---------------------------
export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState({
    events: true,
    speakers: true,
    sponsors: true,
  });

  // Fetch events
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetchAPI(
          "/events?filters[FeaturedEvent][$eq]=true&populate=*"
        );
        if (response && response.data) setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events", err);
      } finally {
        setLoading((prev) => ({ ...prev, events: false }));
      }
    };
    fetchEventsData();
  }, []);

  // Fetch speakers
  useEffect(() => {
    const fetchSpeakersData = async () => {
      try {
        const response = await fetchAPI(
          "/speakers?filters[Featured][$eq]=true&populate=*"
        );
        if (response && response.data) setSpeakers(response.data);
      } catch (err) {
        console.error("Error fetching speakers", err);
      } finally {
        setLoading((prev) => ({ ...prev, speakers: false }));
      }
    };
    fetchSpeakersData();
  }, []);

  // Fetch sponsors
  useEffect(() => {
    const fetchSponsorsData = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        if (response && response.data) setSponsors(response.data);
      } catch (err) {
        console.error("Error fetching sponsors", err);
      } finally {
        setLoading((prev) => ({ ...prev, sponsors: false }));
      }
    };
    fetchSponsorsData();
  }, []);

  return (
    <main className="bg-gray-100 dark:bg-gray-900">
      <HeroSection />
      <KeyMetricsSection />
      <AboutSection />
      <SectorsSection />
      <GovernmentPartnersSection />
      <FeaturedEventsSection events={events} loading={loading.events} />
      <FeaturedSpeakersSection speakers={speakers} loading={loading.speakers} />
      <SponsorsSection sponsors={sponsors} loading={loading.sponsors} />
      <CTASection />
      <RegistrationInfoSection />
      <ContactFooterSection />
    </main>
  );
}

// ---------------------------
// Hero Section
// ---------------------------
function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-gray-800">
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg" // Replace with your background image
            alt="Investment expo background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              UNITE Expo 2025
            </h1>
            <p className="text-xl mb-8">
              Uganda’s premier global investment and trade summit – July 7– 14,
              2025, Kampala
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
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Key Metrics Section
// ---------------------------
function KeyMetricsSection() {
  const metrics = [
    {
      value: "$50B",
      label: "GDP (2023)",
      description: "Robust economy with nearly $50B in GDP",
    },
    {
      value: "$2.9B",
      label: "FDI in 2023",
      description: "79% surge in FDI making Uganda Africa’s FDI hotspot",
    },
    {
      value: "10.8%",
      label: "Projected Growth",
      description: "IMF projects double-digit expansion with oil production",
    },
    {
      value: "300M+",
      label: "Regional Market",
      description: "Gateway to East Africa’s 300+ million consumer base",
    },
  ];
  return (
    <section className="py-16 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
          >
            <div className="text-yellow-500 text-4xl md:text-5xl font-bold mb-3">
              {item.value}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-300">
              {item.label}
            </div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------
// About Section
// ---------------------------
function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Why Invest in Uganda?
          </h2>
          <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-yellow-500 mr-3"></span>
              <span>
                Strong macroeconomic fundamentals with 5%+ annual growth.
              </span>
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-yellow-500 mr-3"></span>
              <span>
                Strategic location providing access to the East African
                Community (300M+ consumers).
              </span>
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-yellow-500 mr-3"></span>
              <span>
                Investor-friendly policies with streamlined licensing and tax
                incentives.
              </span>
            </li>
          </ul>
          <div className="mt-8">
            <Button variant="primary" href="/about">
              Discover More
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/images/about-illustration.jpg" // Replace with an appropriate image
            alt="About Uganda’s investment opportunities"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Sectors Section
// ---------------------------
function SectorsSection() {
  // Example sectors; update descriptions and icons as needed.
  const sectors = [
    {
      title: "Agriculture & Agro-processing",
      description:
        "Leverage Uganda’s fertile land—including being the world’s 8th largest coffee producer—to fuel growth.",
      icon: (
        <svg
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 13 7 13s7-9.13 7-13c0-3.87-3.13-7-7-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 11a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      ),
    },
    {
      title: "Energy & Minerals",
      description:
        "Explore opportunities in oil (6.5 billion barrels in reserves), hydropower, and renewables.",
      icon: (
        <svg
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 3v4M3 5h4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6 17v4m-2-2h4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 3v4m2-4h4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 17v4m2-2h4"
          />
        </svg>
      ),
    },
    {
      title: "ICT & Innovation",
      description:
        "Join a growing ecosystem of tech startups and digital innovators driving transformation.",
      icon: (
        <svg
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 20l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 12l9-5-9-5-9 5 9 5z"
          />
        </svg>
      ),
    },
    {
      title: "Manufacturing",
      description:
        "Accelerate industrial capacity with modern manufacturing and value-added processing.",
      icon: (
        <svg
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 17v-6l-3 3m12-3l-3 3v6"
          />
        </svg>
      ),
    },
    {
      title: "Infrastructure",
      description:
        "Develop critical transport, logistics, and urban projects to boost growth.",
      icon: (
        <svg
          className="h-12 w-12 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"
          />
        </svg>
      ),
    },
  ];
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Strategic Sectors
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Discover the core industries driving Uganda’s economic transformation
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-600 p-6 bg-white dark:bg-gray-800 rounded-lg flex flex-col items-center text-center"
            >
              <div className="mb-4">{sector.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {sector.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Government Partners Section
// ---------------------------
function GovernmentPartnersSection() {
  // For this example, we use static logos as placeholders.
  const partners = [
    { name: "Ministry of Trade", logo: "/images/partners/ministry-trade.png" },
    { name: "Uganda Investment Authority", logo: "/images/partners/uia.png" },
    { name: "National Standards Bureau", logo: "/images/partners/nsb.png" },
    { name: "Private Sector Foundation", logo: "/images/partners/psf.png" },
  ];
  return (
    <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Organizing Partners
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Proudly supported by government bodies and agencies driving Uganda’s
          growth
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4 border border-gray-200 dark:border-gray-600 rounded">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-bold text-gray-900 dark:text-white text-center">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Featured Events Section
// ---------------------------
function FeaturedEventsSection({
  events,
  loading,
}: {
  events: Event[];
  loading: boolean;
}) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Events
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Check out the key sessions and events that will drive the
            conversation at UNITE Expo 2025.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 animate-spin border-4 border-yellow-500 border-t-transparent rounded-full"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No featured events available at this time.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.Slug}`}
                className="group block border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 flex flex-col hover:border-yellow-500 transition-colors"
              >
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700">
                  {event.Image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                      alt={event.Image.alternativeText || event.Title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400 text-xl">UNITE 2025</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 p-4">
                    <Chip variant="primary" size="sm">
                      {event.Enumeration}
                    </Chip>
                  </div>
                  {event.FeaturedEvent && (
                    <div className="absolute top-0 right-0 p-4">
                      <Chip variant="black" size="sm">
                        Featured
                      </Chip>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                    {event.Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {event.ShortDescription.length > 150
                      ? `${event.ShortDescription.substring(0, 150)}...`
                      : event.ShortDescription}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg
                      className="h-5 w-5 mr-2 text-yellow-500"
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------
// Featured Speakers Section
// ---------------------------
function FeaturedSpeakersSection({
  speakers,
  loading,
}: {
  speakers: Speaker[];
  loading: boolean;
}) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Distinguished Speakers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gain insights from industry leaders, policymakers, and innovators.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 animate-spin border-4 border-yellow-500 border-t-transparent rounded-full"></div>
          </div>
        ) : speakers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No speakers available at this time.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker) => (
              <Link
                key={speaker.id}
                href={`/speakers/${speaker.Slug}`}
                className="group block border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 flex flex-col hover:border-yellow-500 transition-colors"
              >
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                  {speaker.ProfileImage ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                      alt={speaker.Name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-4xl text-gray-400">
                        {speaker.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {speaker.Featured && (
                    <div className="absolute top-0 right-0 p-4">
                      <Chip variant="primary" size="sm">
                        Featured
                      </Chip>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                    {speaker.Name}
                  </h3>
                  <p className="text-yellow-500 mb-1">{speaker.Title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {speaker.Organization}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    {speaker.ShortBio.length > 100
                      ? `${speaker.ShortBio.substring(0, 100)}...`
                      : speaker.ShortBio}
                  </p>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-yellow-500 transition-colors">
                      View Profile
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------
// Sponsors Section
// ---------------------------
function SponsorsSection({
  sponsors,
  loading,
}: {
  sponsors: Sponsor[];
  loading: boolean;
}) {
  // Example: filter by tier if needed (or display all in groups)
  const platinumSponsors = sponsors.filter((s) => s.Tier === "Platinum");
  const goldSponsors = sponsors.filter((s) => s.Tier === "Gold");
  const silverSponsors = sponsors.filter((s) => s.Tier === "Silver");

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Organizations that share our vision and drive Uganda's investment
            potential.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 animate-spin border-4 border-yellow-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {platinumSponsors.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Platinum Partners
                </h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {platinumSponsors.map((sponsor) => (
                    <Link
                      key={sponsor.id}
                      href={`/sponsors/${sponsor.Slug}`}
                      className="group block border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors flex flex-col"
                    >
                      <div className="p-8 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        {sponsor.Logo ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                            alt={sponsor.Name}
                            className="max-h-32 max-w-full object-contain"
                          />
                        ) : (
                          <div className="h-32 w-full flex items-center justify-center text-xl font-semibold text-black dark:text-white">
                            {sponsor.Name}
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                          {sponsor.Name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 flex-grow">
                          {sponsor.Description.length > 100
                            ? `${sponsor.Description.substring(0, 100)}...`
                            : sponsor.Description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {goldSponsors.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Gold Partners
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {goldSponsors.map((sponsor) => (
                    <Link
                      key={sponsor.id}
                      href={`/sponsors/${sponsor.Slug}`}
                      className="group block border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors flex flex-col"
                    >
                      <div className="p-6 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        {sponsor.Logo ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                            alt={sponsor.Name}
                            className="max-h-24 max-w-full object-contain"
                          />
                        ) : (
                          <div className="h-24 w-full flex items-center justify-center text-lg font-semibold">
                            {sponsor.Name}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                          {sponsor.Name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                          {sponsor.Description.length > 100
                            ? `${sponsor.Description.substring(0, 100)}...`
                            : sponsor.Description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
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
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {silverSponsors.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Silver Partners
                </h3>
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {silverSponsors.map((sponsor) => (
                    <Link
                      key={sponsor.id}
                      href={`/sponsors/${sponsor.Slug}`}
                      className="group block border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-yellow-500 transition-colors flex flex-col"
                    >
                      <div className="p-4 h-24 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        {sponsor.Logo ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${sponsor.Logo.url}`}
                            alt={sponsor.Name}
                            className="max-h-16 max-w-full object-contain"
                          />
                        ) : (
                          <div className="h-16 w-full flex items-center justify-center text-base font-semibold">
                            {sponsor.Name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-bold mb-1 group-hover:text-yellow-500 transition-colors text-gray-900 dark:text-white">
                          {sponsor.Name}
                        </h3>
                        <Chip variant="outline" size="sm">
                          Silver
                        </Chip>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ---------------------------
// CTA Section
// ---------------------------
function CTASection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Join Us at UNITE Expo 2025
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Be a part of Uganda’s economic transformation with over 20,000
          attendees, 300+ exhibitors, and unparalleled investment opportunities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" size="lg" href="/tickets">
            Register Now
          </Button>
          <Button
            variant="light"
            buttonType="outline"
            size="lg"
            href="/contact"
          >
            Exhibit Your Business
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Registration Information Section
// ---------------------------
function RegistrationInfoSection() {
  return (
    <section className="py-16 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-10 md:mb-0 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Registration Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-5 border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 text-white">
                Delegate Registration
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Early Bird: $150 (Until April 30, 2025)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Standard: $250 (May 1 - June 28, 2025)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Late Registration: $350 (After June 28, 2025)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-5 border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 text-white">
                Exhibitor Registration
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Standard Booth: $1,200 (3m x 3m)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
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
                    Premium Booth: $2,000 (6m x 3m, includes 2 passes)
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-gray-300">
            All registrations include access to sessions, the exhibition area,
            and networking events.
          </p>
        </div>
        <div className="md:w-1/3 bg-white dark:bg-gray-700 p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Connect?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Secure your spot and join industry leaders at UNITE Expo 2025.
          </p>
          <Button variant="primary" href="/tickets" className="w-full">
            Get Your Ticket
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------
// Contact & Footer Section
// ---------------------------
function ContactFooterSection() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            UNITE Expo Secretariat
            <br />
            Plot 123, Kampala Road
            <br />
            Kampala, Uganda
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Email: info@uniteexpo.org
            <br />
            Phone: +256 700 000 000
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/uniteexpo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://facebook.com/uniteexpo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/uniteexpo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.023-.06-1.351-.06-3.807v-.468c0-2.456.011-2.784.058-3.807.045-.975.207-1.504.344-1.857.182-.466.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.023-.047 1.351-.058 3.807-.058h.468zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/uniteexpo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} UNITE Expo 2025. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

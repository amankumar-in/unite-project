"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

interface Organizer {
  id: number;
  Name: string;
  Title: string;
  Organization: string;
  Bio: string;
  ShortBio: string;
  ImagePlaceholder: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface PartnerOrganization {
  id: number;
  Name: string;
  Role: string;
  Description: string;
  ShortDescription: string;
  LogoPlaceholder: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function OrganizersPage() {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [organizations, setOrganizations] = useState<PartnerOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organizers
        const organizersResponse = await fetchAPI("/organizers");
        console.log("Organizers response:", organizersResponse);

        if (organizersResponse && organizersResponse.data) {
          setOrganizers(organizersResponse.data);
        }

        // Fetch organizations
        const organizationsResponse = await fetchAPI("/organizations");
        console.log("Organizations response:", organizationsResponse);

        if (organizationsResponse && organizationsResponse.data) {
          setOrganizations(organizationsResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching organizers data:", err);
        setError("Failed to load organizers data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to safely display rich text content
  const renderRichText = (content: any) => {
    if (!content) return "No information available";

    // If content is a string, return it directly
    if (typeof content === "string") return content;

    // If it's an object with a text property (common in some Strapi responses)
    if (typeof content === "object" && content.text) return content.text;

    // If it's a Strapi rich text object
    if (typeof content === "object" && content.data && content.data.content) {
      try {
        return content.data.content
          .map((block: any) =>
            block.children
              ? block.children.map((child: any) => child.text || "").join("")
              : ""
          )
          .join("\n");
      } catch (e) {
        console.error("Error parsing rich text:", e);
      }
    }

    // If we have an array, try to join it
    if (Array.isArray(content)) {
      return content.join(" ");
    }

    // Last fallback - show something instead of [object Object]
    return "View details for more information";
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <HeroSection />
      <OrganizingCommitteeSection
        organizers={organizers}
        loading={loading}
        error={error}
        renderRichText={renderRichText}
      />
      <PartnerOrganizationsSection
        organizations={organizations}
        loading={loading}
        error={error}
        renderRichText={renderRichText}
      />
      <BecomePartnerSection />
      <ContactSection />
    </main>
  );
}

// -------------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/3">
            <div className="flex items-center mb-6">
              <Link
                href="/about"
                className="flex items-center text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to About
              </Link>
            </div>
            <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Organizers & Partners
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Meet the team and organizations bringing UNITE 2025 to life
            </p>
          </div>
          <div className="md:w-1/3 bg-black text-white dark:bg-white dark:text-black p-8 border border-gray-200 dark:border-gray-600">
            <div className="relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
              <h2 className="text-2xl font-bold mb-4">Collaborative Effort</h2>
              <p className="mb-4">
                UNITE 2025 is the result of dedicated work from multiple
                stakeholders committed to Uganda's economic development:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 inline-block bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Government agencies</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 inline-block bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Private sector organizations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 inline-block bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>International development partners</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 inline-block bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Industry experts and professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Organizing Committee Section
// -------------------------------------------------------------------
function OrganizingCommitteeSection({
  organizers,
  loading,
  error,
  renderRichText,
}: {
  organizers: Organizer[];
  loading: boolean;
  error: string | null;
  renderRichText: (content: any) => string;
}) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Organizing Committee
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            The dedicated professionals working to make UNITE 2025 a success
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="inline-block h-8 w-8 animate-spin border-2 border-solid border-yellow-500 border-r-transparent"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">
              Loading organizers...
            </p>
          </div>
        ) : error ? (
          <div className="border border-gray-200 dark:border-gray-600 p-8 bg-white dark:bg-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 mb-4">
              <svg
                className="w-8 h-8 text-yellow-500"
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
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Organizers
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizers.length === 0 ? (
              <div className="col-span-full border border-gray-200 dark:border-gray-600 p-8 bg-white dark:bg-gray-800 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No organizers found.
                </p>
              </div>
            ) : (
              organizers.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div
                        className={`h-16 w-16 flex items-center justify-center text-xl font-bold bg-black text-white dark:bg-white dark:text-black mr-4`}
                      >
                        {member.Name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {member.Name}
                        </h3>
                        <Chip variant="primary" size="sm">
                          {member.Title}
                        </Chip>
                      </div>
                    </div>
                    <div className="border-t border-b border-gray-200 dark:border-gray-600 py-2 mb-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {member.Organization}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {member.ShortBio || renderRichText(member.Bio)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Partner Organizations Section
// -------------------------------------------------------------------
function PartnerOrganizationsSection({
  organizations,
  loading,
  error,
  renderRichText,
}: {
  organizations: PartnerOrganization[];
  loading: boolean;
  error: string | null;
  renderRichText: (content: any) => string;
}) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Partner Organizations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            The institutions collaborating to showcase Uganda's investment
            potential
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="inline-block h-8 w-8 animate-spin border-2 border-solid border-yellow-500 border-r-transparent"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">
              Loading organizations...
            </p>
          </div>
        ) : error ? (
          <div className="border border-gray-200 dark:border-gray-600 p-8 bg-gray-50 dark:bg-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Unable to load organizations at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizations.length === 0 ? (
              <div className="col-span-full border border-gray-200 dark:border-gray-600 p-8 bg-gray-50 dark:bg-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  No organizations found.
                </p>
              </div>
            ) : (
              organizations.map((org) => (
                <div
                  key={org.id}
                  className="border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="p-6">
                    <div className="h-16 w-full flex items-center justify-center mb-6">
                      <div className="bg-black text-white dark:bg-white dark:text-black px-6 py-4 font-bold text-xl">
                        {org.LogoPlaceholder}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                      {org.Name}
                    </h3>
                    <div className="flex justify-center mb-4">
                      <Chip variant="primary" size="sm">
                        {org.Role}
                      </Chip>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {org.ShortDescription || renderRichText(org.Description)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Become Partner Section
// -------------------------------------------------------------------
function BecomePartnerSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Become a Partner
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join us in showcasing Uganda's investment potential to the
                world. We welcome partnerships with organizations that share our
                vision for Uganda's economic growth.
              </p>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Partnership Benefits:
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-yellow-500 text-black h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>1</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-black dark:text-white">
                      Brand visibility
                    </span>{" "}
                    at Uganda's premier investment event
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-500 text-black h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>2</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-black dark:text-white">
                      Network access
                    </span>{" "}
                    to international investors and business leaders
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-500 text-black h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>3</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-black dark:text-white">
                      Shape Uganda's narrative
                    </span>{" "}
                    and investment opportunities
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-500 text-black h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span>4</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-black dark:text-white">
                      Participate
                    </span>{" "}
                    in high-level discussions on economic development
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 p-8 bg-black text-white dark:bg-white dark:text-black">
              <div className="relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h3 className="text-2xl font-bold mb-6">Partnership Tiers</h3>
                <ul className="space-y-6 mb-8">
                  <li>
                    <h4 className="text-xl font-bold mb-2">Platinum</h4>
                    <p className="mb-2">
                      Premium branding, exhibition space, and speaking
                      opportunities
                    </p>
                    <div className="flex gap-2">
                      <Chip variant="primary" size="sm">
                        $25,000
                      </Chip>
                      <Chip
                        variant="white"
                        size="sm"
                        className="dark:bg-gray-800 dark:text-white"
                      >
                        5 Available
                      </Chip>
                    </div>
                  </li>
                  <li>
                    <h4 className="text-xl font-bold mb-2">Gold</h4>
                    <p className="mb-2">
                      Enhanced visibility, booth space, and networking
                      opportunities
                    </p>
                    <div className="flex gap-2">
                      <Chip variant="primary" size="sm">
                        $15,000
                      </Chip>
                      <Chip
                        variant="white"
                        size="sm"
                        className="dark:bg-gray-800 dark:text-white"
                      >
                        10 Available
                      </Chip>
                    </div>
                  </li>
                  <li>
                    <h4 className="text-xl font-bold mb-2">Silver</h4>
                    <p className="mb-2">
                      Brand presence and event participation
                    </p>
                    <div className="flex gap-2">
                      <Chip variant="primary" size="sm">
                        $7,500
                      </Chip>
                      <Chip
                        variant="white"
                        size="sm"
                        className="dark:bg-gray-800 dark:text-white"
                      >
                        15 Available
                      </Chip>
                    </div>
                  </li>
                </ul>
                <Button variant="primary" href="/contact" className="w-full">
                  Inquire About Partnership
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Contact Section
// -------------------------------------------------------------------
function ContactSection() {
  return (
    <section className="py-16 bg-black text-white dark:bg-white dark:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Contact the Organizing Team
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Have questions about UNITE 2025? Our team is here to help.
        </p>
        <div className="inline-block">
          <Button variant="primary" size="lg" href="/contact">
            Get in Touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

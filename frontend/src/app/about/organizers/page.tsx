"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface Organizer {
  id: number;
  Name: string;
  Title: string;
  Organization: string;
  Bio: string;
  ShortBio: string; // Added ShortBio field
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
  ShortDescription: string; // Added ShortDescription field
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Organizers & Partners
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Meet the team bringing UNITE Expo 2025 to life
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="text-green-200 hover:text-white inline-flex items-center"
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
                Back to About
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Committee Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Organizing Committee
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              The dedicated professionals working to make UNITE Expo 2025 a
              success
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading organizers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
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
                Error Loading Organizers
              </p>
              <p className="mt-2 text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {organizers.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No organizers found.</p>
                </div>
              ) : (
                organizers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold ${
                            member.ImagePlaceholder === "F"
                              ? "bg-green-600"
                              : "bg-green-700"
                          } text-white`}
                        >
                          {member.Name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-bold text-gray-900">
                            {member.Name}
                          </h3>
                          <p className="text-green-600">{member.Title}</p>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">
                        {member.Organization}
                      </p>
                      <p className="text-gray-600">
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

      {/* Partner Organizations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Partner Organizations
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              The institutions collaborating to showcase Uganda's investment
              potential
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading organizations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Unable to load organizations at this time.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {organizations.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No organizations found.</p>
                </div>
              ) : (
                organizations.map((org) => (
                  <div
                    key={org.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="h-16 w-full flex items-center justify-center mb-4">
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md font-bold text-xl">
                          {org.LogoPlaceholder}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                        {org.Name}
                      </h3>
                      <p className="text-green-600 text-sm mb-4 text-center">
                        {org.Role}
                      </p>
                      <p className="text-gray-600">
                        {org.ShortDescription ||
                          renderRichText(org.Description)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-xl p-8 md:p-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Become a Partner
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join us in showcasing Uganda's investment potential to the
                  world. We welcome partnerships with organizations that share
                  our vision for Uganda's economic growth.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Partnership Benefits:
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
                      <span>
                        Access to a network of international investors and
                        business leaders
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
                        Opportunity to shape Uganda's investment narrative
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
                        Participation in high-level discussions on economic
                        development
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
                  Contact Us About Partnership
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

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact the Organizing Team
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Have questions about UNITE Expo 2025? Our team is here to help.
            </p>

            <div className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              <Link href="/contact" className="flex items-center">
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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

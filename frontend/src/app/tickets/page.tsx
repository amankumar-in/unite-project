"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface TicketCategory {
  id: number;
  documentId: string;
  name: string;
  description: any[];
  price: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  maxPurchaseQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  allowedEvents: any[];
}

export default function TicketsPage() {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketCategories = async () => {
      try {
        const response = await fetchAPI("/ticket-categories?populate=*");
        console.log("Ticket categories response:", response);

        if (response && response.data) {
          setTicketCategories(response.data);
        } else {
          setError("Failed to retrieve ticket categories data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ticket categories:", err);
        setError("Failed to load ticket categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchTicketCategories();
  }, []);

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to render rich text description
  const renderDescription = (description: any[]) => {
    if (!description || !Array.isArray(description)) return null;

    return description.map((block, blockIndex) => {
      if (block.type === "paragraph") {
        return (
          <p key={blockIndex} className="mb-2">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      } else if (block.type === "list") {
        return (
          <ul
            key={blockIndex}
            className={
              block.format === "ordered"
                ? "list-decimal ml-5"
                : "list-disc ml-5"
            }
          >
            {block.children?.map((item: any, itemIndex: number) => (
              <li key={itemIndex}>
                {item.children?.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              UNITE Expo 2025 Tickets
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Secure your place at Uganda's premier investment and trade expo
            </p>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Ticket
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Select the ticket option that best suits your needs
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading ticket options...</p>
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
                Error Loading Ticket Options
              </p>
              <p className="mt-2 text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          ) : ticketCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                No ticket options available at this time. Please check back
                later.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ticketCategories
                .filter((ticket) => ticket.isActive)
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((ticket) => (
                  <div
                    key={ticket.documentId}
                    className={`bg-white rounded-lg overflow-hidden shadow-md border ${
                      ticket.isFeatured ? "border-green-500" : "border-gray-200"
                    } flex flex-col h-full`}
                  >
                    {/* Featured badge */}
                    {ticket.isFeatured && (
                      <div className="bg-green-500 text-white text-center py-2 px-4 text-sm font-semibold">
                        FEATURED
                      </div>
                    )}

                    {/* Ticket content */}
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {ticket.name}
                      </h3>

                      <div className="text-3xl font-bold text-green-600 mb-4">
                        {formatCurrency(ticket.price, ticket.currency)}
                      </div>

                      <div className="text-gray-600 mb-6">
                        {renderDescription(ticket.description)}
                      </div>

                      <div className="text-sm text-gray-500 mt-4">
                        <p>
                          Valid until:{" "}
                          {new Date(ticket.validUntil).toLocaleDateString()}
                        </p>
                        <p>
                          Maximum purchase: {ticket.maxPurchaseQuantity} tickets
                        </p>
                      </div>
                    </div>

                    {/* Buy button */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <Link
                        href={`/tickets/buy?categoryId=${ticket.documentId}`}
                        className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                          ticket.isFeatured
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        } transition-colors`}
                      >
                        Purchase Now
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Common questions about tickets and attendance
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">
                What's included in the All-Access Pass?
              </h3>
              <p className="mt-2 text-gray-600">
                The All-Access Pass provides entry to all events at UNITE Expo
                2025, including keynote speeches, workshops, networking events,
                and the exhibition area. You'll also receive priority check-in
                and complimentary refreshments.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">
                Can I purchase tickets at the venue?
              </h3>
              <p className="mt-2 text-gray-600">
                We strongly recommend purchasing tickets online in advance to
                guarantee your spot, as certain events may sell out. Limited
                tickets may be available at the venue, subject to availability.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">
                What is the refund policy?
              </h3>
              <p className="mt-2 text-gray-600">
                Tickets can be refunded up to 14 days before the event. After
                that, tickets are non-refundable but can be transferred to
                another attendee by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Registration */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Group Registration
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Coming with a team of 5 or more? Contact us for special group
                rates and custom packages that can be tailored to your
                organization's needs.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Contact for Group Bookings
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Group Benefits
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex">
                    <svg
                      className="h-5 w-5 mr-2 text-green-500"
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
                    <span>Discounted rates for 5+ attendees</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-5 w-5 mr-2 text-green-500"
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
                    <span>Reserved seating at keynote events</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-5 w-5 mr-2 text-green-500"
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
                    <span>Dedicated liaison for your group</span>
                  </li>
                  <li className="flex">
                    <svg
                      className="h-5 w-5 mr-2 text-green-500"
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
                    <span>Simplified billing with a single invoice</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

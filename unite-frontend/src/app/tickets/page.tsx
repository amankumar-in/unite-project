import Link from "next/link";

export const metadata = {
  title: "Tickets | UNITE 2025",
  description:
    "Purchase tickets for UNITE 2025 - Uganda's premier investment and trade expo.",
};

// Mock ticket data - this would come from Strapi CMS in production
const tickets = [
  {
    id: "full-pass",
    name: "Full Event Pass",
    price: 350,
    currency: "USD",
    description:
      "Complete access to all events, workshops, and networking sessions for all three days.",
    features: [
      "Access to all main events",
      "Entry to all workshops and breakout sessions",
      "Networking lunch and reception access",
      "Business matchmaking participation",
      "Conference materials and expo guide",
      "Access to online event platform",
    ],
    recommended: true,
    availableUntil: "August 14, 2025",
  },
  {
    id: "business-pass",
    name: "Business Pass",
    price: 250,
    currency: "USD",
    description:
      "Focused on business connections and investment opportunities.",
    features: [
      "Access to main events",
      "Business matchmaking participation",
      "Networking lunch and reception access",
      "Conference materials and expo guide",
      "Access to online event platform",
    ],
    recommended: false,
    availableUntil: "August 14, 2025",
  },
  {
    id: "expo-pass",
    name: "Expo Only Pass",
    price: 100,
    currency: "USD",
    description:
      "Access to the exhibition area to meet businesses and view investment projects.",
    features: [
      "Access to exhibition area only",
      "Expo guide",
      "Access to online event platform",
    ],
    recommended: false,
    availableUntil: "August 14, 2025",
  },
  {
    id: "vip-pass",
    name: "VIP Pass",
    price: 500,
    currency: "USD",
    description:
      "Premium experience with exclusive access to VIP events and high-level networking.",
    features: [
      "All Full Event Pass benefits",
      "VIP seating at main events",
      "Exclusive access to VIP lounge",
      "Private networking sessions with key speakers",
      "Invitation to exclusive VIP reception",
      "Personalized concierge service",
    ],
    recommended: false,
    availableUntil: "August 14, 2025",
  },
];

// Group ticket data for displaying
const corporateOption = {
  id: "corporate",
  name: "Corporate Packages",
  description: "Special rates for companies sending multiple delegates.",
  features: [
    "5+ delegates: 10% discount",
    "10+ delegates: 15% discount",
    "20+ delegates: 20% discount",
    "Custom packages available",
  ],
};

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Tickets
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Secure your place at Uganda's premier investment and trade expo and
            connect with key stakeholders shaping Uganda's investment landscape.
          </p>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Choose Your Ticket
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Select the right ticket option to maximize your experience at
              UNITE 2025. All tickets provide access to our digital platform
              before, during, and after the event.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                    ticket.recommended
                      ? "border-blue-500 relative"
                      : "border-transparent"
                  }`}
                >
                  {ticket.recommended && (
                    <div className="bg-blue-500 text-white text-sm font-bold uppercase py-1 px-4 absolute top-0 right-0 rounded-bl-lg">
                      Recommended
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {ticket.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-gray-800">
                        ${ticket.price}
                      </span>
                      <span className="text-gray-500 ml-1">USD</span>
                    </div>
                    <p className="text-gray-600 mb-6">{ticket.description}</p>

                    <ul className="space-y-3 mb-6">
                      {ticket.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-sm text-gray-500 mb-6">
                      Available until {ticket.availableUntil}
                    </div>

                    <Link
                      href={`/tickets/purchase?type=${ticket.id}`}
                      className={`w-full block text-center py-3 px-6 rounded-lg font-bold transition duration-300 ${
                        ticket.recommended
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                      }`}
                    >
                      Select
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Corporate Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-16">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {corporateOption.name}
                    </h3>
                    <p className="text-gray-600">
                      {corporateOption.description}
                    </p>
                  </div>
                  <Link
                    href="/contact?subject=Corporate%20Package%20Inquiry"
                    className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Inquire Now
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {corporateOption.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    What's included in my ticket?
                  </h3>
                  <p className="text-gray-600">
                    Each ticket type includes different levels of access to the
                    expo events, sessions, and networking opportunities. Please
                    review the features listed for each ticket type above. All
                    tickets include access to our online event platform.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Can I upgrade my ticket later?
                  </h3>
                  <p className="text-gray-600">
                    Yes, you can upgrade your ticket at any time before the
                    event by paying the difference between your current ticket
                    and the ticket you wish to upgrade to. Please contact our
                    support team to arrange an upgrade.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    What is your refund policy?
                  </h3>
                  <p className="text-gray-600">
                    Tickets can be refunded up to 30 days before the event with
                    a 20% administration fee. Within 30 days of the event,
                    tickets are non-refundable but can be transferred to another
                    person or applied as credit toward a future UNITE event.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    How do I get my ticket after purchase?
                  </h3>
                  <p className="text-gray-600">
                    Upon completion of your purchase, you will receive an email
                    with your e-ticket. You can print this ticket or present it
                    on your mobile device at the registration desk. You will
                    also be able to access your ticket through your account on
                    our event platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need help choosing the right ticket?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is available to answer any questions you may have about
            ticket options, group bookings, or special requirements.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              About UNITE Expo 2025
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Connecting investors with opportunities in Uganda's growing
              economy
            </p>
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2>Uganda's Premier Investment & Trade Exhibition</h2>

            <p>
              UNITE (Uganda Next - Investment & Trade Expo) 2025 is the largest
              and most comprehensive investment and trade exhibition in Uganda,
              showcasing the country's vast potential across various sectors of
              the economy.
            </p>

            <p>
              Organized by the Uganda Investment Authority in collaboration with
              the Ministry of Trade, Industry, and Cooperatives, UNITE Expo 2025
              serves as a platform for local and international businesses to
              connect, collaborate, and explore investment opportunities in
              Uganda.
            </p>

            <p>The three-day expo will feature:</p>

            <ul>
              <li>
                Exhibition booths from key sectors including agriculture,
                energy, manufacturing, ICT, tourism, and financial services
              </li>
              <li>
                Investment forums and panel discussions with industry experts
              </li>
              <li>
                B2B matchmaking sessions connecting investors with local
                entrepreneurs
              </li>
              <li>
                Presentations on Uganda's investment climate and incentives
              </li>
              <li>
                Networking opportunities with government officials and business
                leaders
              </li>
            </ul>

            <p>
              Whether you're an international investor looking for new
              opportunities, a local business seeking partnerships, or a
              stakeholder in Uganda's economic development, UNITE Expo 2025
              offers valuable insights, connections, and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* About Navigation Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Learn More About UNITE
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Discover our mission, the team behind the expo, and answers to
              common questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission & Vision Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-green-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Mission & Vision
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about our mission to promote investment in Uganda and
                  our vision for the country's economic future.
                </p>
                <Link
                  href="/about/mission-vision"
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Organizers Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-green-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Organizers
                </h3>
                <p className="text-gray-600 mb-4">
                  Meet the team behind UNITE Expo 2025 and learn about the
                  organizations making it possible.
                </p>
                <Link
                  href="/about/organizers"
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  Meet the Team
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* FAQ Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-green-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 mb-4">
                  Find answers to common questions about the expo, registration,
                  attendance, and more.
                </p>
                <Link
                  href="/about/faq"
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  View FAQs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              UNITE Expo 2025 by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-green-600">300+</div>
              <div className="mt-2 text-gray-600">Exhibitors</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600">
                5000+
              </div>
              <div className="mt-2 text-gray-600">Attendees</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600">50+</div>
              <div className="mt-2 text-gray-600">Speakers</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600">30+</div>
              <div className="mt-2 text-gray-600">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center text-white">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Be Part of Uganda's Economic Growth Story
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Join us at UNITE Expo 2025 and discover investment opportunities
                in one of Africa's fastest-growing economies.
              </p>
              <div className="mt-8">
                <Link
                  href="/tickets"
                  className="inline-block bg-white px-5 py-3 text-base font-medium text-green-700 shadow-md rounded-md hover:bg-gray-50"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

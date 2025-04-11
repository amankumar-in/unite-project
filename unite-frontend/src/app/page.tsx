import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Uganda Next - Investment & Trade Expo 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Connecting Global Investors with Uganda's Opportunities
          </p>
          <p className="text-lg mb-10">August 15-17, 2025 • Kampala, Uganda</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/tickets"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Get Tickets
            </Link>
            <Link
              href="/about"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About UNITE Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              About UNITE 2025
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The Uganda Next - Investment & Trade Expo (UNITE) brings together
              global investors, business leaders, and government officials to
              explore the vast investment opportunities in Uganda's growing
              economy.
            </p>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              Read More About Our Mission
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Investment Opportunities
              </h3>
              <p className="text-gray-600">
                Discover high-growth investment opportunities across Uganda's
                emerging sectors.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Business Partnerships
              </h3>
              <p className="text-gray-600">
                Connect with local businesses and create strategic partnerships
                for market entry.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Policy Insights
              </h3>
              <p className="text-gray-600">
                Get firsthand information on Uganda's investment policies and
                regulatory framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            Event Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-600 text-white rounded-lg p-4 flex flex-col items-center justify-center flex-shrink-0 w-24 h-24">
                <span className="text-2xl font-bold">Day 1</span>
                <span>Aug 15</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Opening Ceremony & Investment Forum
                </h3>
                <p className="text-gray-600 mb-4">
                  Official opening by government officials, keynote speeches,
                  and investment opportunity presentations across key sectors.
                </p>
                <Link
                  href="/events"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Schedule
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-600 text-white rounded-lg p-4 flex flex-col items-center justify-center flex-shrink-0 w-24 h-24">
                <span className="text-2xl font-bold">Day 2</span>
                <span>Aug 16</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Sector-Specific Workshops
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed workshops on agriculture, technology, infrastructure,
                  energy, and tourism investment opportunities.
                </p>
                <Link
                  href="/events"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Schedule
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-600 text-white rounded-lg p-4 flex flex-col items-center justify-center flex-shrink-0 w-24 h-24">
                <span className="text-2xl font-bold">Day 3</span>
                <span>Aug 17</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Business Matchmaking
                </h3>
                <p className="text-gray-600 mb-4">
                  One-on-one meetings between international investors and local
                  businesses, followed by networking events.
                </p>
                <Link
                  href="/events"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Schedule
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-blue-600 text-white rounded-lg p-4 flex flex-col items-center justify-center flex-shrink-0 w-24 h-24">
                <span className="text-2xl font-bold">Extra</span>
                <span>All Days</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Exhibition Zone
                </h3>
                <p className="text-gray-600 mb-4">
                  Continuous exhibition of Ugandan businesses and investment
                  projects throughout the duration of the expo.
                </p>
                <Link
                  href="/venue"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View Floor Plan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Speakers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            Featured Speakers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* This will be dynamically generated from the CMS later */}
            {[1, 2, 3, 4].map((speaker) => (
              <div key={speaker} className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  {/* We'll replace this with actual speaker images later */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
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
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Speaker Name
                </h3>
                <p className="text-gray-600 mb-2">Position, Organization</p>
                <Link
                  href="/speakers"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/speakers"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
            >
              View All Speakers
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            UNITE 2025 is proudly supported by leading organizations committed
            to Uganda's economic growth and development.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* This will be dynamically generated from the CMS later */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
              <div
                key={sponsor}
                className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-32"
              >
                {/* We'll replace this with actual sponsor logos later */}
                <div className="text-gray-300 text-lg font-bold">
                  SPONSOR LOGO
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/sponsors"
              className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
            >
              View All Sponsors
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to be part of Uganda's economic future?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Secure your spot at UNITE 2025 today and connect with key
            stakeholders shaping Uganda's investment landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tickets"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Register Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

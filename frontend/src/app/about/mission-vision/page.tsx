import Link from "next/link";

export default function MissionVisionPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Our Mission & Vision
            </h1>
            <p className="mt-4 text-xl text-green-100 max-w-3xl mx-auto">
              Driving economic growth through investments and partnerships
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

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Our Mission
              </h2>
              <div className="mt-6 prose prose-lg text-gray-500">
                <p>
                  UNITE Expo 2025 is dedicated to accelerating Uganda's economic
                  development by:
                </p>
                <ul>
                  <li>
                    Connecting international investors with high-potential
                    opportunities across Uganda's diverse economy
                  </li>
                  <li>
                    Showcasing Uganda's competitive advantages and strategic
                    position in the East African Community
                  </li>
                  <li>
                    Facilitating meaningful partnerships between foreign
                    investors and local businesses
                  </li>
                  <li>
                    Promoting knowledge transfer and capacity building through
                    networking and dialogue
                  </li>
                  <li>
                    Supporting the Government of Uganda's vision for sustainable
                    and inclusive economic growth
                  </li>
                </ul>
                <p>
                  Through UNITE Expo 2025, we aim to create a vibrant
                  marketplace of ideas, opportunities, and connections that will
                  drive investment, job creation, and prosperity across Uganda.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="bg-green-600 h-64 w-full sm:w-80 rounded-xl shadow-lg flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold mb-3">Mission</div>
                  <div className="text-lg font-medium">
                    Connecting Investment with Opportunity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mt-10 lg:mt-0 flex justify-center order-last lg:order-first">
              <div className="bg-green-700 h-64 w-full sm:w-80 rounded-xl shadow-lg flex items-center justify-center text-white">
                <div className="text-center p-6">
                  <div className="text-5xl font-bold mb-3">Vision</div>
                  <div className="text-lg font-medium">
                    A Prosperous and Globally Integrated Uganda
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Our Vision
              </h2>
              <div className="mt-6 prose prose-lg text-gray-500">
                <p>
                  We envision Uganda as a thriving investment destination and a
                  key player in the global economy, where:
                </p>
                <ul>
                  <li>
                    Strategic investments drive sustainable growth across all
                    sectors of the economy
                  </li>
                  <li>
                    Ugandan businesses are competitive regionally and globally
                  </li>
                  <li>Economic opportunities are accessible to all Ugandans</li>
                  <li>
                    Innovation and technology adoption accelerate development
                  </li>
                  <li>
                    Uganda serves as a model for sustainable and inclusive
                    economic growth in Africa
                  </li>
                </ul>
                <p>
                  UNITE Expo 2025 contributes to this vision by creating a
                  platform where investment meets opportunity, ideas meet
                  resources, and global markets meet local enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              The principles that guide everything we do at UNITE Expo
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                We uphold the highest standards of integrity and transparency in
                all our interactions, providing trustworthy information and
                facilitating honest connections.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace creative and forward-thinking approaches to showcase
                Uganda's potential and connect stakeholders in meaningful ways.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inclusivity
              </h3>
              <p className="text-gray-600">
                We create opportunities for all stakeholders, regardless of size
                or sector, ensuring diverse participation and representation.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We foster a spirit of partnership and teamwork, believing that
                together we can achieve greater impact and success.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Impact
              </h3>
              <p className="text-gray-600">
                We are committed to delivering real, measurable results that
                contribute to Uganda's economic development and prosperity.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="text-green-600 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We promote investments and partnerships that are environmentally
                responsible, socially beneficial, and economically viable in the
                long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center text-white">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Share Our Vision for Uganda's Future
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Join us at UNITE Expo 2025 and be part of Uganda's economic
                transformation story.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  href="/tickets"
                  className="inline-block bg-white px-5 py-3 text-base font-medium text-green-700 shadow-md rounded-md hover:bg-gray-50"
                >
                  Register Now
                </Link>
                <Link
                  href="/about/organizers"
                  className="inline-block bg-transparent border border-white px-5 py-3 text-base font-medium text-white rounded-md hover:bg-green-800"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

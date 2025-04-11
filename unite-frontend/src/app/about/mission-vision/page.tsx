import Link from "next/link";

export const metadata = {
  title: "Mission & Vision | UNITE 2025",
  description:
    "Learn about the mission, vision, and values driving the Uganda Next Investment & Trade Expo 2025.",
};

export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Mission & Vision
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Driving investment and economic growth in Uganda
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Mission & Vision</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Mission Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  <h2 className="text-3xl font-bold text-gray-800">
                    Our Mission
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">
                  <strong className="text-gray-800">
                    UNITE 2025's mission
                  </strong>{" "}
                  is to catalyze sustainable economic growth in Uganda by
                  connecting international investors with local opportunities,
                  facilitating strategic partnerships, and showcasing Uganda's
                  investment potential to the global business community.
                </p>

                <p className="text-gray-600 mb-6">
                  We strive to create a platform that enables meaningful
                  dialogue between investors, business leaders, policymakers,
                  and other stakeholders to drive investment flows into key
                  sectors of Uganda's economy.
                </p>

                <p className="text-gray-600">
                  Through UNITE 2025, we aim to contribute to job creation,
                  technology transfer, skill development, and ultimately,
                  improved livelihoods for Ugandans through responsible and
                  inclusive investment.
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Our Vision
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">
                  <strong className="text-gray-800">Our vision</strong> is to
                  establish Uganda as a premier investment destination in East
                  Africa and position UNITE as the leading platform for
                  investment promotion and facilitation in the region.
                </p>

                <p className="text-gray-600 mb-6">
                  We envision Uganda as a thriving hub of innovation,
                  entrepreneurship, and sustainable development, with a
                  diversified economy that leverages the country's rich natural
                  resources, strategic location, and talented human capital.
                </p>

                <p className="text-gray-600">
                  By 2030, we aim to have contributed significantly to Uganda's
                  economic transformation, helping the country achieve
                  middle-income status through increased domestic and foreign
                  direct investment across key growth sectors.
                </p>
              </div>
            </div>

            {/* Core Values Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  <h2 className="text-3xl font-bold text-gray-800">
                    Core Values
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Integrity
                    </h3>
                    <p className="text-gray-600">
                      We are committed to transparency, honesty, and ethical
                      conduct in all our dealings with investors, partners, and
                      stakeholders.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Excellence
                    </h3>
                    <p className="text-gray-600">
                      We strive for the highest standards of quality in
                      organizing UNITE and facilitating investment connections
                      that create real value.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Sustainability
                    </h3>
                    <p className="text-gray-600">
                      We promote investments that balance economic growth with
                      environmental stewardship and positive social impact for
                      long-term prosperity.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Inclusivity
                    </h3>
                    <p className="text-gray-600">
                      We believe in creating opportunities that benefit all
                      segments of society and facilitate broad-based economic
                      development.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Innovation
                    </h3>
                    <p className="text-gray-600">
                      We embrace new ideas, technologies, and approaches that
                      can accelerate Uganda's development and create competitive
                      advantages.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      Partnership
                    </h3>
                    <p className="text-gray-600">
                      We foster collaborative relationships between public and
                      private sectors, local and international actors to achieve
                      shared goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Objectives */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Strategic Objectives
                  </h2>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Attract Quality Investments
                      </h3>
                      <p className="text-gray-600">
                        Facilitate at least $500 million in new investment
                        commitments to Uganda through UNITE 2025, with a focus
                        on projects that create jobs and transfer technology.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Showcase Uganda's Potential
                      </h3>
                      <p className="text-gray-600">
                        Present at least 200 bankable investment projects across
                        key sectors to potential investors, highlighting
                        Uganda's competitive advantages.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Facilitate Partnerships
                      </h3>
                      <p className="text-gray-600">
                        Enable at least 500 business-to-business meetings
                        between international investors and Ugandan companies
                        during UNITE 2025.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Knowledge Sharing
                      </h3>
                      <p className="text-gray-600">
                        Deliver informative sessions on Uganda's investment
                        climate, regulatory framework, and sector-specific
                        opportunities to at least 1,500 potential investors.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Policy Dialogue
                      </h3>
                      <p className="text-gray-600">
                        Create a platform for constructive dialogue between
                        investors and policymakers to address barriers to
                        investment and improve Uganda's business environment.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-blue-50 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Join Us in Realizing This Vision
              </h2>
              <p className="text-gray-600 mb-6">
                Whether you're an investor, business owner, policymaker, or
                development partner, you have a role to play in Uganda's
                economic transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tickets"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Register for UNITE 2025
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold border border-gray-300 py-3 px-6 rounded-lg transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sponsors | UNITE 2025",
  description:
    "Meet the organizations supporting UNITE 2025 and learn about sponsorship opportunities for the Uganda Next Investment & Trade Expo.",
};

// Mock sponsors data - this would come from Strapi CMS in production
const sponsorTiers = [
  {
    id: "platinum",
    name: "Platinum Sponsors",
    description:
      "Our premium partners making UNITE 2025 possible through their exceptional support.",
    sponsors: [
      {
        id: "sponsor-1",
        name: "Uganda Investment Authority",
        logo: "/placeholder-logo.png",
        website: "https://www.ugandainvest.go.ug/",
        description:
          "The Uganda Investment Authority (UIA) is a semi-autonomous government agency established to promote and facilitate investments in Uganda.",
      },
      {
        id: "sponsor-2",
        name: "Bank of Uganda",
        logo: "/placeholder-logo.png",
        website: "https://www.bou.or.ug/",
        description:
          "The central bank of Uganda responsible for maintaining monetary stability and fostering a sound financial system.",
      },
    ],
  },
  {
    id: "gold",
    name: "Gold Sponsors",
    description:
      "Key partners contributing significantly to the success of UNITE 2025.",
    sponsors: [
      {
        id: "sponsor-3",
        name: "MTN Uganda",
        logo: "/placeholder-logo.png",
        website: "https://www.mtn.co.ug/",
        description:
          "Uganda's leading telecommunications company providing mobile and internet services throughout the country.",
      },
      {
        id: "sponsor-4",
        name: "Stanbic Bank Uganda",
        logo: "/placeholder-logo.png",
        website: "https://www.stanbicbank.co.ug/",
        description:
          "A leading commercial bank in Uganda offering a wide range of banking and financial services.",
      },
      {
        id: "sponsor-5",
        name: "Umeme Limited",
        logo: "/placeholder-logo.png",
        website: "https://www.umeme.co.ug/",
        description:
          "Uganda's main electricity distribution company responsible for the distribution and supply of electricity.",
      },
    ],
  },
  {
    id: "silver",
    name: "Silver Sponsors",
    description:
      "Valued partners supporting UNITE 2025 and Uganda's investment landscape.",
    sponsors: [
      {
        id: "sponsor-6",
        name: "Equity Bank Uganda",
        logo: "/placeholder-logo.png",
        website: "https://equitybank.co.ug/",
        description:
          "A commercial bank offering a range of financial services to individuals and businesses across Uganda.",
      },
      {
        id: "sponsor-7",
        name: "Total Energies Uganda",
        logo: "/placeholder-logo.png",
        website: "https://totalenergies.com/",
        description:
          "A major energy company engaged in oil exploration, production, and marketing of petroleum products in Uganda.",
      },
      {
        id: "sponsor-8",
        name: "Uganda Airlines",
        logo: "/placeholder-logo.png",
        website: "https://www.ugandairlines.com/",
        description:
          "The national flag carrier of Uganda providing passenger and cargo services to destinations across Africa and beyond.",
      },
      {
        id: "sponsor-9",
        name: "Kakira Sugar Limited",
        logo: "/placeholder-logo.png",
        website: "https://www.kakirasugar.com/",
        description:
          "One of Uganda's largest sugar manufacturers producing sugar and related products while supporting local agriculture.",
      },
    ],
  },
];

// Additional partner organizations
const partners = [
  {
    id: "partner-1",
    name: "Private Sector Foundation Uganda",
    logo: "/placeholder-logo.png",
  },
  {
    id: "partner-2",
    name: "Uganda Manufacturers Association",
    logo: "/placeholder-logo.png",
  },
  {
    id: "partner-3",
    name: "Uganda Tourism Board",
    logo: "/placeholder-logo.png",
  },
  {
    id: "partner-4",
    name: "Uganda Export Promotion Board",
    logo: "/placeholder-logo.png",
  },
  {
    id: "partner-5",
    name: "Kampala Capital City Authority",
    logo: "/placeholder-logo.png",
  },
  {
    id: "partner-6",
    name: "Uganda Free Zones Authority",
    logo: "/placeholder-logo.png",
  },
];

// Sponsorship packages data
const sponsorshipPackages = [
  {
    id: "platinum",
    name: "Platinum",
    price: "$25,000",
    benefits: [
      "Premium exhibition space (36 sqm)",
      "10 full-access delegate passes",
      "Keynote speaking opportunity",
      "Premium logo placement on all event materials",
      "Full-page advertisement in event program",
      "Company profile in event press releases",
      "VIP seating at all main events",
      "Access to exclusive networking events",
      "Featured article on event website",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "$15,000",
    benefits: [
      "Premium exhibition space (18 sqm)",
      "6 full-access delegate passes",
      "Panel participation opportunity",
      "Logo placement on all event materials",
      "Half-page advertisement in event program",
      "Company mention in event press releases",
      "Reserved seating at main events",
      "Access to networking events",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "$7,500",
    benefits: [
      "Exhibition space (9 sqm)",
      "3 full-access delegate passes",
      "Logo placement on event website and program",
      "Quarter-page advertisement in event program",
      "Company listing in event directory",
      "Access to networking events",
    ],
  },
];

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sponsors</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the organizations supporting UNITE 2025 and making it possible
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Thank You to Our Sponsors
            </h2>
            <p className="text-gray-600 text-center mb-8">
              UNITE 2025 is proudly supported by leading organizations committed
              to Uganda's economic growth and development. We extend our sincere
              gratitude to all our sponsors for their valuable support.
            </p>
          </div>

          {/* Sponsor Tiers */}
          <div className="space-y-20 mb-20">
            {sponsorTiers.map((tier) => (
              <div key={tier.id} id={tier.id}>
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {tier.name}
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    {tier.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tier.sponsors.map((sponsor) => (
                    <div
                      key={sponsor.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-xl font-bold text-gray-800">
                            {sponsor.name}
                          </h3>
                          <div className="bg-gray-100 rounded-lg h-16 w-36 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">LOGO</span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                          {sponsor.description}
                        </p>

                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-auto"
                        >
                          Visit Website
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Partners Section */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Our Partners
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                UNITE 2025 is also supported by these important partner
                organizations who contribute to the success of the event.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-center h-32"
                >
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-lg h-12 w-24 flex items-center justify-center mx-auto mb-2">
                      <span className="text-gray-400 text-xs">LOGO</span>
                    </div>
                    <p className="text-gray-800 text-sm">{partner.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Sponsor Section */}
          <div className="mb-20">
            <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Become a Sponsor
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Join leading organizations in supporting UNITE 2025 and gain
                    exceptional visibility with key stakeholders in Uganda's
                    investment landscape. As a sponsor, you'll receive unique
                    benefits and opportunities to showcase your brand.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {sponsorshipPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                        pkg.id === "platinum"
                          ? "border-yellow-400"
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className={`${
                          pkg.id === "platinum"
                            ? "bg-yellow-400"
                            : pkg.id === "gold"
                            ? "bg-yellow-300"
                            : "bg-gray-200"
                        } py-3 text-center`}
                      >
                        <h3 className="text-xl font-bold text-gray-800">
                          {pkg.name} Package
                        </h3>
                      </div>

                      <div className="p-6">
                        <div className="text-center mb-6">
                          <p className="text-3xl font-bold text-gray-800">
                            {pkg.price}
                          </p>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {pkg.benefits.map((benefit, index) => (
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
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href="/contact?subject=Sponsorship%20Inquiry&inquiryType=sponsor"
                          className={`w-full block text-center py-3 px-6 rounded-lg font-bold transition duration-300 ${
                            pkg.id === "platinum"
                              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          Inquire Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    In addition to the packages above, we also offer specialized
                    sponsorship opportunities for specific event components such
                    as networking receptions, coffee breaks, delegate bags, and
                    more.
                  </p>
                  <Link
                    href="/contact?subject=Custom%20Sponsorship%20Inquiry&inquiryType=sponsor"
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    Discuss Custom Sponsorship Options
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
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

          {/* Benefits of Sponsorship */}
          <div className="mb-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Why Sponsor UNITE 2025?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Sponsoring UNITE 2025 offers unique advantages for your
                organization:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Visibility & Brand Exposure
                </h3>
                <p className="text-gray-600">
                  Gain exceptional visibility with a targeted audience of
                  investors, business leaders, and government officials. Your
                  brand will be prominently featured across event materials,
                  digital platforms, and at the venue.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Networking Opportunities
                </h3>
                <p className="text-gray-600">
                  Connect with key decision-makers, potential clients, and
                  partners from Uganda and around the world. Sponsorship
                  includes access to exclusive networking events and VIP
                  functions.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Thought Leadership
                </h3>
                <p className="text-gray-600">
                  Demonstrate your industry expertise and thought leadership
                  through speaking opportunities, panel discussions, and
                  specialized workshops that showcase your organization's
                  knowledge and capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                What Previous Sponsors Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    <span className="text-gray-400 text-xs">LOGO</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      John Doe
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Marketing Director, Company Name
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">
                  "Sponsoring the Uganda Investment Expo provided us with
                  exceptional exposure to key decision-makers and potential
                  clients. The ROI exceeded our expectations, and we've already
                  secured several valuable partnerships as a direct result."
                </blockquote>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    <span className="text-gray-400 text-xs">LOGO</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      Jane Smith
                    </h3>
                    <p className="text-gray-600 text-sm">CEO, Company Name</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">
                  "The quality of attendees and organization of the event was
                  impressive. Our company gained significant visibility, and the
                  speaking opportunity allowed us to showcase our expertise to a
                  highly engaged audience."
                </blockquote>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Showcase Your Brand?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Secure your sponsorship for UNITE 2025 now and position your
                organization at the forefront of Uganda's investment landscape.
              </p>
              <Link
                href="/contact?subject=Sponsorship%20Inquiry&inquiryType=sponsor"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

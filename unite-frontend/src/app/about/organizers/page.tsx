import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Organizers | UNITE 2025",
  description:
    "Meet the team and organizations behind UNITE 2025 - Uganda's premier investment and trade expo.",
};

// Mock data for organizers - this would come from Strapi CMS in production
const organizers = [
  {
    id: "uia",
    name: "Uganda Investment Authority",
    logo: "/placeholder-logo.png",
    description:
      "The Uganda Investment Authority (UIA) is a semi-autonomous government agency established by an Act of Parliament to promote and facilitate investments in Uganda.",
    role: "Lead Organizer",
    website: "https://www.ugandainvest.go.ug/",
  },
  {
    id: "mofped",
    name: "Ministry of Finance, Planning and Economic Development",
    logo: "/placeholder-logo.png",
    description:
      "The Ministry is responsible for economic policy formulation, resource mobilization, and economic planning to facilitate economic growth in Uganda.",
    role: "Co-Organizer",
    website: "https://www.finance.go.ug/",
  },
  {
    id: "mtic",
    name: "Ministry of Trade, Industry and Cooperatives",
    logo: "/placeholder-logo.png",
    description:
      "The Ministry oversees policy formulation and implementation for trade, industry, and cooperatives sectors to drive sustainable economic growth.",
    role: "Co-Organizer",
    website: "https://www.mtic.go.ug/",
  },
  {
    id: "psfu",
    name: "Private Sector Foundation Uganda",
    logo: "/placeholder-logo.png",
    description:
      "PSFU is Uganda's apex body for the private sector, representing over 200 business associations and advocating for a favorable business environment.",
    role: "Partner",
    website: "https://www.psfuganda.org/",
  },
  {
    id: "kcca",
    name: "Kampala Capital City Authority",
    logo: "/placeholder-logo.png",
    description:
      "KCCA is the governing body of the capital city of Uganda, responsible for providing quality services to residents and facilitating urban development.",
    role: "Host City Partner",
    website: "https://www.kcca.go.ug/",
  },
  {
    id: "undp",
    name: "United Nations Development Programme",
    logo: "/placeholder-logo.png",
    description:
      "UNDP works to eradicate poverty, reduce inequalities, and support sustainable development in Uganda and around the world.",
    role: "Development Partner",
    website: "https://www.undp.org/uganda",
  },
];

// Mock data for organizing committee members - this would come from Strapi CMS in production
const committeeMembers = [
  {
    id: "member-1",
    name: "David Mukasa",
    title: "Chairperson, UNITE 2025 Organizing Committee",
    organization: "Uganda Investment Authority",
    image: "/placeholder-person.jpg",
    bio: "David brings over 20 years of experience in investment promotion and has been instrumental in shaping Uganda's investment strategy.",
  },
  {
    id: "member-2",
    name: "Sarah Namuli",
    title: "Vice Chairperson, UNITE 2025 Organizing Committee",
    organization: "Ministry of Finance, Planning and Economic Development",
    image: "/placeholder-person.jpg",
    bio: "Sarah oversees the financial strategy for UNITE 2025 and ensures alignment with national development priorities.",
  },
  {
    id: "member-3",
    name: "Joseph Ochieng",
    title: "Head of Operations",
    organization: "Uganda Investment Authority",
    image: "/placeholder-person.jpg",
    bio: "Joseph is responsible for the overall planning, logistics, and execution of UNITE 2025.",
  },
  {
    id: "member-4",
    name: "Angela Nakato",
    title: "Head of Marketing & Communications",
    organization: "Private Sector Foundation Uganda",
    image: "/placeholder-person.jpg",
    bio: "Angela leads the promotion of UNITE 2025 to local and international audiences, driving participation and engagement.",
  },
  {
    id: "member-5",
    name: "Robert Muwonge",
    title: "Head of Investor Relations",
    organization: "Uganda Investment Authority",
    image: "/placeholder-person.jpg",
    bio: "Robert manages relationships with international investors and facilitates business matchmaking at UNITE 2025.",
  },
  {
    id: "member-6",
    name: "Esther Kyambadde",
    title: "Head of Exhibitions",
    organization: "Ministry of Trade, Industry and Cooperatives",
    image: "/placeholder-person.jpg",
    bio: "Esther oversees the exhibition component of UNITE 2025, ensuring a seamless experience for exhibitors and visitors.",
  },
];

export default function OrganizersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the Organizers
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            The institutions and team behind UNITE 2025
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
            <span className="text-gray-800 font-medium">Organizers</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  About the Organizers
                </h2>
                <p className="text-gray-600 mb-6">
                  UNITE 2025 is organized through a collaborative effort between
                  government agencies, private sector organizations, and
                  development partners, all committed to promoting investment
                  and trade in Uganda.
                </p>
                <p className="text-gray-600">
                  This partnership brings together complementary expertise and
                  resources to create a world-class event that effectively
                  showcases Uganda's investment opportunities and facilitates
                  meaningful connections between investors and local
                  stakeholders.
                </p>
              </div>
            </div>

            {/* Organizers Grid */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Organizing Institutions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {organizers.map((org) => (
                <div
                  key={org.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {org.name}
                        </h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {org.role}
                        </span>
                      </div>
                      <div className="bg-gray-100 rounded-lg h-16 w-16 flex items-center justify-center">
                        <div className="text-gray-400 text-xs font-medium">
                          LOGO
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{org.description}</p>

                    <a
                      href={org.website}
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
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Committee Members */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Organizing Committee
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {committeeMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                        {/* We'll replace this with actual member images later */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
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
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 text-sm">{member.title}</p>
                        <p className="text-gray-500 text-sm">
                          {member.organization}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partners Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Our Partners
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  UNITE 2025 is also supported by various industry associations,
                  international organizations, and sector-specific partners who
                  contribute to specific aspects of the event.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {/* These would be replaced with actual partner logos */}
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div
                      key={item}
                      className="h-24 bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-gray-400 text-sm font-medium">
                        PARTNER LOGO
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/sponsors"
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    View All Sponsors & Partners
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
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

            {/* Become a Partner CTA */}
            <div className="text-center bg-blue-50 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Interested in Partnering with Us?
              </h2>
              <p className="text-gray-600 mb-6">
                We welcome organizations interested in contributing to UNITE
                2025 and promoting investment and trade in Uganda. Various
                partnership opportunities are available.
              </p>
              <Link
                href="/contact?subject=Partnership%20Inquiry"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
              >
                Inquire About Partnerships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

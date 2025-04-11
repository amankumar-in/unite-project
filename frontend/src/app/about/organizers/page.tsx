import Link from "next/link";

// Sample data for organizers - in a real app, this would come from Strapi
const organizingCommittee = [
  {
    id: 1,
    name: "Dr. Sarah Namuli",
    title: "Chairperson, UNITE Expo 2025",
    organization: "Uganda Investment Authority",
    bio: "Dr. Namuli is the Executive Director of the Uganda Investment Authority with over 20 years of experience in investment promotion and economic development.",
    imagePlaceholder: "F",
  },
  {
    id: 2,
    name: "James Okello",
    title: "Deputy Chairperson",
    organization: "Ministry of Trade, Industry & Cooperatives",
    bio: "Mr. Okello oversees trade promotion initiatives and has been instrumental in developing Uganda's export strategy.",
    imagePlaceholder: "M",
  },
  {
    id: 3,
    name: "Patricia Mulondo",
    title: "Head of Operations",
    organization: "Uganda Export Promotion Board",
    bio: "Ms. Mulondo brings extensive experience in event management and trade exhibitions across East Africa.",
    imagePlaceholder: "F",
  },
  {
    id: 4,
    name: "Robert Mukasa",
    title: "Finance Director",
    organization: "Private Sector Foundation Uganda",
    bio: "Mr. Mukasa manages the financial planning and budgeting for UNITE Expo, ensuring resources are allocated effectively.",
    imagePlaceholder: "M",
  },
  {
    id: 5,
    name: "Elizabeth Nantume",
    title: "Marketing & Communications Lead",
    organization: "Uganda Tourism Board",
    bio: "Ms. Nantume directs all marketing efforts for UNITE Expo, leveraging her experience in promoting Uganda internationally.",
    imagePlaceholder: "F",
  },
  {
    id: 6,
    name: "David Ochieng",
    title: "Partnerships Coordinator",
    organization: "Uganda Manufacturers Association",
    bio: "Mr. Ochieng manages relationships with sponsors, exhibitors, and other stakeholders to ensure a successful expo.",
    imagePlaceholder: "M",
  },
];

const partnerOrganizations = [
  {
    id: 1,
    name: "Uganda Investment Authority",
    role: "Lead Organizer",
    description:
      "A government agency responsible for promoting and facilitating investment in Uganda.",
    logo: "UIA",
  },
  {
    id: 2,
    name: "Ministry of Trade, Industry & Cooperatives",
    role: "Co-organizer",
    description:
      "Government ministry responsible for trade policy and regulation in Uganda.",
    logo: "MTIC",
  },
  {
    id: 3,
    name: "Uganda Export Promotion Board",
    role: "Partner",
    description:
      "Agency focused on promoting Ugandan exports to international markets.",
    logo: "UEPB",
  },
  {
    id: 4,
    name: "Private Sector Foundation Uganda",
    role: "Partner",
    description:
      "Apex body of the private sector made up of over 200 business associations and corporate members.",
    logo: "PSFU",
  },
  {
    id: 5,
    name: "Uganda Tourism Board",
    role: "Partner",
    description:
      "Statutory organization responsible for promoting Uganda as a tourism destination.",
    logo: "UTB",
  },
  {
    id: 6,
    name: "Uganda Manufacturers Association",
    role: "Partner",
    description:
      "Business association representing the manufacturing sector in Uganda.",
    logo: "UMA",
  },
];

export default function OrganizersPage() {
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {organizingCommittee.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold ${
                        member.imagePlaceholder === "F"
                          ? "bg-green-600"
                          : "bg-green-700"
                      } text-white`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-green-600">{member.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">
                    {member.organization}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerOrganizations.map((org) => (
              <div
                key={org.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="h-16 w-full flex items-center justify-center mb-4">
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md font-bold text-xl">
                      {org.logo}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">
                    {org.name}
                  </h3>
                  <p className="text-green-600 text-sm mb-4 text-center">
                    {org.role}
                  </p>
                  <p className="text-gray-600">{org.description}</p>
                </div>
              </div>
            ))}
          </div>
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

import Link from "next/link";

export const metadata = {
  title: "Speakers | UNITE 2025",
  description:
    "Meet the industry experts, government officials, and business leaders who will be speaking at UNITE 2025.",
};

// Mock data for speakers - this would eventually come from Strapi
const speakers = [
  {
    id: "speaker-1",
    name: "John Doe",
    title: "Minister of Finance",
    organization: "Government of Uganda",
    bio: "With over 20 years of experience in economic policy and public finance, John Doe has been instrumental in Uganda's economic transformation agenda.",
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-1"],
  },
  {
    id: "speaker-2",
    name: "Jane Smith",
    title: "Executive Director",
    organization: "Uganda Investment Authority",
    bio: "Jane Smith leads the Uganda Investment Authority's efforts to attract and facilitate investments in priority sectors.",
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-1"],
  },
  {
    id: "speaker-3",
    name: "Alice Johnson",
    title: "Agricultural Investment Specialist",
    organization: "Ministry of Agriculture",
    bio: "Alice Johnson specializes in agricultural investments with a focus on sustainable farming practices and value addition in the agricultural supply chain.",
    image: "/placeholder-speaker.jpg",
    category: "Sector Expert",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-2", "event-5"],
  },
  {
    id: "speaker-4",
    name: "Robert Brown",
    title: "CEO",
    organization: "AgriTech Uganda",
    bio: "Robert Brown leads AgriTech Uganda, a pioneering company integrating technology solutions into Uganda's agricultural sector.",
    image: "/placeholder-speaker.jpg",
    category: "Business Leader",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-2", "event-5"],
  },
  {
    id: "speaker-5",
    name: "Michael Tech",
    title: "Director",
    organization: "Uganda Technology Hub",
    bio: "Michael Tech oversees Uganda's premier technology innovation hub, supporting startups and technology initiatives across the country.",
    image: "/placeholder-speaker.jpg",
    category: "Technology Expert",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-3", "event-6"],
  },
  {
    id: "speaker-6",
    name: "Sarah Innovation",
    title: "Founder",
    organization: "TechStart Uganda",
    bio: "Sarah Innovation is a tech entrepreneur who founded TechStart Uganda to nurture the next generation of technology innovators in the country.",
    image: "/placeholder-speaker.jpg",
    category: "Entrepreneur",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-3", "event-6"],
  },
  {
    id: "speaker-7",
    name: "David Builder",
    title: "Infrastructure Investment Expert",
    organization: "Global Infrastructure Partners",
    bio: "David Builder brings international expertise in infrastructure development and public-private partnerships to UNITE 2025.",
    image: "/placeholder-speaker.jpg",
    category: "International Expert",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-4"],
  },
  {
    id: "speaker-8",
    name: "Susan Infrastructure",
    title: "Director of Urban Planning",
    organization: "Ministry of Lands and Urban Development",
    bio: "Susan Infrastructure leads urban planning initiatives and infrastructure development projects across Uganda's major cities.",
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-4"],
  },
  {
    id: "speaker-9",
    name: "Farming Expert",
    title: "Agricultural Economist",
    organization: "National Agricultural Research Organization",
    bio: "As an agricultural economist, Farming Expert analyzes market trends and investment opportunities in Uganda's diverse agricultural sectors.",
    image: "/placeholder-speaker.jpg",
    category: "Researcher",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-5"],
  },
  {
    id: "speaker-10",
    name: "Tech Guru",
    title: "CTO",
    organization: "East Africa Tech Alliance",
    bio: "Tech Guru is a recognized authority on technology trends and digital transformation across East Africa.",
    image: "/placeholder-speaker.jpg",
    category: "Technology Expert",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-6"],
  },
  {
    id: "speaker-11",
    name: "Tourism Expert",
    title: "Director of Tourism Development",
    organization: "Uganda Tourism Board",
    bio: "Tourism Expert leads initiatives to develop Uganda's tourism industry and attract investments in hospitality and tourism infrastructure.",
    image: "/placeholder-speaker.jpg",
    category: "Sector Expert",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-7"],
  },
  {
    id: "speaker-12",
    name: "Energy Specialist",
    title: "Head of Renewable Energy",
    organization: "Ministry of Energy and Mineral Development",
    bio: "Energy Specialist champions Uganda's transition to renewable energy sources and investment opportunities in the energy sector.",
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: false,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: ["event-8"],
  },
];

// Categories for filtering
const categories = [
  "All",
  "Government Official",
  "Business Leader",
  "Entrepreneur",
  "Sector Expert",
  "Technology Expert",
  "International Expert",
  "Researcher",
];

export default function SpeakersPage() {
  // In a real implementation, this would use client-side filtering
  // For now, we'll just show all speakers
  const featuredSpeakers = speakers.filter((speaker) => speaker.featured);
  const allSpeakers = speakers;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Speakers
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn from industry experts, government officials, and business
            leaders who are shaping Uganda's investment landscape.
          </p>
        </div>
      </section>

      {/* Featured Speakers Section */}
      {featuredSpeakers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Featured Speakers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSpeakers.map((speaker) => (
                <Link
                  href={`/speakers/${speaker.id}`}
                  key={speaker.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:translate-y-[-4px] hover:shadow-lg flex flex-col"
                >
                  <div className="h-64 bg-gray-200 relative">
                    {/* We'll replace this with actual speaker images later */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
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
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
                        {speaker.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-600 mb-1">{speaker.title}</p>
                    <p className="text-gray-500 text-sm mb-4">
                      {speaker.organization}
                    </p>
                    <p className="text-gray-600 line-clamp-3">{speaker.bio}</p>
                  </div>

                  <div className="px-6 pb-6 mt-auto">
                    <div className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      View Profile
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter and Speaker Directory */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Speaker Directory
          </h2>

          {/* Category Filters - These would be interactive in a client component */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Speaker Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allSpeakers.map((speaker) => (
              <Link
                href={`/speakers/${speaker.id}`}
                key={speaker.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden transition transform hover:translate-y-[-4px] hover:shadow-md p-6 flex flex-col"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    {/* We'll replace this with actual speaker images later */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{speaker.title}</p>
                  <p className="text-gray-500 text-xs mb-2">
                    {speaker.organization}
                  </p>

                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {speaker.category}
                  </span>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Profile
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Speakers - if applicable */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Interested in speaking at UNITE 2025?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking for experts in investment, trade, and Uganda's
            key economic sectors to share their knowledge and insights at our
            events.
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

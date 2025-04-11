import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data for speakers - this would eventually come from Strapi
const speakers = [
  {
    id: "speaker-1",
    name: "John Doe",
    title: "Minister of Finance",
    organization: "Government of Uganda",
    bio: "With over 20 years of experience in economic policy and public finance, John Doe has been instrumental in Uganda's economic transformation agenda.",
    longBio: `
      <p>John Doe is the current Minister of Finance for the Government of Uganda, a position he has held since 2020. With over 20 years of experience in economic policy and public finance, he has been instrumental in Uganda's economic transformation agenda.</p>
      
      <p>Prior to his appointment as Minister, John served as the Permanent Secretary in the Ministry of Finance for five years, where he oversaw the implementation of key economic reforms and helped secure substantial international investments in Uganda's infrastructure and energy sectors.</p>
      
      <p>John holds a PhD in Economics from Harvard University and a Master's degree in Public Administration from the London School of Economics. His academic background, combined with his extensive practical experience, has positioned him as a leading voice in economic development policies in East Africa.</p>
      
      <p>Throughout his career, John has championed initiatives to improve Uganda's investment climate, streamline regulatory processes, and develop infrastructure projects through public-private partnerships. He has been particularly focused on fiscal discipline and creating a stable macroeconomic environment conducive to both foreign and domestic investment.</p>
      
      <p>At UNITE 2025, John will share insights on Uganda's economic outlook, investment incentives, and the government's vision for sustainable and inclusive growth over the next decade.</p>
    `,
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: [
      {
        id: "event-1",
        title: "Opening Ceremony",
        day: 1,
        date: "August 15, 2025",
        startTime: "09:00",
        endTime: "10:30",
        location: "Main Auditorium",
      },
    ],
  },
  {
    id: "speaker-2",
    name: "Jane Smith",
    title: "Executive Director",
    organization: "Uganda Investment Authority",
    bio: "Jane Smith leads the Uganda Investment Authority's efforts to attract and facilitate investments in priority sectors.",
    longBio: `
      <p>Jane Smith is the Executive Director of the Uganda Investment Authority (UIA), the government agency responsible for promoting and facilitating investments in Uganda. Under her leadership, the UIA has streamlined investment procedures and significantly increased both domestic and foreign direct investment in the country.</p>
      
      <p>Before joining the UIA, Jane worked in the private sector for 15 years, including as the Country Manager for a multinational corporation operating across East Africa. This experience has given her valuable insights into the needs and perspectives of international investors considering opportunities in Uganda.</p>
      
      <p>Jane holds an MBA from INSEAD and a Bachelor's degree in International Business from Makerere University. She has received numerous accolades for her contributions to improving Uganda's business environment, including being named one of Africa's Most Influential Women in Government by the African Leadership Magazine in 2023.</p>
      
      <p>Jane is passionate about positioning Uganda as a premier investment destination in East Africa and has been instrumental in developing the country's investment promotion strategy. She has particularly focused on attracting investments in manufacturing, agribusiness, and information technology.</p>
      
      <p>At UNITE 2025, Jane will provide comprehensive information on Uganda's investment opportunities, incentive packages, and the support services available to investors through the UIA and other government agencies.</p>
    `,
    image: "/placeholder-speaker.jpg",
    category: "Government Official",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: [
      {
        id: "event-1",
        title: "Opening Ceremony",
        day: 1,
        date: "August 15, 2025",
        startTime: "09:00",
        endTime: "10:30",
        location: "Main Auditorium",
      },
    ],
  },
  {
    id: "speaker-3",
    name: "Alice Johnson",
    title: "Agricultural Investment Specialist",
    organization: "Ministry of Agriculture",
    bio: "Alice Johnson specializes in agricultural investments with a focus on sustainable farming practices and value addition in the agricultural supply chain.",
    longBio: `
      <p>Alice Johnson serves as the Agricultural Investment Specialist at Uganda's Ministry of Agriculture, where she leads initiatives to attract and facilitate investments in the agricultural sector. With her extensive knowledge of Uganda's agricultural landscape, Alice has been instrumental in developing sustainable investment models that benefit both investors and local communities.</p>
      
      <p>Alice has over 15 years of experience in agricultural economics and development, including five years with the Food and Agriculture Organization (FAO) where she worked on agricultural investment programs across several African countries. This international exposure has given her a deep understanding of global best practices in agricultural investments and how they can be adapted to the Ugandan context.</p>
      
      <p>She holds a Master's degree in Agricultural Economics from Cornell University and a Bachelor's degree in Agribusiness from Makerere University. Alice is also a certified Project Management Professional (PMP) and has published several papers on agricultural value chains and investment opportunities in East Africa.</p>
      
      <p>Throughout her career, Alice has focused on creating win-win investment models that integrate smallholder farmers into commercial agricultural ventures. She has been particularly passionate about promoting investments in agro-processing and value addition to increase the competitiveness of Uganda's agricultural exports.</p>
      
      <p>At UNITE 2025, Alice will present specific investment opportunities in Uganda's agricultural sector, including commercial farming, agro-processing, and agricultural technology. She will also address key considerations for agricultural investors such as land access, water resources, infrastructure, and market access.</p>
    `,
    image: "/placeholder-speaker.jpg",
    category: "Sector Expert",
    featured: true,
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    events: [
      {
        id: "event-2",
        title: "Investment Opportunities in Agriculture",
        day: 1,
        date: "August 15, 2025",
        startTime: "11:00",
        endTime: "12:30",
        location: "Seminar Room A",
      },
      {
        id: "event-5",
        title: "Agribusiness Workshop",
        day: 2,
        date: "August 16, 2025",
        startTime: "09:00",
        endTime: "12:00",
        location: "Workshop Room 1",
      },
    ],
  },
  // More speakers would be added here
];

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { speakerId: string };
}) {
  const speaker = speakers.find((speaker) => speaker.id === params.speakerId);

  if (!speaker) {
    return {
      title: "Speaker Not Found | UNITE 2025",
      description: "The requested speaker could not be found.",
    };
  }

  return {
    title: `${speaker.name} | UNITE 2025 Speakers`,
    description: speaker.bio,
  };
}

export default function SpeakerDetailPage({
  params,
}: {
  params: { speakerId: string };
}) {
  const speaker = speakers.find((speaker) => speaker.id === params.speakerId);

  if (!speaker) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 md:mr-8">
              <Link
                href="/speakers"
                className="inline-flex items-center text-blue-200 hover:text-white mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to All Speakers
              </Link>
              <h1 className="text-4xl font-bold mb-2">{speaker.name}</h1>
              <p className="text-xl mb-1">{speaker.title}</p>
              <p className="text-blue-200 text-lg mb-4">
                {speaker.organization}
              </p>

              <div className="flex space-x-4 mb-6">
                {speaker.socialMedia.twitter && (
                  <a
                    href={speaker.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200"
                    aria-label="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}

                {speaker.socialMedia.linkedin && (
                  <a
                    href={speaker.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>

              <span className="inline-block bg-blue-800 text-white px-3 py-1 text-sm font-medium rounded-full">
                {speaker.category}
              </span>
            </div>

            <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden">
              {/* We'll replace this with actual speaker images later */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-32 w-32"
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
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Bio */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Biography
                  </h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: speaker.longBio }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div>
              {/* Speaking Sessions */}
              {speaker.events && speaker.events.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Speaking Sessions
                    </h2>
                    <div className="space-y-6">
                      {speaker.events.map((event) => (
                        <div
                          key={event.id}
                          className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center mb-2">
                            <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 text-sm font-medium">
                              Day {event.day} • {event.startTime} -{" "}
                              {event.endTime}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            <Link
                              href={`/events/${event.id}`}
                              className="hover:text-blue-600"
                            >
                              {event.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {event.location}
                          </p>
                          <Link
                            href={`/events/${event.id}`}
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                          >
                            Event Details
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
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact for Inquiries */}
              <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Contact for Inquiries
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Interested in connecting with {speaker.name} during UNITE
                    2025? Contact our team for meeting arrangements.
                  </p>
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full block text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 sm:mb-0">
              Share this speaker's profile:
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700"
                aria-label="Share on Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-900"
                aria-label="Share on Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600"
                aria-label="Share on LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800"
                aria-label="Share via Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

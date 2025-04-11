import Link from "next/link";
import { notFound } from "next/navigation";

// This would normally come from the CMS
const events = [
  {
    id: "event-1",
    title: "Opening Ceremony",
    description:
      "Official opening of UNITE 2025 with remarks from government officials and keynote speeches by distinguished guests.",
    longDescription: `
      <p>Join us for the grand opening of UNITE 2025, where Uganda's journey towards becoming a leading investment destination in East Africa will be showcased to the world.</p>
      
      <p>The ceremony will begin with a welcome address from the Minister of Finance, Planning and Economic Development, followed by keynote speeches from distinguished international guests and the President of Uganda.</p>
      
      <p>The opening ceremony will highlight Uganda's economic achievements, ongoing reforms to improve the investment climate, and a vision for the future of foreign direct investment in the country.</p>
      
      <p>This event sets the tone for the entire expo and provides a comprehensive overview of what attendees can expect over the three days, including major investment opportunities, policy frameworks, and strategic sectors.</p>
    `,
    day: 1,
    date: "August 15, 2025",
    startTime: "09:00",
    endTime: "10:30",
    location: "Main Auditorium",
    category: "Ceremony",
    speakers: [
      {
        id: "speaker-1",
        name: "John Doe",
        title: "Minister of Finance",
        organization: "Government of Uganda",
        image: "/placeholder-speaker.jpg",
      },
      {
        id: "speaker-2",
        name: "Jane Smith",
        title: "Executive Director",
        organization: "Uganda Investment Authority",
        image: "/placeholder-speaker.jpg",
      },
    ],
    relatedEvents: ["event-2", "event-3"],
    materials: [
      {
        title: "Opening Ceremony Agenda",
        type: "PDF",
        url: "#",
      },
      {
        title: "Investment Climate Overview Presentation",
        type: "PPTX",
        url: "#",
      },
    ],
  },
  {
    id: "event-2",
    title: "Investment Opportunities in Agriculture",
    description:
      "Presentation of investment opportunities in Uganda's agricultural sector, focusing on commercial farming, agro-processing, and agricultural technology.",
    longDescription: `
      <p>Uganda's agricultural sector offers tremendous investment potential due to the country's fertile soils, favorable climate, and abundant water resources.</p>
      
      <p>This session will provide a comprehensive overview of specific investment opportunities in commercial farming, agro-processing, and agricultural technology. Learn about the government's plans to modernize the sector and increase agricultural exports.</p>
      
      <p>Key areas of focus include:</p>
      <ul>
        <li>Commercial farming opportunities in coffee, tea, cocoa, and other high-value crops</li>
        <li>Livestock and dairy farming projects seeking investment</li>
        <li>Agro-processing facilities to add value to Uganda's agricultural products</li>
        <li>Agricultural technology innovations suitable for Uganda's context</li>
        <li>Available incentives and support for agricultural investors</li>
      </ul>
      
      <p>Presenters will also address land access policies, regulatory frameworks, and financing options available to investors in the agricultural sector.</p>
    `,
    day: 1,
    date: "August 15, 2025",
    startTime: "11:00",
    endTime: "12:30",
    location: "Seminar Room A",
    category: "Presentation",
    speakers: [
      {
        id: "speaker-3",
        name: "Alice Johnson",
        title: "Agricultural Investment Specialist",
        organization: "Ministry of Agriculture",
        image: "/placeholder-speaker.jpg",
      },
      {
        id: "speaker-4",
        name: "Robert Brown",
        title: "CEO",
        organization: "AgriTech Uganda",
        image: "/placeholder-speaker.jpg",
      },
    ],
    relatedEvents: ["event-1", "event-5"],
    materials: [
      {
        title: "Agricultural Investment Opportunities Presentation",
        type: "PDF",
        url: "#",
      },
      {
        title: "Agriculture Sector Investment Guide",
        type: "PDF",
        url: "#",
      },
    ],
  },
  {
    id: "event-3",
    title: "Technology & Innovation Showcase",
    description:
      "Highlighting Uganda's growing technology ecosystem and opportunities for investment in tech startups and innovation hubs.",
    longDescription: `
      <p>Uganda's technology sector is rapidly expanding, with a young, tech-savvy population and growing innovation ecosystem that presents exciting investment opportunities.</p>
      
      <p>This showcase will highlight Uganda's emerging technology startups, innovation hubs, and digital transformation initiatives. Attendees will have the opportunity to interact with founders and developers, view demonstrations of locally developed solutions, and explore investment possibilities.</p>
      
      <p>The session will showcase innovations in:</p>
      <ul>
        <li>Financial technology (fintech) solutions</li>
        <li>Health technology applications</li>
        <li>Educational technology platforms</li>
        <li>Agricultural technology innovations</li>
        <li>E-commerce and digital marketplace solutions</li>
      </ul>
      
      <p>Representatives from tech hubs, accelerators, and government agencies will be available to discuss the support ecosystem for technology investments in Uganda.</p>
    `,
    day: 1,
    date: "August 15, 2025",
    startTime: "13:30",
    endTime: "15:00",
    location: "Exhibition Hall",
    category: "Showcase",
    speakers: [
      {
        id: "speaker-5",
        name: "Michael Tech",
        title: "Director",
        organization: "Uganda Technology Hub",
        image: "/placeholder-speaker.jpg",
      },
      {
        id: "speaker-6",
        name: "Sarah Innovation",
        title: "Founder",
        organization: "TechStart Uganda",
        image: "/placeholder-speaker.jpg",
      },
    ],
    relatedEvents: ["event-1", "event-6"],
    materials: [
      {
        title: "Uganda Tech Ecosystem Overview",
        type: "PDF",
        url: "#",
      },
      {
        title: "Digital Innovation Investment Guide",
        type: "PDF",
        url: "#",
      },
    ],
  },
  // Add more events here
];

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { eventId: string };
}) {
  const event = events.find((event) => event.id === params.eventId);

  if (!event) {
    return {
      title: "Event Not Found | UNITE 2025",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.title} | UNITE 2025`,
    description: event.description,
  };
}

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = events.find((event) => event.id === params.eventId);

  if (!event) {
    notFound();
  }

  // Find related events
  const relatedEventsData = event.relatedEvents
    .map((id) => events.find((e) => e.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <Link
                href="/events"
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
                Back to All Events
              </Link>
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl mb-4 max-w-3xl">{event.description}</p>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-blue-800 bg-opacity-40 rounded-lg px-4 py-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Day {event.day} - {event.date}
                  </span>
                </div>

                <div className="bg-blue-800 bg-opacity-40 rounded-lg px-4 py-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {event.startTime} - {event.endTime}
                  </span>
                </div>

                <div className="bg-blue-800 bg-opacity-40 rounded-lg px-4 py-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>

                <div className="bg-yellow-500 text-yellow-900 rounded-lg px-4 py-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    About This Event
                  </h2>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.longDescription }}
                  />
                </div>
              </div>

              {/* Materials Section */}
              {event.materials && event.materials.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Event Materials
                    </h2>
                    <div className="space-y-4">
                      {event.materials.map((material, index) => (
                        <div key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-600 mr-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">
                              {material.title}
                            </h3>
                            <a
                              href={material.url}
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                            >
                              Download {material.type}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Related Events Section */}
              {relatedEventsData && relatedEventsData.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Related Events
                    </h2>
                    <div className="space-y-6">
                      {relatedEventsData.map(
                        (relatedEvent) =>
                          relatedEvent && (
                            <div
                              key={relatedEvent.id}
                              className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                            >
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">
                                  Day {relatedEvent.day} •{" "}
                                  {relatedEvent.startTime} -{" "}
                                  {relatedEvent.endTime}
                                </span>
                                <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                  {relatedEvent.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-800 mb-2">
                                <Link
                                  href={`/events/${relatedEvent.id}`}
                                  className="hover:text-blue-600"
                                >
                                  {relatedEvent.title}
                                </Link>
                              </h3>
                              <p className="text-gray-600 text-sm mb-3">
                                {relatedEvent.description.substring(0, 120)}...
                              </p>
                              <Link
                                href={`/events/${relatedEvent.id}`}
                                className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                              >
                                View Details
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
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div>
              {/* Speakers Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Speakers
                  </h2>
                  <div className="space-y-6">
                    {event.speakers.map((speaker) => (
                      <div key={speaker.id} className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                            {/* We'll replace this with actual speaker images later */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            <Link
                              href={`/speakers/${speaker.id}`}
                              className="hover:text-blue-600"
                            >
                              {speaker.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600">{speaker.title}</p>
                          <p className="text-gray-500 text-sm">
                            {speaker.organization}
                          </p>
                          <Link
                            href={`/speakers/${speaker.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center mt-1"
                          >
                            View Profile
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
                    ))}
                  </div>
                </div>
              </div>

              {/* RSVP Section */}
              <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Register for This Event
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Secure your spot for "{event.title}" and other events by
                    purchasing a UNITE 2025 ticket.
                  </p>
                  <Link
                    href="/tickets"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 w-full block text-center"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Share This Event
                  </h2>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

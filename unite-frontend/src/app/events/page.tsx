import Link from "next/link";

export const metadata = {
  title: "Events Schedule | UNITE 2025",
  description:
    "Explore the full schedule of events, workshops, and sessions at the Uganda Next - Investment & Trade Expo 2025.",
};

// Mock data for events - this would eventually come from Strapi
const eventDays = [
  {
    id: 1,
    date: "August 15, 2025",
    dayName: "Day 1",
    theme: "Opening Ceremony & Investment Forum",
  },
  {
    id: 2,
    date: "August 16, 2025",
    dayName: "Day 2",
    theme: "Sector-Specific Workshops",
  },
  {
    id: 3,
    date: "August 17, 2025",
    dayName: "Day 3",
    theme: "Business Matchmaking & Networking",
  },
];

// Mock events data
const events = [
  {
    id: "event-1",
    title: "Opening Ceremony",
    description:
      "Official opening of UNITE 2025 with remarks from government officials and keynote speeches by distinguished guests.",
    day: 1,
    startTime: "09:00",
    endTime: "10:30",
    location: "Main Auditorium",
    category: "Ceremony",
    speakers: ["John Doe", "Jane Smith"],
  },
  {
    id: "event-2",
    title: "Investment Opportunities in Agriculture",
    description:
      "Presentation of investment opportunities in Uganda's agricultural sector, focusing on commercial farming, agro-processing, and agricultural technology.",
    day: 1,
    startTime: "11:00",
    endTime: "12:30",
    location: "Seminar Room A",
    category: "Presentation",
    speakers: ["Alice Johnson", "Robert Brown"],
  },
  {
    id: "event-3",
    title: "Technology & Innovation Showcase",
    description:
      "Highlighting Uganda's growing technology ecosystem and opportunities for investment in tech startups and innovation hubs.",
    day: 1,
    startTime: "13:30",
    endTime: "15:00",
    location: "Exhibition Hall",
    category: "Showcase",
    speakers: ["Michael Tech", "Sarah Innovation"],
  },
  {
    id: "event-4",
    title: "Infrastructure Development Panel",
    description:
      "Panel discussion on investment opportunities in Uganda's infrastructure sector including transportation, energy, and urban development.",
    day: 1,
    startTime: "15:30",
    endTime: "17:00",
    location: "Main Auditorium",
    category: "Panel",
    speakers: ["David Builder", "Susan Infrastructure"],
  },
  {
    id: "event-5",
    title: "Agribusiness Workshop",
    description:
      "In-depth workshop on specific agribusiness investment opportunities, regulations, and support mechanisms.",
    day: 2,
    startTime: "09:00",
    endTime: "12:00",
    location: "Workshop Room 1",
    category: "Workshop",
    speakers: ["Farming Expert", "Agro Processor"],
  },
  {
    id: "event-6",
    title: "Technology & ICT Workshop",
    description:
      "Interactive session on investing in Uganda's technology sector, including telecommunications, software development, and IT services.",
    day: 2,
    startTime: "09:00",
    endTime: "12:00",
    location: "Workshop Room 2",
    category: "Workshop",
    speakers: ["Tech Guru", "IT Specialist"],
  },
  {
    id: "event-7",
    title: "Tourism & Hospitality Workshop",
    description:
      "Presentation of investment opportunities in Uganda's tourism sector, including accommodation, attractions, and tour operations.",
    day: 2,
    startTime: "13:00",
    endTime: "16:00",
    location: "Workshop Room 1",
    category: "Workshop",
    speakers: ["Tourism Expert", "Hospitality Manager"],
  },
  {
    id: "event-8",
    title: "Energy & Mining Workshop",
    description:
      "Session on opportunities in Uganda's energy and mining sectors, covering regulations, licensing, and specific projects seeking investment.",
    day: 2,
    startTime: "13:00",
    endTime: "16:00",
    location: "Workshop Room 2",
    category: "Workshop",
    speakers: ["Energy Specialist", "Mining Expert"],
  },
  {
    id: "event-9",
    title: "Business Matchmaking Session",
    description:
      "Structured one-on-one meetings between international investors and local businesses, facilitated by industry experts.",
    day: 3,
    startTime: "09:00",
    endTime: "12:30",
    location: "Meeting Rooms",
    category: "Networking",
    speakers: ["Matchmaking Coordinator"],
  },
  {
    id: "event-10",
    title: "Investor Roundtable",
    description:
      "Closed-door session for high-level investors with government representatives to discuss specific investment opportunities and policy matters.",
    day: 3,
    startTime: "13:30",
    endTime: "15:30",
    location: "VIP Lounge",
    category: "Meeting",
    speakers: ["Government Official", "Investment Authority Chair"],
  },
  {
    id: "event-11",
    title: "Networking Reception & Closing",
    description:
      "Final networking opportunity and official closing of UNITE 2025, with remarks on outcomes and future steps.",
    day: 3,
    startTime: "16:00",
    endTime: "18:00",
    location: "Main Hall",
    category: "Networking",
    speakers: ["Closing Speaker"],
  },
];

// Function to filter events by day
const getEventsByDay = (dayId: number) => {
  return events.filter((event) => event.day === dayId);
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Event Schedule
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our comprehensive program of presentations, workshops, and
            networking events designed to showcase Uganda's investment
            opportunities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Day Tabs */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row border-b">
                {eventDays.map((day, index) => (
                  <a
                    key={day.id}
                    href={`#day-${day.id}`}
                    className={`text-center py-4 px-6 font-medium ${
                      index === 0
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-lg font-bold">{day.dayName}</div>
                    <div className="text-sm">{day.date}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Event Listings by Day */}
          {eventDays.map((day) => (
            <div id={`day-${day.id}`} key={day.id} className="mb-16">
              <div className="border-b border-gray-300 pb-4 mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {day.dayName} - {day.date}
                </h2>
                <p className="text-xl text-blue-600 font-medium">{day.theme}</p>
              </div>

              <div className="grid gap-6">
                {getEventsByDay(day.id).map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:translate-y-[-4px] hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-2 mb-4 md:mb-0 md:mr-4 inline-block">
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 inline-block">
                          {event.location}
                        </div>
                        <div className="md:ml-auto mt-2 md:mt-0">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                            {event.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        <Link
                          href={`/events/${event.id}`}
                          className="hover:text-blue-600"
                        >
                          {event.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Speakers:
                          </div>
                          <div className="flex flex-wrap">
                            {event.speakers.map((speaker, index) => (
                              <span
                                key={index}
                                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-2"
                              >
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={`/events/${event.id}`}
                          className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Schedule Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Want the full schedule at your fingertips?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Download the complete schedule of UNITE 2025 events, including
            session details, speaker information, and venue locations.
          </p>
          <a
            href="#"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Schedule PDF
          </a>
        </div>
      </section>
    </div>
  );
}

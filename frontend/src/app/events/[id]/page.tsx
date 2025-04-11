import Link from "next/link";
import EventRegisterButtons from "@/components/events/EventRegisterButtons";

// API function to fetch data server-side
async function getEvent(id: string) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
    }/api/events/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  const data = await res.json();
  return data;
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  // Server-side data fetching
  let event;
  let error = null;

  try {
    const response = await getEvent(params.id);
    event = response.data;
  } catch (err) {
    error = "Failed to load event. Please try again later.";
    console.error("Error fetching event:", err);
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date provided";
    return new Date(dateString).toLocaleString();
  };

  if (error || !event) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <svg
                className="w-8 h-8 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {error || "Event not found"}
            </h2>
            <div className="mt-6">
              <Link
                href="/events"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
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
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Link
                href="/events"
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
                Back to All Events
              </Link>
            </div>
            <h1 className="text-3xl font-extrabold text-center sm:text-4xl md:text-5xl">
              {event.Name}
            </h1>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Event
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {event.Description ||
                      "No description available for this event."}
                  </p>
                </div>

                <div className="my-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    What You'll Learn
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
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
                        Gain insights into investment opportunities in Uganda
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
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
                      <span>Understand the legal and regulatory framework</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
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
                      <span>Connect with local partners and stakeholders</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
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
                        Discover financing options for your investments
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="my-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Who Should Attend
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span>
                        International investors and business executives
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span>Government officials and policymakers</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span>Local entrepreneurs and business owners</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span>Financial institutions and investment funds</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 mt-1 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span>Industry association representatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-12 lg:mt-0">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Event Information
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Date & Time
                    </dt>
                    <dd className="mt-1 text-gray-900 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(event.Date)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-gray-900 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.Location || "Location TBA"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Duration
                    </dt>
                    <dd className="mt-1 text-gray-900 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      2 hours
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Language
                    </dt>
                    <dd className="mt-1 text-gray-900 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                      English
                    </dd>
                  </div>
                </dl>

                {/* Interactive elements moved to a client component */}
                <EventRegisterButtons eventId={event.id} />
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Speakers
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">Ministry of Trade</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center text-white font-medium">
                      JS
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Jane Smith
                      </p>
                      <p className="text-xs text-gray-500">
                        Uganda Investment Authority
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-1">
                  May 16, 2025 • 2:00 PM
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Investment Forum
                </h3>
                <p className="text-gray-600 mb-4">
                  A panel discussion with industry experts exploring investment
                  opportunities in Uganda's growing sectors.
                </p>
                <Link
                  href="/events/2"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-1">
                  May 17, 2025 • 10:00 AM
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  B2B Matchmaking
                </h3>
                <p className="text-gray-600 mb-4">
                  Scheduled business-to-business meetings connecting
                  international investors with local entrepreneurs.
                </p>
                <Link
                  href="/events/3"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-1">
                  May 16, 2025 • 4:00 PM
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Startup Pitch Competition
                </h3>
                <p className="text-gray-600 mb-4">
                  Watch innovative Ugandan startups pitch their business ideas
                  to a panel of investors and industry experts.
                </p>
                <Link
                  href="/events/4"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ready to join us at UNITE Expo 2025?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Secure your tickets now and be part of Uganda's premier investment
              event.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Register for UNITE Expo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Venue | UNITE 2025",
  description:
    "Information about the Kampala International Conference Centre, the venue for UNITE 2025, including location, floor plans, and facilities.",
};

export default function VenuePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Venue</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Kampala International Conference Centre
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Venue Overview */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Venue Overview
                  </h2>
                  <p className="text-gray-600 mb-4">
                    UNITE 2025 will take place at the prestigious Kampala
                    International Conference Centre (KICC), Uganda's premier
                    venue for large-scale international events.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Located in the heart of Kampala, the KICC offers world-class
                    facilities, cutting-edge technology, and versatile spaces
                    that make it the perfect setting for our investment and
                    trade expo.
                  </p>
                  <p className="text-gray-600">
                    With a total event space of over 10,000 square meters, the
                    venue can accommodate all components of UNITE 2025 including
                    plenary sessions, workshops, exhibitions, business
                    matchmaking, and networking events.
                  </p>
                </div>
                <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64 md:h-auto">
                  {/* This would be replaced with an actual venue image */}
                  <span className="text-gray-500 text-sm">
                    Venue Image Placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Location & Maps
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Address
                    </h3>
                    <address className="not-italic text-gray-600 mb-6">
                      <p className="mb-2">
                        Kampala International Conference Centre
                      </p>
                      <p className="mb-2">Plot 2-4, Phillip Road</p>
                      <p className="mb-2">Kampala, Uganda</p>
                    </address>

                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      GPS Coordinates
                    </h3>
                    <p className="text-gray-600 mb-6">0.3136° N, 32.5811° E</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Getting There
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 mr-3 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <span className="font-medium text-gray-800">
                            From Airport:
                          </span>
                          <p className="text-gray-600">
                            40 km from Entebbe International Airport
                            (approximately 1-2 hours by car, depending on
                            traffic).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 mr-3 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <div>
                          <span className="font-medium text-gray-800">
                            From City Center:
                          </span>
                          <p className="text-gray-600">
                            Located in central Kampala, walking distance from
                            major hotels and the business district.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600 mr-3 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <span className="font-medium text-gray-800">
                            Parking:
                          </span>
                          <p className="text-gray-600">
                            Ample secure parking available at the venue
                            (complimentary for registered participants).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  {/* This would be replaced with an actual map component */}
                  <div className="text-center">
                    <span className="text-gray-500 text-sm mb-2 block">
                      Map Placeholder
                    </span>
                    <a
                      href="https://maps.google.com/?q=Kampala+International+Conference+Centre"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
                    >
                      View on Google Maps
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
              </div>
            </div>

            {/* Floor Plans & Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Floor Plans & Layout
                </h2>

                <p className="text-gray-600 mb-8">
                  UNITE 2025 will utilize multiple areas within the Kampala
                  International Conference Centre. Familiarize yourself with the
                  venue layout to navigate efficiently during the event.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Main Event Areas
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            Main Auditorium (Ground Floor)
                          </span>
                          <p className="text-gray-600">
                            Capacity: 1,000 people. Hosts opening ceremony,
                            plenary sessions, and closing event.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            Exhibition Hall (First Floor)
                          </span>
                          <p className="text-gray-600">
                            5,000 sqm space featuring exhibitor booths and
                            demonstration areas.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            Workshop Rooms (Second Floor)
                          </span>
                          <p className="text-gray-600">
                            Four dedicated spaces for sector-specific workshops
                            and presentations.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 font-bold">4</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            Business Matchmaking Area (Third Floor)
                          </span>
                          <p className="text-gray-600">
                            Private meeting spaces for one-on-one business
                            discussions.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-blue-600 font-bold">5</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">
                            VIP Lounge (Fourth Floor)
                          </span>
                          <p className="text-gray-600">
                            Exclusive area for dignitaries and VIP ticket
                            holders.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96">
                    {/* This would be replaced with an actual floor plan */}
                    <div className="text-center">
                      <span className="text-gray-500 text-sm block mb-2">
                        Floor Plan Placeholder
                      </span>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm"
                      >
                        Download Detailed Floor Plan (PDF)
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
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="font-bold text-gray-800">Note:</span>
                      <p className="text-gray-600">
                        Detailed signage will be available throughout the venue
                        during the event. The UNITE 2025 mobile app will also
                        feature an interactive venue map to help you navigate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Facilities & Amenities */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Facilities & Amenities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Registration Area
                    </h3>
                    <p className="text-gray-600">
                      Located in the main lobby with multiple counters for
                      efficient check-in. Pre-registered attendees can use
                      express counters.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
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
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Technology
                    </h3>
                    <p className="text-gray-600">
                      High-speed WiFi throughout the venue, digital signage, and
                      AV equipment in all presentation spaces.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
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
                          d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Catering
                    </h3>
                    <p className="text-gray-600">
                      On-site restaurants and coffee shops. Daily lunch and
                      refreshments included for all registered participants.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
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
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Business Services
                    </h3>
                    <p className="text-gray-600">
                      Business center with printing, copying, and translation
                      services. Private meeting rooms available for booking.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
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
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      First Aid & Security
                    </h3>
                    <p className="text-gray-600">
                      Medical station staffed during all event hours.
                      Professional security personnel and systems throughout the
                      venue.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Information Desk
                    </h3>
                    <p className="text-gray-600">
                      Located in the main lobby with staff available to assist
                      with questions, directions, and general information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Accessibility
                </h2>

                <p className="text-gray-600 mb-8">
                  The Kampala International Conference Centre is committed to
                  providing an accessible environment for all attendees. The
                  following accessibility features are available:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Step-free access to all main areas
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Elevators connecting all floors
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Accessible restrooms on each floor
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Reserved seating areas for wheelchair users
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Assistive listening systems in main auditorium
                    </span>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-3 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Accessible parking spaces near entrance
                    </span>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 mr-3 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <span className="font-bold text-gray-800">
                        Special Assistance:
                      </span>
                      <p className="text-gray-600 mb-4">
                        If you require any specific accommodations or
                        assistance, please let us know in advance so we can
                        ensure your experience at UNITE 2025 is comfortable and
                        accessible.
                      </p>
                      <Link
                        href="/contact?subject=Accessibility%20Inquiry"
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                      >
                        Contact Us About Accessibility
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
            </div>

            {/* Accommodation */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Nearby Accommodation
                </h2>

                <p className="text-gray-600 mb-8">
                  UNITE 2025 has partnered with several hotels near the venue to
                  provide special rates for attendees. The following hotels are
                  within walking distance or a short drive from the Kampala
                  International Conference Centre:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Serena Hotel Kampala
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        5-star hotel
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      • 5 minutes walking distance from venue
                    </p>
                    <p className="text-gray-600 mb-2">
                      • Special UNITE 2025 rate: $180 per night
                    </p>
                    <p className="text-gray-600 mb-4">
                      • Includes breakfast and airport shuttle
                    </p>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      Book with Special Rate
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
                    </a>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Mestil Hotel & Residences
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 text-sm">
                        4-star hotel
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      • 10 minutes by car from venue
                    </p>
                    <p className="text-gray-600 mb-2">
                      • Special UNITE 2025 rate: $150 per night
                    </p>
                    <p className="text-gray-600 mb-4">
                      • Includes breakfast and WiFi
                    </p>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      Book with Special Rate
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
                    </a>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/accommodation"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
                  >
                    View All Accommodation Options
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Need More Information?
              </h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about the venue or need assistance
                with planning your visit, our team is ready to help.
              </p>
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

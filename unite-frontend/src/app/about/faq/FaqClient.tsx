"use client";

import { useState } from "react";
import Link from "next/link";

// Mock FAQ data - this would come from Strapi CMS in production
const faqCategories = [
  {
    id: "general",
    name: "General Information",
    faqs: [
      {
        question: "What is UNITE 2025?",
        answer:
          "UNITE (Uganda Next - Investment & Trade Expo) 2025 is Uganda's premier event connecting global investors with local opportunities. It brings together investors, business leaders, government officials, and other stakeholders to explore investment and trade opportunities in Uganda's growing economy.",
      },
      {
        question: "When and where will UNITE 2025 take place?",
        answer:
          "UNITE 2025 will take place from August 15-17, 2025, at the Kampala International Conference Centre in Kampala, Uganda.",
      },
      {
        question: "Who can attend UNITE 2025?",
        answer:
          "UNITE 2025 is open to international and domestic investors, business executives, government representatives, development partners, industry experts, and other professionals interested in Uganda's investment and trade landscape. Different ticket types are available depending on your specific interests and needs.",
      },
      {
        question: "What industries or sectors will be featured at UNITE 2025?",
        answer:
          "UNITE 2025 will showcase investment opportunities across key sectors of Uganda's economy, including agriculture and agribusiness, energy and mining, infrastructure and construction, technology and innovation, tourism and hospitality, manufacturing, financial services, and health and education.",
      },
      {
        question: "How many attendees are expected at UNITE 2025?",
        answer:
          "We expect over 1,500 delegates from more than 50 countries to attend UNITE 2025, including investors, business leaders, government officials, and other stakeholders.",
      },
    ],
  },
  {
    id: "registration",
    name: "Registration & Tickets",
    faqs: [
      {
        question: "How do I register for UNITE 2025?",
        answer:
          "You can register for UNITE 2025 through our website by visiting the Tickets page and selecting the appropriate ticket type. Follow the instructions to complete your registration and payment online.",
      },
      {
        question: "What are the different ticket types available?",
        answer:
          "UNITE 2025 offers several ticket types, including the Full Event Pass (access to all events), Business Pass (focused on business connections), Expo Only Pass (access to the exhibition area only), and VIP Pass (premium experience with exclusive access). Please visit our Tickets page for detailed information on what each ticket includes.",
      },
      {
        question: "Is there a discount for early registration?",
        answer:
          "Yes, we offer Early Bird discounts for registrations completed before March 31, 2025. Please check our Tickets page for current pricing and available discounts.",
      },
      {
        question: "Can I register as a group or company?",
        answer:
          "Yes, we offer special rates for companies sending multiple delegates. Discounts are available for groups of 5+ delegates (10% discount), 10+ delegates (15% discount), and 20+ delegates (20% discount). Please contact us directly for group registrations or custom packages.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Tickets can be refunded up to 30 days before the event with a 20% administration fee. Within 30 days of the event, tickets are non-refundable but can be transferred to another person or applied as credit toward a future UNITE event.",
      },
    ],
  },
  {
    id: "exhibitors",
    name: "Exhibitors & Sponsors",
    faqs: [
      {
        question: "How can my company exhibit at UNITE 2025?",
        answer:
          "Companies interested in exhibiting at UNITE 2025 can apply through our website by visiting the Exhibitors page and completing the application form. Our team will review your application and contact you with further details.",
      },
      {
        question: "What are the exhibition booth options and pricing?",
        answer:
          "We offer standard (9 sqm), premium (18 sqm), and custom exhibition spaces. Each booth comes with standard furnishings, electricity, and WiFi. Prices vary depending on size, location, and additional requirements. Please contact our exhibitions team for a detailed pricing structure.",
      },
      {
        question: "What sponsorship opportunities are available?",
        answer:
          "UNITE 2025 offers various sponsorship packages, including Platinum, Gold, and Silver levels, as well as targeted sponsorships for specific event components (e.g., networking reception, lunch, coffee breaks). Each package includes different benefits and exposure opportunities. Please visit our Sponsors page or contact us for detailed information.",
      },
      {
        question: "Is there a deadline for applying to exhibit or sponsor?",
        answer:
          "While we accept applications until spaces are filled, we recommend submitting your application by December 31, 2024, to secure your preferred location and maximize your visibility in pre-event marketing materials.",
      },
      {
        question:
          "Can exhibitors or sponsors make presentations at UNITE 2025?",
        answer:
          "Yes, certain exhibition and sponsorship packages include the opportunity to make presentations or participate in panel discussions. Additionally, all exhibitors and sponsors can apply to participate in the Business Matchmaking program.",
      },
    ],
  },
  {
    id: "program",
    name: "Program & Activities",
    faqs: [
      {
        question: "What types of activities will take place at UNITE 2025?",
        answer:
          "UNITE 2025 features a diverse program including keynote presentations, panel discussions, sector-specific workshops, exhibitions, business matchmaking sessions, networking events, and site visits to key investment projects in and around Kampala.",
      },
      {
        question: "How can I access the full event program?",
        answer:
          "The preliminary program is available on our website under the Events section. The detailed program with confirmed speakers will be published approximately two months before the event and will be continuously updated. Registered participants will also receive the program via email.",
      },
      {
        question: "What is the Business Matchmaking program?",
        answer:
          "The Business Matchmaking program facilitates one-on-one meetings between international investors and Ugandan businesses based on mutual interests and complementary objectives. Participants can request meetings through our online platform, and our team will assist in scheduling these during dedicated timeslots throughout the event.",
      },
      {
        question:
          "Will there be opportunities to visit potential investment sites?",
        answer:
          "Yes, we organize optional site visits to key investment projects, industrial parks, and special economic zones on the day before and after the main event (August 14 and 18, 2025). These visits require separate registration and may have limited capacity.",
      },
      {
        question: "In what language will the event be conducted?",
        answer:
          "The official language of UNITE 2025 is English. Some sessions may offer simultaneous interpretation in French or other languages based on demand and availability.",
      },
    ],
  },
  {
    id: "practical",
    name: "Practical Information",
    faqs: [
      {
        question: "Do I need a visa to enter Uganda?",
        answer:
          "Most visitors to Uganda require a visa, which can be obtained online through the official e-visa portal (visas.immigration.go.ug) or upon arrival at Entebbe International Airport. Citizens of East African Community member states do not require visas. Registered UNITE 2025 participants will receive a confirmation letter that can be used to support their visa application.",
      },
      {
        question: "What are the COVID-19 requirements for entering Uganda?",
        answer:
          "COVID-19 requirements may change over time. Please check the latest information on the Uganda Ministry of Health website or contact your nearest Ugandan embassy or consulate for current entry requirements. We will also provide updates to registered participants.",
      },
      {
        question: "What accommodation options are available near the venue?",
        answer:
          "Kampala offers a wide range of accommodation options to suit different preferences and budgets. We have negotiated special rates with several hotels near the venue. Registered participants will receive information on these partner hotels and how to book at the discounted rate.",
      },
      {
        question:
          "How do I get to the venue from Entebbe International Airport?",
        answer:
          "Entebbe International Airport is approximately 40 km from Kampala. Transportation options include airport taxis, ride-hailing services (Uber, Bolt), and hotel shuttle services. The journey typically takes 1-2 hours depending on traffic conditions. We will provide detailed transportation information to registered participants.",
      },
      {
        question: "Will there be translation services available at the event?",
        answer:
          "The main event will be conducted in English. Some sessions may offer simultaneous interpretation in French or other languages based on demand. For business matchmaking meetings, we can arrange interpretation services upon request (additional fees may apply).",
      },
    ],
  },
];

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (categoryId, index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about UNITE 2025
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
            <span className="text-gray-800 font-medium">FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="mb-12 overflow-x-auto">
              <div className="flex border-b space-x-1 min-w-max">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-6 py-3 text-sm font-medium whitespace-nowrap focus:outline-none ${
                      activeCategory === category.id
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqCategories
                .filter((category) => category.id === activeCategory)
                .map((category) => (
                  <div key={category.id}>
                    {category.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden"
                      >
                        <button
                          className="flex justify-between items-center w-full px-6 py-4 text-left font-bold text-gray-800 hover:bg-gray-50 focus:outline-none"
                          onClick={() => toggleFaq(category.id, index)}
                        >
                          <span>{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform ${
                              openFaqs[`${category.id}-${index}`]
                                ? "rotate-180"
                                : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {openFaqs[`${category.id}-${index}`] && (
                          <div className="px-6 py-4 border-t border-gray-200">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>

            {/* Didn't Find Your Answer */}
            <div className="mt-12 bg-blue-50 rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Didn't Find Your Answer?
              </h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the information you're looking for, please
                feel free to contact us directly. Our team is ready to assist
                you with any questions you may have about UNITE 2025.
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

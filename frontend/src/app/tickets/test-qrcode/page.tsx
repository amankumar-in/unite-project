"use client";

import { useState } from "react";
import Link from "next/link";
import { generateQRCodeDataURL, generateQRCodeContent } from "@/lib/qrcode";

export default function QRCodeTestPage() {
  const [ticketNumber, setTicketNumber] = useState("TIX-12345");
  const [attendeeEmail, setAttendeeEmail] = useState("test@example.com");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const qrContent = generateQRCodeContent(ticketNumber, attendeeEmail);
      console.log("QR content:", qrContent);

      const dataUrl = await generateQRCodeDataURL(qrContent);
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/tickets"
            className="text-green-600 hover:text-green-700 inline-flex items-center text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tickets
          </Link>
        </div>

        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h1 className="text-xl font-medium text-gray-900">
              QR Code Generator Test
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Test the QR code generation functionality
            </p>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="ticketNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ticket Number
                </label>
                <input
                  type="text"
                  id="ticketNumber"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="block w-full border-0 border-b-2 border-gray-300 py-1.5 focus:border-green-500 focus:ring-0 bg-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="attendeeEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Attendee Email
                </label>
                <input
                  type="email"
                  id="attendeeEmail"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  className="block w-full border-0 border-b-2 border-gray-300 py-1.5 focus:border-green-500 focus:ring-0 bg-transparent"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={generateQRCode}
                  disabled={isGenerating}
                  className={`inline-flex items-center px-6 py-2 border-0 text-base font-medium bg-green-600 text-white hover:bg-green-700 ${
                    isGenerating ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate QR Code"
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {qrCodeDataUrl && (
                <div className="bg-gray-50 p-6 border border-gray-200 flex flex-col items-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Generated QR Code
                  </h3>

                  <div className="mb-4">
                    <img
                      src={qrCodeDataUrl}
                      alt="Ticket QR Code"
                      className="w-64 h-64"
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    This QR code contains the ticket data in JSON format
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

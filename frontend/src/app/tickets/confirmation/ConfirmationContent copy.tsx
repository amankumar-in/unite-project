"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface PaymentDetails {
  success: boolean;
  paymentMethod: string;
  amount: number;
  createdDate: string;
  confirmationCode: string;
  paymentStatus: string;
  statusCode: number;
  description: string;
  paymentAccount: string;
  merchantReference: string;
  currency: string;
  message: string;
}

interface PurchaseDetails {
  id: number;
  documentId: string;
  referenceNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  totalAmount: number;
  currency: string;
  purchaseDate: string;
  paymentStatus: string;
}

interface Attendee {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

interface Ticket {
  id: number;
  documentId: string;
  ticketNumber: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  attendeeOrganization: string;
  isCheckedIn: boolean;
  qrCodeData: string;
}

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");
  const orderNotificationType = searchParams.get("OrderNotificationType");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [purchaseDetails, setPurchaseDetails] =
    useState<PurchaseDetails | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isGeneratingTickets, setIsGeneratingTickets] = useState(false);

  useEffect(() => {
    if (!orderTrackingId) {
      setError("No order tracking ID found in URL");
      setLoading(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        // Call our transaction status API
        const response = await fetch(
          `/api/tickets/transaction-status?orderTrackingId=${orderTrackingId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Payment details:", data);

        if (data.success) {
          setPaymentDetails(data);

          // Add direct update to Strapi as a fallback when payment is successful
          if (
            data.paymentStatus === "Completed" &&
            data.statusCode === 1 &&
            data.merchantReference
          ) {
            console.log(
              "Payment successful, updating purchase record directly"
            );

            try {
              // Get Strapi API URL
              let STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

              // Fix for IPv6/IPv4 issue
              if (STRAPI_URL && STRAPI_URL.includes("localhost")) {
                STRAPI_URL = STRAPI_URL.replace("localhost", "127.0.0.1");
              }

              // Update the purchase using our custom endpoint
              const updateUrl = `${STRAPI_URL}/api/ticket-purchases/by-reference/${data.merchantReference}`;
              console.log(`Updating purchase directly at ${updateUrl}`);

              const updateResponse = await fetch(updateUrl, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    paymentStatus: "paid",
                    paymentMethod: data.paymentMethod || null,
                    transactionId: orderTrackingId,
                  },
                }),
              });

              if (updateResponse.ok) {
                console.log(
                  `Successfully updated purchase ${data.merchantReference} directly`
                );
              } else {
                console.error(
                  "Failed direct update:",
                  await updateResponse.json()
                );
              }
            } catch (updateError) {
              console.error("Error in direct update:", updateError);
            }
          }

          // If we have a merchant reference, fetch the purchase details from Strapi
          if (data.merchantReference) {
            try {
              const purchaseResponse = await fetchAPI(
                `/ticket-purchases?filters[referenceNumber][$eq]=${data.merchantReference}`
              );

              if (
                purchaseResponse &&
                purchaseResponse.data &&
                purchaseResponse.data.length > 0
              ) {
                setPurchaseDetails(purchaseResponse.data[0]);

                // Check if payment was successful and check for tickets
                if (
                  data.paymentStatus === "Completed" &&
                  data.statusCode === 1
                ) {
                  // Check if tickets already exist for this purchase
                  const ticketsResponse = await fetchAPI(
                    `/tickets?filters[purchase][referenceNumber][$eq]=${data.merchantReference}`
                  );

                  if (
                    ticketsResponse &&
                    ticketsResponse.data &&
                    ticketsResponse.data.length > 0
                  ) {
                    // Tickets already exist, just show them
                    console.log("Tickets already exist for this purchase");
                    setTickets(ticketsResponse.data);
                  } else {
                    // No tickets exist, generate them
                    await generateTickets(
                      purchaseResponse.data[0],
                      orderTrackingId
                    );
                  }
                }
              }
            } catch (purchaseError) {
              console.error("Error fetching purchase details:", purchaseError);
            }
          }
        } else {
          setError("Failed to retrieve payment details");
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Error checking payment status:", err);
        setError(`Failed to check payment status: ${err.message}`);
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [orderTrackingId]);

  // Generate tickets for a successful purchase
  const generateTickets = async (
    purchase: PurchaseDetails,
    transactionId: string
  ) => {
    try {
      setIsGeneratingTickets(true);
      console.log("Generating tickets for purchase:", purchase);

      // Get Strapi API URL
      let STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;

      // Fix for IPv6/IPv4 issue
      if (STRAPI_URL && STRAPI_URL.includes("localhost")) {
        STRAPI_URL = STRAPI_URL.replace("localhost", "127.0.0.1");
      }

      // Get attendee data from localStorage if available
      let attendeeData: Attendee[] = [];
      let ticketCategoryId: string | null = null;
      let ticketQuantity = 1;

      try {
        const storedData = localStorage.getItem(
          `attendeeData_${purchase.referenceNumber}`
        );
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          attendeeData = parsedData.attendees;
          ticketCategoryId = parsedData.ticketCategoryId;
          ticketQuantity = parsedData.quantity;
          console.log("Retrieved attendee data from localStorage:", {
            attendeeData,
            ticketCategoryId,
            ticketQuantity,
          });
        }
      } catch (localStorageError) {
        console.error(
          "Error retrieving data from localStorage:",
          localStorageError
        );
      }

      // If no attendee data in localStorage, create generic tickets using buyer info
      if (!attendeeData || attendeeData.length === 0) {
        console.log("No stored attendee data found, using generic data");

        // Try to determine quantity from total amount
        try {
          const categoriesResponse = await fetchAPI("/ticket-categories");

          if (categoriesResponse && categoriesResponse.data) {
            const categories = categoriesResponse.data;

            for (const category of categories) {
              if (purchase.totalAmount === category.price) {
                ticketCategoryId = category.documentId;
                ticketQuantity = 1;
                break;
              } else if (purchase.totalAmount % category.price === 0) {
                ticketCategoryId = category.documentId;
                ticketQuantity = purchase.totalAmount / category.price;
                break;
              }
            }
          }
        } catch (error) {
          console.error(
            "Error determining ticket category and quantity:",
            error
          );
        }

        // Create generic attendee data based on buyer info
        attendeeData = Array(ticketQuantity).fill({
          name: purchase.buyerName,
          email: purchase.buyerEmail,
          phone: purchase.buyerPhone,
          organization: "",
        });
      }

      // Get ticket category if available
      let ticketCategory = null;
      if (ticketCategoryId) {
        try {
          const categoryResponse = await fetchAPI(
            `/ticket-categories?filters[documentId][$eq]=${ticketCategoryId}`
          );

          if (
            categoryResponse &&
            categoryResponse.data &&
            categoryResponse.data.length > 0
          ) {
            ticketCategory = categoryResponse.data[0];
          }
        } catch (error) {
          console.error("Error fetching ticket category:", error);
        }
      }

      // Create tickets
      console.log(`Creating ${ticketQuantity} tickets`);

      const generatedTickets: Ticket[] = [];

      for (let i = 0; i < ticketQuantity; i++) {
        // Generate unique ticket number
        const ticketNumber = `${purchase.referenceNumber}-${i + 1}-${Math.floor(
          Math.random() * 10000
        )
          .toString()
          .padStart(4, "0")}`;

        // Generate QR code data (just use ticket number for now)
        const qrCodeData = ticketNumber;

        // Updated code (using documentId):
        const ticketData = {
          ticketNumber,
          attendeeName: attendeeData[i]?.name || purchase.buyerName,
          attendeeEmail: attendeeData[i]?.email || purchase.buyerEmail,
          attendeePhone: attendeeData[i]?.phone || purchase.buyerPhone,
          attendeeOrganization: attendeeData[i]?.organization || "",
          isCheckedIn: false,
          qrCodeData,
          purchase: { connect: [{ documentId: purchase.documentId }] },
          ticketCategory: ticketCategory
            ? { connect: [{ documentId: ticketCategory.documentId }] }
            : null,
        };

        console.log(`Creating ticket: ${JSON.stringify(ticketData)}`);

        try {
          const ticketResponse = await fetchAPI("/tickets", {
            method: "POST",
            body: JSON.stringify({ data: ticketData }),
          });

          if (ticketResponse && ticketResponse.data) {
            console.log("Ticket created:", ticketResponse.data);
            generatedTickets.push(ticketResponse.data);
          }
        } catch (ticketError) {
          console.error(`Error creating ticket ${i + 1}:`, ticketError);
        }
      }

      setTickets(generatedTickets);
      console.log(
        `Successfully created ${generatedTickets.length} of ${ticketQuantity} tickets`
      );

      // Clean up localStorage after successful ticket generation
      try {
        localStorage.removeItem(`attendeeData_${purchase.referenceNumber}`);
      } catch (error) {
        console.error("Error removing localStorage data:", error);
      }

      // TODO: Send email notification with ticket details
    } catch (error) {
      console.error("Error generating tickets:", error);
    } finally {
      setIsGeneratingTickets(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get appropriate status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-none border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">
            Verifying payment details, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 mb-3">
            <svg
              className="w-6 h-6 text-red-600"
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't verify your payment details."}
          </p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-green-600 text-white hover:bg-green-700"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  const isPaymentSuccessful =
    paymentDetails.paymentStatus.toLowerCase() === "completed" &&
    paymentDetails.statusCode === 1;

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

        {/* Payment Confirmation */}
        <div className="bg-white border border-gray-200">
          {/* Header */}
          <div
            className={`px-6 py-5 border-b ${
              isPaymentSuccessful
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                {isPaymentSuccessful ? (
                  <svg
                    className="h-8 w-8 text-green-600 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-8 w-8 text-red-600 mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <div>
                  <h1 className="text-lg font-medium text-gray-900">
                    {isPaymentSuccessful
                      ? "Payment Successful"
                      : "Payment Failed"}
                  </h1>
                  <p
                    className={`mt-1 text-sm ${
                      isPaymentSuccessful ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {paymentDetails.description}
                  </p>
                </div>
              </div>
              <div
                className={`mt-4 md:mt-0 px-3 py-1 text-sm font-medium ${getStatusBadgeClass(
                  paymentDetails.paymentStatus
                )}`}
              >
                {paymentDetails.paymentStatus}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Reference Number
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {paymentDetails.merchantReference}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Transaction ID
                </h3>
                <p className="mt-1 text-sm text-gray-900">{orderTrackingId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatCurrency(
                    paymentDetails.amount,
                    paymentDetails.currency
                  )}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Method
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {paymentDetails.paymentMethod}{" "}
                  {paymentDetails.paymentAccount
                    ? `(${paymentDetails.paymentAccount})`
                    : ""}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Date
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(paymentDetails.createdDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Confirmation Code
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {paymentDetails.confirmationCode}
                </p>
              </div>
            </div>

            {/* Buyer Information - if available */}
            {purchaseDetails && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Buyer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {purchaseDetails.buyerName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {purchaseDetails.buyerEmail}
                    </p>
                  </div>
                  {purchaseDetails.buyerPhone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Phone
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {purchaseDetails.buyerPhone}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Purchase Date
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(purchaseDetails.purchaseDate)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tickets Section - if payment was successful */}
            {isPaymentSuccessful && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Your Tickets
                </h2>

                {isGeneratingTickets ? (
                  <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-none border-4 border-solid border-green-500 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">
                      Generating your tickets...
                    </p>
                  </div>
                ) : tickets.length > 0 ? (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border border-gray-200 p-4 bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {ticket.attendeeName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {ticket.attendeeEmail}
                            </p>
                            {ticket.attendeePhone && (
                              <p className="text-sm text-gray-500">
                                {ticket.attendeePhone}
                              </p>
                            )}
                            {ticket.attendeeOrganization && (
                              <p className="text-sm text-gray-500">
                                {ticket.attendeeOrganization}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                              {ticket.isCheckedIn
                                ? "Checked In"
                                : "Not Checked In"}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              Ticket #: {ticket.ticketNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                        onClick={() =>
                          alert("Ticket download functionality coming soon!")
                        }
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                        Download Tickets
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-gray-200 bg-gray-50">
                    <p className="text-gray-600">
                      No tickets have been generated yet. This might take a few
                      moments.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        purchaseDetails &&
                        generateTickets(purchaseDetails, orderTrackingId || "")
                      }
                      className="mt-4 inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                      disabled={!purchaseDetails || isGeneratingTickets}
                    >
                      Generate Tickets Manually
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8">
              {isPaymentSuccessful ? (
                <div className="border border-green-200 bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Thank you for your purchase!
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Your payment has been successfully processed. Your
                          tickets will be sent to your email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-red-200 bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Payment Failed
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          Your payment could not be processed.{" "}
                          {paymentDetails.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          href="/tickets"
                          className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                        >
                          Try Again
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

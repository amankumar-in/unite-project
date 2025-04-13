"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";

interface TicketCategory {
  id: number;
  documentId: string;
  name: string;
  description: any[];
  price: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  maxPurchaseQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

interface FormData {
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  attendees: Array<{
    name: string;
    email: string;
    phone: string;
    organization: string;
  }>;
}

export default function BuyTicketContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [ticketCategory, setTicketCategory] = useState<TicketCategory | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    quantity: 1,
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    attendees: [{ name: "", email: "", phone: "", organization: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (!categoryId) {
      setError("No ticket category selected");
      setLoading(false);
      return;
    }

    const fetchTicketCategory = async () => {
      try {
        // Using documentId to fetch the ticket category
        const response = await fetchAPI(
          `/ticket-categories?filters[documentId][$eq]=${categoryId}`
        );
        console.log("Ticket category response:", response);

        if (response && response.data && response.data.length > 0) {
          setTicketCategory(response.data[0]);
        } else {
          setError("Ticket category not found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ticket category:", err);
        setError("Failed to load ticket details. Please try again later.");
        setLoading(false);
      }
    };

    fetchTicketCategory();
  }, [categoryId]);

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Update quantity and attendees array when quantity changes
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);

    // Update the attendees array to match the quantity
    let newAttendees = [...formData.attendees];

    if (newQuantity > formData.attendees.length) {
      // Add more attendee slots
      for (let i = formData.attendees.length; i < newQuantity; i++) {
        newAttendees.push({ name: "", email: "", phone: "", organization: "" });
      }
    } else if (newQuantity < formData.attendees.length) {
      // Remove excess attendee slots
      newAttendees = newAttendees.slice(0, newQuantity);
    }

    setFormData((prev) => ({
      ...prev,
      quantity: newQuantity,
      attendees: newAttendees,
    }));
  };

  // Update buyer information
  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update attendee information
  const handleAttendeeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newAttendees = [...formData.attendees];
    newAttendees[index] = {
      ...newAttendees[index],
      [name]: value,
    };

    setFormData((prev) => ({
      ...prev,
      attendees: newAttendees,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validate buyer information
    if (!formData.buyerName.trim()) {
      errors.buyerName = "Name is required";
    }

    if (!formData.buyerEmail.trim()) {
      errors.buyerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.buyerEmail)) {
      errors.buyerEmail = "Email is invalid";
    }

    // Validate attendees
    formData.attendees.forEach((attendee, index) => {
      if (!attendee.name.trim()) {
        errors[`attendee${index}Name`] = "Attendee name is required";
      }

      if (!attendee.email.trim()) {
        errors[`attendee${index}Email`] = "Attendee email is required";
      } else if (!/\S+@\S+\.\S+/.test(attendee.email)) {
        errors[`attendee${index}Email`] = "Attendee email is invalid";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create a reference number for the purchase
      const referenceNumber = `TIX-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      // Calculate total amount
      const totalAmount = formData.quantity * (ticketCategory?.price || 0);

      console.log("Creating purchase with data:", {
        referenceNumber,
        totalAmount,
        currency: ticketCategory?.currency || "UGX",
        paymentStatus: "pending",
        purchaseDate: new Date().toISOString(),
        buyerName: formData.buyerName,
        buyerEmail: formData.buyerEmail,
        buyerPhone: formData.buyerPhone,
      });

      // Create ticket purchase in Strapi
      const purchaseResponse = await fetchAPI("/ticket-purchases", {
        method: "POST",
        body: JSON.stringify({
          data: {
            referenceNumber,
            totalAmount,
            currency: ticketCategory?.currency || "UGX",
            paymentStatus: "pending",
            purchaseDate: new Date().toISOString(),
            buyerName: formData.buyerName,
            buyerEmail: formData.buyerEmail,
            buyerPhone: formData.buyerPhone,
          },
        }),
      });

      console.log("Purchase created:", purchaseResponse);

      if (purchaseResponse && purchaseResponse.data) {
        // Now initiate payment with Pesapal through our API
        console.log("Initiating payment with Pesapal...");
        const paymentResponse = await fetch("/api/tickets/initiate-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referenceNumber,
            amount: totalAmount,
            currency: ticketCategory?.currency || "UGX",
            description: `UNITE Expo 2025 Ticket - ${ticketCategory?.name}`,
            buyerName: formData.buyerName,
            buyerEmail: formData.buyerEmail,
            buyerPhone: formData.buyerPhone || "",
          }),
        });

        const paymentData = await paymentResponse.json();
        console.log("Payment initiation response:", paymentData);

        if (paymentData.success && paymentData.redirectUrl) {
          // Redirect to Pesapal payment page
          window.location.href = paymentData.redirectUrl;
        } else {
          throw new Error(paymentData.message || "Failed to initiate payment");
        }
      } else {
        throw new Error("Failed to create purchase record");
      }
    } catch (err: any) {
      console.error("Error in payment process:", err);
      setError(`Payment process failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total price
  const totalPrice = formData.quantity * (ticketCategory?.price || 0);

  // Generate quantity options up to maxPurchaseQuantity
  const quantityOptions = () => {
    const options = [];
    const max = ticketCategory?.maxPurchaseQuantity || 10;

    for (let i = 1; i <= max; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (error || !ticketCategory) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">
            {error || "Failed to load ticket details"}
          </p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
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

        {/* Ticket Purchase Form */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-lg font-medium text-gray-900">
              Purchase Tickets: {ticketCategory.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to purchase your tickets
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {/* Ticket Selection */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Ticket Selection
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {ticketCategory.name}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {formatCurrency(
                      ticketCategory.price,
                      ticketCategory.currency
                    )}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleQuantityChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  >
                    {quantityOptions()}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center bg-green-50 p-4 rounded-lg">
                <span className="font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(totalPrice, ticketCategory.currency)}
                </span>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Buyer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="buyerName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleBuyerChange}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      validationErrors.buyerName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {validationErrors.buyerName && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.buyerName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="buyerEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="buyerEmail"
                    name="buyerEmail"
                    value={formData.buyerEmail}
                    onChange={handleBuyerChange}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      validationErrors.buyerEmail
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                    }`}
                  />
                  {validationErrors.buyerEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {validationErrors.buyerEmail}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="buyerPhone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="buyerPhone"
                    name="buyerPhone"
                    value={formData.buyerPhone}
                    onChange={handleBuyerChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Attendee Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Attendee Information
              </h2>

              {formData.attendees.map((attendee, index) => (
                <div
                  key={index}
                  className={`mb-6 p-4 rounded-lg ${
                    index % 2 === 0
                      ? "bg-gray-50"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <h3 className="font-medium text-gray-900 mb-3">
                    Attendee {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`attendee${index}Name`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id={`attendee${index}Name`}
                        name="name"
                        value={attendee.name}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          validationErrors[`attendee${index}Name`]
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {validationErrors[`attendee${index}Name`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors[`attendee${index}Name`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`attendee${index}Email`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        id={`attendee${index}Email`}
                        name="email"
                        value={attendee.email}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className={`block w-full rounded-md shadow-sm sm:text-sm ${
                          validationErrors[`attendee${index}Email`]
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-green-500 focus:ring-green-500"
                        }`}
                      />
                      {validationErrors[`attendee${index}Email`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors[`attendee${index}Email`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`attendee${index}Phone`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id={`attendee${index}Phone`}
                        name="phone"
                        value={attendee.phone}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`attendee${index}Organization`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id={`attendee${index}Organization`}
                        name="organization"
                        value={attendee.organization}
                        onChange={(e) => handleAttendeeChange(index, e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
              <Link
                href="/tickets"
                className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
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
                    Processing...
                  </>
                ) : (
                  <>Proceed to Payment</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

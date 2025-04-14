"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";

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

interface Attendee {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

interface FormData {
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  attendees: Attendee[];
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

    // Prefill first attendee's information with buyer info
    if (
      name === "buyerName" ||
      name === "buyerEmail" ||
      name === "buyerPhone"
    ) {
      const attendeeField = name.replace("buyer", "").toLowerCase();
      const newAttendees = [...formData.attendees];

      if (newAttendees.length > 0) {
        newAttendees[0] = {
          ...newAttendees[0],
          [attendeeField]: value,
        };

        setFormData((prev) => ({
          ...prev,
          attendees: newAttendees,
        }));
      }
    }
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

      // Save attendee data to localStorage for later ticket creation
      if (ticketCategory) {
        localStorage.setItem(
          `attendeeData_${referenceNumber}`,
          JSON.stringify({
            attendees: formData.attendees,
            quantity: formData.quantity,
            ticketCategoryId: ticketCategory.documentId,
          })
        );
      }

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
    return <LoadingState />;
  }

  if (error || !ticketCategory) {
    return <ErrorState error={error} />;
  }

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackToTicketsLink />
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
          <FormHeader ticketCategory={ticketCategory} />
          <form onSubmit={handleSubmit} className="p-8">
            <TicketSelection
              ticketCategory={ticketCategory}
              formData={formData}
              handleQuantityChange={handleQuantityChange}
              totalPrice={totalPrice}
              quantityOptions={quantityOptions}
              formatCurrency={formatCurrency}
            />

            <BuyerInformation
              formData={formData}
              handleBuyerChange={handleBuyerChange}
              validationErrors={validationErrors}
            />

            <AttendeeInformation
              attendees={formData.attendees}
              handleAttendeeChange={handleAttendeeChange}
              validationErrors={validationErrors}
            />

            <FormActions isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </main>
  );
}

// Component for the loading state
function LoadingState() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin border-2 border-solid border-yellow-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading ticket details...
        </p>
      </div>
    </div>
  );
}

// Component for the error state
function ErrorState({ error }: { error: string | null }) {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center max-w-md px-4">
        <div className="bg-black dark:bg-white p-4 mb-4 inline-block">
          <svg
            className="w-8 h-8 text-yellow-500"
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Error
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error || "Failed to load ticket details"}
        </p>
        <Button variant="primary" href="/tickets">
          Back to Tickets
        </Button>
      </div>
    </div>
  );
}

// Component for the "Back to Tickets" link
function BackToTicketsLink() {
  return (
    <Link
      href="/tickets"
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
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
      Back to Tickets
    </Link>
  );
}

// Component for the form header
function FormHeader({ ticketCategory }: { ticketCategory: TicketCategory }) {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-600 bg-black text-white dark:bg-white dark:text-black">
      <div className="relative">
        <div className="absolute top-0 right-0 w-10 h-10 bg-yellow-500"></div>
        <h1 className="text-2xl font-bold mb-2">
          Purchase Tickets: {ticketCategory.name}
        </h1>
        <p className="text-gray-300 dark:text-gray-600">
          Fill in the details below to complete your purchase
        </p>
      </div>
    </div>
  );
}

// Component for ticket selection section
function TicketSelection({
  ticketCategory,
  formData,
  handleQuantityChange,
  totalPrice,
  quantityOptions,
  formatCurrency,
}: {
  ticketCategory: TicketCategory;
  formData: FormData;
  handleQuantityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalPrice: number;
  quantityOptions: () => JSX.Element[];
  formatCurrency: (amount: number, currency: string) => string;
}) {
  return (
    <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-600">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Ticket Selection
      </h2>
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              {ticketCategory.name}
            </h3>
            <p className="text-yellow-500 font-bold mt-1">
              {formatCurrency(ticketCategory.price, ticketCategory.currency)} /
              ticket
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <label
              htmlFor="quantity"
              className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Quantity
            </label>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-4 py-2">
              <select
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                className="block w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white"
              >
                {quantityOptions()}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white dark:bg-white dark:text-black p-6 border border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total Amount</span>
          <span className="text-2xl font-bold text-yellow-500">
            {formatCurrency(totalPrice, ticketCategory.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Component for buyer information section
function BuyerInformation({
  formData,
  handleBuyerChange,
  validationErrors,
}: {
  formData: FormData;
  handleBuyerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationErrors: Record<string, string>;
}) {
  return (
    <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-600">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Buyer Information
      </h2>
      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="buyerName"
              className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name<span className="text-yellow-500">*</span>
            </label>
            <input
              type="text"
              id="buyerName"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleBuyerChange}
              className={`block w-full p-3 bg-white dark:bg-gray-800 border ${
                validationErrors.buyerName
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-600 focus:border-yellow-500"
              } text-gray-900 dark:text-white`}
            />
            {validationErrors.buyerName && (
              <p className="mt-1 text-red-500">{validationErrors.buyerName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="buyerEmail"
              className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email<span className="text-yellow-500">*</span>
            </label>
            <input
              type="email"
              id="buyerEmail"
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleBuyerChange}
              className={`block w-full p-3 bg-white dark:bg-gray-800 border ${
                validationErrors.buyerEmail
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-600 focus:border-yellow-500"
              } text-gray-900 dark:text-white`}
            />
            {validationErrors.buyerEmail && (
              <p className="mt-1 text-red-500">{validationErrors.buyerEmail}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="buyerPhone"
              className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="buyerPhone"
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleBuyerChange}
              className="block w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-yellow-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for attendee information section
function AttendeeInformation({
  attendees,
  handleAttendeeChange,
  validationErrors,
}: {
  attendees: Attendee[];
  handleAttendeeChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  validationErrors: Record<string, string>;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Attendee Information
      </h2>

      {attendees.map((attendee, index) => (
        <div
          key={index}
          className="mb-6 border border-gray-200 dark:border-gray-600"
        >
          <div className="p-4 bg-black text-white dark:bg-white dark:text-black border-b border-gray-200 dark:border-gray-600">
            <h3 className="font-bold">Attendee {index + 1}</h3>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor={`attendee${index}Name`}
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name<span className="text-yellow-500">*</span>
                </label>
                <input
                  type="text"
                  id={`attendee${index}Name`}
                  name="name"
                  value={attendee.name}
                  onChange={(e) => handleAttendeeChange(index, e)}
                  className={`block w-full p-3 bg-white dark:bg-gray-800 border ${
                    validationErrors[`attendee${index}Name`]
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-600 focus:border-yellow-500"
                  } text-gray-900 dark:text-white`}
                />
                {validationErrors[`attendee${index}Name`] && (
                  <p className="mt-1 text-red-500">
                    {validationErrors[`attendee${index}Name`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`attendee${index}Email`}
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email<span className="text-yellow-500">*</span>
                </label>
                <input
                  type="email"
                  id={`attendee${index}Email`}
                  name="email"
                  value={attendee.email}
                  onChange={(e) => handleAttendeeChange(index, e)}
                  className={`block w-full p-3 bg-white dark:bg-gray-800 border ${
                    validationErrors[`attendee${index}Email`]
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-600 focus:border-yellow-500"
                  } text-gray-900 dark:text-white`}
                />
                {validationErrors[`attendee${index}Email`] && (
                  <p className="mt-1 text-red-500">
                    {validationErrors[`attendee${index}Email`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`attendee${index}Phone`}
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id={`attendee${index}Phone`}
                  name="phone"
                  value={attendee.phone}
                  onChange={(e) => handleAttendeeChange(index, e)}
                  className="block w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-yellow-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor={`attendee${index}Organization`}
                  className="block font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id={`attendee${index}Organization`}
                  name="organization"
                  value={attendee.organization}
                  onChange={(e) => handleAttendeeChange(index, e)}
                  className="block w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-yellow-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for form actions (submit and cancel)
function FormActions({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="mt-10 flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-8">
      <Button
        variant="dark"
        buttonType="outline"
        href="/tickets"
        className="dark:border-white dark:text-white"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        className="min-w-[200px]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
          </div>
        ) : (
          "Proceed to Payment"
        )}
      </Button>
    </div>
  );
}

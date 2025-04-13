"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { generateQRCodeContent, generateQRCodeDataURL } from "@/lib/qrcode";

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

interface TicketCategory {
  id: number;
  documentId: string;
  name: string;
  price: number;
  currency: string;
  validFrom: string;
  validUntil: string;
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
  qrCodeImage?: string; // For storing generated QR code image
  ticketCategory?: TicketCategory;
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
  const [pdfMakeLoaded, setPdfMakeLoaded] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Load pdfmake library
  useEffect(() => {
    // Only import pdfmake in the browser
    import("pdfmake/build/pdfmake").then((pdfMakeModule) => {
      const pdfMake = pdfMakeModule.default || pdfMakeModule;

      // Import fonts
      import("pdfmake/build/vfs_fonts").then((pdfFontsModule) => {
        const pdfFonts = pdfFontsModule.default || pdfFontsModule;
        pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
        setPdfMakeLoaded(true);
      });
    });
  }, []);

  // Function to generate QR code images for tickets
  const generateQRCodeImages = useCallback(async (ticketsData: Ticket[]) => {
    const updatedTickets = [...ticketsData];

    for (let i = 0; i < updatedTickets.length; i++) {
      try {
        const qrImage = await generateQRCodeDataURL(
          updatedTickets[i].qrCodeData
        );
        updatedTickets[i].qrCodeImage = qrImage;
      } catch (error) {
        console.error(`Error generating QR code for ticket ${i}:`, error);
      }
    }

    return updatedTickets;
  }, []);

  // ==================================
  // Function to generate and download a PDF ticket
  const generatePDF = async (ticket: Ticket) => {
    try {
      setIsGeneratingPDF(true);

      if (!ticket.qrCodeImage) {
        // Generate QR code if not already available
        const qrImage = await generateQRCodeDataURL(ticket.qrCodeData);
        ticket.qrCodeImage = qrImage;
      }

      // Create a temporary div to render the ticket
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "-9999px";
      tempDiv.style.width = "800px"; // Set width similar to your ticket display

      // Add ticket HTML with styling
      tempDiv.innerHTML = `
      <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; width: 800px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
        <div style="display: flex;">
          <!-- Main ticket content -->
          <div style="width: 75%; background-color: white;">
            <!-- Header with blue background -->
            <div style="background-color: #1e3a8a; color: white; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-weight: bold; font-size: 1.25rem; margin: 0;">UNITE EXPO 2025</h3>
                <p style="font-size: 0.75rem; color: #d1d5db; margin: 0;">Uganda Next Investment & Trade Expo</p>
              </div>
              <div style="text-align: right;">
                <p style="font-size: 0.75rem; color: #d1d5db; margin: 0;">${
                  ticket.ticketCategory?.name || "Single Event Ticket"
                }</p>
              </div>
            </div>

            <!-- Attendee name and contact -->
            <div style="padding: 1rem;">
              <h4 style="font-size: 1.25rem; font-weight: bold; color: #111827; margin: 0 0 0.5rem 0;">${
                ticket.attendeeName
              }</h4>
              <p style="color: #4b5563; margin: 0 0 0.25rem 0;">${
                ticket.attendeeEmail
              }</p>
              ${
                ticket.attendeePhone
                  ? `<p style="color: #4b5563; margin: 0;">${ticket.attendeePhone}</p>`
                  : ""
              }
            </div>

            <!-- Ticket details -->
            <div style="padding: 0 1rem 1rem 1rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Ticket Type</p>
                  <p style="font-weight: 500; margin: 0;">${
                    ticket.ticketCategory?.name || "Single Event Ticket"
                  }</p>
                </div>
                <div>
                  <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Ticket #</p>
                  <p style="font-weight: 500; font-size: 0.875rem; word-break: break-all; margin: 0;">${
                    ticket.ticketNumber
                  }</p>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                  <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Valid From</p>
                  <p style="font-weight: 500; margin: 0;">${
                    ticket.ticketCategory?.validFrom
                      ? new Date(
                          ticket.ticketCategory.validFrom
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "12 April 2025"
                  }</p>
                </div>
                <div>
                  <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Valid Until</p>
                  <p style="font-weight: 500; margin: 0;">${
                    ticket.ticketCategory?.validUntil
                      ? new Date(
                          ticket.ticketCategory.validUntil
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "30 April 2025"
                  }</p>
                </div>
              </div>

              <!-- Location with icon -->
              <div style="display: flex; align-items: center; margin-top: 1rem;">
                <svg style="height: 1rem; width: 1rem; color: #6b7280; margin-right: 0.5rem;" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span style="font-size: 0.875rem; color: #4b5563;">Kampala International Convention Centre, Uganda</span>
              </div>
            </div>
          </div>

          <!-- Separator -->
          <div style="border-left: 1px dashed #d1d5db;"></div>

          <!-- QR code section -->
          <div style="width: 25%; background-color: #f9fafb; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
            <p style="font-weight: bold; text-align: center; margin: 0 0 0.75rem 0;">ADMIT ONE</p>

            <div style="width: 100%; aspect-ratio: 1; margin-bottom: 0.75rem;">
              <img src="${
                ticket.qrCodeImage
              }" alt="Ticket QR Code" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>

            <p style="font-size: 0.75rem; text-align: center; color: #4b5563; margin: 0 0 0.25rem 0;">SCAN TO VERIFY</p>
            <p style="font-size: 0.75rem; text-align: center; font-weight: bold; margin: 0;">UNITE EXPO 2025</p>
          </div>
        </div>
      </div>
    `;

      // Add to document body temporarily
      document.body.appendChild(tempDiv);

      // Use html2canvas to capture the ticket
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Convert canvas to image data
      const imageData = canvas.toDataURL("image/png");

      // Dynamically import pdfmake
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfMake = pdfMakeModule.default || pdfMakeModule;

      // Create simplified document definition that just includes the image
      const docDefinition = {
        pageSize: "A4",
        pageOrientation: "landscape",
        content: [
          {
            image: imageData,
            width: 750,
          },
        ],
        pageMargins: [30, 30, 30, 30],
      };

      // Generate and download the PDF
      pdfMake
        .createPdf(docDefinition)
        .download(`UNITE-Expo-Ticket-${ticket.ticketNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Function to generate and download all tickets as PDF
  const generateAllPDFs = async () => {
    try {
      setIsGeneratingPDF(true);

      // Ensure all tickets have QR codes
      const ticketsWithQR = await generateQRCodeImages(tickets);

      // Array to hold all the image data
      const ticketImages = [];

      // Process each ticket one by one
      for (const ticket of ticketsWithQR) {
        // Create a temporary div for this ticket
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        tempDiv.style.top = "-9999px";
        tempDiv.style.width = "800px";

        // Add ticket HTML with styling (same as in generatePDF)
        tempDiv.innerHTML = `
        <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; width: 800px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
          <div style="display: flex;">
            <!-- Main ticket content -->
            <div style="width: 75%; background-color: white;">
              <!-- Header with blue background -->
              <div style="background-color: #1e3a8a; color: white; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h3 style="font-weight: bold; font-size: 1.25rem; margin: 0;">UNITE EXPO 2025</h3>
                  <p style="font-size: 0.75rem; color: #d1d5db; margin: 0;">Uganda Next Investment & Trade Expo</p>
                </div>
                <div style="text-align: right;">
                  <p style="font-size: 0.75rem; color: #d1d5db; margin: 0;">${
                    ticket.ticketCategory?.name || "Single Event Ticket"
                  }</p>
                </div>
              </div>

              <!-- Attendee name and contact -->
              <div style="padding: 1rem;">
                <h4 style="font-size: 1.25rem; font-weight: bold; color: #111827; margin: 0 0 0.5rem 0;">${
                  ticket.attendeeName
                }</h4>
                <p style="color: #4b5563; margin: 0 0 0.25rem 0;">${
                  ticket.attendeeEmail
                }</p>
                ${
                  ticket.attendeePhone
                    ? `<p style="color: #4b5563; margin: 0;">${ticket.attendeePhone}</p>`
                    : ""
                }
              </div>

              <!-- Ticket details -->
              <div style="padding: 0 1rem 1rem 1rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                  <div>
                    <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Ticket Type</p>
                    <p style="font-weight: 500; margin: 0;">${
                      ticket.ticketCategory?.name || "Single Event Ticket"
                    }</p>
                  </div>
                  <div>
                    <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Ticket #</p>
                    <p style="font-weight: 500; font-size: 0.875rem; word-break: break-all; margin: 0;">${
                      ticket.ticketNumber
                    }</p>
                  </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div>
                    <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Valid From</p>
                    <p style="font-weight: 500; margin: 0;">${
                      ticket.ticketCategory?.validFrom
                        ? new Date(
                            ticket.ticketCategory.validFrom
                          ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "12 April 2025"
                    }</p>
                  </div>
                  <div>
                    <p style="font-size: 0.75rem; color: #6b7280; text-transform: uppercase; margin: 0 0 0.25rem 0;">Valid Until</p>
                    <p style="font-weight: 500; margin: 0;">${
                      ticket.ticketCategory?.validUntil
                        ? new Date(
                            ticket.ticketCategory.validUntil
                          ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "30 April 2025"
                    }</p>
                  </div>
                </div>

                <!-- Location with icon -->
                <div style="display: flex; align-items: center; margin-top: 1rem;">
                  <svg style="height: 1rem; width: 1rem; color: #6b7280; margin-right: 0.5rem;" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span style="font-size: 0.875rem; color: #4b5563;">Kampala International Convention Centre, Uganda</span>
                </div>
              </div>
            </div>

            <!-- Separator -->
            <div style="border-left: 1px dashed #d1d5db;"></div>

            <!-- QR code section -->
            <div style="width: 25%; background-color: #f9fafb; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1rem;">
              <p style="font-weight: bold; text-align: center; margin: 0 0 0.75rem 0;">ADMIT ONE</p>

              <div style="width: 100%; aspect-ratio: 1; margin-bottom: 0.75rem;">
                <img src="${
                  ticket.qrCodeImage
                }" alt="Ticket QR Code" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>

              <p style="font-size: 0.75rem; text-align: center; color: #4b5563; margin: 0 0 0.25rem 0;">SCAN TO VERIFY</p>
              <p style="font-size: 0.75rem; text-align: center; font-weight: bold; margin: 0;">UNITE EXPO 2025</p>
            </div>
          </div>
        </div>
      `;

        // Add to document body temporarily
        document.body.appendChild(tempDiv);

        // Use html2canvas to capture the ticket
        const canvas = await html2canvas(tempDiv, {
          scale: 2, // Higher scale for better quality
          logging: false,
          useCORS: true,
          allowTaint: true,
        });

        // Remove temporary div
        document.body.removeChild(tempDiv);

        // Convert canvas to image data
        const imageData = canvas.toDataURL("image/png");

        // Add the image data to our array
        ticketImages.push(imageData);
      }

      // Dynamically import pdfmake
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfMake = pdfMakeModule.default || pdfMakeModule;

      // Create content array with each ticket image on its own page
      const content = [];

      // Add each ticket image to the content array with a page break after (except the last one)
      ticketImages.forEach((imageData, index) => {
        // Add the image
        content.push({
          image: imageData,
          width: 750,
        });

        // Add a page break after each image except the last one
        if (index < ticketImages.length - 1) {
          content.push({ text: "", pageBreak: "after" });
        }
      });

      // Create document definition
      const docDefinition = {
        pageSize: "A4",
        pageOrientation: "landscape",
        content: content,
        pageMargins: [30, 30, 30, 30],
      };

      // Generate and download the PDF
      pdfMake.createPdf(docDefinition).download("UNITE-Expo-All-Tickets.pdf");
    } catch (error) {
      console.error("Error generating PDFs:", error);
      alert("Error generating PDFs. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  // ===================================
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
                    `/tickets?filters[purchase][referenceNumber][$eq]=${data.merchantReference}&populate=ticketCategory`
                  );

                  if (
                    ticketsResponse &&
                    ticketsResponse.data &&
                    ticketsResponse.data.length > 0
                  ) {
                    // Tickets already exist, just show them
                    console.log("Tickets already exist for this purchase");
                    const ticketsWithQR = await generateQRCodeImages(
                      ticketsResponse.data
                    );
                    setTickets(ticketsWithQR);
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
  }, [orderTrackingId, generateQRCodeImages]);

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

        // Create the QR code content as JSON string
        const qrContent = {
          ticketNumber: ticketNumber,
          event: "UNITE",
        };
        const qrCodeData = JSON.stringify(qrContent);

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

            // Generate the QR code image for display
            const ticket = ticketResponse.data;

            try {
              ticket.ticketCategory = ticketCategory;
              ticket.qrCodeImage = await generateQRCodeDataURL(
                ticket.qrCodeData
              );
              generatedTickets.push(ticket);
            } catch (qrError) {
              console.error("Error generating QR code image:", qrError);
              generatedTickets.push(ticket);
            }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/tickets"
            className="text-blue-900 hover:text-blue-700 inline-flex items-center text-sm font-medium"
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
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Your Tickets
                  </h2>

                  {tickets.length > 0 && (
                    <button
                      onClick={generateAllPDFs}
                      disabled={isGeneratingPDF || !pdfMakeLoaded}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded bg-blue-900 text-white hover:bg-blue-800"
                    >
                      {isGeneratingPDF ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        </span>
                      ) : (
                        <>
                          <svg
                            className="mr-1 h-4 w-4"
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
                          Download All
                        </>
                      )}
                    </button>
                  )}
                </div>

                {isGeneratingTickets ? (
                  <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-none border-4 border-solid border-blue-500 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">
                      Generating your tickets...
                    </p>
                  </div>
                ) : tickets.length > 0 ? (
                  <div className="space-y-6">
                    {tickets.map((ticket, index) => (
                      <div key={ticket.id} className="mb-6">
                        {/* Download button above ticket */}
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => generatePDF(ticket)}
                            disabled={isGeneratingPDF || !pdfMakeLoaded}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded bg-blue-900 text-white hover:bg-blue-800"
                          >
                            {isGeneratingPDF ? (
                              <span className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                              </span>
                            ) : (
                              <>
                                <svg
                                  className="mr-1 h-4 w-4"
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
                                Download Ticket
                              </>
                            )}
                          </button>
                        </div>

                        {/* Ticket with proper ratio */}
                        <div
                          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full"
                          style={{ maxWidth: "800px" }}
                        >
                          <div className="flex">
                            {/* Main ticket content */}
                            <div className="w-3/4 bg-white">
                              {/* Header with blue background */}
                              <div className="bg-blue-900 text-white py-3 px-5 flex justify-between items-center">
                                <div>
                                  <h3 className="font-bold text-xl">
                                    UNITE EXPO 2025
                                  </h3>
                                  <p className="text-xs text-gray-300">
                                    Uganda Next Investment & Trade Expo
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-300">
                                    {ticket.ticketCategory?.name ||
                                      "Single Event Ticket"}
                                  </p>
                                </div>
                              </div>

                              {/* Attendee name and contact */}
                              <div className="p-4">
                                <h4 className="text-xl font-bold text-gray-900">
                                  {ticket.attendeeName}
                                </h4>
                                <p className="text-gray-600">
                                  {ticket.attendeeEmail}
                                </p>
                                {ticket.attendeePhone && (
                                  <p className="text-gray-600">
                                    {ticket.attendeePhone}
                                  </p>
                                )}
                              </div>

                              {/* Ticket details in 2x2 grid */}
                              <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                      Ticket Type
                                    </p>
                                    <p className="font-medium">
                                      {ticket.ticketCategory?.name ||
                                        "Single Event Ticket"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                      Ticket #
                                    </p>
                                    <p className="font-medium text-sm break-all">
                                      {ticket.ticketNumber}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                      Valid From
                                    </p>
                                    <p className="font-medium">
                                      {ticket.ticketCategory?.validFrom
                                        ? new Date(
                                            ticket.ticketCategory.validFrom
                                          ).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })
                                        : "12 April 2025"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                      Valid Until
                                    </p>
                                    <p className="font-medium">
                                      {ticket.ticketCategory?.validUntil
                                        ? new Date(
                                            ticket.ticketCategory.validUntil
                                          ).toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })
                                        : "30 April 2025"}
                                    </p>
                                  </div>
                                </div>

                                {/* Location with icon */}
                                <div className="flex items-center mt-4">
                                  <svg
                                    className="h-4 w-4 text-gray-500 mr-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                  </svg>
                                  <span className="text-sm text-gray-600">
                                    Kampala International Convention Centre,
                                    Uganda
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Separator */}
                            <div className="border-l border-dashed border-gray-300"></div>

                            {/* QR code section */}
                            <div className="w-1/4 bg-gray-50 flex flex-col items-center justify-center p-4">
                              <p className="font-bold text-center mb-3">
                                ADMIT ONE
                              </p>

                              <div className="w-full aspect-square mb-3">
                                {ticket.qrCodeImage ? (
                                  <img
                                    src={ticket.qrCodeImage}
                                    alt="Ticket QR Code"
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
                                    <span className="text-gray-400 text-xs">
                                      Loading...
                                    </span>
                                  </div>
                                )}
                              </div>

                              <p className="text-xs text-center text-gray-600 mb-1">
                                SCAN TO VERIFY
                              </p>
                              <p className="text-xs text-center font-bold">
                                UNITE EXPO 2025
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-gray-200 bg-gray-50 rounded-lg">
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
                      className="mt-4 inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-blue-900 text-white hover:bg-blue-800 rounded"
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
                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
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
                          tickets are ready for download above.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
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
                          className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded"
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
            className="inline-flex items-center px-4 py-2 border-0 text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 rounded"
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

import QRCode from "qrcode";

/**
 * Generates a QR code as a data URL
 * @param data The data to encode in the QR code
 * @returns Promise resolving to the QR code as a data URL string
 */
export async function generateQRCodeDataURL(data: string): Promise<string> {
  try {
    const qrCodeOptions = {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    };

    const dataURL = await QRCode.toDataURL(data, qrCodeOptions);
    return dataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

/**
 * Generates the QR code content for a ticket
 * Formats the data in a standardized way for ticket verification
 * @param ticketNumber The unique ticket number
 * @param eventId The event ID (optional)
 * @param attendeeEmail The attendee's email (optional)
 * @returns A formatted string containing the ticket data
 */
export function generateQRCodeContent(
  ticketNumber: string,
  attendeeEmail?: string,
  eventId?: string
): string {
  // Create a data object with the ticket information
  const ticketData = {
    ticketNumber,
    attendeeEmail: attendeeEmail || "",
    eventId: eventId || "",
    timestamp: Date.now(),
  };

  // Convert to JSON string for encoding in QR code
  return JSON.stringify(ticketData);
}

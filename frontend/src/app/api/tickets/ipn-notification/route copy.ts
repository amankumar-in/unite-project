import { NextRequest, NextResponse } from "next/server";
import { fetchAPI } from "@/lib/api/api-config";

/**
 * Handles IPN (Instant Payment Notification) from Pesapal
 * This endpoint will receive payment status updates
 */
export async function GET(request: NextRequest) {
  // Get URL parameters
  const searchParams = request.nextUrl.searchParams;
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");
  const orderNotificationType = searchParams.get("OrderNotificationType");

  console.log("Pesapal IPN notification received (GET):", {
    orderTrackingId,
    orderMerchantReference,
    orderNotificationType,
    allParams: Object.fromEntries(searchParams.entries()),
  });

  // Process the notification
  try {
    if (!orderTrackingId || !orderMerchantReference) {
      throw new Error("Missing required parameters");
    }

    // Use the transaction status API to get payment details
    const statusResponse = await fetch(
      `${request.nextUrl.origin}/api/tickets/transaction-status?orderTrackingId=${orderTrackingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const statusData = await statusResponse.json();
    console.log("Transaction status data:", statusData);

    // If successfully got status and payment was completed
    if (
      statusData.success &&
      statusData.paymentStatus === "Completed" &&
      statusData.statusCode === 1
    ) {
      // Update purchase record in database
      try {
        // Find the purchase record using merchant reference
        const purchaseResponse = await fetchAPI(
          `/ticket-purchases?filters[referenceNumber][$eq]=${orderMerchantReference}`
        );

        if (
          purchaseResponse &&
          purchaseResponse.data &&
          purchaseResponse.data.length > 0
        ) {
          const purchaseId = purchaseResponse.data[0].id;

          // Update the purchase status
          await fetchAPI(`/ticket-purchases/${purchaseId}`, {
            method: "PUT",
            body: JSON.stringify({
              data: {
                paymentStatus: "completed",
                paymentDate: new Date().toISOString(),
                paymentMethod: statusData.paymentMethod,
                transactionId: orderTrackingId,
                paymentAccount: statusData.paymentAccount,
                confirmationCode: statusData.confirmationCode,
              },
            }),
          });

          console.log(`Purchase record ${purchaseId} updated successfully`);

          // TODO: Generate tickets here
          // You would need to create ticket records in Strapi
          // This depends on your data model and requirements
        } else {
          console.error(
            "Purchase record not found for reference:",
            orderMerchantReference
          );
        }
      } catch (dbError) {
        console.error("Error updating database:", dbError);
      }
    } else if (statusData.success && statusData.paymentStatus === "Failed") {
      // Handle failed payment
      // Find the purchase record and update it to failed status
      try {
        const purchaseResponse = await fetchAPI(
          `/ticket-purchases?filters[referenceNumber][$eq]=${orderMerchantReference}`
        );

        if (
          purchaseResponse &&
          purchaseResponse.data &&
          purchaseResponse.data.length > 0
        ) {
          const purchaseId = purchaseResponse.data[0].id;

          await fetchAPI(`/ticket-purchases/${purchaseId}`, {
            method: "PUT",
            body: JSON.stringify({
              data: {
                paymentStatus: "failed",
                paymentDate: new Date().toISOString(),
                transactionId: orderTrackingId,
              },
            }),
          });

          console.log(`Purchase record ${purchaseId} marked as failed`);
        }
      } catch (dbError) {
        console.error("Error updating database for failed payment:", dbError);
      }
    }

    // Respond to Pesapal with a success message (as required by Pesapal)
    return NextResponse.json({
      orderNotificationType: orderNotificationType,
      orderTrackingId: orderTrackingId,
      orderMerchantReference: orderMerchantReference,
      status: 200,
    });
  } catch (error) {
    console.error("Error processing IPN notification:", error);

    // Respond with an error message (still using the format expected by Pesapal)
    return NextResponse.json({
      orderNotificationType: orderNotificationType,
      orderTrackingId: orderTrackingId || "",
      orderMerchantReference: orderMerchantReference || "",
      status: 500,
    });
  }
}

/**
 * Handles IPN (Instant Payment Notification) from Pesapal via POST
 */
export async function POST(request: NextRequest) {
  try {
    // Get the POST body
    const body = await request.json();

    // Extract the data
    const orderTrackingId = body.OrderTrackingId;
    const orderMerchantReference = body.OrderMerchantReference;
    const orderNotificationType = body.OrderNotificationType;

    console.log("Pesapal IPN notification received (POST):", body);

    // Use the same processing logic as the GET method
    if (!orderTrackingId || !orderMerchantReference) {
      throw new Error("Missing required parameters");
    }

    // Use the transaction status API to get payment details
    const statusResponse = await fetch(
      `${request.nextUrl.origin}/api/tickets/transaction-status?orderTrackingId=${orderTrackingId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const statusData = await statusResponse.json();
    console.log("Transaction status data:", statusData);

    // If successfully got status and payment was completed
    if (
      statusData.success &&
      statusData.paymentStatus === "Completed" &&
      statusData.statusCode === 1
    ) {
      // Update purchase record in database
      try {
        // Find the purchase record using merchant reference
        const purchaseResponse = await fetchAPI(
          `/ticket-purchases?filters[referenceNumber][$eq]=${orderMerchantReference}`
        );

        if (
          purchaseResponse &&
          purchaseResponse.data &&
          purchaseResponse.data.length > 0
        ) {
          const purchaseId = purchaseResponse.data[0].id;

          // Update the purchase status
          await fetchAPI(`/ticket-purchases/${purchaseId}`, {
            method: "PUT",
            body: JSON.stringify({
              data: {
                paymentStatus: "completed",
                paymentDate: new Date().toISOString(),
                paymentMethod: statusData.paymentMethod,
                transactionId: orderTrackingId,
                paymentAccount: statusData.paymentAccount,
                confirmationCode: statusData.confirmationCode,
              },
            }),
          });

          console.log(`Purchase record ${purchaseId} updated successfully`);

          // TODO: Generate tickets here
          // You would need to create ticket records in Strapi
          // This depends on your data model and requirements
        } else {
          console.error(
            "Purchase record not found for reference:",
            orderMerchantReference
          );
        }
      } catch (dbError) {
        console.error("Error updating database:", dbError);
      }
    } else if (statusData.success && statusData.paymentStatus === "Failed") {
      // Handle failed payment
      // Find the purchase record and update it to failed status
      try {
        const purchaseResponse = await fetchAPI(
          `/ticket-purchases?filters[referenceNumber][$eq]=${orderMerchantReference}`
        );

        if (
          purchaseResponse &&
          purchaseResponse.data &&
          purchaseResponse.data.length > 0
        ) {
          const purchaseId = purchaseResponse.data[0].id;

          await fetchAPI(`/ticket-purchases/${purchaseId}`, {
            method: "PUT",
            body: JSON.stringify({
              data: {
                paymentStatus: "failed",
                paymentDate: new Date().toISOString(),
                transactionId: orderTrackingId,
              },
            }),
          });

          console.log(`Purchase record ${purchaseId} marked as failed`);
        }
      } catch (dbError) {
        console.error("Error updating database for failed payment:", dbError);
      }
    }

    // Respond to Pesapal with a success message
    return NextResponse.json({
      orderNotificationType: orderNotificationType,
      orderTrackingId: orderTrackingId,
      orderMerchantReference: orderMerchantReference,
      status: 200,
    });
  } catch (error) {
    console.error("Error processing IPN notification:", error);

    // Respond with an error message
    return NextResponse.json({
      orderNotificationType: "IPNCHANGE",
      orderTrackingId: "",
      orderMerchantReference: "",
      status: 500,
    });
  }
}

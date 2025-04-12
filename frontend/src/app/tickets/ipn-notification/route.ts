import { NextRequest, NextResponse } from "next/server";

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

  // Process the notification (in a real implementation, you would update your database)
  try {
    // TODO: Add your business logic here
    // - Update transaction status in your database
    // - Verify the payment status with Pesapal using GetTransactionStatus API
    // - Generate tickets if payment was successful

    // For now, just log the notification
    console.log(
      "Processing IPN notification for order:",
      orderMerchantReference
    );

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
      orderNotificationType: orderNotificationType,
      orderTrackingId: orderTrackingId,
      orderMerchantReference: orderMerchantReference,
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

    // Process the notification (in a real implementation, you would update your database)
    // TODO: Add your business logic here

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

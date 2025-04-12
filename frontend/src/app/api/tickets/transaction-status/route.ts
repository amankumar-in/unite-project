import { NextRequest, NextResponse } from "next/server";

// Pesapal API URLs - using production by default
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3";
// For sandbox/testing, use:
// const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3";

const PESAPAL_TRANSACTION_STATUS_URL = `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus`;

/**
 * Handles checking transaction status from Pesapal
 */
export async function GET(request: NextRequest) {
  try {
    // Get the orderTrackingId from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const orderTrackingId = searchParams.get("orderTrackingId");

    // Validate that orderTrackingId is provided
    if (!orderTrackingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing orderTrackingId parameter",
        },
        { status: 400 }
      );
    }

    console.log("Checking transaction status for:", orderTrackingId);

    // First, get authentication token from our auth endpoint
    const authResponse = await fetch(
      `${request.nextUrl.origin}/api/tickets/pesapal-auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const authData = await authResponse.json();

    if (!authData.success || !authData.token) {
      console.error("Failed to authenticate with Pesapal:", authData);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to authenticate with Pesapal",
          error: authData.error || authData.message || "Authentication failed",
        },
        { status: 500 }
      );
    }

    // Now call Pesapal's GetTransactionStatus API
    const statusUrl = `${PESAPAL_TRANSACTION_STATUS_URL}?orderTrackingId=${orderTrackingId}`;

    console.log("Calling Pesapal Transaction Status API:", statusUrl);

    const statusResponse = await fetch(statusUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    });

    const statusData = await statusResponse.json();
    console.log("Pesapal transaction status response:", statusData);

    if (statusData.status === "200") {
      // Successfully retrieved transaction status
      return NextResponse.json({
        success: true,
        paymentMethod: statusData.payment_method,
        amount: statusData.amount,
        createdDate: statusData.created_date,
        confirmationCode: statusData.confirmation_code,
        paymentStatus: statusData.payment_status_description,
        statusCode: statusData.status_code,
        description: statusData.description,
        paymentAccount: statusData.payment_account,
        merchantReference: statusData.merchant_reference,
        currency: statusData.currency,
        message: statusData.message,
      });
    } else {
      // Failed to get transaction status
      return NextResponse.json(
        {
          success: false,
          message: "Failed to retrieve transaction status",
          error: statusData.error || "Unknown error from Pesapal",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Handle any unexpected errors
    console.error("Error checking transaction status:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Failed to check transaction status: ${
          error.message || "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

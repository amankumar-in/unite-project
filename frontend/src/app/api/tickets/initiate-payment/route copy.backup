import { NextRequest, NextResponse } from "next/server";

// Pesapal API URLs - using production by default
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3";
// For sandbox/testing, use:
// const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3";

const PESAPAL_SUBMIT_ORDER_URL = `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`;

/**
 * Handles initiating a payment with Pesapal API 3.0
 */
export async function POST(request: NextRequest) {
  try {
    // Extract the payment details from the request body
    const body = await request.json();
    const {
      referenceNumber,
      amount,
      currency,
      description,
      buyerName,
      buyerEmail,
      buyerPhone,
    } = body;

    // Validate required fields
    if (!referenceNumber || !amount || !currency || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required payment details",
        },
        { status: 400 }
      );
    }

    if (!buyerEmail && !buyerPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "Either email or phone number is required",
        },
        { status: 400 }
      );
    }

    console.log("Initiating payment with details:", {
      referenceNumber,
      amount,
      currency,
      description,
    });

    // Get Pesapal IPN ID from environment variables
    const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID;
    if (!PESAPAL_IPN_ID) {
      console.error("Pesapal IPN ID not found in environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Payment system not properly configured (missing IPN ID)",
        },
        { status: 500 }
      );
    }

    // Get the base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

    // First, get authentication token
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
          message: "Failed to authenticate with payment provider",
          error: authData.error || authData.message || "Authentication failed",
        },
        { status: 500 }
      );
    }

    // Split name into first and last name for billing address
    const nameParts = buyerName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Prepare the order request payload for Pesapal
    const orderRequestPayload = {
      id: referenceNumber,
      currency,
      amount: parseFloat(amount),
      description,
      callback_url: `${baseUrl}/tickets/confirmation`,
      notification_id: PESAPAL_IPN_ID,
      billing_address: {
        email_address: buyerEmail || "",
        phone_number: buyerPhone || "",
        country_code: "UG", // Default to Uganda
        first_name: firstName,
        middle_name: "",
        last_name: lastName,
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: "",
      },
    };

    console.log("Submitting order to Pesapal:", orderRequestPayload);

    // Submit the order to Pesapal
    const orderResponse = await fetch(PESAPAL_SUBMIT_ORDER_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(orderRequestPayload),
    });

    const orderData = await orderResponse.json();
    console.log("Pesapal order submission response:", orderData);

    if (orderData.status === "200" && orderData.redirect_url) {
      // Successfully created order request
      return NextResponse.json({
        success: true,
        orderTrackingId: orderData.order_tracking_id,
        merchantReference: orderData.merchant_reference,
        redirectUrl: orderData.redirect_url,
      });
    } else {
      // Failed to create order request
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create payment request",
          error: orderData.error || "Unknown error from payment provider",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Handle any unexpected errors
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Failed to initiate payment: ${
          error.message || "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

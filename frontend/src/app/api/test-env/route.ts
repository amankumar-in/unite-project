import { NextResponse } from "next/server";

export async function GET() {
  // Check if environment variables are set
  const envStatus = {
    PESAPAL_CONSUMER_KEY: process.env.PESAPAL_CONSUMER_KEY
      ? "✓ Set"
      : "❌ Not set",
    PESAPAL_CONSUMER_SECRET: process.env.PESAPAL_CONSUMER_SECRET
      ? "✓ Set"
      : "❌ Not set",
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "❌ Not set",

    // Include masked values (first and last 4 chars) for verification
    PESAPAL_CONSUMER_KEY_PREVIEW: process.env.PESAPAL_CONSUMER_KEY
      ? `${process.env.PESAPAL_CONSUMER_KEY.substring(
          0,
          4
        )}...${process.env.PESAPAL_CONSUMER_KEY.slice(-4)}`
      : "Not available",

    PESAPAL_CONSUMER_SECRET_PREVIEW: process.env.PESAPAL_CONSUMER_SECRET
      ? `${process.env.PESAPAL_CONSUMER_SECRET.substring(
          0,
          4
        )}...${process.env.PESAPAL_CONSUMER_SECRET.slice(-4)}`
      : "Not available",
  };

  return NextResponse.json({
    success: true,
    message: "Environment variables status",
    data: envStatus,
  });
}

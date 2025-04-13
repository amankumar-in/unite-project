import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  console.log("Email API endpoint called");

  try {
    // Log request headers
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries())
    );

    const body = await request.json();
    console.log("Request body received:", JSON.stringify(body, null, 2));

    const {
      email,
      name,
      ticketDetails,
      eventDate,
      eventLocation,
      subject,
      confirmationUrl,
    } = body;

    if (!email) {
      console.error("Missing email field in request");
      return NextResponse.json(
        { success: false, message: "Missing required email field" },
        { status: 400 }
      );
    }

    console.log("Email configuration:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      user: process.env.EMAIL_USER ? "Set (value hidden)" : "Not set",
      pass: process.env.EMAIL_PASSWORD ? "Set (value hidden)" : "Not set",
      from: process.env.EMAIL_FROM,
    });

    // Create a transporter with your email settings
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.zeptomail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Enable debug output
    });

    console.log("Email transporter created");

    // Build a nice, rich HTML email with ticket details
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your UNITE Expo 2025 Tickets</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #333333; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #1e3a8a;">
              <h1 style="margin: 0; color: white; font-size: 28px;">UNITE EXPO 2025</h1>
              <p style="margin: 5px 0 0; color: #d1d5db; font-size: 16px;">Uganda Next Investment & Trade Expo</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; background-color: white;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h2 style="margin-top: 0; color: #1e3a8a; font-size: 22px;">Hello ${
                      name || "Valued Guest"
                    },</h2>
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5;">Thank you for your purchase! Your tickets for UNITE Expo 2025 are ready.</p>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
                      <h3 style="margin-top: 0; color: #1e3a8a; font-size: 18px;">Ticket Details</h3>
                      ${
                        ticketDetails
                          ? `
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="8" border="0" style="font-size: 15px;">
                        ${ticketDetails
                          .map(
                            (ticket, index) => `
                        <tr style="${
                          index % 2 === 0 ? "background-color: #f9fafb;" : ""
                        }">
                          <td style="border-bottom: 1px solid #e5e7eb; padding: 12px 8px;">
                            <strong>Ticket #${index + 1}</strong><br>
                            <span style="font-size: 14px; color: #6b7280;">${
                              ticket.ticketNumber
                            }</span>
                          </td>
                          <td style="border-bottom: 1px solid #e5e7eb; padding: 12px 8px;">
                            <strong>${ticket.attendeeName}</strong><br>
                            <span style="font-size: 14px; color: #6b7280;">${
                              ticket.ticketCategory?.name || "Standard Ticket"
                            }</span>
                          </td>
                        </tr>
                        `
                          )
                          .join("")}
                      </table>
                      `
                          : `
                      <p style="margin: 0; font-size: 15px;">Your ticket purchase has been confirmed. Click the button below to view and download your tickets.</p>
                      `
                      }
                    </div>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${confirmationUrl}" style="background-color: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; text-align: center;">View & Download Your Tickets</a>
                    </div>
                    
                    <h3 style="color: #1e3a8a; font-size: 18px;">Important Information</h3>
                    <ul style="padding-left: 20px; font-size: 15px; line-height: 1.5;">
                      <li>Event Date: ${eventDate || "April 12-30, 2025"}</li>
                      <li>Location: ${
                        eventLocation ||
                        "Kampala International Convention Centre, Uganda"
                      }</li>
                      <li>Please bring a printed copy of your ticket or show the digital version on your device</li>
                      <li>Arrive 30 minutes before your scheduled sessions to allow time for check-in</li>
                    </ul>
                    
                    <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.5;">If you have any questions about your tickets or the event, please contact our support team at <a href="mailto:support@uniteexpo.org" style="color: #1e3a8a;">support@uniteexpo.org</a>.</p>
                    
                    <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.5;">We look forward to seeing you at UNITE Expo 2025!</p>
                    
                    <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.5;">Best regards,<br>The UNITE Expo 2025 Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; text-align: center; background-color: #f3f4f6; color: #6b7280; font-size: 14px;">
              <p style="margin: 0 0 10px;">© 2025 UNITE Expo. All rights reserved.</p>
              <p style="margin: 0;">Kampala International Convention Centre, Uganda</p>
              <p style="margin: 15px 0 0;">
                <a href="https://uniteexpo.org/privacy" style="color: #4b5563; text-decoration: underline; margin: 0 10px;">Privacy Policy</a>
                <a href="https://uniteexpo.org/terms" style="color: #4b5563; text-decoration: underline; margin: 0 10px;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    console.log("Rich HTML created for email");

    // Email options with full HTML content
    const mailOptions = {
      from:
        process.env.EMAIL_FROM ||
        '"UNITE Expo" <tickets@rewardsforeducation.com>',
      to: email,
      subject: subject || "Your UNITE Expo 2025 Tickets",
      html: htmlContent,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Send the email
    console.log("About to send email via nodemailer...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent with info:", info);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error in email API:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack available"
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

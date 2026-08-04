"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Where contact form submissions land. Read from the environment rather than
 * written here: this repo is public and linked from the site footer, so a
 * literal address in the source is a scrape target.
 */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const { name, email, phone, message } = formData;

    // Checked before anything else and logged loudly. This form is the only
    // route to Dave on the whole site, so a missing address has to surface as
    // an obvious failure rather than a submission that quietly goes nowhere.
    if (!TO_EMAIL) {
      console.error("CONTACT_TO_EMAIL is not set; contact form cannot deliver");
      return {
        success: false,
        error: "Contact is temporarily unavailable. Please reach out on LinkedIn.",
      };
    }

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Name, email, and message are required",
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>",
      to: [TO_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error, null, 2));
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error) || "Failed to send email";
      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
}

"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const { name, email, phone, message } = formData;

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
      to: ["daveyreno86@gmail.com"],
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

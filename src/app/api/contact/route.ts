import { NextResponse } from "next/server";

// Simple HTML/XSS tag stripper
function sanitizeInput(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .trim();
}

// Basic email validator
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      message,
      honeypot, // Hidden security check field
    } = body;

    // 1. Honeypot Anti-Spam Check: If the honeypot field is filled, reject the request
    if (honeypot && honeypot.length > 0) {
      console.warn("Spam attempt blocked via Honeypot check:", { honeypot });
      // Return 200 to confuse bots, or 400. 400 is fine, but returning success is a common technique to sink spam without revealing the protection.
      // Let's return a success message so spam bots stop trying, but we don't process it.
      return NextResponse.json(
        { success: true, message: "Spam block triggered successfully." },
        { status: 200 }
      );
    }

    // 2. Server-side Validation
    const errors: Record<string, string> = {};

    const sanitizedFirstName = sanitizeInput(firstName);
    const sanitizedLastName = sanitizeInput(lastName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedCountry = country ? sanitizeInput(country.value) : "";
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedFirstName || sanitizedFirstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters.";
    }
    if (!sanitizedLastName || sanitizedLastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters.";
    }
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!sanitizedPhone || sanitizedPhone.length < 8) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!sanitizedCountry) {
      errors.country = "Please select a country.";
    }
    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors, message: "Validation failed on the server." },
        { status: 400 }
      );
    }

    // Log the secure, validated submission
    console.log("Secure contact form submission received:", {
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      country: sanitizedCountry,
      company: sanitizedCompany,
      message: sanitizedMessage,
      submittedAt: new Date().toISOString(),
    });

    // In a real application, you would send an email here using nodemailer, SendGrid, Resend, or standard smtp.
    // For now, we simulate a successful database/email sending operation.
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      {
        success: true,
        message: "Message received and logged securely.",
        data: {
          firstName: sanitizedFirstName,
          lastName: sanitizedLastName,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in secure contact API handler:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

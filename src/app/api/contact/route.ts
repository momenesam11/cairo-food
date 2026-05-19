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
      first_name,
      lastName,
      last_name,
      email,
      phone,
      country,
      company,
      message,
      honeypot, // Hidden security check field
    } = body;

    // Support both camelCase and snake_case request parameters for maximum resilience
    const fName = firstName || first_name;
    const lName = lastName || last_name;

    // 1. Honeypot Anti-Spam Check: If the honeypot field is filled, reject/sink the request silently
    if (honeypot && honeypot.length > 0) {
      console.warn("Spam attempt blocked via Honeypot check:", { honeypot });
      return NextResponse.json(
        { success: true, message: "Spam block triggered successfully." },
        { status: 200 }
      );
    }

    // 2. Server-side Validation
    const errors: Record<string, string> = {};

    const sanitizedFirstName = sanitizeInput(fName);
    const sanitizedLastName = sanitizeInput(lName);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedCountry = country ? sanitizeInput(country.label) : "";
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedFirstName || sanitizedFirstName.length < 2) {
      errors.first_name = "First name must be at least 2 characters.";
    }
    if (!sanitizedLastName || sanitizedLastName.length < 2) {
      errors.last_name = "Last name must be at least 2 characters.";
    }
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!sanitizedPhone || sanitizedPhone.length < 8) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!country) {
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

    // 3. Prepare EmailJS Template Parameters matching Fady's template variables:
    // - name: {{name}}
    // - email: {{email}} (reply-to)
    // - title: {{title}} (subject title)
    // - time: {{time}}
    // - message: {{message}} (Formatted to pack company, phone, and country details)
    const formattedTime = new Date().toLocaleString("en-US", { 
      timeZone: "Africa/Cairo",
      dateStyle: "medium",
      timeStyle: "short"
    });

    const emailjsParams = {
      name: `${sanitizedFirstName} ${sanitizedLastName}`,
      email: sanitizedEmail,
      title: `Web Inquiry from ${sanitizedFirstName} ${sanitizedLastName} (${sanitizedCountry})`,
      time: formattedTime,
      message: `Company: ${sanitizedCompany || "N/A"}\nPhone: ${sanitizedPhone}\nCountry: ${sanitizedCountry}\n\nMessage:\n${sanitizedMessage}`
    };

    const emailjsPayload = {
      service_id: "service_5hdpxqn",
      template_id: "template_wzakcub",
      user_id: "RMVITA0-xjFRA1Tm8",
      template_params: emailjsParams,
    };

    console.log("Submitting securely to EmailJS API:", emailjsPayload);

    // Using server-side fetch to EmailJS bypasses browser CORS issues and ad-blockers!
    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(emailjsPayload),
    });

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error("EmailJS API submission failed:", errorText);
      return NextResponse.json(
        { success: false, message: "Failed to dispatch message via EmailJS. Please check credentials." },
        { status: 502 }
      );
    }

    console.log("EmailJS message dispatched successfully!");

    return NextResponse.json(
      {
        success: true,
        message: "Message processed and dispatched successfully.",
        data: {
          first_name: sanitizedFirstName,
          last_name: sanitizedLastName,
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

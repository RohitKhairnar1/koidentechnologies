import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Bulk-enquiry handler.
 *
 * Validates the submission, then delivers it however you've configured:
 *  - Email via Resend, if RESEND_API_KEY and ENQUIRY_NOTIFICATION_EMAIL are set.
 *  - A webhook (Slack, Zapier, a CRM intake endpoint, etc.), if
 *    ENQUIRY_WEBHOOK_URL is set.
 * Every submission is also logged to the server console (visible in Vercel's
 * function logs) as a fallback trace, regardless of what's configured above.
 */

interface EnquiryPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  location?: string;
  message?: string;
  productName?: string;
  productSlug?: string;
  /** Honeypot — must be empty for a genuine submission. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reject absurdly long inputs (accidental paste or abuse).
const MAX = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  quantity: 120,
  location: 160,
  message: 4000,
};

function validate(payload: EnquiryPayload): string | null {
  if (!payload.name?.trim()) return "Please provide your name.";
  if (!payload.company?.trim()) return "Please provide your company.";
  if (!payload.email?.trim() || !EMAIL_RE.test(payload.email)) {
    return "Please provide a valid email address.";
  }
  if (!payload.quantity?.trim()) return "Please provide the quantity required.";
  if (!payload.message?.trim()) return "Please describe your requirements.";

  for (const [field, limit] of Object.entries(MAX) as [keyof typeof MAX, number][]) {
    const value = payload[field];
    if (typeof value === "string" && value.length > limit) {
      return `The ${field} field is too long.`;
    }
  }
  return null;
}

function enquiryEmailHtml(enquiry: EnquiryPayload & { receivedAt: string }): string {
  const rows: [string, string | undefined][] = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Quantity", enquiry.quantity],
    ["Location", enquiry.location],
    ["Product", enquiry.productName],
    ["Received", enquiry.receivedAt],
  ];
  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;">${label}</td><td style="padding:4px 0;">${value}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="margin-bottom:16px;">New Bulk Enquiry</h2>
      <table>${rowsHtml}</table>
      <p style="margin-top:16px;white-space:pre-wrap;"><strong>Message:</strong><br/>${enquiry.message ?? ""}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: EnquiryPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: a genuine user never fills this. Silently accept so bots can't
  // distinguish success from rejection, but don't process or forward it.
  if (payload.website && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 422 });
  }

  const enquiry = {
    ...payload,
    receivedAt: new Date().toISOString(),
  };

  // Always leave a trace in the function logs.
  console.log("[enquiry]", JSON.stringify(enquiry));

  // Send an email notification if Resend is configured.
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ENQUIRY_NOTIFICATION_EMAIL;
  if (resendApiKey && notifyEmail) {
    try {
      const resend = new Resend(resendApiKey);
      const fromAddress =
        process.env.ENQUIRY_FROM_EMAIL || "Koiden Enquiries <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: notifyEmail,
        replyTo: enquiry.email,
        subject: `New enquiry from ${enquiry.company ?? enquiry.name}`,
        html: enquiryEmailHtml(enquiry),
      });
      if (error) {
        console.error("[enquiry] resend error", error);
      }
    } catch (err) {
      console.error("[enquiry] email error", err);
      // Don't fail the user's submission if email sending fails — it's logged.
    }
  }

  // Forward to a webhook if one is configured.
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!res.ok) {
        console.error("[enquiry] webhook responded", res.status);
      }
    } catch (err) {
      console.error("[enquiry] webhook error", err);
      // Don't fail the user's submission if the webhook is down — it's logged.
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
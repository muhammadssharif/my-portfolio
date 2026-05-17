import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const requestLog = new Map<string, number[]>();

function getClientAddress(request: Request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function withinLimit(clientKey: string) {
  const now = Date.now();
  const existing = requestLog.get(clientKey) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    requestLog.set(clientKey, recent);
    return false;
  }

  recent.push(now);
  requestLog.set(clientKey, recent);
  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      company?: string;
    };

    if (body.company) {
      return NextResponse.json({ message: "Message accepted." }, { status: 200 });
    }

    const clientAddress = getClientAddress(request);
    if (!withinLimit(clientAddress)) {
      return NextResponse.json({ message: "Too many requests. Try again in a few minutes." }, { status: 429 });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All input fields are required." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER ?? process.env.GMAIL_E;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD ?? process.env.GMAIL_P;

    if (!gmailUser || !gmailPassword) {
      return NextResponse.json({ message: "Email service is not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      subject: `Portfolio message from ${name} (${email}): ${subject}`,
      text: message
    });

    return NextResponse.json({ message: "Email sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("sendEmail route error", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}

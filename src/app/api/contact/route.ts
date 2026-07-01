import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  preferredContactMethod?: string;
};

const MAX_FIELD_LENGTH = 160;

function normalizeField(value: string | undefined) {
  return value?.trim().slice(0, MAX_FIELD_LENGTH) ?? "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = normalizeField(body?.name);
  const phone = normalizeField(body?.phone);
  const preferredContactMethod = normalizeField(body?.preferredContactMethod);

  if (!name || !phone || !preferredContactMethod) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Contact delivery is not configured" },
      { status: 503 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      preferredContactMethod,
      submittedAt: new Date().toISOString(),
    }),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json(
      { ok: false, error: "Contact delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

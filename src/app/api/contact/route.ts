import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  preferredContactMethod?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null;

  const name = body?.name?.trim() ?? "";
  const phone = body?.phone?.trim() ?? "";
  const preferredContactMethod = body?.preferredContactMethod?.trim() ?? "";

  if (!name || !phone || !preferredContactMethod) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.info("Contact form submission", {
    name,
    phone,
    preferredContactMethod,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

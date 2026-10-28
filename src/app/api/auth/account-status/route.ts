import { NextResponse } from "next/server";

/**
 * Previously reported whether an email was registered. That leaked account
 * existence to anyone who could POST here. Login now always shows a generic
 * "Invalid email or password" message.
 */
export async function POST() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

import { Config } from "sst/node/config";
import { NextResponse } from "next/server";
import * as db from "@/app/lib/db";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function POST(request) {
  const contentType = await request.headers.get("content-type");
  if (contentType != "application/json") {
    return NextResponse.json(
      { message: "Invalid content type" },
      { status: 415 }
    );
  }
  const data = await request.json();
  const { email } = data;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  const leadResult = await db.addLead({ email });
  return NextResponse.json({ leadResult, status: 201 });
}

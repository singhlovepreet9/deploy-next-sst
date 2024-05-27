import { Config } from "sst/node/config";
import { NextResponse } from "next/server";
import { addLead, dbNow } from "@/app/lib/db";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request) {
  const secretVal = Config.SECRET_VAL;
  const stage = Config.STAGE;
  const dbString = Config.DATABASE_URL;

  const leadResult = await addLead({ email: "abc1234@abc.com" });
  const now = await dbNow();
  return NextResponse.json(
    {
      hello: " world",
      stage: stage,
      secretVal,
      dbString: dbString.slice(0, 20),
      now,
      leadResult,
    },
    { status: 200 }
  );
}

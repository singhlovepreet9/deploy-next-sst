import { Config } from "sst/node/config";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/app/models/schema";
export async function dbClient(useSQLOnly) {
  const sql = neon(Config.DATABASE_URL);
  if (useSQLOnly) {
    return sql;
  }

  return drizzle(sql);
}

export async function dbNow() {
  const sql = await dbClient(true);
  return sql`SELECT NOW()`;
}

export async function addLead({ email }) {
  const db = await dbClient(false);
  const dbResult = await db
    .insert(schema.LeadTable)
    .values({ email })
    .returning({ created: schema.LeadTable.createdAt });

  if (dbResult.length === 1) {
    return dbResult[0].created;
  }
}

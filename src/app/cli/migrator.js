import getSecret from "../lib/secrets";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import * as schema from "../models/schema";
import ws from "ws";

async function performMigration() {
  const dbUrl = await getSecret("DATABASE_URL");
  if (!dbUrl) {
    console.log("DATABASE_URL not found");
    process.exit(1);
  }

  // connect to neon via websocket

  neonConfig.webSocketConstructor = ws; // <-- this is the key bit

  const pool = new Pool({ connectionString: dbUrl });
  pool.on("error", (err) => console.error(err)); // deal with e.g. re-connect
  // ...

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "src/migrations" });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  // ...
  await pool.end();
}
if (require.main === module) {
  console.log("Migration started");
  performMigration()
    .then(() => {
      console.log("Migration performed");
    })
    .catch((err) => {
      console.log("err", err);
      process.exit(1);
    });
}

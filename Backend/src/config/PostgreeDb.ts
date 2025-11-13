import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL Database");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection error:", error);
    process.exit(1);
  }
};

export default pool;
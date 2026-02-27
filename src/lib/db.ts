import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pasteBin",
  password: "Praveen-26@814444.",
  port: 5432,
});

export default pool;

import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function querySQL(query: string, params?: any[]) {
  await client.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (err) {
    console.error('SQL query error:', err);
    throw err;
  } finally {
    await client.end();
  }
}

// Example usage:
// const users = await querySQL('SELECT * FROM users WHERE status = $1', ['active']);

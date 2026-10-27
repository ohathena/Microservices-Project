const { Pool } = require('pg');
const { DB_URL } = require('../config');

let pool = null;

const getPool = () => {
  if (!pool) {
    if (!DB_URL) {
      console.warn("⚠️ Warning: DATABASE_URL is not set. Please provide a Neon DB connection string in .env");
    }
    pool = new Pool({
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
    });
  }
  return pool;
};

const query = async (text, params) => {
  const p = getPool();
  return await p.query(text, params);
};

const databaseConnection = async () => {
  try {
    if (!DB_URL) {
      console.log('⚠️ DATABASE_URL not found in environment. Database connection skipped.');
      return;
    }

    const client = await getPool().connect();
    console.log('✅ Connected to Neon PostgreSQL Database successfully!');

    // Initialize Schema
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        salt VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS addresses (
        id VARCHAR(255) PRIMARY KEY,
        customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE CASCADE,
        street VARCHAR(255),
        postal_code VARCHAR(50),
        city VARCHAR(100),
        country VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id VARCHAR(255) PRIMARY KEY,
        customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE CASCADE,
        product_id VARCHAR(255) NOT NULL,
        product JSONB NOT NULL,
        unit INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS wishlist_items (
        id VARCHAR(255) PRIMARY KEY,
        customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE CASCADE,
        product_id VARCHAR(255) NOT NULL,
        product JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE CASCADE,
        amount VARCHAR(100),
        order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    client.release();
    console.log('✅ PostgreSQL Tables verified & ready (customers, addresses, cart, wishlist, orders).');
  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL DB:');
    console.error(error.message);
  }
};

module.exports = {
  databaseConnection,
  getPool,
  query,
};

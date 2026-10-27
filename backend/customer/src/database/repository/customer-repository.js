const crypto = require('crypto');
const { query } = require('../connection');

// Dealing with PostgreSQL database operations
class CustomerRepository {

  async CreateCustomer({ name, email, password, phone, salt }) {
    const id = crypto.randomUUID();
    const customerName = name || '';

    const text = `
      INSERT INTO customers (id, name, email, password, salt, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, phone, created_at;
    `;
    const params = [id, customerName, email, password, salt, phone];

    const result = await query(text, params);
    const row = result.rows[0];

    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: [],
      cart: [],
      wishlist: [],
      orders: [],
    };
  }

  async FindCustomer({ email }) {
    const text = `
      SELECT * FROM customers 
      WHERE LOWER(email) = LOWER($1) 
      LIMIT 1;
    `;
    const result = await query(text, [email]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      salt: row.salt,
      phone: row.phone,
    };
  }

  async FindCustomerById({ id }) {
    const customerText = `SELECT * FROM customers WHERE id = $1 LIMIT 1;`;
    const customerResult = await query(customerText, [id]);

    if (customerResult.rows.length === 0) return null;
    const row = customerResult.rows[0];

    // Fetch related records
    const addressesResult = await query(
      `SELECT id as _id, street, postal_code as "postalCode", city, country FROM addresses WHERE customer_id = $1;`,
      [id]
    );

    const cartResult = await query(
      `SELECT product_id, product, unit FROM cart_items WHERE customer_id = $1;`,
      [id]
    );

    const wishlistResult = await query(
      `SELECT product FROM wishlist_items WHERE customer_id = $1;`,
      [id]
    );

    const ordersResult = await query(
      `SELECT id as _id, amount, order_date as date FROM orders WHERE customer_id = $1;`,
      [id]
    );

    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      address: addressesResult.rows,
      cart: cartResult.rows.map((c) => ({
        product: c.product,
        unit: c.unit,
      })),
      wishlist: wishlistResult.rows.map((w) => w.product),
      orders: ordersResult.rows,
    };
  }

  async CreateAddress({ _id, street, postalCode, city, country }) {
    const addressId = crypto.randomUUID();
    const text = `
      INSERT INTO addresses (id, customer_id, street, postal_code, city, country)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, street, postal_code as "postalCode", city, country;
    `;
    await query(text, [addressId, _id, street, postalCode, city, country]);

    return await this.FindCustomerById({ id: _id });
  }

  async Wishlist(customerId) {
    const result = await query(
      `SELECT product FROM wishlist_items WHERE customer_id = $1;`,
      [customerId]
    );
    return result.rows.map((r) => r.product);
  }

  async AddWishlistItem(customerId, product) {
    const productId = product._id ? product._id.toString() : crypto.randomUUID();

    // Check if exists
    const checkText = `SELECT id FROM wishlist_items WHERE customer_id = $1 AND product_id = $2;`;
    const checkResult = await query(checkText, [customerId, productId]);

    if (checkResult.rows.length > 0) {
      // Remove
      await query(`DELETE FROM wishlist_items WHERE customer_id = $1 AND product_id = $2;`, [
        customerId,
        productId,
      ]);
    } else {
      // Add
      const id = crypto.randomUUID();
      await query(
        `INSERT INTO wishlist_items (id, customer_id, product_id, product) VALUES ($1, $2, $3, $4);`,
        [id, customerId, productId, JSON.stringify(product)]
      );
    }

    return await this.Wishlist(customerId);
  }

  async AddCartItem(customerId, product, qty, isRemove) {
    const productId = product._id ? product._id.toString() : crypto.randomUUID();

    if (isRemove) {
      await query(`DELETE FROM cart_items WHERE customer_id = $1 AND product_id = $2;`, [
        customerId,
        productId,
      ]);
    } else {
      const checkText = `SELECT id FROM cart_items WHERE customer_id = $1 AND product_id = $2;`;
      const checkResult = await query(checkText, [customerId, productId]);

      if (checkResult.rows.length > 0) {
        await query(
          `UPDATE cart_items SET unit = $3 WHERE customer_id = $1 AND product_id = $2;`,
          [customerId, productId, qty]
        );
      } else {
        const id = crypto.randomUUID();
        await query(
          `INSERT INTO cart_items (id, customer_id, product_id, product, unit) VALUES ($1, $2, $3, $4, $5);`,
          [id, customerId, productId, JSON.stringify(product), qty]
        );
      }
    }

    return await this.FindCustomerById({ id: customerId });
  }

  async AddOrderToProfile(customerId, order) {
    const orderId = order._id || crypto.randomUUID();
    const amount = order.amount ? order.amount.toString() : '0';

    await query(
      `INSERT INTO orders (id, customer_id, amount) VALUES ($1, $2, $3);`,
      [orderId, customerId, amount]
    );

    // Clear cart upon order creation
    await query(`DELETE FROM cart_items WHERE customer_id = $1;`, [customerId]);

    return await this.FindCustomerById({ id: customerId });
  }
}

module.exports = CustomerRepository;

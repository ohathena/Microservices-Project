const nodemailer = require("nodemailer");
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM,
} = require("../config");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth:
    SMTP_USER && SMTP_PASSWORD
      ? {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        }
      : undefined,
});

function welcomeEmailTemplate({ name }) {
  return {
    subject: "Welcome to Cradle Store!",
    html: `
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining Cradle.</p>
          <p>Your account is ready to use.</p>
        </body>
      </html>`,
  };
}

function orderConfirmationEmailTemplate({ name, order }) {
    const items = Array.isArray(order.items) ? order.items : [];
    const itemRows = items
        .map(({ product, unit }) => `
          <tr>
            <td>${product?.name || "Product"}</td>
            <td>${unit || 0}</td>
            <td>${product?.price || 0}</td>
          </tr>`)
        .join("");

    return {
        subject: `Order confirmation - ${order.orderId || "Cradle Store"}`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Thank you for your order, ${name}!</h2>
              <p>Your order <strong>${order.orderId || "has been received"}</strong> has been received.</p>
              <p>Total: <strong>${order.amount || 0}</strong></p>
              ${itemRows ? `
                <table border="1" cellpadding="8" cellspacing="0">
                  <thead>
                    <tr><th>Product</th><th>Quantity</th><th>Price</th></tr>
                  </thead>
                  <tbody>${itemRows}</tbody>
                </table>` : ""}
            </body>
          </html>`,
    };
}

async function sendEmail({ to, subject, html }) {
    await transporter.sendMail({
        from: MAIL_FROM,
        to,
        subject,
        html,
    });
}

async function handleMailEvent(payload) {
    const { event, data } = payload;

    switch (event) {
        case "USER_REGISTERED": {
            if (!data || !data.to) {
                throw new Error("Missing recipient email");
            }

            const template = welcomeEmailTemplate({ name: data.name || "Customer",});

            await sendEmail({
                to: data.to,
                subject: template.subject,
                html: template.html,
            });

            return;
        }

        case "ORDER_CREATED": {
            if (!data || !data.to || !data.order) {
                throw new Error("Missing order email data");
            }

            const template = orderConfirmationEmailTemplate({
                name: data.name || "Customer",
                order: data.order,
            });

            await sendEmail({
                to: data.to,
                subject: template.subject,
                html: template.html,
            });

            return;
        }

        default:
            console.log(`No email template for event: ${event}`);
            return;
    }
}

module.exports = { handleMailEvent };

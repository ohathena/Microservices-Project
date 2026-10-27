## Running the project

The project contains a React frontend and backend services for customers and
products. The customer service uses Neon PostgreSQL; the products service uses
MongoDB; RabbitMQ is used for service events.

1. Start Docker Desktop.
2. From `backend`, start the services:

   ```powershell
   docker compose up --build
   ```

3. In a second terminal, start the frontend:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

The frontend is available at `http://localhost:5173`. Health endpoints are:

- `http://localhost/customer/whoami`
- `http://localhost/products/whoami`

The products API is available through Nginx at `/products` and directly on
port `8002`.
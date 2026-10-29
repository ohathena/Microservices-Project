const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const { startConsumer } = require("./messaging/consumer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/whoami", (req, res) => {
  return res
    .status(200)
    .json({
      service: "Mail Service",
      status: "Mail Service is healthy",
    });
});

async function startServer() {
  try {
    await startConsumer();
    app.listen(PORT, () => {
      console.log(`Mail Service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Mail Service startup failed:", error.message);
    process.exitCode = 1;
  }
}

startServer();

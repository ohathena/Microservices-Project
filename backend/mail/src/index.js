const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");

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

app.listen(PORT, () => {
  console.log(`Mail Service is running on port ${PORT}`);
});

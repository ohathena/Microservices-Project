const express = require("express");
const cors = require("cors");
const { products, appEvents } = require("./api");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  // appEvents(app);

  const channel = await CreateChannel();
  products(app, channel);

  app.use((err, req, res, next) => {
    console.error("Products service error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });
};

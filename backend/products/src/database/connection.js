const mongoose = require("mongoose");
const { DB_URL } = require("../config");

module.exports = async () => {
  try {
    if (!DB_URL) {
      throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Db Connected");
    console.log("Products database connected");
  } catch (error) {
    console.error("Products database connection failed:", error.message);
    throw error;
  }
};

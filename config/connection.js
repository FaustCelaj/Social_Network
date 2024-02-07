const mongoose = require("mongoose");

const uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/social_network";

mongoose.connect(uri).catch((err) => {
  console.error("Initial MongoDB connection error:", err);
});

mongoose.set("debug", true);

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
  console.log("MongoDB connected successfully");
});

module.exports = connection;

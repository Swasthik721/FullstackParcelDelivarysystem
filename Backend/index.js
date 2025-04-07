const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

// Database connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
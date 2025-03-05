require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = rquire("./routes/user")
const PARCELRoute = rquire("./routes/parcel")

const app = express();
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/parcels", parcelRoute)

// Debugging: Check if DB is loaded
console.log("DB URI:", process.env.DB);

const DB = process.env.DB;
if (!DB) {
  throw new Error("Database connection string is missing in .env file");
}

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("DB Connection Error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

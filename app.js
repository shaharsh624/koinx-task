const express = require("express");
const mongoose = require("mongoose");
const { scheduleCryptoDataFetch } = require("./services/cronJobs");
const cryptoRoutes = require("./routes/cryptoRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api", cryptoRoutes);

// Start the cron job for background data fetching
scheduleCryptoDataFetch();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

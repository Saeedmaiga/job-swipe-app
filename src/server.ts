import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB";
import routes from "./index"; // Centralized route imports

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allows requests from any frontend during development
    credentials: true,
  })
);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Job Swipe API is running...");
});

// API Routes
app.use("/api", routes);

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB connection error", err);
    process.exit(1); // Exit process on DB connection failure
  });

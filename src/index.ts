import express from "express";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/jobs";
import swipeRoutes from "./routes/swipe";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/swipe", swipeRoutes);

export default router;

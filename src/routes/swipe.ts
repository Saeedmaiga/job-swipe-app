import express from "express";
import { swipeRight, swipeLeft, getSwipedJobs } from "../controllers/swipeControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply middleware only to protected route
router.post("/right", authMiddleware, swipeRight);
router.post("/left", authMiddleware, swipeLeft);
router.get("/history/:userId", authMiddleware, getSwipedJobs); // Ensure `userId` is part of params

export default router;

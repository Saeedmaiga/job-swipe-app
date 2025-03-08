import express from "express";
import { fetchJobs, getAllJobs } from "../controllers/jobControllers";

const router = express.Router();

router.get("/fetch", fetchJobs);
router.get("/all", getAllJobs);

export default router;

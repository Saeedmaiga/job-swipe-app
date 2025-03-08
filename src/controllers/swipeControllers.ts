import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/userModel";
import Job from "../models/jobModel";

// Extend Request interface
interface AuthRequest extends Request {
  user?: { id: string };
}

// ✅ User swipes right (Interested)
export const swipeRight = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      res.status(404).json({ msg: "Job not found" });
      return;
    }

    if (!user.swipedJobs) {
      user.swipedJobs = [];
    }

    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    // ✅ Convert `id` to `ObjectId` before comparison
    if (!user.swipedJobs.some((id) => id.toString() === jobObjectId.toString())) {
      user.swipedJobs.push(jobObjectId);
      await user.save();
    }

    res.json({ msg: "Job saved as interested!", swipedJobs: user.swipedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// ✅ User swipes left (Pass)
export const swipeLeft = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, jobId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    if (!user.swipedJobs) {
      user.swipedJobs = [];
    }

    // ✅ Convert `id` to `ObjectId` before filtering
    user.swipedJobs = user.swipedJobs.filter((id) => id.toString() !== jobObjectId.toString());
    await user.save();

    res.json({ msg: "Job passed!", swipedJobs: user.swipedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// ✅ Get a user's swiped jobs (Interested Jobs)
export const getSwipedJobs = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate({
      path: "swipedJobs",
      select: "title company location jobUrl",
    });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    res.json({ swipedJobs: user.swipedJobs || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

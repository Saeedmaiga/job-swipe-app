import { Request, Response } from "express";
import axios from "axios";
import Job from "../models/jobModel";

// Fetch jobs from external API and save to MongoDB
export const fetchJobs = async (req: Request, res: Response) => {
  const { location } = req.query;

  try {
    const response = await axios.get(`https://arbeitnow.com/api/job-board-api`, {
      params: { location },
    });

    const jobs = response.data.jobs.map((job: any) => ({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      jobUrl: job.url,
      source: "Indeed",
    }));

    await Job.insertMany(jobs);
    res.json({ msg: "Jobs fetched and saved!", jobs });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching jobs", error });
  }
};

// Get all saved jobs from MongoDB
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching jobs", error });
  }
};

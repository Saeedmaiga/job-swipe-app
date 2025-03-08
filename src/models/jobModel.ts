import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a Job document
interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  jobUrl: string;
  source: string;
}

// Mongoose schema for Job
const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  jobUrl: { type: String, required: true }, // Link to job posting
  source: { type: String, required: true }, // E.g., "Indeed", "LinkedIn"
});

export default mongoose.model<IJob>("Job", JobSchema);

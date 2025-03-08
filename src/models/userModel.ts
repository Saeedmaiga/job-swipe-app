import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  preferences?: string;
  resume?: string;
  swipedJobs?: mongoose.Types.ObjectId[]; // ✅ Change to ObjectId[]
}

// Mongoose schema for a User document
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  preferences: { type: Object, default: {} },
  resume: { type: String, default: "" },
  swipedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job", default: [] }],
});

export default mongoose.model<IUser>("User", UserSchema);

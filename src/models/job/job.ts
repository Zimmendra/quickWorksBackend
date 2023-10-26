import mongoose, { Schema, Document } from 'mongoose';
import { Status } from '../../utils/types/IPayload';
interface JobDocument extends Document {
  customerId: mongoose.Schema.Types.ObjectId;
  location: string;
  jobType: string;
  JobHeading:string;
  jobDescription: string;
  jobStatus: string;
  dateOfCompletion: Date | null;
  timeOfArrival: string | null;
  workerId: mongoose.Schema.Types.ObjectId | null;
  bringGood: boolean | null;
  paymentAmount: number;
  // items: [] | null;
}

const JobSchema = new Schema<JobDocument>(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobStatus: { type: String, default: Status.AVAILABLE }, // Default to "Available"
    dateOfCompletion: { type: Date, default: null }, // Default to null
    timeOfArrival: { type: String, default: null }, // Default to null
    workerId: { type: mongoose.Schema.Types.ObjectId, default: null }, // Default to null
    bringGood: { type: Boolean, default: null }, // Default to null
    paymentAmount: { type: Number, default: 0.0 }, // Default to 0.0
  },
  { timestamps: true }
);

const JobModel = mongoose.model<JobDocument>('Job', JobSchema);

export { JobModel };

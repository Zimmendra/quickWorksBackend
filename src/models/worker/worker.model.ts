import mongoose from 'mongoose';
import { WorkerStatus } from './IWorker';

const Schema = mongoose.Schema;

const WorkerSchema = new Schema(
  {
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    qualifications: {
      education: {
        type: String,
      },
      experience: {
        type: String,
      },
      recommendation: {
        type: String,
      },
    },
    status: {
      type: String,
      default: WorkerStatus.PENDING,
    },
    bank: {
      type: String,
    },
    accNo: {
      type: String,
    }
  },
  { timestamps: false },
);

const Worker = mongoose.model('Worker', WorkerSchema);
export default Worker;

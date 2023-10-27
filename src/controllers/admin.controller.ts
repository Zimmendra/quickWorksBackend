import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IWorker } from '../models/worker/IWorker';
import workerModel from "../models/worker/worker.model";
import WorkerService from '../services/admin.service';

//Get pending workers.
const getAllWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await WorkerService.getPendingWorkers(); // Exclude the 'password' field
    if (workers && workers.length > 0) {

      res.status(200).json({ workers });
    } else {
      res.status(404).json({ message: 'No budget requests found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};

//get active and dectivate workers
const getAllNonPendingWorkers = async (req: Request, res: Response) => {
  try {
    const nonPendingWorkers = await WorkerService.getNonPendingWorkers(); // Exclude the 'password' field
    if (nonPendingWorkers && nonPendingWorkers.length > 0) {
      res.status(200).json({ workers: nonPendingWorkers });
    } else {
      res.status(404).json({ message: 'No workers with active or deactive status found' });
    }
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};


const getWorkerById = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;

    const user = await WorkerService.getWorkerById(workerId);

    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ err: err.message });
  }
};
  
 

// const addWorker = async (req: Request, res: Response) => {
//   try {
//     const workerData = req.body;
//     const newWorker = await workerModel.create(workerData);
//     res.status(201).json(newWorker);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };

const addWorker = async (req: Request, res: Response) => {
  try {
    const { education, experience, recommendation, ...restOfData } = req.body;
    const workerData = {
      ...restOfData,
      qualifications: {
        education,
        experience,
        recommendation,
      },
    };
    const newWorker = await workerModel.create(workerData);
    res.status(201).json(newWorker);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};



const updateWorker = async (req: Request, res: Response) => {
  try {
    const {id, status} = req.body;
    const updatedWorker = await WorkerService.updateWorker(id, status);
    res.status(200).json(updatedWorker);
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

const deleteWorker = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
// Check if 'id' is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const deletedWorker = await workerModel.findByIdAndDelete(id);
    if (deletedWorker) {
      res.status(200).json({ message: 'Worker deleted' });
    } else {
      res.status(404).json({ message: 'Worker not found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendPassword = (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    console.log(password, email);
    WorkerService.sendWorkerByEmail(password, email);

    res.status(401).send('Password Send via Email');
  } catch (err: any) {
    res.status(401).send({ err: err });
  }
};

export default {
  getAllWorkers,getAllNonPendingWorkers,getWorkerById,addWorker,deleteWorker,updateWorker,sendPassword};

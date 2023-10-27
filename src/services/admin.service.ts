// services/adminServices.ts
import { IWorker } from '../models/worker/IWorker';
import WorkerModel from '../models/worker/worker.model';
import nodemailer from 'nodemailer';


//get pending worker
  async function getPendingWorkers(): Promise<any> {
    try {
      // Use the find method with a filter condition to get workers with status 'pending'
      const pendingWorkers = await WorkerModel.find({ status: 'pending' }).select('-password');
      return pendingWorkers;
    } catch (error) {
      // Handle errors here, e.g., log the error and return a custom error message.
      throw error;
    }
  }

  //get activated and deactivated workers
  async function getNonPendingWorkers(): Promise<any> {
    try {
      // Use the find method with a filter condition to get workers with a status other than 'pending'
      const nonPendingWorkers = await WorkerModel.find({ status: { $ne: 'pending' } }).select('-password');
      return nonPendingWorkers;
    } catch (error) {
      // Handle errors here, e.g., log the error and return a custom error message.
      throw error;
    }
  }
  
  
  
  
  //get  workerby Id
    const getWorkerById = async (id:string) =>{
    try {
      const worker = await WorkerModel.findById(id);
  
      return worker;
    } catch (err) {
      throw err;
    }
  }

  // async function addWorker(worker: IWorker): Promise<any> {
  //   try {
  //     const newWorker = await WorkerModel.create(worker);
  //     return newWorker;
  //   } catch (error) {
  //     console.error('Error in addWorker:', error);
  //     throw new Error('Failed to add worker');
  //   }
  // }

  async function addWorker(worker: IWorker): Promise<any> {
    try {
      // Create a new worker document with qualifications subdocument
      const newWorker = await WorkerModel.create({
        ...worker,
        qualifications: {
          education: worker.qualifications.education,
          experience: worker.qualifications.experience,
          recommendation: worker.qualifications.recommendation,
        },
      });
      return newWorker;
    } catch (error) {
      console.error('Error in addWorker:', error);
      throw new Error('Failed to add worker');
    }
  }
  
//change worker status
   const updateWorker=async(id: string, status: IWorker)=>{
    try {
      const worker = await WorkerModel.updateOne(
        { _id: id },
        { status: status }
        );
            
      return { res: 'Updated' };
    } catch (err: any) {
      throw err;
    }
  };

  //delete worker
  async function deleteWorker(id: string): Promise<boolean> {
    try {
      const result = await WorkerModel.findByIdAndDelete(id);
      
      if (!result) {
        throw new Error('Worker not found');
      }
      
      return true;
    } catch (err) {
      throw err; // You can rethrow the error if you want to handle it elsewhere in your code
    }
  }
  

  const sendWorkerByEmail = (password: string, email: string) => {
    try {
      console.log(process.env.EMAIL_PASS);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      let mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: `Worker account created,`,
        text: 'Your account hs been created. Password: ${password}',
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent : ', info.response);
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  };

export default {getPendingWorkers,getNonPendingWorkers,getWorkerById,addWorker,deleteWorker,updateWorker,sendWorkerByEmail};

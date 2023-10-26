import { JobModel } from '../models/job/job';
import { Status } from '../utils/types/IPayload';

async function createJob(jobData: any): Promise<any> {
  try {
    return await JobModel.create(jobData);
  } catch (err) {
    throw err;
  }
}

async function getJobById(jobId: string): Promise<any> {
  try {
    return await JobModel.findById(jobId);
  } catch (err) {
    throw err;
  }
}

async function getJobsByStatusAndId(workerId: string, status: string): Promise<any[]> {
  try {
    return await JobModel.find({ workerId: workerId, jobStatus: status });
  } catch (err) {
    throw err;
  }
}

async function getJobsByWorkerId(workerId: number): Promise<any[]> {
  try {
   
    return await JobModel.find({ workerId: workerId });
  } catch (err) {
    throw err;
  }
}

async function updateJob(jobId: string, updatedData: any): Promise<any> {
  try {
    //getByid(updata by id)
    
    const updatedJob = await JobModel.findByIdAndUpdate(jobId, updatedData, {
      new: true,
    });

    if (!updatedJob) {
      throw new Error('Job not found');
    }
    return updatedJob;
  } catch (err) {
    throw err;
  }
}

async function deleteJob(jobId: string): Promise<boolean> {
  try {
    const deletedJob = await JobModel.findByIdAndDelete(jobId);

    if (!deletedJob) {
      throw new Error('Job not found');
    }

    return true;
  } catch (err) {
    throw err;
  }
}
async function getJobsByStatusAndIdAndWorkerid(workerId: number, status: string): Promise<any[]> {
    try {
      return await JobModel.find({ workerId: workerId, jobStatus: status });
    } catch (err) {
      throw err;
    }
  }

  async function getJobsforAvalibleScreen(jobType: string,location:string): Promise<any[]> {
    try {
      return await JobModel.find({ jobType: jobType, jobStatus: "Available",location:location});
    } catch (err) {
      throw err;
    }
  }

  async function countJobsByStatus(status: string): Promise<number> {
    try {
      return await JobModel.countDocuments({ jobStatus: status });
    } catch (err) {
      throw err;
    }
  }

  async function updateJobByToAccepted(jobId: string,workerId:string): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.jobStatus = Status.ACCEPTED;
      jobModel.workerId = workerId;
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }

  async function updateJobByToOngoing(jobId: string): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.jobStatus = Status.ONGOING;
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }

  async function updateJobByToComplete(jobId: string): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.jobStatus = Status.COMPLETED;
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }

  async function getJobsforApprovedScreen(workerId: string): Promise<any[]> {
    try {
      return await JobModel.find({ workerId: workerId,jobStatus: Status.APPROVED});
    } catch (err) {
      throw err;
    }
  }

  async function getJobsforAcceptedScreen(workerId: string): Promise<any[]> {
    try {
      return await JobModel.find({ workerId: workerId,jobStatus: Status.ACCEPTED});
    } catch (err) {
      throw err;
    }
  }
  async function getJobsforOngoingScreen(workerId: string): Promise<any[]> {
    try {
      return await JobModel.find({ workerId: workerId,jobStatus: Status.ONGOING});
    } catch (err) {
      throw err;
    }
  }
  async function getJobsforCompletedScreen(workerId: string): Promise<any[]> {
    try {
      return await JobModel.find({ workerId: workerId,jobStatus: "COMPLETED"});
    } catch (err) {
      throw err;
    }
  }

  async function updateJobNegotation(jobId: string,dateOfCompletion:Date,timeOfArrival:String,bringGood:boolean,paymentAmount:Number): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.dateOfCompletion = dateOfCompletion;
      jobModel.timeOfArrival = timeOfArrival;
      jobModel.bringGood = bringGood;
      jobModel.paymentAmount = paymentAmount;
      jobModel.jobStatus = Status.TOBEAPPROVED
    
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }
  async function updateJobNegotationFailed(jobId: string): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.dateOfCompletion = null;
      jobModel.timeOfArrival = null;
      jobModel.bringGood = null;
      jobModel.paymentAmount = 0.00;
      jobModel.jobStatus = Status.AVAILABLE;
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }

  async function updateJobByToApproved(jobId: string): Promise<any> {
    try {
      // Get the jobModel by id
      const jobModel = await getJobById(jobId);
    
      if (!jobModel) {
        throw new Error('Job not found');
      }
    
      // Update the jobStatus field
      jobModel.jobStatus = Status.APPROVED;
      
      // Use the 'await' keyword to ensure the update is complete
      const updatedJob = await JobModel.findByIdAndUpdate(jobId, jobModel, {
        new: true,
      });
      return updatedJob;
    } catch (err) {
      throw err;
    }
  }
export default {
  createJob,
  getJobById,
  getJobsByStatusAndId,
  getJobsByWorkerId,
  updateJob,
  deleteJob,
  countJobsByStatus,
  getJobsByStatusAndIdAndWorkerid,
  updateJobByToAccepted,
  getJobsforAvalibleScreen,
  updateJobByToOngoing,
  updateJobByToComplete,
  getJobsforApprovedScreen,
  getJobsforAcceptedScreen,
  getJobsforCompletedScreen,
  updateJobNegotation,
  updateJobNegotationFailed,
  getJobsforOngoingScreen,
  updateJobByToApproved
};

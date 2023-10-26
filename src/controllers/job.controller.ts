import { Request, Response } from 'express';
import jobservice from '../services/job.service';

export async function createJobController(req: Request, res: Response): Promise<void> {
  try {
    const newJob = await jobservice.createJob(req.body);
    res.json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Job creation failed' });
  }
}

export async function getJobByIdController(req: Request, res: Response): Promise<void> {
  try {
    const job = await jobservice.getJobById(req.params.jobId);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed' });
  }
} 

export async function getJobsByStatusAndIdController(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await jobservice.getJobsByStatusAndId(req.params.workerId, req.params.status);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
  }
}

export async function getJobsByWorkerIdController(req: Request, res: Response): Promise<void> {
    try {
      const workerId = parseInt(req.params.workerId, 10);
      console.log(workerId);
      if (isNaN(workerId)) {
        res.status(400).json({ error: 'Invalid workerId parameter' });
        return;
      }
      console.log(workerId);
      const jobs = await jobservice.getJobsByWorkerId(workerId);
      res.json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Job retrieval failed req.params.workerId ' +  + ''});
    }
  }

export async function updateJobController(req: Request, res: Response): Promise<void> {
  try {
    const updatedJob = await jobservice.updateJob(req.params.jobId, req.body);
    if (updatedJob) {
      res.json(updatedJob);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Job update failed' });
  }
}

export async function getJobsByStatusAndWorkerIdController(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await jobservice.getJobsByStatusAndIdAndWorkerid(
      parseInt(req.params.workerId, 10),
      req.params.status
    );
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed' });
  }
}


export async function countJobsByStatusController(req: Request, res: Response): Promise<void> {
  try {
    const count = await jobservice.countJobsByStatus(req.params.status);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Count failed' });
  }


}
export async function updateJobByToAccepted(req: Request, res: Response): Promise<void> {
  try {
    const updatedJob = await jobservice.updateJobByToAccepted(req.params.jobId,req.params.workerId);
    
    res.json(updatedJob );
  } catch (error) {
    res.status(500).json({ error: 'Count failed' });
  }
}

export async function updateJobByToOngoing(req: Request, res: Response): Promise<void> {
  try {
    const updatedJob = await jobservice.updateJobByToOngoing(req.params.jobId);
    
    res.json(updatedJob );
  } catch (error) {
    res.status(500).json({ error: 'Count failed' });
  }
}
export async function updateJobByToComplete(req: Request, res: Response): Promise<void> {
  try {
    const updatedJob = await jobservice.updateJobByToComplete(req.params.jobId);
    
    res.json(updatedJob );
  } catch (error) {
    res.status(500).json({ error: 'Count failed' });
  }
}
export async function getJobsforAvalibleScreen(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await jobservice.getJobsforAvalibleScreen(req.params.jobType,req.params.location);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
  }
}
export async function getJobsforAcceptedScreen(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await jobservice.getJobsforAcceptedScreen(req.params.workerId);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
  }
}
export async function getJobsforOngoingScreen(req: Request, res: Response): Promise<void> {
  try {
    
    const jobs = await jobservice.getJobsforOngoingScreen(req.params.workerId);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.workerId + '' });
  }
}
export async function getJobsforApprovedScreen(req: Request, res: Response): Promise<void> {
  try {
    const jobId: string = req.params.workerId;
    const jobs = await jobservice.getJobsforApprovedScreen(req.params.workerId);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
  }
}
export async function getJobsforCompletedScreen(req: Request, res: Response): Promise<void> {
  try {
    const jobs = await jobservice.getJobsforCompletedScreen(req.params.workerId);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Job retrieval failed ' + req.params.workerId + '' });
  }
}
export async function updateJobNegotation(req: Request, res: Response): Promise<void> {
  try {
    const jobId: string = req.params.jobId;
    const dateOfCompletion: Date = new Date(req.body.dateOfCompletion); // Assuming it's sent in the request body
    const timeOfArrival: string = req.body.timeOfArrival; // Assuming it's sent in the request body
    const bringGood: boolean = req.body.bringGood; // Assuming it's sent in the request body
    const paymentAmount: number = parseFloat(req.body.paymentAmount); // Assuming it's sent in the request body as a string

    const updatedJob = await jobservice.updateJobNegotation(
      jobId,
      dateOfCompletion,
      timeOfArrival,
      bringGood,
      paymentAmount
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
}
export async function updateJobNegotationFailed(req: Request, res: Response): Promise<void> {
  try {
    const jobId: string = req.params.jobId;
    
    const updatedJob = await jobservice.updateJobNegotationFailed(
      jobId
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
}
export async function updateJobByToApproved(req: Request, res: Response): Promise<void> {
  try {
    const jobId: string = req.params.jobId;
    
    const updatedJob = await jobservice.updateJobByToApproved(
      jobId
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
}
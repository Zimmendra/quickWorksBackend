import express from 'express';
import {
   getJobByIdController,
   createJobController,
   getJobsByStatusAndIdController,
   updateJobController,
   getJobsByStatusAndWorkerIdController,
   getJobsforAcceptedScreen,
  getJobsforApprovedScreen,
  getJobsforCompletedScreen,
  updateJobNegotation,
  updateJobNegotationFailed,
   getJobsforAvalibleScreen,
   updateJobByToAccepted,
  updateJobByToOngoing,
  updateJobByToComplete,
  getJobsforOngoingScreen,
  updateJobByToApproved
} from '../controllers/job.controller'

export const jobRouter = express.Router();


// Create a new job
jobRouter.post('/create', createJobController);

// Get a job by its ID
jobRouter.get('/:jobId', getJobByIdController);

// Get jobs by status and ID
jobRouter.get('/:workerId/:status', getJobsByStatusAndIdController);

// Update a job by its ID
jobRouter.put('/:jobId', updateJobController);

// Get jobs by status and worker ID
jobRouter.get('/workers/:workerId/:status', getJobsByStatusAndWorkerIdController);


jobRouter.get('/getJobsAvaliable/:jobType/:location', getJobsforAvalibleScreen);

jobRouter.get('/screen/accepted/:workerId', getJobsforAcceptedScreen);

// Get jobs for approved screen
jobRouter.get('/screen/approved/:workerId', getJobsforApprovedScreen);

// Get jobs for completed screen
jobRouter.get('/screen/completed/:workerId', getJobsforCompletedScreen);

jobRouter.get('/screen/ongoing/:workerId', getJobsforOngoingScreen);

// Update job negotiation
jobRouter.put('/updateNegotation/:jobId', updateJobNegotation);

// Update job negotiation failed
jobRouter.put('/updateNegotationFailed/:jobId', updateJobNegotationFailed);

jobRouter.put('/updateToAccepted/:jobId/:workerId', updateJobByToAccepted);

// Update job to "Ongoing"
jobRouter.put('/updateToOngoing/:jobId', updateJobByToOngoing);

// Update job to "Complete"
jobRouter.put('/updateToComplete/:jobId', updateJobByToComplete);

jobRouter.put('/updateToApproved/:jobId', updateJobByToApproved);

// Count jobs by status
// jobRouter.get('/count/:status', countJobsByStatusController);


export default jobRouter;

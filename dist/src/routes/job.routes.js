"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controllers/job.controller");
exports.jobRouter = express_1.default.Router();
// Create a new job
exports.jobRouter.post('/create', job_controller_1.createJobController);
// Get a job by its ID
exports.jobRouter.get('/:jobId', job_controller_1.getJobByIdController);
// Get jobs by status and ID
exports.jobRouter.get('/:workerId/:status', job_controller_1.getJobsByStatusAndIdController);
// Update a job by its ID
exports.jobRouter.put('/:jobId', job_controller_1.updateJobController);
// Get jobs by status and worker ID
exports.jobRouter.get('/workers/:workerId/:status', job_controller_1.getJobsByStatusAndWorkerIdController);
exports.jobRouter.get('/getJobsAvaliable/:jobType/:location', job_controller_1.getJobsforAvalibleScreen);
exports.jobRouter.get('/screen/accepted/:workerId', job_controller_1.getJobsforAcceptedScreen);
// Get jobs for approved screen
exports.jobRouter.get('/screen/approved/:workerId', job_controller_1.getJobsforApprovedScreen);
// Get jobs for completed screen
exports.jobRouter.get('/screen/completed/:workerId', job_controller_1.getJobsforCompletedScreen);
exports.jobRouter.get('/screen/ongoing/:workerId', job_controller_1.getJobsforOngoingScreen);
// Update job negotiation
exports.jobRouter.put('/updateNegotation/:jobId', job_controller_1.updateJobNegotation);
// Update job negotiation failed
exports.jobRouter.put('/updateNegotationFailed/:jobId', job_controller_1.updateJobNegotationFailed);
exports.jobRouter.put('/updateToAccepted/:jobId/:workerId', job_controller_1.updateJobByToAccepted);
// Update job to "Ongoing"
exports.jobRouter.put('/updateToOngoing/:jobId', job_controller_1.updateJobByToOngoing);
// Update job to "Complete"
exports.jobRouter.put('/updateToComplete/:jobId', job_controller_1.updateJobByToComplete);
exports.jobRouter.put('/updateToApproved/:jobId', job_controller_1.updateJobByToApproved);
// Count jobs by status
// jobRouter.get('/count/:status', countJobsByStatusController);
exports.default = exports.jobRouter;

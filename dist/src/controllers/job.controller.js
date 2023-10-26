"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobByToApproved = exports.updateJobNegotationFailed = exports.updateJobNegotation = exports.getJobsforCompletedScreen = exports.getJobsforApprovedScreen = exports.getJobsforOngoingScreen = exports.getJobsforAcceptedScreen = exports.getJobsforAvalibleScreen = exports.updateJobByToComplete = exports.updateJobByToOngoing = exports.updateJobByToAccepted = exports.countJobsByStatusController = exports.getJobsByStatusAndWorkerIdController = exports.updateJobController = exports.getJobsByWorkerIdController = exports.getJobsByStatusAndIdController = exports.getJobByIdController = exports.createJobController = void 0;
const job_service_1 = __importDefault(require("../services/job.service"));
function createJobController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newJob = yield job_service_1.default.createJob(req.body);
            res.json(newJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Job creation failed' });
        }
    });
}
exports.createJobController = createJobController;
function getJobByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const job = yield job_service_1.default.getJobById(req.params.jobId);
            if (job) {
                res.json(job);
            }
            else {
                res.status(404).json({ error: 'Job not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed' });
        }
    });
}
exports.getJobByIdController = getJobByIdController;
function getJobsByStatusAndIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsByStatusAndId(req.params.workerId, req.params.status);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
        }
    });
}
exports.getJobsByStatusAndIdController = getJobsByStatusAndIdController;
function getJobsByWorkerIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const workerId = parseInt(req.params.workerId, 10);
            console.log(workerId);
            if (isNaN(workerId)) {
                res.status(400).json({ error: 'Invalid workerId parameter' });
                return;
            }
            console.log(workerId);
            const jobs = yield job_service_1.default.getJobsByWorkerId(workerId);
            res.json(jobs);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Job retrieval failed req.params.workerId ' + +'' });
        }
    });
}
exports.getJobsByWorkerIdController = getJobsByWorkerIdController;
function updateJobController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedJob = yield job_service_1.default.updateJob(req.params.jobId, req.body);
            if (updatedJob) {
                res.json(updatedJob);
            }
            else {
                res.status(404).json({ error: 'Job not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Job update failed' });
        }
    });
}
exports.updateJobController = updateJobController;
function getJobsByStatusAndWorkerIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsByStatusAndIdAndWorkerid(parseInt(req.params.workerId, 10), req.params.status);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed' });
        }
    });
}
exports.getJobsByStatusAndWorkerIdController = getJobsByStatusAndWorkerIdController;
function countJobsByStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield job_service_1.default.countJobsByStatus(req.params.status);
            res.json({ count });
        }
        catch (error) {
            res.status(500).json({ error: 'Count failed' });
        }
    });
}
exports.countJobsByStatusController = countJobsByStatusController;
function updateJobByToAccepted(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedJob = yield job_service_1.default.updateJobByToAccepted(req.params.jobId, req.params.workerId);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Count failed' });
        }
    });
}
exports.updateJobByToAccepted = updateJobByToAccepted;
function updateJobByToOngoing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedJob = yield job_service_1.default.updateJobByToOngoing(req.params.jobId);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Count failed' });
        }
    });
}
exports.updateJobByToOngoing = updateJobByToOngoing;
function updateJobByToComplete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedJob = yield job_service_1.default.updateJobByToComplete(req.params.jobId);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Count failed' });
        }
    });
}
exports.updateJobByToComplete = updateJobByToComplete;
function getJobsforAvalibleScreen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsforAvalibleScreen(req.params.jobType, req.params.location);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
        }
    });
}
exports.getJobsforAvalibleScreen = getJobsforAvalibleScreen;
function getJobsforAcceptedScreen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsforAcceptedScreen(req.params.workerId);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
        }
    });
}
exports.getJobsforAcceptedScreen = getJobsforAcceptedScreen;
function getJobsforOngoingScreen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsforOngoingScreen(req.params.workerId);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.workerId + '' });
        }
    });
}
exports.getJobsforOngoingScreen = getJobsforOngoingScreen;
function getJobsforApprovedScreen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobId = req.params.workerId;
            const jobs = yield job_service_1.default.getJobsforApprovedScreen(req.params.workerId);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.jobId + '' });
        }
    });
}
exports.getJobsforApprovedScreen = getJobsforApprovedScreen;
function getJobsforCompletedScreen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield job_service_1.default.getJobsforCompletedScreen(req.params.workerId);
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: 'Job retrieval failed ' + req.params.workerId + '' });
        }
    });
}
exports.getJobsforCompletedScreen = getJobsforCompletedScreen;
function updateJobNegotation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobId = req.params.jobId;
            const dateOfCompletion = new Date(req.body.dateOfCompletion); // Assuming it's sent in the request body
            const timeOfArrival = req.body.timeOfArrival; // Assuming it's sent in the request body
            const bringGood = req.body.bringGood; // Assuming it's sent in the request body
            const paymentAmount = parseFloat(req.body.paymentAmount); // Assuming it's sent in the request body as a string
            const updatedJob = yield job_service_1.default.updateJobNegotation(jobId, dateOfCompletion, timeOfArrival, bringGood, paymentAmount);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Update failed' });
        }
    });
}
exports.updateJobNegotation = updateJobNegotation;
function updateJobNegotationFailed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobId = req.params.jobId;
            const updatedJob = yield job_service_1.default.updateJobNegotationFailed(jobId);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Update failed' });
        }
    });
}
exports.updateJobNegotationFailed = updateJobNegotationFailed;
function updateJobByToApproved(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobId = req.params.jobId;
            const updatedJob = yield job_service_1.default.updateJobByToApproved(jobId);
            res.json(updatedJob);
        }
        catch (error) {
            res.status(500).json({ error: 'Update failed' });
        }
    });
}
exports.updateJobByToApproved = updateJobByToApproved;

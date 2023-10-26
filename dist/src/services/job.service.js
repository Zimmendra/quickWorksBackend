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
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = require("../models/job/job");
const IPayload_1 = require("../utils/types/IPayload");
function createJob(jobData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.create(jobData);
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobById(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.findById(jobId);
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsByStatusAndId(workerId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: status });
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsByWorkerId(workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId });
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJob(jobId, updatedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //getByid(updata by id)
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, updatedData, {
                new: true,
            });
            if (!updatedJob) {
                throw new Error('Job not found');
            }
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteJob(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedJob = yield job_1.JobModel.findByIdAndDelete(jobId);
            if (!deletedJob) {
                throw new Error('Job not found');
            }
            return true;
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsByStatusAndIdAndWorkerid(workerId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: status });
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsforAvalibleScreen(jobType, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ jobType: jobType, jobStatus: "Available", location: location });
        }
        catch (err) {
            throw err;
        }
    });
}
function countJobsByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.countDocuments({ jobStatus: status });
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobByToAccepted(jobId, workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.jobStatus = IPayload_1.Status.ACCEPTED;
            jobModel.workerId = workerId;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobByToOngoing(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.jobStatus = IPayload_1.Status.ONGOING;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobByToComplete(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.jobStatus = IPayload_1.Status.COMPLETED;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsforApprovedScreen(workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: IPayload_1.Status.APPROVED });
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsforAcceptedScreen(workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: IPayload_1.Status.ACCEPTED });
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsforOngoingScreen(workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: IPayload_1.Status.ONGOING });
        }
        catch (err) {
            throw err;
        }
    });
}
function getJobsforCompletedScreen(workerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield job_1.JobModel.find({ workerId: workerId, jobStatus: "COMPLETED" });
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobNegotation(jobId, dateOfCompletion, timeOfArrival, bringGood, paymentAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.dateOfCompletion = dateOfCompletion;
            jobModel.timeOfArrival = timeOfArrival;
            jobModel.bringGood = bringGood;
            jobModel.paymentAmount = paymentAmount;
            jobModel.jobStatus = IPayload_1.Status.TOBEAPPROVED;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobNegotationFailed(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.dateOfCompletion = null;
            jobModel.timeOfArrival = null;
            jobModel.bringGood = null;
            jobModel.paymentAmount = 0.00;
            jobModel.jobStatus = IPayload_1.Status.AVAILABLE;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
function updateJobByToApproved(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the jobModel by id
            const jobModel = yield getJobById(jobId);
            if (!jobModel) {
                throw new Error('Job not found');
            }
            // Update the jobStatus field
            jobModel.jobStatus = IPayload_1.Status.APPROVED;
            // Use the 'await' keyword to ensure the update is complete
            const updatedJob = yield job_1.JobModel.findByIdAndUpdate(jobId, jobModel, {
                new: true,
            });
            return updatedJob;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = {
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

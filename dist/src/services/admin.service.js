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
const worker_model_1 = __importDefault(require("../models/worker/worker.model"));
const nodemailer_1 = __importDefault(require("nodemailer"));
//get pending worker
function getPendingWorkers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Use the find method with a filter condition to get workers with status 'pending'
            const pendingWorkers = yield worker_model_1.default.find({ status: 'pending' }).select('-password');
            return pendingWorkers;
        }
        catch (error) {
            // Handle errors here, e.g., log the error and return a custom error message.
            throw error;
        }
    });
}
//get activated and deactivated workers
function getNonPendingWorkers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Use the find method with a filter condition to get workers with a status other than 'pending'
            const nonPendingWorkers = yield worker_model_1.default.find({ status: { $ne: 'pending' } }).select('-password');
            return nonPendingWorkers;
        }
        catch (error) {
            // Handle errors here, e.g., log the error and return a custom error message.
            throw error;
        }
    });
}
//get  workerby Id
const getWorkerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield worker_model_1.default.findById(id);
        return worker;
    }
    catch (err) {
        throw err;
    }
});
// async function addWorker(worker: IWorker): Promise<any> {
//   try {
//     const newWorker = await WorkerModel.create(worker);
//     return newWorker;
//   } catch (error) {
//     console.error('Error in addWorker:', error);
//     throw new Error('Failed to add worker');
//   }
// }
function addWorker(worker) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a new worker document with qualifications subdocument
            const newWorker = yield worker_model_1.default.create(Object.assign(Object.assign({}, worker), { qualifications: {
                    education: worker.qualifications.education,
                    experience: worker.qualifications.experience,
                    recommendation: worker.qualifications.recommendation,
                } }));
            return newWorker;
        }
        catch (error) {
            console.error('Error in addWorker:', error);
            throw new Error('Failed to add worker');
        }
    });
}
//change worker status
const updateWorker = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield worker_model_1.default.updateOne({ _id: id }, { status: status });
        return { res: 'Updated' };
    }
    catch (err) {
        throw err;
    }
});
//delete worker
function deleteWorker(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield worker_model_1.default.findByIdAndDelete(id);
            if (!result) {
                throw new Error('Worker not found');
            }
            return true;
        }
        catch (err) {
            throw err; // You can rethrow the error if you want to handle it elsewhere in your code
        }
    });
}
const sendWorkerByEmail = (password, email) => {
    try {
        console.log(process.env.EMAIL_PASS);
        let transporter = nodemailer_1.default.createTransport({
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
            }
            else {
                console.log('Email sent : ', info.response);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = { getPendingWorkers, getNonPendingWorkers, getWorkerById, addWorker, deleteWorker, updateWorker, sendWorkerByEmail };

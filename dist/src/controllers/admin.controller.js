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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const worker_model_1 = __importDefault(require("../models/worker/worker.model"));
const admin_service_1 = __importDefault(require("../services/admin.service"));
//Get pending workers.
const getAllWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workers = yield admin_service_1.default.getPendingWorkers(); // Exclude the 'password' field
        if (workers && workers.length > 0) {
            res.status(200).json({ workers });
        }
        else {
            res.status(404).json({ message: 'No budget requests found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
//get active and dectivate workers
const getAllNonPendingWorkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nonPendingWorkers = yield admin_service_1.default.getNonPendingWorkers(); // Exclude the 'password' field
        if (nonPendingWorkers && nonPendingWorkers.length > 0) {
            res.status(200).json({ workers: nonPendingWorkers });
        }
        else {
            res.status(404).json({ message: 'No workers with active or deactive status found' });
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
const getWorkerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workerId } = req.params;
        const user = yield admin_service_1.default.getWorkerById(workerId);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ err: err.message });
    }
});
// const addWorker = async (req: Request, res: Response) => {
//   try {
//     const workerData = req.body;
//     const newWorker = await workerModel.create(workerData);
//     res.status(201).json(newWorker);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// };
const addWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { education, experience, recommendation } = _a, restOfData = __rest(_a, ["education", "experience", "recommendation"]);
        const workerData = Object.assign(Object.assign({}, restOfData), { qualifications: {
                education,
                experience,
                recommendation,
            } });
        const newWorker = yield worker_model_1.default.create(workerData);
        res.status(201).json(newWorker);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
const updateWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const updatedWorker = yield admin_service_1.default.updateWorker(id, status);
        res.status(200).json(updatedWorker);
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
});
const deleteWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if 'id' is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        const deletedWorker = yield worker_model_1.default.findByIdAndDelete(id);
        if (deletedWorker) {
            res.status(200).json({ message: 'Worker deleted' });
        }
        else {
            res.status(404).json({ message: 'Worker not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const sendPassword = (req, res) => {
    try {
        const { password, email } = req.body;
        console.log(password, email);
        admin_service_1.default.sendWorkerByEmail(password, email);
        res.status(401).send('Password Send via Email');
    }
    catch (err) {
        res.status(401).send({ err: err });
    }
};
exports.default = {
    getAllWorkers, getAllNonPendingWorkers, getWorkerById, addWorker, deleteWorker, updateWorker, sendPassword
};

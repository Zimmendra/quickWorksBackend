"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const IPayload_1 = require("../../utils/types/IPayload");
const JobSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobStatus: { type: String, default: IPayload_1.Status.AVAILABLE },
    dateOfCompletion: { type: Date, default: null },
    timeOfArrival: { type: String, default: null },
    workerId: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
    bringGood: { type: Boolean, default: null },
    paymentAmount: { type: Number, default: 0.0 }, // Default to 0.0
}, { timestamps: true });
const JobModel = mongoose_1.default.model('Job', JobSchema);
exports.JobModel = JobModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PaymentSchema = new Schema({
    holder_id: {
        type: String,
        require: true,
    },
    account_name: {
        type: String,
        require: true,
    },
    account_number: {
        type: Number,
        require: true,
    },
    bankName: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
}, { timestamps: true });
const Payment = mongoose_1.default.model('Payment', PaymentSchema);
exports.default = Payment;

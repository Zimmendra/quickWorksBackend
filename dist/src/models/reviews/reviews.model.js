"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ReviewSchema = new Schema({
    worker_id: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    },
    star_review: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
}, { timestamps: true });
const Review = mongoose_1.default.model('Review', ReviewSchema);
exports.default = Review;

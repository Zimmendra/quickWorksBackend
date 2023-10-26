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
const reviews_model_1 = __importDefault(require("../models/reviews/reviews.model"));
const createReview = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const existWorker = await workerModel.findOne({ _id: dto.worker_id });
        //   if (!existWorker) {
        //     throw 'existWorker not found';
        const review = yield reviews_model_1.default.create(dto);
        return review;
    }
    catch (err) {
        throw err;
    }
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_model_1.default.find({ user_id: id });
        return review;
    }
    catch (err) {
        throw err;
    }
});
const updateReview = (review_id, comment, star_review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_model_1.default.updateOne({ _id: review_id }, { comment: comment, star_review: star_review });
        return review;
    }
    catch (err) {
        throw err;
    }
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_model_1.default.findByIdAndDelete(id);
        return review;
    }
    catch (err) {
        throw err;
    }
});
exports.default = { createReview, getReview, updateReview, deleteReview };

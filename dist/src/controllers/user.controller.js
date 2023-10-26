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
const user_service_1 = __importDefault(require("../services/user.service"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const reviewItem = yield user_service_1.default.createReview(dto);
        res.status(200).json(reviewItem);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const reviews = yield user_service_1.default.getReview(user_id);
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id, comment, star_review } = req.body;
        const reviews = yield user_service_1.default.updateReview(review_id, comment, star_review);
        res.status(200).json({ msg: 'Updated', reviews });
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id } = req.params;
        const reviews = yield user_service_1.default.deleteReview(review_id);
        res.status(200).json({ msg: 'deleted', reviews });
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
exports.default = { createReview, getReview, updateReview, deleteReview };

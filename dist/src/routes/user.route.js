"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
exports.userRoute = (0, express_1.Router)();
// Route needed
exports.userRoute.post('/createReview', user_controller_1.default.createReview);
exports.userRoute.get('/getReview/:user_id', user_controller_1.default.getReview);
exports.userRoute.put('/updateReview', user_controller_1.default.updateReview);
exports.userRoute.delete('/deleteReview/:review_id', user_controller_1.default.deleteReview);

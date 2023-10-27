"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("../log/logger"));
const account_route_1 = require("./routes/account.route");
const payment_route_1 = require("./routes/payment.route");
const user_route_1 = require("./routes/user.route");
const job_routes_1 = require("./routes/job.routes");
const admin_route_1 = require("./routes/admin.route");
const send_Quatation_controller_1 = require("./controllers/send.Quatation.controller");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use('/api/account', account_route_1.accountRoute);
app.use('/api/payment', payment_route_1.paymentRoute);
app.use('/api/user', user_route_1.userRoute);
app.use('/api/admin', admin_route_1.adminRoute);
app.use('/api/job', job_routes_1.jobRouter);
app.post('/send-quotation', send_Quatation_controller_1.sendQuotationController);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
    logger_1.default.info('MongoDB connected');
    app.on('error', (err) => {
        logger_1.default.error(err);
    });
    app.listen(port, () => {
        logger_1.default.info(`TypeScript with Express
         http://localhost:${port}/`);
    });
});

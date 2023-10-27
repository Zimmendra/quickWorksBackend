import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from '../log/logger';
import { accountRoute } from './routes/account.route';
import { paymentRoute } from './routes/payment.route';
import { userRoute } from './routes/user.route';
import {jobRouter } from './routes/job.routes';
import { adminRoute } from './routes/admin.route';
import { sendQuotationController } from './controllers/send.Quatation.controller';
require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/account', accountRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute );


app.use('/api/job',jobRouter);
app.post('/send-quotation', sendQuotationController);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  logger.info('MongoDB connected');
  app.on('error', (err) => {
    logger.error(err);
  });
  app.listen(port, () => {
    logger.info(`TypeScript with Express
         http://localhost:${port}/`);
  });
});

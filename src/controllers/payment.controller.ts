import { Response, Request } from 'express';
import paymentService from '../services/payment.service';

const createPayment = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    const payItem = await paymentService.createPayment(dto);
    res.status(200).json(payItem);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

export default { createPayment };

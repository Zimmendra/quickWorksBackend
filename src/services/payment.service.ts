import paymentModel from '../models/payment/payment.model';
import { IPaymentItem } from '../models/payment/IPayment';

const createPayment = async (dto: IPaymentItem) => {
  try {
    //   const existUser = await workerModel.findOne({ _id: dto.holder_id });

    //   if (!existUser) {
    //     throw 'User not found';
    //   }

    const payItem = await paymentModel.create(dto);
    return payItem;
  } catch (err: any) {
    throw err;
  }
};

export default { createPayment };

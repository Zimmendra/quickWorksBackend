import { Request, Response } from 'express';
import { quotationGenerator, QuotationData } from '../services/quotationGenerator'; // Import the quotationGenerator and QuotationData

export const sendQuotationController = async (req: Request, res: Response) => {
  try {
    const quotationData: QuotationData = req.body.quotationData;
    const recipientEmail: string = req.body.recipientEmail;
    
    await quotationGenerator.generateAndSendQuotationEmail(quotationData, recipientEmail);

    res.status(200).send('Quotation sent successfully');
  } catch (error) {
    res.status(500).send('Error sending quotation');
  }
};

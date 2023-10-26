import * as puppeteer from 'puppeteer';
import * as nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export class QuotationGenerator {
  async generateAndSendQuotationEmail(quotationData: QuotationData, recipientEmail: string): Promise<void> { 
    
    const htmlContent = this.createHtmlQuotation(quotationData);
    const pdfBuffer = await this.generatePDF(htmlContent);
    
    // Email details
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
      auth: {
        user: 'codextext.dev@gmail.com',
        pass: 'gwha abji tkmn rjcd',
      },
    });
   console.log(1)
    const mailOptions = {
      from: 'cgpt2532@gmail.com',
      to:  recipientEmail,
      subject: 'Your Quotation',
      text: 'Please find your quotation attached.',
      attachments: [{ filename: 'quotation.pdf', content: pdfBuffer }],
    };
    console.log(mailOptions)
    try {
      console.log(transporter.sendMail(mailOptions))
      const info = await transporter.sendMail(mailOptions);
      console.log(3)
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      throw new Error(`Error sending email: ${error}`);
    }
  }

  private createHtmlQuotation(quotationData: QuotationData): string {
    console.log(quotationData.quotationId)
    const itemsList = quotationData.items
      ? `<ul>${quotationData.items.map((item) => `<li>${item.name}: ${item.price}  - ${item.Quantity} </li>`).join('')}</ul>`
      : '';
  
      const htmlContent = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Quick Works Quotation</title>
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background-color: #E0E8F1; /* Light blue background */
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: #FFF;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 80%;
            text-align: center;
        }

        h1 {
            color: #007BFF;
            font-size: 24px;
            margin: 0 0 20px;
        }

        .section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border-top: 1px solid #ccc;
        }

        .section:last-child {
            border-bottom: 1px solid #ccc;
        }

        .section h2 {
            color: #007BFF;
            font-size: 16px;
            margin: 0;
        }

        .section p {
            font-size: 18px;
            margin: 0;
        }

        .highlight {
            background-color: #FFFF99;
            padding: 5px;
            font-weight: bold;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            padding: 8px 0;
        }

        li:last-child {
            border-bottom: none;
        }

        li span {
            font-weight: bold;
            margin-right: 8px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Quick Works Quotation</h1>
        <div class="section">
            <h2>Quotation ID:</h2>
            <p>${quotationData.quotationId}</p>
        </div>
        <div class="section">
            <h2>Customer Name:</h2>
            <p>${quotationData.customerName}</p>
        </div>
        <div class="section">
            <h2>Location:</h2>
            <p>${quotationData.location}</p>
        </div>
        <div class="section">
            <h2>Job Type:</h2>
            <p>${quotationData.jobType}</p>
        </div>
        <div class="section">
            <h2>Job Description:</h2>
            <p>${quotationData.jobDescription}</p>
        </div>
        <div class="section">
            <h2>Date of Completion:</h2>
            <p>${quotationData.dateOfCompletion}</p>
        </div>
        <div class="section">
            <h2>Time of Arrival:</h2>
            <p>${quotationData.timeOfArrival}</p>
        </div>
        <div class="section">
            <h2>Worker Name:</h2>
            <p>${quotationData.workerName}</p>
        </div>
        <div class="section">
            <h2>Bring Goods:</h2>
            <p>${quotationData.bringGoods ? 'Yes' : 'No'}</p>
        </div>
        <div class="section">
            <h2>Payment Amount:</h2>
            <p class="highlight">${quotationData.paymentAmount}</p>
        </div>
        <div class="section">
            <h2>Items:</h2>
            <ul>
                ${itemsList}
            </ul>
        </div>
    </div>
</body>

</html>
`;

return htmlContent;

    
  }

  private async generatePDF(htmlContent: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: 'new' }); // Specify headless mode as "new"
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdfBuffer;
  }
}

// Define the QuotationData and ItemDocument types
interface ItemDocument {
  name: string;
  price: number;
  Quantity:number;
}

export interface QuotationData {
  quotationId: number;
  customerName: string;
  location: string;
  jobType: string;
  jobDescription: string;
  dateOfCompletion: Date | null;
  timeOfArrival: string | null;
  workerName: string;
  bringGoods: boolean | null;
  paymentAmount: string;
  items: ItemDocument[] | null;
}

// Create an instance of QuotationData with real data


export const quotationGenerator = new QuotationGenerator();

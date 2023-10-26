"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotationGenerator = exports.QuotationGenerator = void 0;
const puppeteer = __importStar(require("puppeteer"));
const nodemailer = __importStar(require("nodemailer"));
class QuotationGenerator {
    generateAndSendQuotationEmail(quotationData, recipientEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlContent = this.createHtmlQuotation(quotationData);
            const pdfBuffer = yield this.generatePDF(htmlContent);
            // Email details
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'codextext.dev@gmail.com',
                    pass: 'gwha abji tkmn rjcd',
                },
            });
            console.log(1);
            const mailOptions = {
                from: 'cgpt2532@gmail.com',
                to: recipientEmail,
                subject: 'Your Quotation',
                text: 'Please find your quotation attached.',
                attachments: [{ filename: 'quotation.pdf', content: pdfBuffer }],
            };
            console.log(mailOptions);
            try {
                console.log(transporter.sendMail(mailOptions));
                const info = yield transporter.sendMail(mailOptions);
                console.log(3);
                console.log(`Email sent: ${info.response}`);
            }
            catch (error) {
                throw new Error(`Error sending email: ${error}`);
            }
        });
    }
    createHtmlQuotation(quotationData) {
        console.log(quotationData.quotationId);
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
    generatePDF(htmlContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({ headless: 'new' }); // Specify headless mode as "new"
            const page = yield browser.newPage();
            yield page.setContent(htmlContent);
            const pdfBuffer = yield page.pdf({ format: 'A4' });
            yield browser.close();
            return pdfBuffer;
        });
    }
}
exports.QuotationGenerator = QuotationGenerator;
// Create an instance of QuotationData with real data
exports.quotationGenerator = new QuotationGenerator();

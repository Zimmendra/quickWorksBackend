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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendQuotationController = void 0;
const quotationGenerator_1 = require("../services/quotationGenerator"); // Import the quotationGenerator and QuotationData
const sendQuotationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quotationData = req.body.quotationData;
        const recipientEmail = req.body.recipientEmail;
        yield quotationGenerator_1.quotationGenerator.generateAndSendQuotationEmail(quotationData, recipientEmail);
        res.status(200).send('Quotation sent successfully');
    }
    catch (error) {
        res.status(500).send('Error sending quotation');
    }
});
exports.sendQuotationController = sendQuotationController;

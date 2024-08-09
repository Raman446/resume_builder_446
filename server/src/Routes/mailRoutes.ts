import { sendMail } from "../Controller/mailContrioller";


export const mailAuth = require("express").Router();

mailAuth.post('/send-mail', sendMail);
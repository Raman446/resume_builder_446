import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import path from "path";
import fs from 'fs';



const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: '7a1d32002@smtp-brevo.com',
        pass: 'mBksgbhjC7FXIx95'
    }
});

// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: 'raman.75way@gmail.com',
//         pass: 'raman75WT446'
//     }
// });


export const sendMail = async (req: Request, res: Response) => {
    console.log("ttttt", req.body)

    const { email, resumeContent } = req.body;

    // Generate the PDF file (you can use libraries like pdfkit or puppeteer)
    // const pdfPath = path.join(__dirname, 'resume.pdf');
    // fs.writeFileSync(pdfPath, resumeContent);

    const mailOptions = {
        from: 'ramanbagga2112@gmail.com',
        to: email,
        subject: 'Your Resume',
        text: 'Please find attached your resume.',
        // attachments: [
        //     {
        //         filename: 'resume.pdf',
        //         // path: pdfPath
        //     }
        // ]
    }


    try {
        const mail = await transporter.sendMail({
            from: 'ramanbagga2112@gmail.com',
            to: email,
            subject: 'Your Resume',
            text: 'Please find attached your resume.',
            // attachments: [
            //     {
            //         filename: 'resume.pdf',
            //         // path: pdfPath
            //     }
            // ]
        });

        console.log(mail)






        // , (error, info) => {
        //     if (error) {
        //         console.log('Error occurred while sending email:', error);
        //     } else {
        //         console.log('Email sent successfully:', info.response);
        //         res.send({ status: 'Email_sent_successfully' });
        //     }
        // }


        // console.log("pppp", mail)
        // res.send({ status: 'Email_sent_successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.send({ status: 'Failed_to_send_email' });
    }
}

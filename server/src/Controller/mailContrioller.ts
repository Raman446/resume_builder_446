import { Request, Response } from "express";
import { Buffer } from "buffer";
import { Row,Col } from "react-bootstrap";
import nodemailer from 'nodemailer'
import puppeteer from "puppeteer";
import path from "path";
import fs from 'fs';
import { content } from "html2canvas/dist/types/css/property-descriptors/content";


const transporter = nodemailer.createTransport({
    // host: 'smtp-relay.brevo.com',
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'linnea.rodriguez@ethereal.email',
        pass: 'wVjdY6g8EwD5C3BxvY'
        // user: '7a1d32002@smtp-brevo.com',
        // pass: 'mBksgbhjC7FXIx95'
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

    let resume: string = `
    <!DOCTYPE html>
        <html>
            <head>
                <style>
                    .resume{
                        text-align: center;
                        border: 1px rgb(245, 240, 240) solid;
                    }

                    .personal{
                        padding-top: 0px;
                        background-image: linear-gradient(180deg, pink, white, white);
                    }
                    
                    .loc{
                        display: inline;
                        margin: 5px;
                    }
                    
                    .designation{
                        margin-bottom:3px;
                    }
                    
                    hr{
                    margin: 5px;
                    }

                    .bttn{
                        border: 1px solid black;
                        border-radius: 20px;
                        background-color: rgb(232, 223, 232);
                        padding: 5px;
                        margin: 5px;
                    }

                    .languages{
                        background-image: linear-gradient(180deg,  white, white,rgb(233, 196, 233));
                        margin:0px;
                        padding: 0px;
                    }

                    .coll1{
                        grid-area: header;
                        
                    }

                     .coll2{
                        grid-area: detail;
                       
                    }

                     .coll6{
                        grid-area: project;
                        
                    }

                    .grid-container{
                        display: grid;
                        grid-template-areas:
                            'header header detail detail detail detail';
                        gap: 10px;
                        background-color: #2196F3;
                        padding: 10px;
                        text-align: left;
                    }

                    .grid-container2{
                        display: grid;
                        grid-template-areas:
                            'header header header header detail detail';
                        gap: 10px;
                        background-color: #2196F3;
                        padding: 10px;
                        text-align: left;
                    }

                    .grid-container3{
                        display: grid;
                        grid-template-areas: project project project project project project ;
                        gap: 10px;
                        background-color: #2196F3;
                        padding: 10px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                <div class="resume">
                            <div class="personal">
                                <h1><b>${req.body.name}</b></h1>
                                <h3 class="designation">${req.body.designation}</h3>
                                <p class="loc"><LocationOnIcon />${req.body.location} </p>
                                <p class="loc"><MailIcon />${req.body.email} </p>
                            </div>
                            <hr></hr>


                            <div class="education">
                                <div class="grid-container">
                                    <div md='3' class="coll1">
                                        <h3 className="text-start m-3"><b>Education</b></h3>
                                    </div>
                                    <div md='9' class="coll2">
                                        <div class="grid-container2">
                                            <div class="coll1">
                                                <h3 className="text-start">${req.body.education.collegeName} </h3>
                                                <p className="text-start">${req.body.education.stream}</p>
                                            </div>
                                            <div class="coll2">
                                                <h5 className="text-end me-4"><CalendarMonthIcon /> ${req.body.education.startingDate} - ${req.body.education.endingDate} </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <hr></hr>
                            <div className="experience">
                                <div class="grid-container">
                                    <div md='3' class="coll1">
                                        <h3 className="text-start m-3"><b>Experience</b></h3>
                                    </div>
                                    <div md='9' class="coll2">
                                        ${req.body.experience.map((item: any, index: number) =>
                                            `<div class="grid-container2">
                                                <div md="8" class="coll1">
                                                    <h3>${item.companyName}</h3>
                                                    <span class="bttn p-1 mb-1">${item.companyPosition}</span>
                                                    <ul>
                                                        <li>
                                                            ${item.cDescription}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div md='4' class="coll2">
                                                    <h5 className="me-4"><CalendarMonthIcon />${item?.startingDate} - ${item?.endingDate}</h5>
                                                </div>
                                            </div>`
                                        )}
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                           
                            <div class="projects">
                                <div class="grid-container">
                                    <div md='3' class="coll1">
                                        <h3 className="text-start m-3"><b>Featured Project</b></h3>
                                    </div>
                                    <div md='9' class="coll2">
                                        ${req.body?.project.map((item: any, index: number) =>
                                            `<div class='grid-container3'>
                                                <div class='coll6'>
                                                    <h3>${item?.projectName}</h3>
                                                    <p className="mt-2">${item?.pDescription}</p>
                                                </div>
                                            </div>`
                                        )}
                                    </div>
                                </div>
                            </div>


                            <hr></hr>

                            
                            <div className="skills">
                                <div class="grid-container">
                                    <div md='3' class="coll1">
                                        <h3 className="text-start m-3"><b>Skills & Tools</b></h3>
                                    </div>
                                    <div md='9' class="coll2">
                                        <div className="m-0 h-auto">
                                            <div className="text-start mb-3">
                                                <h3>Languages</h3>
                                                ${req.body?.skills.map((item: any, index: number) =>
                                                `<span class="bttn p-1 me-2">${item?.front_back_end}</span>`
                                                )}
                                            </div>
                                        </div>

                                        <div className="m-0 h-auto">
                                            <div className="text-start mb-3">
                                                <h3>Technologies</h3>
                                                ${req.body?.technologies.map((item: any, index: number) =>
                                                `<span class="bttn p-1 me-2">${item?.tech}</span>`
                                                )}
                                            </div>
                                        </div>

                                        <div className="m-0 h-auto">
                                            <div className="text-start mb-3">
                                                <h3>Soft Skills</h3>
                                                ${req.body?.softSkill.map((item: any, index: number) =>
                                                `<span class="bttn p-1 me-2">${item?.softSkill}</span>`
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr></hr>

                            
                            <div class="languages">
                                <div class="grid-container">
                                    <div md='3' class="coll1">
                                        <h3 className="text-start m-3"><b>Languages</b></h3>
                                    </div>
                                    <div md='9' class="coll2">
                                        <span class="bttn">English</span>
                                        <span class="bttn">Hindi</span>
                                        <span class="bttn">Punjabi</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </body>
                </html>`;

    // if (!req.body.html) {
    //     throw new Error('PDF buffer is undefined or null');
    //   }

    // sGenerate the PDF file (you can use libraries like pdfkit or puppeteer)

    const createPDF = async (resume: string): Promise<Buffer> => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(resume, { waitUntil: 'domcontentloaded' });
        const pdfBufferUint8Array = await page.pdf({ format: 'A4' });
        await browser.close();
        const pdfBuffer = Buffer.from(pdfBufferUint8Array)
        return pdfBuffer;
    }


    const pdfPath = path.join(__dirname, 'resume.pdf');
    const pdfBuffer =await createPDF(resume);
    fs.writeFileSync(pdfPath, pdfBuffer);

    const mailOptions = {
        from: '"Ramandeep <linnea.rodriguez@ethereal.email>"',
        to: `${req.body.email}`,
        subject: `Your Resume ${req.body.name}`,
        text: 'Please find attached your resume.',
        attachments: [
            {
                filename: 'resume.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    }


    try {
        const mail = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred while sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
                res.send({ status: 'Email_sent_successfully' });
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.send({ status: 'Failed_to_send_email' });
    }
}

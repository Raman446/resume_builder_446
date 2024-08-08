import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf'
import { useNavigate } from 'react-router-dom'


import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import './css/preview.css'

const ResumePreview: React.FC = () => {

    const [resumeData, setResumeData] = useState<any>();
    console.log("resuemdata", resumeData)

    const navigate = useNavigate();

    
    useEffect(() => {
        const data = localStorage.getItem('formData');
        if (data) {
            try {
                const realData = JSON.parse(data);
                setResumeData(realData);
                console.log("fffffff", realData.education.stream)
            } catch (err) {
                console.log("errror here")
            }
        }
    },[])


    const contentRef = React.useRef<HTMLDivElement>(null);

    const downloadpdf = async () => {
        localStorage.setItem('formData', " ")
        navigate('/resume')
        console.log("clicked///////")
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Adjust based on your content
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${resumeData?.name}.pdf`);
        }
    };



    return (
        <Fragment>
            <h2 className="heading">Resume preview</h2>
            <div ref={contentRef} className="resume">
                {/* personal details */}
                <div className="personal">
                    <h1><b>{resumeData?.name}</b></h1>
                    <div className="mb-4">
                        <h5 className="d-inline m-4 mt-3">{resumeData?.designation}</h5>
                    </div>
                    <p className="d-inline m-4"><LocationOnIcon />{resumeData?.location} </p>
                    <p className="d-inline"><MailIcon />{resumeData?.email} </p>
                </div>


                <hr className="m-3"></hr>


                {/* Education details */}
                <div className="education">
                    <Row className="m-0">
                        <Col md='3' className="coll">
                            <h5 className="text-start m-3"><b>Education</b></h5>
                        </Col>
                        <Col md='9' className="coll">
                            <Row className="m-0">
                                <Col>
                                    <h5 className="text-start">{resumeData?.education.collegeName} </h5>
                                    <p className="text-start">{resumeData?.education.stream}</p>
                                </Col>
                                <Col>
                                    <h6 className="text-end me-4"><CalendarMonthIcon /> {resumeData?.education.startingDate} - {resumeData?.education.endingDate} </h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>


                <hr className="m-3"></hr>

                {/* Experience part */}
                <div className="experience">
                    <Row className="m-0">
                        <Col md='3' className="coll">
                            <h5 className="text-start m-3"><b>Experience</b></h5>
                        </Col>
                        <Col md='9' className="coll">
                            {resumeData?.experience.map((item: any, index: number) =>
                                <Row className="m-0 h-auto">
                                    <Col md="8" className="text-start">
                                        <h5>{item?.companyName}</h5>
                                        <span className="bttn p-1 mb-1">{item?.companyPosition}</span>
                                        <ul>
                                            <li>
                                                {item?.cDescription}
                                            </li>

                                        </ul>
                                    </Col>
                                    <Col md='4' className="text-end">
                                        <h6 className="me-4"><CalendarMonthIcon />{item?.startingDate} - {item?.endingDate}</h6>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </div>


                <hr className="m-3"></hr>

                {/* Projects */}
                <div className="projects">
                    <Row className="m-0">
                        <Col md='3' className="coll">
                            <h5 className="text-start m-3"><b>Featured Project</b></h5>
                        </Col>
                        <Col md='9' className="coll">
                            {resumeData?.project.map((item: any, index: number) =>
                                <Row className="m-0 h-auto">
                                    <Col className="text-start">
                                        <h5>{item?.projectName}</h5>
                                        <p className="mt-2">{item?.pDescription}</p>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </div>


                <hr className="m-3"></hr>

                {/* skills */}
                <div className="skills">
                    <Row className="m-0">
                        <Col md='3' className="coll">
                            <h5 className="text-start m-3"><b>Skills & Tools</b></h5>
                        </Col>
                        <Col md='9' className="coll">
                            <Row className="m-0 h-auto">
                                <Col className="text-start mb-3">
                                    <h5>Languages</h5>
                                    {resumeData?.skills.map((item: any, index: number) =>
                                        <span className="bttn p-1 me-2">{item?.front_back_end}</span>
                                    )}
                                </Col>
                            </Row>

                            <Row className="m-0 h-auto">
                                <Col className="text-start mb-3">
                                    <h5>Technologies</h5>
                                    {resumeData?.technologies.map((item: any, index: number) =>
                                        <span className="bttn p-1 me-2">{item?.tech}</span>
                                    )}
                                </Col>
                            </Row>

                            <Row className="m-0 h-auto">
                                <Col className="text-start mb-3">
                                    <h5>Soft Skills</h5>
                                    {resumeData?.softSkill.map((item: any, index: number) =>
                                        <span className="bttn p-1 me-2">{item?.softSkill}</span>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <hr className="m-3"></hr>

                {/* Talking languages */}
                <div className="languages">
                    <Row className="m-0">
                        <Col md='3' className="coll">
                            <h5 className="text-start m-3"><b>Languages</b></h5>
                        </Col>
                        <Col md='9' className="coll text-start">
                            <span className="bttn p-1 me-2">English</span>
                            <span className="bttn p-1 me-2">Hindi</span>
                            <span className="bttn p-1 me-2">Punjabi</span>
                        </Col>
                    </Row>
                </div>

            </div>



            <Button className="m-3" variant="success" onClick={downloadpdf}>Download as pdf</Button>
            {/* <Button variant="success">Share on email</Button> */}

        </Fragment>
    )
};

export default ResumePreview;
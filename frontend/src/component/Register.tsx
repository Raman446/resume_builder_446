import React from "react";
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import loginpic from './images/article_3340_1.jpg';

const Register: React.FC =()=>{

    const navigate = useNavigate();

    const gotoLoginPage = () => {
        navigate('/');
    }

    const getFormData = async (e: any) => {
        e.preventDefault();

        let data = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        }

        console.log("ttttt", data);

        try {
            const response = await fetch("http://localhost:9000/user-register", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                let result = await res.json();

                console.log("ress", result)

                // toast.error("qwertyuio")
                if (result.status === "successfully_registered") {
                    toast.success("Successfully Registered");
                    navigate('/');
                }
                else if (result.status === "already_exist") {
                    toast.error("Email already exist");
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }



    return(
        <Row className="row">
            <Col>
                <img className="pic" src={loginpic} />
            </Col>
            <Col >
                <Form className="login" onSubmit={getFormData}>
                    <h2 className="m-4 meee">Register for Resume Bulids</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                    <p className="meeee" onClick={gotoLoginPage}>Already a member, Login now</p>
                </Form>
            </Col>
        </Row>
    )
};

export default Register;
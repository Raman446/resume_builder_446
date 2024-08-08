import React from "react";
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './css/login.css'
import loginpic from './images/article_3340_1.jpg'

const Login: React.FC = () => {
    const navigate = useNavigate();

    const gotoRegisterPage = () => {
        navigate('/register');
    }

    const checkData = async (e: any) => {
        e.preventDefault();

        let data = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        console.log("oooooo", data);

        try {
            const response = await fetch("http://localhost:9000/user-login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                let result = await res.json();

                console.log("ress", result)

                // toast.error("qwertyuio")
                if (result.status === "not_registered_email") {
                    toast.error("email is not registered");
                } else if (result.status === "invalid_password") {
                    toast.error("invalid password");
                }
                else if (result.status === "Login_successfully") {
                    toast.success("Login Successfully");
                    navigate(`/resume`);
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <Row className="row">
            <Col>
                <img className="pic" src={loginpic} />
            </Col>
            <Col >
                <Form className="login" onSubmit={checkData}>
                    <h2 className="m-4 meee">Login for Resume Bulids</h2>
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
                    <p className="meeee" onClick={gotoRegisterPage}>not a member, Register now</p>
                </Form>
            </Col>
        </Row>

    )
};

export default Login;
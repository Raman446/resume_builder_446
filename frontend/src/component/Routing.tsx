import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";

const Routing: React.FC = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resume" element={<ResumeForm />} />
                <Route path="/preview" element={<ResumePreview />} />
            </Route>
        </Routes>
    )
};
export default Routing;
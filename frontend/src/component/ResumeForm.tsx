import React from 'react';
import './css/resume.css'
import { Button, Form } from 'react-bootstrap';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useNavigate } from 'react-router-dom';


interface Education {
    collegeName: string;
    stream: string;
    startingDate: Date;
    endingDate: Date;
}

interface Experience {
    companyName: string;
    companyPosition: string;
    startingDate: Date;
    endingDate: Date;
    cDescription: string;
}

interface Project {
    projectName: string;
    pDescription: string;
}

interface Skills {
    front_back_end: string;
}

interface Technologies {
    tech: string;
}

interface SoftSkill {
    softSkill: string;
}

interface Languages {
    language: string;
}

interface FormData {
    name: string;
    email: string;
    location: string;
    designation: string;
    education: Education;
    experience: Experience[];
    project: Project[];
    skills: Skills[];
    technologies: Technologies[];
    softSkill: SoftSkill[];
    languages: Languages[];
}

const ResumeForm: React.FC = () => {

    const navigate = useNavigate();

    const { register, formState: { errors, isSubmitting }, control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            location: "",
            designation: "",
            education: { collegeName: " ", stream: " ", startingDate: new Date(), endingDate: new Date() },
            experience: [{ companyName: " ", companyPosition: " ", startingDate: new Date(), endingDate: new Date(), cDescription: " " }],
            project: [{ projectName: " ", pDescription: " " }],
            skills: [{ front_back_end: " " }],
            technologies: [{ tech: " " }],
            softSkill: [{ softSkill: " " }]
        }
    });

    const { fields: field, append: append, remove: remove } = useFieldArray({
        control,
        name: 'experience',
    })

    const { fields: field1, append: append1, remove: remove1 } = useFieldArray({
        control,
        name: 'project'
    })

    const { fields: field2, append: append2, remove: remove2 } = useFieldArray({
        control,
        name: 'skills'
    })

    const { fields: field3, append: append3, remove: remove3 } = useFieldArray({
        control,
        name: 'technologies'
    })

    const { fields: field4, append: append4, remove: remove4 } = useFieldArray({
        control,
        name: 'softSkill'
    })

    // const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // router.push({
        //     pathname: '/preview',
        //     query: { data: JSON.stringify(data) }
        // })
        console.log("eeeee", data)
        localStorage.setItem('formData', JSON.stringify(data))
        navigate('/preview')
    }


    return (
        <>
            <h3 className='text-center m-4 text-decoration-underline fw-bold'>Let's Build your Resume for next and great JOB....</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className='formm'>

                <h4 className='text-decoration-underline'>Personal Details</h4>
                <div className='m-5 mt-1'>
                    <div>
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("name", {
                            required: "Name is required"
                        })} />
                        {errors.name && (
                            <p style={{ color: "orangered" }}>{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Email</Form.Label>
                        <Form.Control {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "invalide email address" }
                        })} />
                        {errors.email && (
                            <p style={{ color: "orangered" }}>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Home-Town Name</Form.Label>
                        <Form.Control {...register("location", {
                            required: "City name is required"
                        })} />
                        {errors.location && (
                            <p style={{ color: "orangered" }}>{errors.location.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control {...register("designation", {
                            required: "Designation is required"
                        })} />
                        {errors.designation && (
                            <p style={{ color: "orangered" }}>{errors.designation.message}</p>
                        )}
                    </div>
                </div>
                <h4 className='text-decoration-underline'>Education Details</h4>
                <div className='m-5 mt-1'>
                    <div>
                        <Form.Label>College Name with city</Form.Label>
                        <Form.Control {...register("education.collegeName", {
                            required: "College name is required"
                        })} />
                        {errors.education?.collegeName && (
                            <p style={{ color: "orangered" }}>{errors.education.collegeName.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Course with branch</Form.Label>
                        <Form.Control {...register("education.stream", {
                            required: "Course is required"
                        })} />
                        {errors.education?.stream && (
                            <p style={{ color: "orangered" }}>{errors.education.stream.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Starting Date of Course</Form.Label>
                        <Form.Control {...register("education.startingDate", {
                            required: "Starting Date of College is required."
                        })} />
                        {errors.education?.startingDate && (
                            <p style={{ color: "orangered" }}>{errors.education.startingDate.message}</p>
                        )}
                    </div>
                    <div>
                        <Form.Label>Ending Date of Course</Form.Label>
                        <Form.Control {...register("education.endingDate", {
                            required: "Ending Date of Course is required"
                        })} />
                        {errors.education?.endingDate && (
                            <p style={{ color: "orangered" }}>{errors.education.endingDate.message}</p>
                        )}
                    </div>
                </div>



                <h4 className='text-decoration-underline'>Experience Details</h4>
                <div className='m-5 mt-1'>
                    {field.map((item, index) => (
                        <div className='m-5 mt-1' key={item.id}>
                            <div>
                                <Form.Label>Company Name with city</Form.Label>
                                <Form.Control {...register(`experience.${index}.companyName`, {
                                    required: "Company name is required"
                                })} placeholder='Company Name' />
                            </div>
                            <div>
                                <Form.Label>Your designation in Company</Form.Label>
                                <Form.Control {...register(`experience.${index}.companyPosition`, {
                                    required: "Designation is required"
                                })} />
                            </div>
                            <div>
                                <Form.Label>Job Description</Form.Label>
                                <Form.Control {...register(`experience.${index}.cDescription`, {
                                    required: "Description of job is required."
                                })} />
                            </div>
                            <div>
                                <Form.Label>Starting Date of job</Form.Label>
                                <Form.Control {...register(`experience.${index}.startingDate`, {
                                    required: "Starting Date of job is required."
                                })} />
                            </div>
                            <div>
                                <Form.Label>Ending Date of job</Form.Label>
                                <Form.Control {...register(`experience.${index}.endingDate`, {
                                    required: "Ending Date of job is required"
                                })} />
                            </div>
                            {field.length > 1 && (
                                <button className='btn btn-danger mt-2' type='button' onClick={() => remove(index)}>Remove Experience</button>
                            )}
                        </div>
                    ))}
                    <button className='btn btn-primary' type='button' onClick={() => append({ companyName: " ", companyPosition: " ", startingDate: new Date(), endingDate: new Date(), cDescription: " " })}>Add Experience</button>
                </div>

                <h4 className='text-decoration-underline'>Projects Details</h4>
                <div className='m-5 mt-1'>
                    {field1.map((item, index) => (
                        <div className='m-5 mt-1' key={item.id}>
                            <div>
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control {...register(`project.${index}.projectName`, {
                                    required: "Project name is required"
                                })} placeholder='Project Name' />
                            </div>
                            <div>
                                <Form.Label>Project Designation</Form.Label>
                                <Form.Control {...register(`project.${index}.pDescription`, {
                                    required: "Designation is required"
                                })} />
                            </div>

                            {field1.length > 1 && (
                                <button className='btn btn-danger mt-2' type='button' onClick={() => remove1(index)}>Remove Project</button>
                            )}
                        </div>
                    ))}
                    <button className='btn btn-primary' type='button' onClick={() => append1({ projectName: " ", pDescription: " " })}>Add Project</button>
                </div>

                <h4 className='text-decoration-underline'>Skills & Tools Details</h4>
                <div className='m-5 mt-1'>
                    {field2.map((item, index) => (
                        <div className='m-5 mt-1' key={item.id}>
                            <div>
                                <Form.Label>Your Skill</Form.Label>
                                <Form.Control {...register(`skills.${index}.front_back_end`, {
                                    required: "Skill is required"
                                })} placeholder='Enter your skill' />
                            </div>

                            {field2.length > 1 && (
                                <button className='btn btn-danger mt-2' type='button' onClick={() => remove2(index)}>Remove Skill</button>
                            )}
                        </div>
                    ))}
                    <button className='btn btn-primary' type='button' onClick={() => append2({ front_back_end: " " })}>Add Skill</button>

                    {field3.map((item, index) => (
                        <div className='m-5 mt-1' key={item.id}>
                            <div>
                                <Form.Label>Your Technologies</Form.Label>
                                <Form.Control {...register(`technologies.${index}.tech`, {
                                    required: "Technologies is required"
                                })} placeholder='Enter your Technologies' />
                            </div>

                            {field2.length > 1 && (
                                <button className='btn btn-danger mt-2' type='button' onClick={() => remove3(index)}>Remove Technologies</button>
                            )}
                        </div>
                    ))}
                    <button className='btn btn-primary' type='button' onClick={() => append3({ tech: " " })}>Add Technologies</button>


                    {field4.map((item, index) => (
                        <div className='m-5 mt-1' key={item.id}>
                            <div>
                                <Form.Label>Your Soft Skill</Form.Label>
                                <Form.Control {...register(`softSkill.${index}.softSkill`, {
                                    required: "Softskill is required"
                                })} placeholder='Enter your softskill' />
                            </div>

                            {field2.length > 1 && (
                                <button className='btn btn-danger mt-2' type='button' onClick={() => remove4(index)}>Remove Soft Skill</button>
                            )}
                        </div>
                    ))}
                    <button className='btn btn-primary' type='button' onClick={() => append4({ softSkill: " " })}>Add Soft Skill</button>
                </div>


                <Button type='submit' variant='success' className='m-5'>Preview the Resume</Button>
            </Form>

        </>
    );
};

export default ResumeForm;

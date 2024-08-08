import { Response, Request } from "express";
import user, { UserDetail } from "../models/user";

export const userRegister = async (req: Request, res: Response) => {
    try {
        // const details = req.body;
        // console.log("uuuuu", details);

        const { userName, email, password } = req.body;
        console.log("ppp", req.body.name);

        const checkUserExist = await user.findOne({ userEmail: req.body.email });
        console.log("wwww", checkUserExist)
        if (checkUserExist) {
            return (res.send({
                status: "already_exist",
            }))
        } else {
            const person: UserDetail = new user({
                userName: req.body.name,
                userEmail: req.body.email,
                password: req.body.password
            });
            await person.save();
            return (
                res.send({
                    status: "successfully_registered",
                }))
        }
    } catch (err) {
        console.log(err)
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        console.log("bbbb", req.body)
        const checkEmailExist = await user.findOne({ userEmail: req.body.email });
        console.log("jjjj", checkEmailExist)
        if (checkEmailExist) {
            const checkPasswordExist = await user.findOne({ password: req.body.password});
            if(checkPasswordExist){
                return(
                    res.send({
                        status: "Login_successfully",
                    })
                )
            }else{
                return (
                    res.send({
                        status: "invalid_password",
                    })
                )
            }
        } else {
            return (
                res.send({
                    status: "not_registered_email",
                })
            )
        }

    } catch (err) {
        console.log(err)
    }
}
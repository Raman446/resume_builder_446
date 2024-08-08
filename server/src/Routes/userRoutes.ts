import { userLogin, userRegister } from "../Controller/userController";

export const userAuth = require("express").Router();

userAuth.post('/user-register', userRegister);
userAuth.post('/user-login', userLogin)
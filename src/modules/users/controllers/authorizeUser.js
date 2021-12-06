import { validateUser } from "../../../validation/postUser.js";
import mongoose from "mongoose";
import Users from "./userModel.js";
import bcrypt from "bcryptjs"

const ERROR_STATUS = 400;
const ERROR_EMAIL = "User with this email doesn't exist";
const ERROR_PASSWORD = "Password is incorrect";

const AuthorizeController = async (request, response, next) => {
	const {error} = validateUser(request.body);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
		return;
	} 
	try{
		const {email, password} = request.body;
		const user = await Users.findOne({email});
		if (!user) {
			const err = new Error(ERROR_EMAIL);
			err.status = ERROR_STATUS;
			next(err);
			return;			
		}
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const err = new Error(ERROR_PASSWORD);
			err.status = ERROR_STATUS;
			next(err);
			return;	
    }
		response.status(401).json("Signed in successfully")
	}
	catch(error){
		next(new Error(error));
	}
};

export default AuthorizeController;
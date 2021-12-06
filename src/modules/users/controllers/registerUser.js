import { validateUser } from "../../../validation/postUser.js";
import mongoose from "mongoose";
import Users from "./userModel.js";
import bcrypt from "bcryptjs"

const ERROR_STATUS = 400;
const ERROR_EMAIL = "User with this email already exists";

const RegisterController = async (request, response, next) => {
	const {error} = validateUser(request.body);
	if (error) {
		const err = new Error(error.details[0].message);
		err.status = ERROR_STATUS;
		next(err);
		return;
	} 
	try{
		const {email, password} = request.body;
		const userExists = await Users.findOne({email: email});
		if (userExists) {
			const err = new Error(ERROR_EMAIL);
			err.status = ERROR_STATUS;
			next(err);
			return;			
		}
		const hashedPassword = await bcrypt.hash(password, 9);
		const user = new Users({email: email, password: hashedPassword});
		await user.save();
		response.status(401).json("User registered successfully")
	}
	catch(error){
		next(new Error(error));
	}
};

export default RegisterController;

import bcrypt from "bcryptjs"
import { validateUser } from "../../../validation/postUser.js";
import Users from "../models/UserModel.js";
import create from "../../../helpers/createToken.js"

const ERROR_STATUS = 400;
const ERROR_REGISTRATION = "Incorrect email or password. Password must contain at least 1 number and 1 special caracter"
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
		const token = create.token(user);
		const refreshToken = create.refreshToken(user);
		response.status(200).json({token: token, refreshToken: refreshToken});
	}
	catch(error){
		next(new Error(error));
	}
};

export default RegisterController;

import bcrypt from "bcryptjs";
import { validateUser } from "../../../validation/postUser.js";
import create from "../../../helpers/createToken.js"
import Users from "../models/UserModel.js";

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
		const token = create.token(user);
		const refreshToken = create.refreshToken(user);
		response.status(200).json({token: token, refreshToken: refreshToken});
	}
	catch(error){
		next(new Error(error));
	}
};

export default AuthorizeController;
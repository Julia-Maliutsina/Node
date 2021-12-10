import bcrypt from "bcryptjs";
import create from "../../../helpers/createToken.js"
import Users from "../models/UserModel.js";
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js";

const AuthorizeController = async (request, response, next) => {
	try {
		const {email, password} = request.body;
		const user = await Users.findOne({email});
		if (!user) {
			const err = new Error(ERROR_MESSAGES.authEmail);
			err.status = ERROR_STATUSES.badRequest;
			next(err);
			return;			
		}
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const err = new Error(ERROR_MESSAGES.authPassword);
			err.status = ERROR_STATUSES.badRequest;
			next(err);
			return;	
    }
		const token = create.token(user);
		const refreshToken = create.refreshToken(user);
		response.status(200).json({token: token, refreshToken: refreshToken});
	}	catch(error){
		next(new Error(error));
	}
};

export default AuthorizeController;
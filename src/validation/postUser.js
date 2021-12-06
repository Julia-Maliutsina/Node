import Joi from "joi";

export const validateUser = (user) => {
	const requirements = Joi.object().keys({
		email: Joi.string().min(5).max(30).required(),
		password: Joi.string().min(9).max(20).required(),
	});

	return requirements.validate(user);
};

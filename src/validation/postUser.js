import Joi from "joi";

export const validateUser = (user) => {
	const requirements = Joi.object().keys({
		email: Joi.string().min(5).max(30).pattern(new RegExp('^([a-zA-Z0-9_-]+\.)*(@{1}([a-zA-Z0-9_-])*)\.([a-z]{2,6})$')).required(),
		password: Joi.string().min(8).max(20).pattern(new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])')).required(),
	});

	return requirements.validate(user);
};

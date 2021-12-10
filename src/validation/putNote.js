import Joi from "joi";

export const validateUpdateNote = (note) => {
	const requirements = Joi.object().keys({
		id: Joi.required(),
		title: Joi.string().min(3).required(),
		content: Joi.string().min(3).max(500).required(),
		updatedAt: Joi.date().iso(),
	});

	return requirements.validate(note);
};

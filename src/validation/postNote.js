import Joi from "joi";

export const validateNewNote = (note) => {
	const requirements = Joi.object().keys({
		title: Joi.string().min(3).required(),
		content: Joi.string().min(3).max(500).required(),
		createdAt: Joi.date().iso(),
		updatedAt: Joi.date().iso(),
	});

	return requirements.validate(note);
};

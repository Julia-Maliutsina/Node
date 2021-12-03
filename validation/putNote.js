import Joi from "joi";

export const validateUpdateNote = (note) => {
  const requirements = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).max(500).required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
  })

  return requirements.validate(note)
}
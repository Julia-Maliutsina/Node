import Joi from "joi";

export const validateUpdateNote = (note) => {
  const requirements = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().alphanum().min(3).required(),
    content: Joi.string().min(3).max(30).required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
  })

  return requirements.validate(note)
}
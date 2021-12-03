import Joi from "joi";

export const validateNewNote = (note) => {
  const requirements = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().alphanum().min(3),
    content: Joi.string().min(3).max(30),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string(),
  })

  return requirements.validate(note)
}